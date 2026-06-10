"use client";
import { Download } from "lucide-react";
import { PageHeader, StatCard, Progress, toast } from "@/components/ui";
import ReportTabs from "@/components/ReportTabs";
import { AreaTrend, Donut } from "@/components/charts";
import { materialConsumption } from "@/lib/reports";
import { materials } from "@/lib/data";
import { MATERIAL_CAT_LABEL } from "@/lib/constants";

export default function ReporteInventarioPage() {
  const catData = Object.entries(MATERIAL_CAT_LABEL).map(([k, label], i) => ({
    name: label,
    value: materials.filter((m) => m.category === k).reduce((s, m) => s + m.stock * m.costPerUnit, 0),
    color: ["#1e66f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#64748b"][i],
  })).filter((c) => c.value > 0);

  const topConsumed = [...materials].sort((a, b) => b.reserved - a.reserved).slice(0, 6);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Reportes de Inventario" subtitle="Consumo de materiales y valorización de stock"
        actions={<button onClick={() => toast("Exportado (simulado)")} className="btn-outline"><Download size={16} /> Exportar</button>} />
      <ReportTabs />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Consumo (mes)" value="980m" tone="brand" />
        <StatCard label="Valor stock" value={`$${(materials.reduce((s, m) => s + m.stock * m.costPerUnit, 0) / 1000).toFixed(1)}k`} tone="emerald" />
        <StatCard label="Materiales críticos" value={materials.filter((m) => m.stock - m.reserved < m.min).length} tone="rose" />
        <StatCard label="Rotación prom." value="2.4x" tone="violet" hint="mensual" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-bold text-ink-900">Consumo de materiales</h3>
          <p className="text-xs text-ink-400">Metros equivalentes — últimos 6 meses</p>
          <div className="mt-3 h-64"><AreaTrend data={materialConsumption} dataKey="consumo" xKey="mes" color="#06b6d4" /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Valor por categoría</h3>
          <div className="mt-3 h-64"><Donut data={catData} /></div>
        </div>
      </div>

      <div className="card mt-5 p-5">
        <h3 className="mb-4 font-bold text-ink-900">Materiales más consumidos / reservados</h3>
        <div className="space-y-3">
          {topConsumed.map((m) => (
            <div key={m.id}>
              <div className="mb-1 flex justify-between text-sm"><span className="font-medium text-ink-700">{m.name}</span><span className="font-semibold text-ink-500">{m.reserved} {m.unit}</span></div>
              <Progress value={(m.reserved / Math.max(...topConsumed.map((x) => x.reserved))) * 100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
