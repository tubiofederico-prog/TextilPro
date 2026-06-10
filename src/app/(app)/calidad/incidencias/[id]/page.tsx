"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, AlertTriangle, Image as ImageIcon, CheckCircle2, Truck, FileText, User, Calendar, Layers } from "lucide-react";
import { PageHeader, Badge, toast } from "@/components/ui";
import { IncidentStatusBadge } from "@/components/badges";
import { ConfirmModal } from "@/components/modals";
import { incidents, getOrderByCode } from "@/lib/data";
import { INCIDENT_TYPE_LABEL } from "@/lib/constants";

const sevColor: Record<string, string> = { alta: "bg-rose-50 text-rose-600", media: "bg-amber-50 text-amber-600", baja: "bg-slate-100 text-slate-500" };

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  const inc = incidents.find((i) => i.id === params.id);
  if (!inc) notFound();
  const order = getOrderByCode(inc.orderCode);
  const [resolveModal, setResolveModal] = useState(false);

  return (
    <div className="animate-fade-in">
      <Link href="/calidad/incidencias" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Incidencias</Link>
      <PageHeader title={`${inc.code} · ${INCIDENT_TYPE_LABEL[inc.type]}`} subtitle={`Pedido ${inc.orderCode}`}
        actions={inc.status !== "resuelta" && <button onClick={() => setResolveModal(true)} className="btn-primary"><CheckCircle2 size={16} /> Marcar resuelta</button>} />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <IncidentStatusBadge status={inc.status} />
            <Badge className={sevColor[inc.severity]}>Severidad {inc.severity}</Badge>
            <Badge className="bg-ink-100 text-ink-500"><Layers size={12} /> {inc.stage}</Badge>
          </div>
          <h3 className="font-bold text-ink-900">Descripción</h3>
          <p className="mt-1 text-ink-600">{inc.description}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-ink-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Impacto</p><p className="mt-1 text-sm font-medium text-ink-700">{inc.impact}</p></div>
            <div className="rounded-xl bg-ink-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Etapa de origen</p><p className="mt-1 text-sm font-medium text-ink-700">{inc.stage}</p></div>
          </div>

          {inc.resolution && (
            <div className="mt-5 rounded-xl border-l-4 border-emerald-400 bg-emerald-50 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-800"><CheckCircle2 size={16} /> Resolución</p>
              <p className="mt-1 text-sm text-emerald-700">{inc.resolution}</p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-3 font-bold text-ink-900">Evidencia fotográfica</h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {["bg-rose-200", "bg-amber-200", "bg-slate-200"].map((c, i) => (
                <button key={i} onClick={() => toast("Vista ampliada (simulado)", "info")} className={`grid aspect-square place-items-center rounded-xl ${c}`}><ImageIcon size={24} className="text-white/70" /></button>
              ))}
            </div>
          </div>

          {/* Traceability */}
          <div className="mt-6 rounded-xl border border-ink-100 p-4">
            <p className="mb-2 text-sm font-bold text-ink-800">Trazabilidad</p>
            <p className="text-sm text-ink-600">
              {inc.stage === "Post-entrega"
                ? "⚑ Esta incidencia fue reportada por el cliente luego de la entrega."
                : "⚑ Esta incidencia se originó durante la producción, en la etapa de " + inc.stage + "."}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Detalles</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><User size={15} className="text-ink-400" /><span className="text-ink-400">Reportó:</span><span className="ml-auto font-medium text-ink-700">{inc.reportedBy}</span></div>
              <div className="flex items-center gap-2"><Calendar size={15} className="text-ink-400" /><span className="text-ink-400">Fecha:</span><span className="ml-auto font-medium text-ink-700">{inc.date}</span></div>
              <div className="flex items-center gap-2"><FileText size={15} className="text-ink-400" /><span className="text-ink-400">Pedido:</span><span className="ml-auto font-medium text-brand-600">{inc.orderCode}</span></div>
            </dl>
          </div>
          {order && (
            <div className="card p-5">
              <h3 className="mb-2 font-bold text-ink-900">Pedido relacionado</h3>
              <p className="text-sm text-ink-600">{order.product}</p>
              <p className="text-xs text-ink-400">{order.clientName} · {order.qty} u</p>
              <Link href={`/pedidos/${order.id}`} className="btn-outline mt-3 w-full text-sm"><FileText size={15} /> Ver pedido</Link>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal open={resolveModal} onClose={() => setResolveModal(false)} title="Resolver incidencia"
        message={`¿Marcar ${inc.code} como resuelta? Quedará registrada en el historial de calidad.`}
        confirmLabel="Marcar resuelta" onConfirm={() => toast(`${inc.code} marcada como resuelta`)} />
    </div>
  );
}
