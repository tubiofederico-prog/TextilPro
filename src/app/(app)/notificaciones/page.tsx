"use client";
import Link from "next/link";
import { OctagonPause, Boxes, Truck, CheckCircle2, AlertTriangle, Clock, CheckCheck } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";

const NOTIFS = [
  { icon: OctagonPause, cls: "bg-rose-50 text-rose-600", title: "Pedido detenido", desc: "PED-2026-0135 (Estancia Los Aromos) detenido por falta de relleno siliconado.", time: "hace 18h", unread: true, href: "/produccion/o8" },
  { icon: Boxes, cls: "bg-amber-50 text-amber-600", title: "Stock crítico", desc: "Hilo dorado para bordado por debajo del mínimo (38/50 conos).", time: "hace 1d", unread: true, href: "/inventario/alertas" },
  { icon: AlertTriangle, cls: "bg-rose-50 text-rose-600", title: "Incidencia de bordado", desc: "Frunce en bordado dorado de PED-2026-0142 reportado por Lucía Ferreira.", time: "hace 1d", unread: true, href: "/calidad/incidencias/i7" },
  { icon: Truck, cls: "bg-amber-50 text-amber-600", title: "Bordado externo demorado", desc: "El taller externo demora la devolución del lote GHN (+2 días).", time: "hace 2d", unread: false, href: "/calidad/incidencias/i5" },
  { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-600", title: "Pedido listo para entrega", desc: "PED-2026-0137 (Hotel Brisas del Plata) completado — 250 toallas.", time: "hace 2d", unread: false, href: "/produccion/o6" },
  { icon: Clock, cls: "bg-violet-50 text-violet-600", title: "Cuello de botella detectado", desc: "La etapa de confección está demorando 22% más que el promedio.", time: "hace 3d", unread: false, href: "/reportes" },
];

export default function NotificacionesPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl">
      <PageHeader title="Notificaciones" subtitle="3 sin leer"
        actions={<button onClick={() => toast("Todas marcadas como leídas")} className="btn-outline"><CheckCheck size={16} /> Marcar todas leídas</button>} />

      <div className="card divide-y divide-ink-50">
        {NOTIFS.map((n, i) => {
          const Icon = n.icon;
          return (
            <Link key={i} href={n.href} className={`flex items-start gap-4 px-5 py-4 transition hover:bg-ink-50/60 ${n.unread ? "bg-brand-50/30" : ""}`}>
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${n.cls}`}><Icon size={19} /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink-800">{n.title}</p>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                </div>
                <p className="text-sm text-ink-500">{n.desc}</p>
                <p className="mt-1 text-xs text-ink-400">{n.time}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
