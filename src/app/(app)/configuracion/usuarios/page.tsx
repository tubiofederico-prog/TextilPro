"use client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader, Badge, Avatar, toast } from "@/components/ui";
import ConfigTabs from "@/components/ConfigTabs";
import { operators } from "@/lib/data";

export default function UsuariosPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Configuración" subtitle="Gestión de usuarios del sistema"
        actions={<button onClick={() => toast("Alta de usuario (simulado)", "info")} className="btn-primary"><Plus size={16} /> Nuevo usuario</button>} />
      <ConfigTabs />

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
            <th className="px-5 py-3">Usuario</th><th className="px-3 py-3">Rol</th><th className="px-3 py-3">Área</th>
            <th className="px-3 py-3">Email</th><th className="px-3 py-3">Estado</th><th className="px-5 py-3 text-right">Acciones</th></tr></thead>
          <tbody className="divide-y divide-ink-50">
            {operators.map((o) => (
              <tr key={o.id} className="group hover:bg-ink-50/60">
                <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar initials={o.initials} color={o.avatarColor} /><span className="font-medium text-ink-800">{o.name}</span></div></td>
                <td className="px-3 py-3"><Badge className="bg-brand-50 text-brand-600">{o.role}</Badge></td>
                <td className="px-3 py-3 text-ink-600">{o.area}</td>
                <td className="px-3 py-3 text-ink-500">{o.email}</td>
                <td className="px-3 py-3"><Badge className={o.active ? "bg-emerald-50 text-emerald-600" : "bg-ink-100 text-ink-400"}>{o.active ? "Activo" : "Inactivo"}</Badge></td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100">
                    <button onClick={() => toast("Editar usuario (simulado)", "info")} className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"><Pencil size={15} /></button>
                    <button onClick={() => toast("Usuario desactivado", "error")} className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
