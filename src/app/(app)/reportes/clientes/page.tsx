"use client";
import { Download } from "lucide-react";
import { PageHeader, StatCard, Progress, toast } from "@/components/ui";
import ReportTabs from "@/components/ReportTabs";
import { BarsChart, Donut } from "@/components/charts";
import { topClients, topProducts } from "@/lib/reports";
import { clients } from "@/lib/data";

export default function ReporteClientesPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Reportes de Clientes" subtitle="Análisis comercial y productos más fabricados"
        actions={<button onClick={() => toast("Exportado (simulado)")} className="btn-outline"><Download size={16} /> Exportar</button>} />
      <ReportTabs />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Clientes activos" value={clients.filter((c) => c.activeOrders > 0).length} tone="brand" />
        <StatCard label="Ticket promedio" value="$4.8k" tone="emerald" />
        <StatCard label="Recurrencia" value="68%" tone="violet" hint="repiten compra" />
        <StatCard label="Cliente top" value="GHN" tone="amber" hint="67 pedidos" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-bold text-ink-900">Clientes con más pedidos</h3>
          <div className="mt-3 h-64"><BarsChart data={topClients} dataKey="pedidos" xKey="name" color="#1e66f1" /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Productos más fabricados</h3>
          <div className="mt-3 h-64"><Donut data={topProducts} /></div>
        </div>
      </div>

      <div className="card mt-5 overflow-hidden">
        <div className="border-b border-ink-100 px-5 py-4"><h3 className="font-bold text-ink-900">Ranking de clientes por valor histórico</h3></div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-ink-50">
            {[...clients].sort((a, b) => b.lifetimeValue - a.lifetimeValue).map((c, i) => (
              <tr key={c.id} className="hover:bg-ink-50/60">
                <td className="px-5 py-3 w-10"><span className="grid h-6 w-6 place-items-center rounded-lg bg-ink-900 text-xs font-bold text-white">{i + 1}</span></td>
                <td className="px-3 py-3"><p className="font-medium text-ink-800">{c.company}</p><p className="text-xs text-ink-400">{c.totalOrders} pedidos</p></td>
                <td className="px-3 py-3 w-1/3"><Progress value={(c.lifetimeValue / 421000) * 100} /></td>
                <td className="px-5 py-3 text-right font-bold text-ink-800">${(c.lifetimeValue / 1000).toFixed(1)}k</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
