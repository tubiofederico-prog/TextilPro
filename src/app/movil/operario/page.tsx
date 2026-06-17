"use client";
import Link from "next/link";
import { ChevronRight, Check, Camera } from "lucide-react";
import { useMovil, STEPS } from "../store";

export default function OperarioPage() {
  const { queue, user } = useMovil();
  const esJefe = user.includes("Jefe");

  return (
    <div className="animate-fade-in space-y-3">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Mis pedidos</h1>
        <p className="text-xs text-ink-500">{esJefe ? "Todos los pedidos en planta" : `Hola ${user.split(" ")[0]}, tocá tu pedido para ver qué hacer`}</p>
      </div>

      <div className="space-y-2.5">
        {queue.map((o) => {
          const next = STEPS[o.done];
          const NextIcon = next?.icon;
          return (
            <Link key={o.id} href={`/movil/operario/${o.id}`}
              className="flex items-center gap-3 rounded-2xl border border-ink-200/60 bg-white p-4 shadow-card transition active:border-brand-300 active:bg-brand-50">
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${next ? "bg-brand-50 text-brand-600" : "bg-emerald-50 text-emerald-600"}`}>
                {next && NextIcon ? <NextIcon size={28} /> : <Check size={28} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold leading-tight text-ink-900">{o.product}</p>
                <p className="truncate text-xs text-ink-500">{o.clientName} · {o.qty} u</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="chip bg-brand-100 text-brand-700">{next ? `Te toca: ${next.label}` : "Terminado"}</span>
                  {o.photos.length > 0 && <span className="inline-flex items-center gap-0.5 text-[11px] text-ink-400"><Camera size={11} /> {o.photos.length}</span>}
                </div>
              </div>
              <ChevronRight size={22} className="shrink-0 text-ink-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
