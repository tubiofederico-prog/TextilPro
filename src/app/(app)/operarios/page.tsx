"use client";
import Link from "next/link";
import { useState } from "react";
import { HardHat, ListChecks, Play, ChevronRight, Users, Scissors, Shirt, Sparkles, Package } from "lucide-react";
import { PageHeader, Avatar } from "@/components/ui";
import { PriorityBadge } from "@/components/badges";
import { operators, orders } from "@/lib/data";

// tasks for the "current operator" (Marta - Costurera, Confección)
const MY_TASKS = [
  { order: "o3", stage: "Confección", product: "Fundas hoteleras premium", qty: 200, priority: "media", icon: Shirt },
  { order: "o14", stage: "Confección", product: "Cubrecamas matrimoniales", qty: 120, priority: "alta", icon: Shirt },
  { order: "o5", stage: "Costura ribetes", product: "Juego de cama a medida", qty: 1, priority: "media", icon: Sparkles },
];

const areaIcon: Record<string, any> = { Corte: Scissors, Confección: Shirt, Bordado: Sparkles, Empaque: Package, Planta: Users, Logística: Package };

export default function OperariosPage() {
  const [view, setView] = useState<"tareas" | "equipo">("tareas");

  return (
    <div className="animate-fade-in">
      <PageHeader title="Panel de Operario" subtitle="Vista simplificada para personal de planta"
        actions={
          <div className="flex rounded-xl border border-ink-200 bg-white p-1">
            <button onClick={() => setView("tareas")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${view === "tareas" ? "bg-brand-600 text-white" : "text-ink-500"}`}>Mis tareas</button>
            <button onClick={() => setView("equipo")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${view === "equipo" ? "bg-brand-600 text-white" : "text-ink-500"}`}>Equipo</button>
          </div>
        } />

      {view === "tareas" && (
        <>
          {/* Operator greeting */}
          <div className="mb-5 flex items-center gap-4 rounded-2xl bg-ink-900 p-5 text-white">
            <Avatar initials="MG" color="bg-rose-500" size="lg" />
            <div className="flex-1">
              <p className="text-lg font-bold">Hola, Marta 👋</p>
              <p className="text-sm text-ink-300">Costurera · Confección · Tenés <strong className="text-white">{MY_TASKS.length} tareas</strong> asignadas hoy</p>
            </div>
            <Link href="/operarios/tareas" className="btn-primary"><ListChecks size={16} /> Ver todas</Link>
          </div>

          {/* Next task highlight */}
          <div className="mb-5 rounded-2xl border-2 border-brand-200 bg-brand-50/50 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">▶ Próxima tarea</p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-2xl font-bold text-ink-900">{MY_TASKS[0].product}</p>
                <p className="mt-1 text-ink-600">Etapa: <strong>{MY_TASKS[0].stage}</strong> · Cantidad: <strong>{MY_TASKS[0].qty} unidades</strong></p>
              </div>
              <Link href={`/operarios/tareas/${MY_TASKS[0].order}`} className="btn-primary px-6 py-3 text-base"><Play size={18} /> Abrir tarea</Link>
            </div>
          </div>

          {/* Task cards */}
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-400">Tareas de hoy</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MY_TASKS.map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.order} href={`/operarios/tareas/${t.order}`}
                  className="group rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon size={24} /></div>
                    <PriorityBadge priority={t.priority as any} />
                  </div>
                  <p className="mt-4 text-lg font-bold text-ink-900">{t.product}</p>
                  <p className="text-sm text-ink-500">{t.stage}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                    <span className="text-sm font-semibold text-ink-700">{t.qty} unidades</span>
                    <span className="flex items-center gap-1 text-sm font-bold text-brand-600">Abrir <ChevronRight size={16} className="transition group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {view === "equipo" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {operators.map((o) => {
            const Icon = areaIcon[o.area] ?? HardHat;
            return (
              <div key={o.id} className="card p-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={o.initials} color={o.avatarColor} size="lg" />
                  <div className="flex-1">
                    <p className="font-bold text-ink-900">{o.name}</p>
                    <p className="text-sm text-ink-500">{o.role}</p>
                  </div>
                  <span className={`chip ${o.active ? "bg-emerald-50 text-emerald-600" : "bg-ink-100 text-ink-400"}`}>{o.active ? "Activo" : "Ausente"}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-ink-100 pt-3 text-center">
                  <div><p className="text-lg font-bold text-ink-900">{o.tasksToday}</p><p className="text-[11px] text-ink-400">Tareas</p></div>
                  <div><p className="text-lg font-bold text-emerald-600">{o.completedToday}</p><p className="text-[11px] text-ink-400">Hechas</p></div>
                  <div><p className="text-lg font-bold text-brand-600">{o.efficiency}%</p><p className="text-[11px] text-ink-400">Eficiencia</p></div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-400"><Icon size={14} /> {o.area}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
