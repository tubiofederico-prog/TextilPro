"use client";
import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Pencil, Copy, Send, Flag, UserCog, AlertTriangle, FileText,
  Boxes, Image as ImageIcon, Clock, Check, CheckCircle2, Circle, MessageSquarePlus,
  Building2, Calendar, User, Layers, ExternalLink, X, FileStack,
} from "lucide-react";
import { PageHeader, Progress, Badge, toast, Modal } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { IncidentModal, PriorityModal, ReassignModal, ConfirmModal } from "@/components/modals";
import { getOrder, getClient } from "@/lib/data";

const TABS = [
  { id: "resumen", label: "Resumen", icon: FileText },
  { id: "ficha", label: "Ficha técnica", icon: FileStack },
  { id: "materiales", label: "Materiales", icon: Boxes },
  { id: "adjuntos", label: "Adjuntos", icon: ImageIcon },
  { id: "historial", label: "Historial", icon: Clock },
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = getOrder(params.id);
  if (!order) notFound();
  const client = getClient(order.clientId);
  const [tab, setTab] = useState("resumen");
  const [modal, setModal] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <Link href="/pedidos" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Pedidos</Link>

      <PageHeader
        title={order.code}
        subtitle={`${order.product} · ${order.clientName}`}
        actions={
          <>
            <Link href={`/pedidos/${order.id}/editar`} className="btn-outline"><Pencil size={15} /> Editar</Link>
            <Link href={`/pedidos/nuevo?duplicar=${order.id}`} className="btn-outline"><Copy size={15} /> Duplicar</Link>
            <button onClick={() => setModal("send")} className="btn-primary"><Send size={15} /> Enviar a producción</button>
          </>
        }
      />

      {/* Top status strip */}
      <div className="card mb-5 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="label">Estado actual</p>
          <StageBadge stage={order.stage} />
        </div>
        <div>
          <p className="label">Prioridad</p>
          <div className="flex items-center gap-2"><PriorityBadge priority={order.priority} />
            <button onClick={() => setModal("priority")} className="text-xs font-semibold text-brand-600">Cambiar</button></div>
        </div>
        <div>
          <p className="label">Responsable</p>
          <div className="flex items-center gap-2"><span className="text-sm font-semibold text-ink-800">{order.responsible}</span>
            <button onClick={() => setModal("reassign")} className="text-xs font-semibold text-brand-600">Reasignar</button></div>
        </div>
        <div>
          <p className="label">Avance</p>
          <div className="flex items-center gap-2"><Progress value={order.progress} className="flex-1" /><span className="text-sm font-bold text-ink-800">{order.progress}%</span></div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button onClick={() => setModal("incident")} className="btn-outline text-rose-600 border-rose-200 hover:bg-rose-50"><AlertTriangle size={15} /> Registrar incidencia</button>
        <button onClick={() => setModal("priority")} className="btn-outline"><Flag size={15} /> Cambiar prioridad</button>
        <button onClick={() => setModal("reassign")} className="btn-outline"><UserCog size={15} /> Reasignar</button>
        <Link href={`/produccion/${order.id}`} className="btn-outline"><Layers size={15} /> Ver en producción</Link>
        {client && <Link href={`/clientes/${client.id}`} className="btn-outline"><Building2 size={15} /> Ver cliente</Link>}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-ink-200">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                tab === t.id ? "border-brand-600 text-brand-700" : "border-transparent text-ink-400 hover:text-ink-700"
              }`}>
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Resumen */}
      {tab === "resumen" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="card p-5 lg:col-span-2">
            <h3 className="mb-4 font-bold text-ink-900">Datos del pedido</h3>
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {[
                ["Cliente", order.clientName], ["Producto", order.product], ["Categoría", order.category],
                ["Cantidad", `${order.qty} unidades`], ["Fecha de ingreso", order.createdAt], ["Entrega estimada", order.dueDate],
                ["Responsable comercial", order.salesperson], ["Responsable actual", order.responsible],
              ].map(([k, v]) => (
                <div key={k}><dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{k}</dt><dd className="mt-0.5 text-sm font-medium text-ink-800">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-5 border-t border-ink-100 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Observaciones internas</p>
              <p className="mt-1 text-sm text-ink-600">{order.internalNotes}</p>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Cliente</h3>
            {client && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Building2 size={20} /></div>
                  <div><p className="font-semibold text-ink-800">{client.company}</p><p className="text-xs text-ink-400">{client.name}</p></div>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-400">Teléfono</dt><dd className="font-medium text-ink-700">{client.phone}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-400">Email</dt><dd className="font-medium text-ink-700 truncate ml-2">{client.email}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-400">Pedidos totales</dt><dd className="font-medium text-ink-700">{client.totalOrders}</dd></div>
                </dl>
                <Link href={`/clientes/${client.id}`} className="btn-outline mt-4 w-full"><ExternalLink size={15} /> Ver ficha completa</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ficha técnica */}
      {tab === "ficha" && (
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ink-900">Ficha técnica del producto</h3>
              <p className="text-xs text-ink-400">Especificación completa — reproducible en futuros pedidos</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-emerald-50 text-emerald-600">v2 · actual</Badge>
              <Link href={`/pedidos/nuevo?duplicar=${order.id}`} className="btn-primary text-sm"><Copy size={15} /> Usar como plantilla</Link>
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Producto fabricado", order.product], ["Medidas exactas", order.techSheet.measures],
              ["Tipo de tela", order.techSheet.fabric], ["Color", order.techSheet.color],
              ["Diseño", order.techSheet.design], ["Bordado", order.techSheet.embroidery],
              ["Acabado", order.techSheet.finish],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-ink-50 p-3.5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">{v}</dd>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[["Instrucciones de corte", order.techSheet.cutInstructions], ["Instrucciones de confección", order.techSheet.sewInstructions], ["Instrucciones de empaque", order.techSheet.packInstructions]].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-ink-100 p-4">
                <p className="text-sm font-bold text-ink-800">{k}</p>
                <p className="mt-1 text-sm text-ink-600">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="text-sm font-bold text-amber-800">Observaciones especiales</p>
            <p className="mt-0.5 text-sm text-amber-700">{order.techSheet.specialNotes}</p>
          </div>
          <div className="mt-6 border-t border-ink-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Versiones anteriores</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className="bg-ink-100 text-ink-500">v1 · 2024-03 (medidas previas)</Badge>
              <Badge className="bg-emerald-50 text-emerald-600">v2 · 2026-06 (actual)</Badge>
            </div>
          </div>
        </div>
      )}

      {/* Materiales */}
      {tab === "materiales" && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <h3 className="font-bold text-ink-900">Materiales requeridos</h3>
            <Link href="/inventario/materiales" className="text-sm font-semibold text-brand-600">Ver inventario →</Link>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-5 py-3">Material</th><th className="px-3 py-3">Cantidad</th><th className="px-5 py-3 text-right">Disponibilidad</th></tr></thead>
            <tbody className="divide-y divide-ink-50">
              {order.materials.map((m) => (
                <tr key={m.materialId} className="hover:bg-ink-50/60">
                  <td className="px-5 py-3 font-medium text-ink-800">{m.name}</td>
                  <td className="px-3 py-3 text-ink-600">{m.qty} {m.unit}</td>
                  <td className="px-5 py-3 text-right">
                    {m.available
                      ? <Badge className="bg-emerald-50 text-emerald-600"><Check size={13} /> Disponible</Badge>
                      : <Badge className="bg-rose-50 text-rose-600"><AlertTriangle size={13} /> Falta material</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold ${order.materials.every((m) => m.available) ? "text-emerald-700" : "text-rose-700"}`}>
            {order.materials.every((m) => m.available)
              ? <><CheckCircle2 size={18} /> Puede producirse — todos los materiales disponibles</>
              : <><AlertTriangle size={18} /> No puede producirse aún — falta material reservado</>}
          </div>
        </div>
      )}

      {/* Adjuntos */}
      {tab === "adjuntos" && (
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-ink-900">Galería del pedido</h3>
            <button onClick={() => toast("Subida simulada de archivo", "info")} className="btn-outline text-sm"><ImageIcon size={15} /> Subir archivo</button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {order.attachments.map((a) => (
              <button key={a.id} onClick={() => setLightbox(a.name)} className="group overflow-hidden rounded-xl border border-ink-100 text-left">
                <div className={`flex aspect-[4/3] items-center justify-center ${a.color}`}><ImageIcon size={28} className="text-white/70" /></div>
                <div className="p-2.5">
                  <Badge className="bg-ink-100 text-ink-500 capitalize">{a.type}</Badge>
                  <p className="mt-1 truncate text-xs font-medium text-ink-700">{a.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Historial */}
      {tab === "historial" && (
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-bold text-ink-900">Línea de tiempo del pedido</h3>
            <button onClick={() => setModal("obs")} className="btn-outline text-sm"><MessageSquarePlus size={15} /> Registrar observación</button>
          </div>
          <ol className="relative ml-3 border-l-2 border-ink-100">
            {order.timeline.map((ev, i) => (
              <li key={i} className="mb-6 ml-6 last:mb-0">
                <span className={`absolute -left-[11px] grid h-5 w-5 place-items-center rounded-full ${
                  ev.status === "done" ? "bg-emerald-500 text-white" : ev.status === "current" ? "bg-brand-600 text-white ring-4 ring-brand-100" : "bg-ink-200 text-ink-400"
                }`}>
                  {ev.status === "done" ? <Check size={12} /> : ev.status === "current" ? <Circle size={8} fill="white" /> : <Circle size={8} />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <p className={`font-semibold ${ev.status === "pending" ? "text-ink-400" : "text-ink-800"}`}>{ev.label}</p>
                  {ev.status === "current" && <Badge className="bg-brand-50 text-brand-600">En curso</Badge>}
                </div>
                {ev.operator && <p className="text-sm text-ink-500">{ev.operator}{ev.start && ` · ${ev.start}`}{ev.end && ` → ${ev.end}`}{ev.durationH && ` (${ev.durationH}h)`}</p>}
                {ev.note && <p className="mt-1 text-sm text-amber-700">{ev.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Modals */}
      <IncidentModal open={modal === "incident"} onClose={() => setModal(null)} orderCode={order.code} />
      <PriorityModal open={modal === "priority"} onClose={() => setModal(null)} current={order.priority} />
      <ReassignModal open={modal === "reassign"} onClose={() => setModal(null)} />
      <ConfirmModal open={modal === "send"} onClose={() => setModal(null)} title="Enviar a producción"
        message={`¿Enviar ${order.code} a producción? Se reservarán los materiales y se sumará a la cola priorizada.`}
        confirmLabel="Enviar a producción" onConfirm={() => toast(`${order.code} enviado a producción`)} />
      <Modal open={modal === "obs"} onClose={() => setModal(null)} title="Registrar observación" size="sm"
        footer={<><button className="btn-outline" onClick={() => setModal(null)}>Cancelar</button>
          <button className="btn-primary" onClick={() => { toast("Observación registrada"); setModal(null); }}>Guardar</button></>}>
        <textarea className="input" rows={4} placeholder="Escribí tu observación…" />
      </Modal>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/70 p-6 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="relative max-w-2xl">
            <button onClick={() => setLightbox(null)} className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-ink-700 shadow-pop"><X size={18} /></button>
            <div className="flex aspect-video w-[600px] max-w-full items-center justify-center rounded-2xl bg-gradient-to-br from-ink-200 to-ink-300"><ImageIcon size={48} className="text-white/70" /></div>
            <p className="mt-3 text-center text-sm font-medium text-white">{lightbox}</p>
          </div>
        </div>
      )}
    </div>
  );
}
