"use client";
import { GripVertical, Plus, Clock } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import ConfigTabs, { Toggle } from "@/components/ConfigTabs";

const STAGES = [
  { name: "Pedido recibido", area: "Comercial", avg: "0.5h", on: true, dot: "bg-slate-400" },
  { name: "Pendiente de materiales", area: "Logística", avg: "—", on: true, dot: "bg-amber-500" },
  { name: "Corte", area: "Corte", avg: "4.2h", on: true, dot: "bg-blue-500" },
  { name: "Confección", area: "Confección", avg: "8.6h", on: true, dot: "bg-indigo-500" },
  { name: "Bordado", area: "Bordado", avg: "6.1h", on: true, dot: "bg-violet-500" },
  { name: "Empaque", area: "Empaque", avg: "2.3h", on: true, dot: "bg-cyan-500" },
  { name: "Listo para entrega", area: "Despacho", avg: "1.1h", on: true, dot: "bg-emerald-500" },
  { name: "Control de calidad final", area: "Supervisión", avg: "1.5h", on: false, dot: "bg-pink-500" },
];

export default function EtapasPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Configuración" subtitle="Definición del flujo productivo por etapas"
        actions={<button onClick={() => toast("Nueva etapa (simulado)", "info")} className="btn-primary"><Plus size={16} /> Agregar etapa</button>} />
      <ConfigTabs />

      <div className="card divide-y divide-ink-50">
        {STAGES.map((s, i) => (
          <div key={s.name} className="flex items-center gap-4 px-5 py-4 hover:bg-ink-50/60">
            <GripVertical size={18} className="cursor-grab text-ink-300" />
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink-900 text-xs font-bold text-white">{i + 1}</span>
            <span className={`h-3 w-3 rounded-full ${s.dot}`} />
            <div className="flex-1">
              <p className="font-semibold text-ink-800">{s.name}</p>
              <p className="text-xs text-ink-400">Área responsable: {s.area}</p>
            </div>
            <span className="chip bg-ink-100 text-ink-500"><Clock size={12} /> Prom. {s.avg}</span>
            <Toggle defaultOn={s.on} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-400">Arrastrá las etapas para reordenar el flujo. Los cambios afectan el Kanban y la cola de producción.</p>
    </div>
  );
}
