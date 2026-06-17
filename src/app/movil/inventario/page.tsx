"use client";
import { useMemo, useState } from "react";
import { Search, AlertTriangle, Boxes, PackageCheck } from "lucide-react";
import { materials } from "@/lib/data";
import { MATERIAL_CAT_LABEL } from "@/lib/constants";
import { MaterialCategory } from "@/lib/types";

const CATS: (MaterialCategory | "todos")[] = ["todos", "tela", "toalla", "hilo", "accesorio", "empaque", "insumo"];

export default function InventarioPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<MaterialCategory | "todos">("todos");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return materials.filter((m) =>
      (cat === "todos" || m.category === cat) &&
      (!t || m.name.toLowerCase().includes(t) || m.supplier.toLowerCase().includes(t))
    );
  }, [q, cat]);

  const low = materials.filter((m) => m.stock < m.min).length;

  return (
    <div className="animate-fade-in space-y-3">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Inventario</h1>
        <p className="text-xs text-ink-500">Materiales, stock y alertas de mínimo.</p>
      </div>

      <div className="flex gap-2 text-center">
        <div className="flex-1 rounded-xl bg-white p-2.5 shadow-card">
          <p className="text-2xl font-bold text-ink-900">{materials.length}</p>
          <p className="text-[10px] font-semibold uppercase text-ink-400">Materiales</p>
        </div>
        <div className="flex-1 rounded-xl bg-white p-2.5 shadow-card">
          <p className="text-2xl font-bold text-rose-600">{low}</p>
          <p className="text-[10px] font-semibold uppercase text-ink-400">Bajo mínimo</p>
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Material o proveedor…" className="input pl-9" />
      </div>

      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              cat === c ? "bg-brand-600 text-white" : "bg-white text-ink-500 ring-1 ring-ink-200"
            }`}>
            {c === "todos" ? "Todos" : MATERIAL_CAT_LABEL[c]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {list.map((m) => {
          const isLow = m.stock < m.min;
          const pct = Math.min(100, Math.round((m.stock / (m.min * 2)) * 100));
          const available = m.stock - m.reserved;
          return (
            <div key={m.id} className={`rounded-2xl border p-3.5 shadow-card ${isLow ? "border-rose-200 bg-rose-50" : "border-ink-200/60 bg-white"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink-900">{m.name}</p>
                  <p className="text-[11px] text-ink-500">{MATERIAL_CAT_LABEL[m.category]} · {m.supplier}</p>
                </div>
                {isLow ? (
                  <span className="chip shrink-0 bg-rose-100 text-rose-700"><AlertTriangle size={11} /> bajo</span>
                ) : (
                  <span className="chip shrink-0 bg-emerald-100 text-emerald-700"><PackageCheck size={11} /> ok</span>
                )}
              </div>
              <div className="mt-2 flex items-end justify-between text-xs">
                <span className="text-ink-500">Disponible: <span className="font-bold text-ink-800">{available} {m.unit}</span></span>
                <span className="text-ink-400">mín {m.min} · res {m.reserved}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink-100">
                <div className={`h-full rounded-full ${isLow ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <p className="rounded-2xl border border-dashed border-ink-200 bg-white py-8 text-center text-sm text-ink-400">
            <Boxes size={24} className="mx-auto mb-2 text-ink-300" /> Sin materiales
          </p>
        )}
      </div>
    </div>
  );
}
