"use client";
import { useState } from "react";
import { Modal, toast } from "./ui";
import { operators } from "@/lib/data";
import { AlertTriangle } from "lucide-react";

export function ConfirmModal({
  open, onClose, title, message, confirmLabel = "Confirmar", tone = "primary", onConfirm,
}: {
  open: boolean; onClose: () => void; title: string; message: string;
  confirmLabel?: string; tone?: "primary" | "danger"; onConfirm?: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm"
      footer={
        <>
          <button className="btn-outline" onClick={onClose}>Cancelar</button>
          <button className={tone === "danger" ? "btn-danger" : "btn-primary"} onClick={() => { onConfirm?.(); onClose(); }}>{confirmLabel}</button>
        </>
      }>
      <p className="text-sm text-ink-600">{message}</p>
    </Modal>
  );
}

export function IncidentModal({ open, onClose, orderCode }: { open: boolean; onClose: () => void; orderCode?: string }) {
  return (
    <Modal open={open} onClose={onClose} title="Registrar incidencia"
      footer={
        <>
          <button className="btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn-danger" onClick={() => { toast("Incidencia registrada correctamente"); onClose(); }}>Registrar incidencia</button>
        </>
      }>
      <div className="space-y-3.5">
        {orderCode && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
            <AlertTriangle size={16} /> Pedido asociado: <strong>{orderCode}</strong>
          </div>
        )}
        <div>
          <label className="label">Tipo de incidencia</label>
          <select className="input">
            <option>Tela dañada</option><option>Falta de material</option><option>Error de medida</option>
            <option>Demora en corte</option><option>Demora en confección</option><option>Problema de bordado</option>
            <option>Producto con defecto</option><option>Reclamo de cliente</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">Etapa</label>
            <select className="input"><option>Corte</option><option>Confección</option><option>Bordado</option><option>Empaque</option><option>Post-entrega</option></select>
          </div>
          <div><label className="label">Severidad</label>
            <select className="input"><option>Alta</option><option>Media</option><option>Baja</option></select>
          </div>
        </div>
        <div><label className="label">Descripción</label><textarea className="input" rows={3} placeholder="Describí lo ocurrido…" /></div>
        <div>
          <label className="label">Evidencia (foto)</label>
          <div className="flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-ink-200 text-xs text-ink-400">
            Arrastrá o hacé clic para adjuntar (simulado)
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function PriorityModal({ open, onClose, current = "media" }: { open: boolean; onClose: () => void; current?: string }) {
  const [val, setVal] = useState(current);
  const opts = [
    { v: "urgente", l: "Urgente", c: "border-rose-300 bg-rose-50 text-rose-700" },
    { v: "alta", l: "Alta", c: "border-orange-300 bg-orange-50 text-orange-700" },
    { v: "media", l: "Media", c: "border-blue-300 bg-blue-50 text-blue-700" },
    { v: "baja", l: "Baja", c: "border-slate-300 bg-slate-50 text-slate-700" },
  ];
  return (
    <Modal open={open} onClose={onClose} title="Cambiar prioridad" size="sm"
      footer={<><button className="btn-outline" onClick={onClose}>Cancelar</button>
        <button className="btn-primary" onClick={() => { toast("Prioridad actualizada"); onClose(); }}>Guardar</button></>}>
      <div className="grid grid-cols-2 gap-2">
        {opts.map((o) => (
          <button key={o.v} onClick={() => setVal(o.v)}
            className={`rounded-xl border-2 p-3 text-sm font-semibold transition ${val === o.v ? o.c : "border-ink-200 text-ink-500 hover:border-ink-300"}`}>
            {o.l}
          </button>
        ))}
      </div>
    </Modal>
  );
}

export function ReassignModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sel, setSel] = useState(operators[0].name);
  return (
    <Modal open={open} onClose={onClose} title="Reasignar responsable" size="sm"
      footer={<><button className="btn-outline" onClick={onClose}>Cancelar</button>
        <button className="btn-primary" onClick={() => { toast(`Reasignado a ${sel}`); onClose(); }}>Reasignar</button></>}>
      <label className="label">Seleccionar operario</label>
      <div className="max-h-64 space-y-1.5 overflow-y-auto">
        {operators.filter((o) => o.active).map((o) => (
          <button key={o.id} onClick={() => setSel(o.name)}
            className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition ${sel === o.name ? "border-brand-400 bg-brand-50" : "border-ink-200 hover:bg-ink-50"}`}>
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white ${o.avatarColor}`}>{o.initials}</span>
            <div><p className="text-sm font-semibold text-ink-800">{o.name}</p><p className="text-xs text-ink-400">{o.role} · {o.area}</p></div>
          </button>
        ))}
      </div>
    </Modal>
  );
}

export function ObservationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Registrar observación" size="sm"
      footer={<><button className="btn-outline" onClick={onClose}>Cancelar</button>
        <button className="btn-primary" onClick={() => { toast("Observación registrada"); onClose(); }}>Guardar observación</button></>}>
      <textarea className="input" rows={4} placeholder="Escribí una observación sobre esta etapa o pedido…" />
    </Modal>
  );
}
