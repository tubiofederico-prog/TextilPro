"use client";
import { Save } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import ConfigTabs, { Toggle } from "@/components/ConfigTabs";

const ALERTS = [
  { name: "Pedido detenido por falta de material", desc: "Notificar al supervisor inmediatamente", on: true },
  { name: "Pedido urgente sin iniciar", desc: "Avisar si un pedido urgente no avanza en 24h", on: true },
  { name: "Bordado externo demorado", desc: "Alertar si supera el plazo acordado", on: true },
  { name: "Bajo stock de materiales", desc: "Disparar al cruzar el stock mínimo", on: true },
  { name: "Etapa demorando sobre el promedio", desc: "Detectar cuellos de botella (+20%)", on: true },
  { name: "Pedido retrasado vs. fecha de entrega", desc: "Marcar pedidos en riesgo de incumplimiento", on: true },
  { name: "Incidencia de alta severidad", desc: "Escalar automáticamente a supervisión", on: false },
];

const CHANNELS = ["En la plataforma", "Email", "WhatsApp (simulado)"];

export default function AlertasConfigPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Configuración" subtitle="Reglas de alertas operativas"
        actions={<button onClick={() => toast("Configuración guardada")} className="btn-primary"><Save size={15} /> Guardar</button>} />
      <ConfigTabs />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card divide-y divide-ink-50 lg:col-span-2">
          {ALERTS.map((a) => (
            <div key={a.name} className="flex items-center justify-between px-5 py-4">
              <div><p className="font-semibold text-ink-800">{a.name}</p><p className="text-xs text-ink-400">{a.desc}</p></div>
              <Toggle defaultOn={a.on} />
            </div>
          ))}
        </div>
        <div className="card h-fit p-5">
          <h3 className="mb-3 font-bold text-ink-900">Canales de notificación</h3>
          <div className="space-y-3">
            {CHANNELS.map((c, i) => (
              <div key={c} className="flex items-center justify-between"><span className="text-sm font-medium text-ink-700">{c}</span><Toggle defaultOn={i < 2} /></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
