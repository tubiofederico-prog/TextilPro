"use client";
import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { Scissors, Shirt, Sparkles, Box, Truck } from "lucide-react";
import { orders as seedOrders, operators } from "@/lib/data";
import { Order, OrderStage } from "@/lib/types";

// ===== Pipeline simplificado de etapas con botón =====
export type StepKey = "corte" | "confeccion" | "bordado" | "empaque" | "entrega";

export const STEPS: {
  key: StepKey; label: string; verb: string; icon: any; stage: OrderStage; doneStage: OrderStage;
}[] = [
  { key: "corte", label: "Corte", verb: "Cortó", icon: Scissors, stage: "en_corte", doneStage: "corte_terminado" },
  { key: "confeccion", label: "Confección", verb: "Confeccionó", icon: Shirt, stage: "en_confeccion", doneStage: "confeccion_terminada" },
  { key: "bordado", label: "Bordado", verb: "Bordó", icon: Sparkles, stage: "en_bordado", doneStage: "bordado_terminado" },
  { key: "empaque", label: "Empaque", verb: "Empacó", icon: Box, stage: "en_empaque", doneStage: "listo_entrega" },
  { key: "entrega", label: "Entrega", verb: "Entregó", icon: Truck, stage: "entregado", doneStage: "entregado" },
];

export const stepIndexForStage = (stage: OrderStage): number => {
  // cuántos pasos están completados según la etapa actual sembrada
  const order: OrderStage[] = [
    "recibido", "pendiente_materiales", "en_corte", "corte_terminado",
    "en_confeccion", "confeccion_terminada", "en_bordado", "bordado_terminado",
    "en_empaque", "listo_entrega", "entregado",
  ];
  const i = order.indexOf(stage);
  if (i < 0) return 0;
  if (stage === "entregado") return 5;
  if (i >= order.indexOf("listo_entrega")) return 4;
  if (i >= order.indexOf("en_empaque")) return 3;
  if (i >= order.indexOf("bordado_terminado")) return 3;
  if (i >= order.indexOf("en_bordado")) return 2;
  if (i >= order.indexOf("confeccion_terminada")) return 2;
  if (i >= order.indexOf("en_confeccion")) return 1;
  if (i >= order.indexOf("corte_terminado")) return 1;
  if (i >= order.indexOf("en_corte")) return 0;
  return 0;
};

export interface StepLog { by: string; at: string; }
export interface Photo { id: string; url: string; label: string; at: string; by: string; }

export interface MovilOrder extends Order {
  done: number;                       // cantidad de pasos completados (0..5)
  steps: Partial<Record<StepKey, StepLog>>;
  photos: Photo[];
  delayedManual?: boolean;
}

export interface Activity {
  id: string; orderCode: string; client: string; text: string;
  by: string; date: string; time: string; tone: "step" | "done" | "photo" | "move" | "delay" | "new";
}

interface Ctx {
  user: string;
  setUser: (u: string) => void;
  queue: MovilOrder[];               // pedidos activos ordenados (sin entregados)
  allOrders: MovilOrder[];
  activity: Activity[];
  move: (id: string, dir: -1 | 1) => void;
  toggleDelay: (id: string) => void;
  completeStep: (id: string) => void;
  addPhoto: (id: string, url: string, label: string) => void;
  repeatOrder: (sourceId: string) => string;
}

const MovilContext = createContext<Ctx | null>(null);

const stamp = () => {
  const d = new Date();
  const date = d.toISOString().slice(0, 10);
  const time = d.toTimeString().slice(0, 5);
  return { date, time, human: `${date} · ${time}` };
};

let uid = 1000;
const nextId = () => `mv${uid++}`;

export function MovilProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState("Moisés (Jefe)");
  const [orders, setOrders] = useState<MovilOrder[]>(() =>
    seedOrders
      .map((o) => ({ ...o, done: stepIndexForStage(o.stage), steps: {}, photos: [] }))
      .sort((a, b) => (a.queuePosition ?? 99) - (b.queuePosition ?? 99))
  );
  const [activity, setActivity] = useState<Activity[]>([]);

  const log = useCallback((a: Omit<Activity, "id" | "date" | "time">) => {
    const s = stamp();
    setActivity((prev) => [{ ...a, id: nextId(), date: s.date, time: s.time }, ...prev]);
  }, []);

  const queue = useMemo(
    () => orders.filter((o) => o.stage !== "entregado" && o.done < 5),
    [orders]
  );

  const move = useCallback((id: string, dir: -1 | 1) => {
    setOrders((prev) => {
      const active = prev.filter((o) => o.stage !== "entregado" && o.done < 5);
      const rest = prev.filter((o) => o.stage === "entregado" || o.done >= 5);
      const i = active.findIndex((o) => o.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= active.length) return prev;
      [active[i], active[j]] = [active[j], active[i]];
      const moved = active[j];
      log({ orderCode: moved.code, client: moved.clientName, text: `${dir === -1 ? "Subió" : "Bajó"} en la cola de producción`, by: user, tone: "move" });
      return [...active, ...rest];
    });
  }, [user, log]);

  const toggleDelay = useCallback((id: string) => {
    setOrders((prev) => {
      const target = prev.find((o) => o.id === id);
      if (!target) return prev;
      const nowDelayed = !(target.delayedManual ?? target.delayed);
      const updated = prev.map((o) => (o.id === id ? { ...o, delayed: nowDelayed, delayedManual: nowDelayed } : o));
      // un pedido retrasado baja solo al final de la cola activa
      if (nowDelayed) {
        const active = updated.filter((o) => o.stage !== "entregado" && o.done < 5 && o.id !== id);
        const rest = updated.filter((o) => o.stage === "entregado" || o.done >= 5);
        const self = updated.find((o) => o.id === id)!;
        log({ orderCode: target.code, client: target.clientName, text: "Marcado como retrasado — baja solo al final de la cola", by: user, tone: "delay" });
        return [...active, self, ...rest];
      }
      log({ orderCode: target.code, client: target.clientName, text: "Retraso resuelto — vuelve al flujo normal", by: user, tone: "delay" });
      return updated;
    });
  }, [user, log]);

  const completeStep = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id || o.done >= 5) return o;
        const step = STEPS[o.done];
        const s = stamp();
        const isLast = o.done + 1 >= 5;
        log({
          orderCode: o.code, client: o.clientName,
          text: `${step.verb} — ${step.label} terminado${isLast ? " · pedido entregado ✓" : ""}`,
          by: user, tone: isLast ? "done" : "step",
        });
        return {
          ...o,
          done: o.done + 1,
          stage: step.doneStage,
          progress: Math.round(((o.done + 1) / 5) * 100),
          steps: { ...o.steps, [step.key]: { by: user, at: s.human } },
        };
      })
    );
  }, [user, log]);

  const addPhoto = useCallback((id: string, url: string, label: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const s = stamp();
        log({ orderCode: o.code, client: o.clientName, text: `Foto del diseño/lienzo guardada: ${label}`, by: user, tone: "photo" });
        return { ...o, photos: [{ id: nextId(), url, label, at: s.human, by: user }, ...o.photos] };
      })
    );
  }, [user, log]);

  const repeatOrder = useCallback((sourceId: string) => {
    const src = orders.find((o) => o.id === sourceId);
    if (!src) return "";
    const id = nextId();
    const code = `PED-2026-0${150 + (uid % 50)}`;
    setOrders((prev) => {
      const clone: MovilOrder = {
        ...src, id, code, stage: "recibido", done: 0, steps: {}, progress: 0,
        delayed: false, delayedManual: false, priority: "media",
        createdAt: new Date().toISOString().slice(0, 10),
        photos: [...src.photos],
      };
      const active = prev.filter((o) => o.stage !== "entregado" && o.done < 5);
      const rest = prev.filter((o) => o.stage === "entregado" || o.done >= 5);
      return [clone, ...active, ...rest];
    });
    log({ orderCode: code, client: src.clientName, text: `Pedido repetido idéntico desde ${src.code} (${src.product})`, by: user, tone: "new" });
    return id;
  }, [orders, user, log]);

  const value = useMemo<Ctx>(
    () => ({ user, setUser, queue, allOrders: orders, activity, move, toggleDelay, completeStep, addPhoto, repeatOrder }),
    [user, queue, orders, activity, move, toggleDelay, completeStep, addPhoto, repeatOrder]
  );

  return <MovilContext.Provider value={value}>{children}</MovilContext.Provider>;
}

export const useMovil = () => {
  const c = useContext(MovilContext);
  if (!c) throw new Error("useMovil fuera de MovilProvider");
  return c;
};

export const OPERATORS = operators.filter((o) => o.role !== "Supervisor");
