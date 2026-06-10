"use client";
import Link from "next/link";
import { useState } from "react";
import { ShieldAlert, ShieldCheck, Clock, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { PageHeader, StatCard, Badge } from "@/components/ui";
import { IncidentStatusBadge } from "@/components/badges";
import { IncidentModal } from "@/components/modals";
import { Donut, BarsChart } from "@/components/charts";
import { incidents } from "@/lib/data";
import { INCIDENT_TYPE_LABEL } from "@/lib/constants";
import { incidentsByType } from "@/lib/reports";

const sevColor: Record<string, string> = { alta: "bg-rose-50 text-rose-600", media: "bg-amber-50 text-amber-600", baja: "bg-slate-100 text-slate-500" };

export default function CalidadPage() {
  const [newModal, setNewModal] = useState(false);
  const open = incidents.filter((i) => i.status === "abierta" || i.status === "en_revision" || i.status === "escalada");
  const byStage = [
    { etapa: "Corte", n: incidents.filter((i) => i.stage === "Corte").length },
    { etapa: "Confección", n: incidents.filter((i) => i.stage === "Confección").length },
    { etapa: "Bordado", n: incidents.filter((i) => i.stage.includes("Bordado")).length },
    { etapa: "Post-entrega", n: incidents.filter((i) => i.stage === "Post-entrega").length },
    { etapa: "QC", n: incidents.filter((i) => i.stage === "Control calidad").length },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Calidad e Incidencias" subtitle="Control de calidad y trazabilidad de problemas"
        actions={
          <>
            <Link href="/calidad/incidencias" className="btn-outline">Ver todas</Link>
            <button onClick={() => setNewModal(true)} className="btn-primary"><Plus size={16} /> Registrar incidencia</button>
          </>
        } />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Incidencias activas" value={open.length} icon={<ShieldAlert size={20} />} tone="rose" />
        <StatCard label="Resueltas (mes)" value={incidents.filter((i) => i.status === "resuelta").length} icon={<ShieldCheck size={20} />} tone="emerald" />
        <StatCard label="Alta severidad" value={incidents.filter((i) => i.severity === "alta").length} icon={<TrendingUp size={20} />} tone="amber" />
        <StatCard label="Tiempo prom. resolución" value="1.8d" icon={<Clock size={20} />} tone="slate" />
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Incidencias por tipo</h3>
          <div className="mt-3 h-56"><Donut data={incidentsByType} /></div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-bold text-ink-900">Incidencias por etapa</h3>
          <p className="text-xs text-ink-400">Dónde se originan los problemas</p>
          <div className="mt-3 h-56"><BarsChart data={byStage} dataKey="n" xKey="etapa" color="#f43f5e" /></div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h3 className="font-bold text-ink-900">Incidencias activas</h3>
          <Link href="/calidad/incidencias" className="text-sm font-semibold text-brand-600">Ver todas →</Link>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
            <th className="px-5 py-3">Código</th><th className="px-3 py-3">Tipo</th><th className="px-3 py-3">Pedido</th>
            <th className="px-3 py-3">Etapa</th><th className="px-3 py-3">Severidad</th><th className="px-3 py-3">Estado</th><th className="px-5 py-3"></th></tr></thead>
          <tbody className="divide-y divide-ink-50">
            {open.map((i) => (
              <tr key={i.id} className="group hover:bg-ink-50/60">
                <td className="px-5 py-3 font-semibold text-ink-800">{i.code}</td>
                <td className="px-3 py-3 text-ink-700">{INCIDENT_TYPE_LABEL[i.type]}</td>
                <td className="px-3 py-3 text-brand-600">{i.orderCode}</td>
                <td className="px-3 py-3 text-ink-500">{i.stage}</td>
                <td className="px-3 py-3"><Badge className={sevColor[i.severity]}>{i.severity}</Badge></td>
                <td className="px-3 py-3"><IncidentStatusBadge status={i.status} /></td>
                <td className="px-5 py-3 text-right"><Link href={`/calidad/incidencias/${i.id}`} className="text-ink-300 group-hover:text-brand-600"><ArrowRight size={16} /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <IncidentModal open={newModal} onClose={() => setNewModal(false)} />
    </div>
  );
}
