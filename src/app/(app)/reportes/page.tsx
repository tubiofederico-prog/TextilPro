"use client";
import { TrendingUp, Box, Factory, AlertTriangle, CheckCircle2, Download, Lightbulb } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import ReportTabs from "@/components/ReportTabs";
import { AreaTrend } from "@/components/charts";
import { insights, monthlyProduction } from "@/lib/reports";

const iconMap: Record<string, any> = { trending: TrendingUp, box: Box, factory: Factory, alert: AlertTriangle, check: CheckCircle2 };
const toneMap: Record<string, string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-600",
  rose: "border-rose-200 bg-rose-50 text-rose-600",
  violet: "border-violet-200 bg-violet-50 text-violet-600",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-600",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

export default function ReportesPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Reportes y Métricas" subtitle="Inteligencia operativa y análisis de planta"
        actions={<button onClick={() => toast("Reporte exportado (simulado)")} className="btn-outline"><Download size={16} /> Exportar</button>} />
      <ReportTabs />

      {/* Intelligence */}
      <div className="mb-6 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6">
        <div className="flex items-center gap-2 text-brand-700">
          <Lightbulb size={20} />
          <h2 className="text-lg font-bold">Inteligencia operativa</h2>
        </div>
        <p className="text-sm text-ink-500">Detección automática de cuellos de botella, demoras y recomendaciones.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((ins, i) => {
            const Icon = iconMap[ins.icon] ?? Lightbulb;
            return (
              <div key={i} className={`rounded-xl border bg-white p-4 ${toneMap[ins.tone]}`}>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white shadow-card"><Icon size={16} /></div>
                  <p className="text-sm font-bold text-ink-800">{ins.title}</p>
                </div>
                <p className="mt-2 text-sm text-ink-600">{ins.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary chart */}
      <div className="card p-5">
        <h3 className="font-bold text-ink-900">Producción mensual</h3>
        <p className="text-xs text-ink-400">Pedidos terminados — últimos 6 meses</p>
        <div className="mt-4 h-72"><AreaTrend data={monthlyProduction} dataKey="terminados" xKey="mes" color="#10b981" /></div>
      </div>
    </div>
  );
}
