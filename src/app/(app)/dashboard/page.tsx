"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Package, Factory, OctagonPause, CheckCircle2, Truck, ShieldAlert, Boxes, Timer,
  ChevronUp, ChevronDown, ArrowRight, AlertTriangle, Flame, Clock,
} from "lucide-react";
import { StatCard, PageHeader, Progress, toast } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { AreaTrend, BarsChart, Donut } from "@/components/charts";
import { orders } from "@/lib/data";
import { STAGE_META } from "@/lib/constants";
import { productionByDay, ordersByStage, avgTimePerStage } from "@/lib/reports";

const nextStage: Record<string, string> = {
  recibido: "Pendiente materiales", pendiente_materiales: "Corte", en_corte: "Confección",
  corte_terminado: "Confección", en_confeccion: "Bordado", confeccion_terminada: "Bordado",
  en_bordado: "Empaque", bordado_terminado: "Empaque", en_empaque: "Listo entrega",
  listo_entrega: "Despacho", entregado: "—", detenido: "Reactivar",
};

const ALERTS = [
  { icon: OctagonPause, tone: "rose", title: "Pedido detenido", desc: "PED-2026-0135 detenido por falta de relleno siliconado", action: "/produccion/o8" },
  { icon: Flame, tone: "rose", title: "Pedido urgente sin avance", desc: "PED-2026-0142 (Hotel Vista Mar) urgente, recién en corte", action: "/pedidos/o1" },
  { icon: Truck, tone: "amber", title: "Bordado externo demorado", desc: "Lote GHN demorado en taller externo (+2 días)", action: "/calidad/incidencias/i5" },
  { icon: Boxes, tone: "amber", title: "Bajo stock de tela premium", desc: "Tela hotelera 300 hilos: 210m disponibles (mín. 250m)", action: "/inventario/alertas" },
  { icon: Clock, tone: "amber", title: "Confección demorando", desc: "Cubrecamas GHN +22% sobre el tiempo promedio", action: "/produccion/o14" },
];

const toneMap: Record<string, string> = {
  rose: "border-rose-200 bg-rose-50 text-rose-600",
  amber: "border-amber-200 bg-amber-50 text-amber-600",
};

export default function DashboardPage() {
  const active = orders.filter((o) => !["entregado"].includes(o.stage));
  const [queue, setQueue] = useState(
    [...orders].filter((o) => o.queuePosition).sort((a, b) => (a.queuePosition! - b.queuePosition!))
  );

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= queue.length) return;
    const next = [...queue];
    [next[i], next[j]] = [next[j], next[i]];
    setQueue(next);
    toast(`Pedido ${next[j].code} reordenado en la cola`, "info");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Torre de Control"
        subtitle="Estado general de la operación · Martes 10 de junio, 2026"
        actions={
          <>
            <Link href="/produccion/kanban" className="btn-outline">Ver Kanban</Link>
            <Link href="/pedidos/nuevo" className="btn-primary">Nuevo pedido</Link>
          </>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Pedidos abiertos" value={12} icon={<Package size={20} />} tone="brand" trend={{ value: "+3 esta semana", up: true }} />
        <StatCard label="En producción" value={7} icon={<Factory size={20} />} tone="violet" hint="corte · confección · bordado" />
        <StatCard label="Detenidos" value={1} icon={<OctagonPause size={20} />} tone="rose" hint="falta de material" />
        <StatCard label="Terminados hoy" value={3} icon={<CheckCircle2 size={20} />} tone="emerald" trend={{ value: "objetivo: 4", up: true }} />
        <StatCard label="Entregados (mes)" value={96} icon={<Truck size={20} />} tone="cyan" trend={{ value: "+11%", up: true }} />
        <StatCard label="Incidencias activas" value={5} icon={<ShieldAlert size={20} />} tone="amber" hint="2 de alta severidad" />
        <StatCard label="Materiales bajo stock" value={6} icon={<Boxes size={20} />} tone="rose" hint="2 críticos" />
        <StatCard label="Tiempo prom. producción" value="3.2d" icon={<Timer size={20} />} tone="slate" trend={{ value: "-0.4d", up: true }} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Live production panel */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-ink-900">Producción en tiempo real</h2>
              <p className="text-xs text-ink-400">Pedidos activos y su etapa actual</p>
            </div>
            <Link href="/produccion" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Ver todo →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3">Pedido</th>
                  <th className="px-3 py-3">Estado</th>
                  <th className="px-3 py-3">Prioridad</th>
                  <th className="px-3 py-3">Responsable</th>
                  <th className="px-3 py-3">Próx. etapa</th>
                  <th className="px-5 py-3">Entrega</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {active.slice(0, 8).map((o) => (
                  <tr key={o.id} className="group hover:bg-ink-50">
                    <td className="px-5 py-3">
                      <Link href={`/pedidos/${o.id}`} className="block">
                        <p className="font-semibold text-ink-800 group-hover:text-brand-600">{o.code}</p>
                        <p className="text-xs text-ink-400">{o.clientName} · {o.product}</p>
                      </Link>
                    </td>
                    <td className="px-3 py-3"><StageBadge stage={o.stage} /></td>
                    <td className="px-3 py-3"><PriorityBadge priority={o.priority} /></td>
                    <td className="px-3 py-3 text-ink-600">{o.responsible}</td>
                    <td className="px-3 py-3 text-ink-500">{nextStage[o.stage]}</td>
                    <td className={`px-5 py-3 font-medium ${o.delayed ? "text-rose-600" : "text-ink-600"}`}>
                      {o.delayed && <AlertTriangle size={13} className="mr-1 inline" />}{o.dueDate.slice(5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Airport-style queue */}
        <div className="card flex flex-col">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-ink-900">Cola de producción</h2>
              <p className="text-xs text-ink-400">Ordenada por prioridad</p>
            </div>
            <span className="chip bg-brand-50 text-brand-600">Tipo aeropuerto</span>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3" style={{ maxHeight: 460 }}>
            {queue.map((o, i) => (
              <div
                key={o.id}
                className={`flex items-center gap-2 rounded-xl border p-2.5 transition ${
                  o.priority === "urgente" ? "border-rose-200 bg-rose-50/50" : o.delayed ? "border-amber-200 bg-amber-50/40" : "border-ink-100 bg-white"
                }`}
              >
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-900 text-xs font-bold text-white">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Link href={`/pedidos/${o.id}`} className="truncate text-sm font-semibold text-ink-800 hover:text-brand-600">{o.code}</Link>
                    {o.priority === "urgente" && <Flame size={13} className="shrink-0 text-rose-500" />}
                    {o.delayed && <span className="chip bg-amber-100 text-amber-700 !px-1.5 !py-0">retraso</span>}
                  </div>
                  <p className="truncate text-xs text-ink-400">{o.clientName}</p>
                </div>
                <div className="flex flex-col">
                  <button onClick={() => move(i, -1)} className="grid h-5 w-6 place-items-center rounded text-ink-400 hover:bg-ink-100 hover:text-ink-700"><ChevronUp size={15} /></button>
                  <button onClick={() => move(i, 1)} className="grid h-5 w-6 place-items-center rounded text-ink-400 hover:bg-ink-100 hover:text-ink-700"><ChevronDown size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 card">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h2 className="font-bold text-ink-900">Alertas operativas</h2>
          <span className="chip bg-rose-50 text-rose-600">{ALERTS.length} activas</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALERTS.map((a, i) => {
            const Icon = a.icon;
            return (
              <Link key={i} href={a.action} className={`flex items-start gap-3 rounded-xl border p-3.5 transition hover:shadow-soft ${toneMap[a.tone]}`}>
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white"><Icon size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-ink-800">{a.title}</p>
                  <p className="text-xs text-ink-500">{a.desc}</p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold">Ver detalle <ArrowRight size={11} /></p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-bold text-ink-900">Producción por día</h3>
          <p className="text-xs text-ink-400">Pedidos ingresados vs. entregados — última semana</p>
          <div className="mt-4 h-64"><AreaTrend data={productionByDay} dataKey="pedidos" xKey="day" /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Pedidos por estado</h3>
          <p className="text-xs text-ink-400">Distribución actual</p>
          <div className="mt-4 h-64"><Donut data={ordersByStage} /></div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-bold text-ink-900">Tiempo promedio por etapa</h3>
          <p className="text-xs text-ink-400">Horas promedio de procesamiento</p>
          <div className="mt-4 h-56"><BarsChart data={avgTimePerStage} dataKey="horas" xKey="etapa" color="#8b5cf6" /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Etapas activas</h3>
          <p className="text-xs text-ink-400">Carga por etapa productiva</p>
          <div className="mt-4 space-y-3">
            {ordersByStage.filter((s) => s.name !== "Detenido").map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-ink-600">{s.name}</span>
                  <span className="font-semibold text-ink-800">{s.value}</span>
                </div>
                <Progress value={s.value * 20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
