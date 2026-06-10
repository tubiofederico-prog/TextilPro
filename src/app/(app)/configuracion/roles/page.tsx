"use client";
import { Check, X } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import ConfigTabs from "@/components/ConfigTabs";

const ROLES = ["Administrador", "Supervisor", "Vendedor", "Cortador", "Costurera", "Bordador", "Empaque", "Despacho"];
const PERMS = [
  { p: "Ver dashboard", roles: [1, 1, 1, 0, 0, 0, 0, 0] },
  { p: "Crear pedidos", roles: [1, 1, 1, 0, 0, 0, 0, 0] },
  { p: "Editar pedidos", roles: [1, 1, 1, 0, 0, 0, 0, 0] },
  { p: "Ver producción", roles: [1, 1, 1, 1, 1, 1, 1, 1] },
  { p: "Cambiar etapas", roles: [1, 1, 0, 1, 1, 1, 1, 1] },
  { p: "Gestionar inventario", roles: [1, 1, 0, 0, 0, 0, 0, 1] },
  { p: "Registrar incidencias", roles: [1, 1, 1, 1, 1, 1, 1, 1] },
  { p: "Ver reportes", roles: [1, 1, 1, 0, 0, 0, 0, 0] },
  { p: "Gestionar usuarios", roles: [1, 0, 0, 0, 0, 0, 0, 0] },
  { p: "Configurar sistema", roles: [1, 0, 0, 0, 0, 0, 0, 0] },
];

export default function RolesPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Configuración" subtitle="Roles y matriz de permisos"
        actions={<button onClick={() => toast("Permisos guardados")} className="btn-primary">Guardar permisos</button>} />
      <ConfigTabs />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-100 bg-ink-50/50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">Permiso</th>
              {ROLES.map((r) => <th key={r} className="px-2 py-3 text-center text-[11px] font-semibold text-ink-500">{r}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-ink-50">
              {PERMS.map((row) => (
                <tr key={row.p} className="hover:bg-ink-50/60">
                  <td className="px-5 py-3 font-medium text-ink-700">{row.p}</td>
                  {row.roles.map((v, i) => (
                    <td key={i} className="px-2 py-3 text-center">
                      {v ? <Check size={16} className="mx-auto text-emerald-500" /> : <X size={16} className="mx-auto text-ink-200" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
