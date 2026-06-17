"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowLeft, Check, Ruler, Scissors, Package, Camera, Image as ImageIcon,
  Copy, Clock, AlertTriangle,
} from "lucide-react";
import { toast } from "@/components/ui";
import { useMovil, STEPS } from "../../store";

export default function OperarioDetail({ params }: { params: { id: string } }) {
  const { allOrders, completeStep, addPhoto, repeatOrder, user } = useMovil();
  const router = useRouter();
  const order = allOrders.find((o) => o.id === params.id);
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirm, setConfirm] = useState(false);
  if (!order) notFound();

  const next = STEPS[order.done];
  const NextIcon = next?.icon;
  const done = !next;

  const onFinish = () => {
    completeStep(order.id);
    toast(`${next?.verb ?? "Listo"} — registrado a ${user.split(" (")[0]} ✓`);
    setConfirm(false);
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    addPhoto(order.id, url, f.name.length > 22 ? f.name.slice(0, 22) + "…" : f.name);
    toast("Foto del diseño guardada en el pedido 📷");
    e.target.value = "";
  };

  const onRepeat = () => {
    const id = repeatOrder(order.id);
    toast("Pedido repetido idéntico — quedó primero en la cola");
    if (id) router.push(`/movil/operario/${id}`);
  };

  return (
    <div className="animate-fade-in space-y-4">
      <Link href="/movil/operario" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400"><ArrowLeft size={15} /> Mis pedidos</Link>

      {/* header */}
      <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 p-5 text-white">
        <p className="text-xs font-medium text-brand-300">{order.code} · {order.clientName}</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">{order.product}</h1>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/10 px-3 py-2"><p className="text-[10px] text-ink-300">Cantidad</p><p className="text-lg font-bold">{order.qty} u</p></div>
          <div className="rounded-xl bg-white/10 px-3 py-2"><p className="text-[10px] text-ink-300">Color</p><p className="truncate text-lg font-bold">{order.techSheet.color}</p></div>
          <div className="rounded-xl bg-white/10 px-3 py-2"><p className="text-[10px] text-ink-300">Entrega</p><p className="text-lg font-bold">{order.dueDate.slice(5)}</p></div>
        </div>
      </div>

      {/* botón gigante */}
      {!done ? (
        !confirm ? (
          <button onClick={() => setConfirm(true)}
            className="flex w-full flex-col items-center justify-center gap-1 rounded-3xl bg-emerald-600 py-7 text-white transition active:bg-emerald-700">
            {NextIcon && <NextIcon size={36} />}
            <span className="text-2xl font-bold">Terminé el {next.label.toLowerCase()}</span>
            <span className="text-sm font-medium text-emerald-100">Tocá el botón verde cuando termines</span>
          </button>
        ) : (
          <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-5 text-center">
            <p className="text-lg font-bold text-ink-900">¿Terminaste el {next.label.toLowerCase()}?</p>
            <p className="mt-1 text-sm text-ink-500">Se registra a tu nombre con fecha y hora.</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setConfirm(false)} className="flex-1 rounded-xl bg-white py-3 font-bold text-ink-600 ring-1 ring-ink-200">No</button>
              <button onClick={onFinish} className="flex-1 rounded-xl bg-emerald-600 py-3 font-bold text-white">Sí, terminé</button>
            </div>
          </div>
        )
      ) : (
        <div className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-100 py-7 text-emerald-700">
          <Check size={32} /> <span className="text-xl font-bold">Pedido entregado</span>
        </div>
      )}

      {/* instrucciones */}
      <div className="rounded-2xl border border-ink-200/60 bg-white p-4">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-ink-900"><Scissors size={18} className="text-brand-600" /> Instrucciones</h3>
        <div className="space-y-2.5">
          {[
            { icon: Ruler, t: "Medidas", d: order.techSheet.measures },
            { icon: Scissors, t: "Confección", d: order.techSheet.sewInstructions },
            { icon: Package, t: "Acabado", d: order.techSheet.finish },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.t} className="flex gap-2.5 rounded-xl bg-ink-50 p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-600"><Icon size={18} /></div>
                <div><p className="text-sm font-bold text-ink-800">{s.t}</p><p className="text-sm text-ink-600">{s.d}</p></div>
              </div>
            );
          })}
          {order.techSheet.specialNotes && (
            <div className="flex gap-2 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-3">
              <AlertTriangle size={18} className="shrink-0 text-amber-600" />
              <p className="text-sm text-amber-700"><span className="font-bold">Atención: </span>{order.techSheet.specialNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* foto del diseño / lienzo */}
      <div className="rounded-2xl border border-ink-200/60 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-bold text-ink-900"><ImageIcon size={18} className="text-brand-600" /> Diseño / lienzo</h3>
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white">
            <Camera size={14} /> Sacar foto
          </button>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onPhoto} />
        </div>
        <p className="mb-2 text-[11px] text-ink-400">Sacá foto al lienzo o diseño para dejar registrado color y dibujos.</p>
        <div className="grid grid-cols-3 gap-2">
          {order.photos.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border border-ink-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.label} className="aspect-square w-full object-cover" />
              <p className="truncate bg-white px-1.5 py-1 text-[9px] text-ink-500">{p.at.split(" · ")[1] ?? p.label}</p>
            </div>
          ))}
          {order.attachments.slice(0, Math.max(0, 3 - order.photos.length)).map((a) => (
            <div key={a.id} className="overflow-hidden rounded-xl border border-ink-100">
              <div className={`flex aspect-square items-center justify-center ${a.color}`}><ImageIcon size={22} className="text-white/70" /></div>
              <p className="truncate bg-white px-1.5 py-1 text-center text-[9px] capitalize text-ink-500">{a.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* repetir idéntico */}
      <button onClick={onRepeat}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white py-3.5 font-bold text-ink-700 transition active:bg-ink-50">
        <Copy size={18} className="text-brand-600" /> Repetir este pedido idéntico
      </button>
    </div>
  );
}
