"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowLeft, Search, Plus, ArrowRight } from "lucide-react";
import { PageHeader, Badge } from "@/components/ui";
import { IncidentStatusBadge } from "@/components/badges";
import { IncidentModal } from "@/components/modals";
import { incidents } from "@/lib/data";
import { INCIDENT_TYPE_LABEL, INCIDENT_STATUS_META } from "@/lib/constants";

const sevColor: Record<string, string> = { alta: "bg-rose-50 text-rose-600", media: "bg-amber-50 text-amber-600", baja: "bg-slate-100 text-slate-500" };

export default function IncidenciasPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [newModal, setNewModal] = useState(false);

  const filtered = useMemo(() => incidents.filter((i) => {
    if (q && !`${i.code} ${i.orderCode} ${i.reportedBy} ${INCIDENT_TYPE_LABEL[i.type]}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (status && i.status !== status) return false;
    return true;
  }), [q, status]);

  return (
    <div className="animate-fade-in">
      <Link href="/calidad" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Calidad</Link>
      <PageHeader title="Incidencias" subtitle={`${incidents.length} incidencias registradas`}
        actions={<button onClick={() => setNewModal(true)} className="btn-primary"><Plus size={16} /> Registrar incidencia</button>} />

      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por código, pedido, tipo o responsable…" className="input pl-9" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input max-w-[180px]">
          <option value="">Todos los estados</option>
          {Object.entries(INCIDENT_STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
            <th className="px-5 py-3">Código</th><th className="px-3 py-3">Tipo</th><th className="px-3 py-3">Pedido</th><th className="px-3 py-3">Etapa</th>
            <th className="px-3 py-3">Reportó</th><th className="px-3 py-3">Fecha</th><th className="px-3 py-3">Sev.</th><th className="px-3 py-3">Estado</th><th className="px-5 py-3"></th></tr></thead>
          <tbody className="divide-y divide-ink-50">
            {filtered.map((i) => (
              <tr key={i.id} className="group hover:bg-ink-50/60">
                <td className="px-5 py-3 font-semibold text-ink-800">{i.code}</td>
                <td className="px-3 py-3 text-ink-700">{INCIDENT_TYPE_LABEL[i.type]}</td>
                <td className="px-3 py-3 text-brand-600">{i.orderCode}</td>
                <td className="px-3 py-3 text-ink-500">{i.stage}</td>
                <td className="px-3 py-3 text-ink-500">{i.reportedBy}</td>
                <td className="px-3 py-3 text-ink-400">{i.date.slice(5)}</td>
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
