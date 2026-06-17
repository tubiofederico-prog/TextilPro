"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Layers, HardHat, History, Boxes, Monitor } from "lucide-react";
import { Toaster } from "@/components/ui";
import { MovilProvider, useMovil, OPERATORS } from "./store";

const TABS = [
  { href: "/movil/panel", label: "Panel", icon: Plane },
  { href: "/movil/etapas", label: "Etapas", icon: Layers },
  { href: "/movil/operario", label: "Operario", icon: HardHat },
  { href: "/movil/historial", label: "Historial", icon: History },
  { href: "/movil/inventario", label: "Inventario", icon: Boxes },
];

function UserSwitcher() {
  const { user, setUser } = useMovil();
  return (
    <select
      value={user}
      onChange={(e) => setUser(e.target.value)}
      className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white outline-none backdrop-blur"
    >
      <option className="text-ink-900">Moisés (Jefe)</option>
      {OPERATORS.map((o) => (
        <option key={o.id} className="text-ink-900">{o.name}</option>
      ))}
    </select>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 py-0 lg:py-8">
      <div className="mx-auto flex max-w-[440px] flex-col lg:max-w-[400px]">
        {/* marco */}
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-ink-50 shadow-pop lg:min-h-[860px] lg:rounded-[2.5rem] lg:border-[10px] lg:border-ink-950">
          {/* header */}
          <header className="sticky top-0 z-30 bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-4 pt-5 text-white lg:pt-6">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 font-black backdrop-blur">T</div>
              <div className="leading-tight">
                <p className="text-sm font-bold">TextilPro Móvil</p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-brand-200">Planta · en tu bolsillo</p>
              </div>
              <div className="ml-auto"><UserSwitcher /></div>
            </div>
          </header>

          {/* contenido */}
          <main className="flex-1 overflow-y-auto px-4 pb-28 pt-4">{children}</main>

          {/* nav inferior */}
          <nav className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-ink-200 bg-white/95 px-1 pb-2 pt-1.5 backdrop-blur">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = isActive(t.href);
              return (
                <Link key={t.href} href={t.href}
                  className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-semibold transition ${
                    active ? "text-brand-600" : "text-ink-400"
                  }`}>
                  <Icon size={20} className={active ? "text-brand-600" : "text-ink-400"} />
                  {t.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* link a escritorio */}
        <Link href="/dashboard" className="mx-auto mt-4 hidden items-center gap-1.5 text-xs font-semibold text-ink-400 hover:text-white lg:flex">
          <Monitor size={14} /> Abrir versión de escritorio
        </Link>
      </div>
      <Toaster />
    </div>
  );
}

export default function MovilLayout({ children }: { children: React.ReactNode }) {
  return (
    <MovilProvider>
      <Phone>{children}</Phone>
    </MovilProvider>
  );
}
