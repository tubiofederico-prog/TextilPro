"use client";
import { useState, useMemo } from "react";
import { Search, Lock, Plus, Check, AlertTriangle } from "lucide-react";
import { PageHeader, Badge, toast, Modal } from "@/components/ui";
import InventoryTabs from "@/components/InventoryTabs";
import { materials } from "@/lib/data";
import { MATERIAL_CAT_LABEL } from "@/lib/constants";
import { MaterialCategory } from "@/lib/types";

export default function MaterialesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [reserveModal, setReserveModal] = useState<string | null>(null);

  const filtered = useMemo(() => materials.filter((m) => {
    if (q && !m.name.toLowerCase().includes(q.toLowerCase()) && !m.supplier.toLowerCase().includes(q.toLowerCase())) return false;
    if (cat && m.category !== cat) return false;
    return true;
  }), [q, cat]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Inventario" subtitle="Detalle de materias primas e insumos"
        actions={<button onClick={() => toast("Alta de material (simulado)", "info")} className="btn-primary"><Plus size={16} /> Nuevo material</button>} />
      <InventoryTabs />

      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar material o proveedor…" className="input pl-9" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="input max-w-[180px]">
          <option value="">Todas las categorías</option>
          {Object.entries(MATERIAL_CAT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-5 py-3">Material</th><th className="px-3 py-3">Categoría</th><th className="px-3 py-3 text-right">Stock</th>
              <th className="px-3 py-3 text-right">Reservado</th><th className="px-3 py-3 text-right">Disponible</th><th className="px-3 py-3 text-right">Mínimo</th>
              <th className="px-3 py-3">Proveedor</th><th className="px-3 py-3">Estado</th><th className="px-5 py-3 text-right">Acción</th></tr></thead>
            <tbody className="divide-y divide-ink-50">
              {filtered.map((m) => {
                const avail = m.stock - m.reserved;
                const critical = avail < m.min;
                const low = avail < m.min * 1.3;
                return (
                  <tr key={m.id} className="hover:bg-ink-50/60">
                    <td className="px-5 py-3"><p className="font-medium text-ink-800">{m.name}</p><p className="text-xs text-ink-400">Últ. mov: {m.lastMovement.slice(5)}</p></td>
                    <td className="px-3 py-3"><Badge className="bg-ink-100 text-ink-500">{MATERIAL_CAT_LABEL[m.category as MaterialCategory]}</Badge></td>
                    <td className="px-3 py-3 text-right font-medium text-ink-700">{m.stock} {m.unit}</td>
                    <td className="px-3 py-3 text-right text-amber-600">{m.reserved > 0 ? <span className="inline-flex items-center gap-1"><Lock size={11} /> {m.reserved}</span> : "—"}</td>
                    <td className={`px-3 py-3 text-right font-bold ${critical ? "text-rose-600" : "text-ink-800"}`}>{avail}</td>
                    <td className="px-3 py-3 text-right text-ink-400">{m.min}</td>
                    <td className="px-3 py-3 text-ink-500">{m.supplier}</td>
                    <td className="px-3 py-3">
                      {critical ? <Badge className="bg-rose-50 text-rose-600"><AlertTriangle size={11} /> Crítico</Badge>
                        : low ? <Badge className="bg-amber-50 text-amber-600">Bajo</Badge>
                        : <Badge className="bg-emerald-50 text-emerald-600"><Check size={11} /> OK</Badge>}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => setReserveModal(m.name)} className="chip bg-brand-50 text-brand-600 hover:bg-brand-100"><Lock size={12} /> Reservar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!reserveModal} onClose={() => setReserveModal(null)} title="Reservar material" size="sm"
        footer={<><button className="btn-outline" onClick={() => setReserveModal(null)}>Cancelar</button>
          <button className="btn-primary" onClick={() => { toast(`Material reservado: ${reserveModal}`); setReserveModal(null); }}>Reservar</button></>}>
        <p className="mb-3 text-sm text-ink-600">Reservar <strong>{reserveModal}</strong> para una orden de producción.</p>
        <label className="label">Cantidad</label><input type="number" className="input mb-3" placeholder="0" />
        <label className="label">Orden asociada</label>
        <select className="input"><option>PED-2026-0142</option><option>PED-2026-0140</option><option>PED-2026-0139</option></select>
      </Modal>
    </div>
  );
}
