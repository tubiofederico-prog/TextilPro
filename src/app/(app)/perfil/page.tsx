"use client";
import { Save, Shield, Clock } from "lucide-react";
import { PageHeader, Avatar, Badge, toast } from "@/components/ui";

export default function PerfilPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Mi perfil" subtitle="Información de la cuenta y preferencias" />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card flex flex-col items-center p-6 text-center">
          <div className="scale-150 py-3"><Avatar initials="SA" color="bg-emerald-500" size="lg" /></div>
          <h2 className="mt-4 text-xl font-bold text-ink-900">Sofía Acosta</h2>
          <Badge className="mt-1 bg-emerald-50 text-emerald-600"><Shield size={12} /> Supervisor</Badge>
          <p className="mt-2 text-sm text-ink-400">sofia@textilpro.com</p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink-100 pt-4 text-center">
            <div><p className="text-lg font-bold text-ink-900">98%</p><p className="text-[11px] text-ink-400">Eficiencia</p></div>
            <div><p className="text-lg font-bold text-brand-600">142</p><p className="text-[11px] text-ink-400">Acciones (mes)</p></div>
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 font-bold text-ink-900">Datos personales</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Nombre</label><input className="input" defaultValue="Sofía Acosta" /></div>
            <div><label className="label">Rol</label><input className="input" defaultValue="Supervisor de planta" readOnly /></div>
            <div><label className="label">Email</label><input className="input" defaultValue="sofia@textilpro.com" /></div>
            <div><label className="label">Teléfono</label><input className="input" defaultValue="+598 99 789 012" /></div>
            <div><label className="label">Contraseña</label><input className="input" type="password" defaultValue="demo1234" /></div>
            <div><label className="label">Idioma</label><select className="input"><option>Español</option><option>English</option><option>Português</option></select></div>
          </div>
          <button onClick={() => toast("Perfil actualizado")} className="btn-primary mt-5"><Save size={15} /> Guardar cambios</button>
        </div>

        <div className="card p-6 lg:col-span-3">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-ink-900"><Clock size={18} /> Actividad reciente</h3>
          <div className="space-y-2">
            {[
              "Bordado terminado en PED-2026-0130",
              "Lote enviado a taller de bordado externo (PED-2026-0134)",
              "Incidencia registrada en PED-2026-0129",
              "Nuevo pedido creado PED-2026-0142",
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-ink-50 px-3 py-2 text-sm text-ink-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
