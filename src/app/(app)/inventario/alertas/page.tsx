"use client";
import { AlertTriangle, TrendingDown, ShoppingCart } from "lucide-react";
import { PageHeader, Badge, toast, Progress } from "@/components/ui";
import InventoryTabs from "@/components/InventoryTabs";
import { materials } from "@/lib/data";

export default function AlertasPage() {
  const alerts = materials
    .map((m) => ({ ...m, avail: m.stock - m.reserved }))
    .filter((m) => m.avail < m.min * 1.3)
    .sort((a, b) => a.avail / a.min - b.avail / b.min);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Inventario" subtitle="Alertas de stock y reposición sugerida" />
      <InventoryTabs />

      <div className="mb-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <AlertTriangle size={20} className="text-amber-600" />
        <p className="text-sm text-amber-800"><strong>{alerts.length} materiales</strong> requieren atención. {alerts.filter((a) => a.avail < a.min).length} están en nivel crítico.</p>
      </div>

      <div className="space-y-3">
        {alerts.map((m) => {
          const critical = m.avail < m.min;
          const pct = Math.min(100, (m.avail / m.min) * 100);
          const suggested = Math.max(m.min * 2 - m.avail, m.min);
          return (
            <div key={m.id} className={`card flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${critical ? "border-rose-200" : "border-amber-200"}`}>
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${critical ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"}`}>
                <TrendingDown size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-ink-900">{m.name}</p>
                  {critical ? <Badge className="bg-rose-50 text-rose-600">Crítico</Badge> : <Badge className="bg-amber-50 text-amber-600">Bajo stock</Badge>}
                </div>
                <p className="text-sm text-ink-500">Proveedor: {m.supplier} · Disponible {m.avail} {m.unit} de mínimo {m.min} {m.unit}</p>
                <div className="mt-2 max-w-md">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                    <div className={`h-full rounded-full ${critical ? "bg-rose-500" : "bg-amber-500"}`} style={{ width: `${Math.max(6, pct)}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-ink-400">Reposición sugerida</p>
                  <p className="text-lg font-bold text-ink-900">{suggested} {m.unit}</p>
                </div>
                <button onClick={() => toast(`Orden de compra generada para ${m.name}`)} className="btn-primary"><ShoppingCart size={15} /> Reponer</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
