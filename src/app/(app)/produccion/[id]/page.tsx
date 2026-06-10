"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft, Play, Square, AlertTriangle, MessageSquarePlus, UserCog, Flag,
  Check, Circle, Clock, FileText, ChevronRight,
} from "lucide-react";
import { PageHeader, Progress, Badge, toast } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { IncidentModal, PriorityModal, ReassignModal, ObservationModal, ConfirmModal } from "@/components/modals";
import { getOrder } from "@/lib/data";

export default function ProdDetailPage({ params }: { params: { id: string } }) {
  const order = getOrder(params.id);
  if (!order) notFound();
  const [modal, setModal] = useState<string | null>(null);
  const currentEv = order.timeline.find((e) => e.status === "current");

  return (
    <div className="animate-fade-in">
      <Link href="/produccion" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Producción</Link>
      <PageHeader title={`Orden de producción · ${order.code}`} subtitle={`${order.product} · ${order.clientName}`}
        actions={<Link href={`/pedidos/${order.id}`} className="btn-outline"><FileText size={15} /> Ver pedido</Link>} />

      {/* status bar */}
      <div className="card mb-5 flex flex-wrap items-center gap-x-8 gap-y-4 p-5">
        <div><p className="label">Etapa actual</p><StageBadge stage={order.stage} /></div>
        <div><p className="label">Prioridad</p><PriorityBadge priority={order.priority} /></div>
        <div><p className="label">Responsable</p><p className="text-sm font-semibold text-ink-800">{order.responsible}</p></div>
        <div className="min-w-[160px] flex-1"><p className="label">Avance global</p><div className="flex items-center gap-2"><Progress value={order.progress} /><span className="text-sm font-bold">{order.progress}%</span></div></div>
      </div>

      {/* Stage action panel */}
      <div className="mb-5 card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Etapa en curso</p>
            <p className="mt-1 text-lg font-bold text-ink-900">{currentEv?.label ?? "—"}</p>
            {currentEv?.start && <p className="text-sm text-ink-500">Iniciada {currentEv.start} por {currentEv.operator}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {order.stage === "detenido" ? (
              <button onClick={() => setModal("reactivar")} className="btn-primary"><Play size={15} /> Reactivar pedido</button>
            ) : (
              <>
                <button onClick={() => setModal("iniciar")} className="btn-outline"><Play size={15} /> Iniciar etapa</button>
                <button onClick={() => setModal("finalizar")} className="btn-primary"><Check size={15} /> Finalizar etapa</button>
                <button onClick={() => setModal("detener")} className="btn-outline border-rose-200 text-rose-600 hover:bg-rose-50"><Square size={15} /> Detener</button>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4">
          <button onClick={() => setModal("obs")} className="btn-ghost text-sm"><MessageSquarePlus size={15} /> Observación</button>
          <button onClick={() => setModal("incident")} className="btn-ghost text-sm text-amber-600"><AlertTriangle size={15} /> Incidencia</button>
          <button onClick={() => setModal("reassign")} className="btn-ghost text-sm"><UserCog size={15} /> Reasignar</button>
          <button onClick={() => setModal("priority")} className="btn-ghost text-sm"><Flag size={15} /> Prioridad</button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Timeline */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-5 font-bold text-ink-900">Timeline de etapas</h3>
          <ol className="relative ml-3 border-l-2 border-ink-100">
            {order.timeline.map((ev, i) => (
              <li key={i} className="mb-6 ml-6 last:mb-0">
                <span className={`absolute -left-[11px] grid h-5 w-5 place-items-center rounded-full ${
                  ev.status === "done" ? "bg-emerald-500 text-white" : ev.status === "current" ? "bg-brand-600 text-white ring-4 ring-brand-100" : "bg-ink-200 text-ink-400"
                }`}>
                  {ev.status === "done" ? <Check size={12} /> : <Circle size={8} fill={ev.status === "current" ? "white" : "none"} />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <p className={`font-semibold ${ev.status === "pending" ? "text-ink-400" : "text-ink-800"}`}>{ev.label}</p>
                  {ev.status === "current" && <Badge className="bg-brand-50 text-brand-600">En curso</Badge>}
                  {ev.durationH && <Badge className="bg-ink-100 text-ink-500"><Clock size={11} /> {ev.durationH}h</Badge>}
                </div>
                {ev.operator && ev.operator !== "Sin asignar" && (
                  <p className="text-sm text-ink-500">
                    {ev.operator}{ev.start && ` · inicio ${ev.start}`}{ev.end && ` · fin ${ev.end}`}
                  </p>
                )}
                {ev.note && <p className="mt-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm text-amber-700">{ev.note}</p>}
              </li>
            ))}
          </ol>
        </div>

        {/* Side info */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Resumen técnico</h3>
            <dl className="space-y-2.5 text-sm">
              {[["Medidas", order.techSheet.measures], ["Tela", order.techSheet.fabric], ["Color", order.techSheet.color], ["Bordado", order.techSheet.embroidery], ["Cantidad", `${order.qty} u`]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3"><dt className="text-ink-400">{k}</dt><dd className="text-right font-medium text-ink-700">{v}</dd></div>
              ))}
            </dl>
            <Link href={`/pedidos/${order.id}`} className="btn-outline mt-4 w-full text-sm">Ver ficha técnica completa <ChevronRight size={15} /></Link>
          </div>
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Materiales</h3>
            <ul className="space-y-2">
              {order.materials.map((m) => (
                <li key={m.materialId} className="flex items-center justify-between text-sm">
                  <span className="truncate text-ink-600">{m.name}</span>
                  {m.available ? <Check size={15} className="shrink-0 text-emerald-500" /> : <AlertTriangle size={15} className="shrink-0 text-rose-500" />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <IncidentModal open={modal === "incident"} onClose={() => setModal(null)} orderCode={order.code} />
      <PriorityModal open={modal === "priority"} onClose={() => setModal(null)} current={order.priority} />
      <ReassignModal open={modal === "reassign"} onClose={() => setModal(null)} />
      <ObservationModal open={modal === "obs"} onClose={() => setModal(null)} />
      <ConfirmModal open={modal === "iniciar"} onClose={() => setModal(null)} title="Iniciar etapa"
        message={`¿Iniciar la siguiente etapa de ${order.code}? Se registrará la hora de inicio y el responsable.`}
        confirmLabel="Iniciar" onConfirm={() => toast("Etapa iniciada")} />
      <ConfirmModal open={modal === "finalizar"} onClose={() => setModal(null)} title="Finalizar etapa"
        message={`¿Finalizar "${currentEv?.label}"? El pedido avanzará a la siguiente etapa del flujo.`}
        confirmLabel="Finalizar etapa" onConfirm={() => toast("Etapa finalizada — pedido avanzó")} />
      <ConfirmModal open={modal === "detener"} onClose={() => setModal(null)} title="Detener pedido" tone="danger"
        message={`¿Detener ${order.code}? Quedará marcado como incidencia hasta su reactivación.`}
        confirmLabel="Detener" onConfirm={() => toast(`${order.code} detenido`, "error")} />
      <ConfirmModal open={modal === "reactivar"} onClose={() => setModal(null)} title="Reactivar pedido"
        message={`¿Reactivar ${order.code} y devolverlo a la cola de producción?`}
        confirmLabel="Reactivar" onConfirm={() => toast(`${order.code} reactivado`)} />
    </div>
  );
}
