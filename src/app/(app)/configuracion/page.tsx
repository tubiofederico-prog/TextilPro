"use client";
import { Building2, Save } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import ConfigTabs, { Toggle } from "@/components/ConfigTabs";

export default function ConfigGeneralPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Configuración" subtitle="Ajustes generales del sistema" />
      <ConfigTabs />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-ink-900"><Building2 size={18} /> Datos de la empresa</h3>
          <div className="space-y-4">
            <div><label className="label">Nombre de la empresa</label><input className="input" defaultValue="TextilPro — Blancos para Hotelería" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">RUT</label><input className="input" defaultValue="21 555 123 0017" /></div>
              <div><label className="label">Teléfono</label><input className="input" defaultValue="+598 2 555 1000" /></div>
            </div>
            <div><label className="label">Dirección</label><input className="input" defaultValue="Camino Maldonado 5500, Montevideo" /></div>
            <button onClick={() => toast("Datos guardados")} className="btn-primary"><Save size={15} /> Guardar cambios</button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 font-bold text-ink-900">Preferencias del sistema</h3>
          <div className="divide-y divide-ink-100">
            {[
              ["Numeración automática de pedidos", true],
              ["Reservar materiales al enviar a producción", true],
              ["Validar disponibilidad antes de producir", true],
              ["Notificar al cliente al entregar", false],
              ["Modo planta (vista simplificada operarios)", true],
              ["Alertas de cuellos de botella", true],
            ].map(([label, on]) => (
              <div key={label as string} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-ink-700">{label}</span>
                <Toggle defaultOn={on as boolean} />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 font-bold text-ink-900">Prioridades configuradas</h3>
          <div className="space-y-2">
            {[["Urgente", "bg-rose-500", "Entrega ≤ 3 días"], ["Alta", "bg-orange-500", "Entrega ≤ 7 días"], ["Media", "bg-blue-500", "Entrega ≤ 15 días"], ["Baja", "bg-slate-400", "Sin urgencia"]].map(([l, c, d]) => (
              <div key={l} className="flex items-center gap-3 rounded-xl border border-ink-100 p-3">
                <span className={`h-3 w-3 rounded-full ${c}`} />
                <span className="font-semibold text-ink-800">{l}</span>
                <span className="ml-auto text-sm text-ink-400">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 font-bold text-ink-900">Stock mínimo global</h3>
          <p className="mb-3 text-sm text-ink-500">Umbral de alerta de reposición por categoría (días de cobertura).</p>
          <div className="space-y-3">
            {[["Telas", 7], ["Toallas", 10], ["Hilos", 14], ["Empaque", 5]].map(([cat, days]) => (
              <div key={cat as string} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium text-ink-700">{cat}</span>
                <input type="number" className="input flex-1" defaultValue={days as number} />
                <span className="text-sm text-ink-400">días</span>
              </div>
            ))}
            <button onClick={() => toast("Umbrales actualizados")} className="btn-outline w-full"><Save size={15} /> Guardar umbrales</button>
          </div>
        </div>
      </div>
    </div>
  );
}
