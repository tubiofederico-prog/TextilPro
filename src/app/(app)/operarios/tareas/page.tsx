"use client";
import Link from "next/link";
import { ArrowLeft, Play, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { PriorityBadge } from "@/components/badges";

const TASKS = [
  { id: "o3", product: "Fundas hoteleras premium", stage: "Confección", qty: 200, priority: "media", state: "pendiente", client: "Hotel Central" },
  { id: "o14", product: "Cubrecamas matrimoniales", stage: "Confección", qty: 120, priority: "alta", state: "en_curso", client: "Grupo Hospedaje Norte" },
  { id: "o5", product: "Juego de cama a medida", stage: "Costura ribetes", qty: 1, priority: "media", state: "pendiente", client: "Cliente Particular Premium" },
  { id: "o11", product: "Fundas decorativas vivo dorado", stage: "Confección", qty: 80, priority: "media", state: "terminada", client: "Hotel Vista Mar" },
];

const stateMeta: Record<string, { label: string; cls: string }> = {
  pendiente: { label: "Pendiente", cls: "bg-ink-100 text-ink-500" },
  en_curso: { label: "En curso", cls: "bg-brand-50 text-brand-600" },
  terminada: { label: "Terminada", cls: "bg-emerald-50 text-emerald-600" },
};

export default function TareasPage() {
  return (
    <div className="animate-fade-in">
      <Link href="/operarios" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Panel</Link>
      <PageHeader title="Mis tareas" subtitle="Costurera · Confección" />

      <div className="space-y-3">
        {TASKS.map((t) => {
          const s = stateMeta[t.state];
          return (
            <Link key={t.id} href={`/operarios/tareas/${t.id}`}
              className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-soft">
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${t.state === "terminada" ? "bg-emerald-50 text-emerald-500" : t.state === "en_curso" ? "bg-brand-50 text-brand-600" : "bg-ink-100 text-ink-400"}`}>
                {t.state === "terminada" ? <CheckCircle2 size={26} /> : t.state === "en_curso" ? <Clock size={26} /> : <Play size={24} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-bold text-ink-900">{t.product}</p>
                  <span className={`chip ${s.cls}`}>{s.label}</span>
                </div>
                <p className="text-sm text-ink-500">{t.stage} · {t.client} · {t.qty} unidades</p>
              </div>
              <PriorityBadge priority={t.priority as any} />
              <ChevronRight size={20} className="shrink-0 text-ink-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
