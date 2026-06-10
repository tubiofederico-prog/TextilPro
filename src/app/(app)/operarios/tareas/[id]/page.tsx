"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft, Play, CheckCircle2, AlertTriangle, Camera, MessageSquarePlus,
  Ruler, Scissors, Image as ImageIcon, Package,
} from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import { IncidentModal, ObservationModal, ConfirmModal } from "@/components/modals";
import { getOrder } from "@/lib/data";

export default function TareaDetailPage({ params }: { params: { id: string } }) {
  const order = getOrder(params.id);
  if (!order) notFound();
  const [started, setStarted] = useState(order.stage === "en_confeccion");
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div className="animate-fade-in mx-auto max-w-3xl">
      <Link href="/operarios/tareas" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Mis tareas</Link>

      {/* Big header */}
      <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 p-6 text-white">
        <p className="text-sm font-medium text-brand-300">{order.code} · {order.clientName}</p>
        <h1 className="mt-1 text-3xl font-bold">{order.product}</h1>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="rounded-xl bg-white/10 px-4 py-2.5"><p className="text-xs text-ink-300">Cantidad</p><p className="text-xl font-bold">{order.qty} u</p></div>
          <div className="rounded-xl bg-white/10 px-4 py-2.5"><p className="text-xs text-ink-300">Medidas</p><p className="text-xl font-bold">{order.techSheet.measures.split(" ").slice(0, 3).join(" ")}</p></div>
          <div className="rounded-xl bg-white/10 px-4 py-2.5"><p className="text-xs text-ink-300">Color</p><p className="text-xl font-bold">{order.techSheet.color}</p></div>
        </div>
      </div>

      {/* Action button big */}
      <div className="my-5">
        {!started ? (
          <button onClick={() => { setStarted(true); toast("Tarea iniciada — ¡a trabajar!"); }}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-600 py-6 text-2xl font-bold text-white transition hover:bg-brand-700">
            <Play size={30} /> Iniciar tarea
          </button>
        ) : (
          <button onClick={() => setModal("terminar")}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-6 text-2xl font-bold text-white transition hover:bg-emerald-700">
            <CheckCircle2 size={30} /> Marcar como terminada
          </button>
        )}
        {started && <p className="mt-2 text-center text-sm font-medium text-brand-600">● Tarea en curso — tomá tu tiempo</p>}
      </div>

      {/* Instructions */}
      <div className="card mb-5 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink-900"><Scissors size={20} className="text-brand-600" /> Instrucciones</h3>
        <div className="space-y-4">
          {[
            { icon: Ruler, t: "Medidas exactas", d: order.techSheet.measures },
            { icon: Scissors, t: "Confección", d: order.techSheet.sewInstructions },
            { icon: Package, t: "Acabado", d: order.techSheet.finish },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.t} className="flex gap-3 rounded-xl bg-ink-50 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand-600"><Icon size={20} /></div>
                <div><p className="font-bold text-ink-800">{s.t}</p><p className="text-ink-600">{s.d}</p></div>
              </div>
            );
          })}
          {order.techSheet.specialNotes && (
            <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4">
              <p className="font-bold text-amber-800">⚠ Atención especial</p>
              <p className="text-amber-700">{order.techSheet.specialNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reference images */}
      <div className="card mb-5 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink-900"><ImageIcon size={20} className="text-brand-600" /> Imágenes de referencia</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {order.attachments.map((a) => (
            <div key={a.id} className="overflow-hidden rounded-xl border border-ink-100">
              <div className={`flex aspect-square items-center justify-center ${a.color}`}><ImageIcon size={28} className="text-white/70" /></div>
              <p className="bg-white p-2 text-center text-xs font-medium capitalize text-ink-600">{a.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary actions */}
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setModal("obs")} className="flex flex-col items-center gap-2 rounded-2xl border border-ink-200 bg-white py-5 font-semibold text-ink-700 transition hover:bg-ink-50">
          <MessageSquarePlus size={26} className="text-ink-500" /> Observación
        </button>
        <button onClick={() => setModal("incident")} className="flex flex-col items-center gap-2 rounded-2xl border border-rose-200 bg-white py-5 font-semibold text-rose-600 transition hover:bg-rose-50">
          <AlertTriangle size={26} /> Reportar problema
        </button>
        <button onClick={() => toast("Foto adjuntada (simulado)")} className="flex flex-col items-center gap-2 rounded-2xl border border-ink-200 bg-white py-5 font-semibold text-ink-700 transition hover:bg-ink-50">
          <Camera size={26} className="text-ink-500" /> Adjuntar foto
        </button>
      </div>

      <ObservationModal open={modal === "obs"} onClose={() => setModal(null)} />
      <IncidentModal open={modal === "incident"} onClose={() => setModal(null)} orderCode={order.code} />
      <ConfirmModal open={modal === "terminar"} onClose={() => setModal(null)} title="Terminar tarea"
        message="¿Confirmás que terminaste esta tarea? Se notificará al supervisor y avanzará el pedido."
        confirmLabel="Sí, terminé" onConfirm={() => toast("¡Tarea completada! 🎉")} />
    </div>
  );
}
