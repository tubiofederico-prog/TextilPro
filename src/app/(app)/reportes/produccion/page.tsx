"use client";
import { Download } from "lucide-react";
import { PageHeader, StatCard, toast } from "@/components/ui";
import ReportTabs from "@/components/ReportTabs";
import { MultiBars, BarsChart, AreaTrend } from "@/components/charts";
import { monthlyProduction, avgTimePerStage, productionByDay, operatorProductivity } from "@/lib/reports";

export default function ReporteProduccionPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Reportes de Producción" subtitle="Métricas de fabricación, tiempos y productividad"
        actions={<button onClick={() => toast("Exportado (simulado)")} className="btn-outline"><Download size={16} /> Exportar</button>} />
      <ReportTabs />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Terminados (mes)" value={96} tone="emerald" trend={{ value: "+11%", up: true }} />
        <StatCard label="Atrasados" value={4} tone="rose" hint="2.1% del total" />
        <StatCard label="Tiempo prom. ciclo" value="3.2d" tone="brand" trend={{ value: "-0.4d", up: true }} />
        <StatCard label="Eficiencia planta" value="91%" tone="violet" trend={{ value: "+3%", up: true }} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Terminados vs. atrasados</h3>
          <p className="text-xs text-ink-400">Por mes</p>
          <div className="mt-3 h-64"><MultiBars data={monthlyProduction} xKey="mes" keys={[{ k: "terminados", c: "#10b981", n: "Terminados" }, { k: "atrasados", c: "#f43f5e", n: "Atrasados" }]} /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Tiempo promedio por etapa</h3>
          <p className="text-xs text-ink-400">Horas</p>
          <div className="mt-3 h-64"><BarsChart data={avgTimePerStage} dataKey="horas" xKey="etapa" color="#8b5cf6" /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Producción semanal</h3>
          <p className="text-xs text-ink-400">Pedidos ingresados</p>
          <div className="mt-3 h-64"><AreaTrend data={productionByDay} dataKey="pedidos" xKey="day" /></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink-900">Productividad por operario</h3>
          <p className="text-xs text-ink-400">Piezas producidas (mes)</p>
          <div className="mt-3 h-64"><BarsChart data={operatorProductivity} dataKey="piezas" xKey="name" color="#1e66f1" /></div>
        </div>
      </div>
    </div>
  );
}
