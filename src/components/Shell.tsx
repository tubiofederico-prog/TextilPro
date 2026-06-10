"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Factory, Boxes, Users, ShieldCheck, History,
  BarChart3, HardHat, Settings, Search, Bell, ChevronDown, Menu, X,
  Sparkles, LogOut, User, Plus,
} from "lucide-react";
import { Avatar, Toaster } from "./ui";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pedidos", label: "Pedidos", icon: Package },
  { href: "/produccion", label: "Producción", icon: Factory },
  { href: "/inventario", label: "Inventario", icon: Boxes },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/calidad", label: "Calidad / Incidencias", icon: ShieldCheck },
  { href: "/historial", label: "Historial", icon: History },
  { href: "/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/operarios", label: "Operarios", icon: HardHat },
  { href: "/configuracion", label: "Configuración", icon: Settings },
];

const NOTIFS = [
  { t: "Pedido detenido", d: "PED-2026-0135 detenido por falta de relleno", time: "hace 18h", dot: "bg-rose-500" },
  { t: "Stock crítico", d: "Hilo dorado bajo el mínimo (38/50)", time: "hace 1d", dot: "bg-amber-500" },
  { t: "Bordado demorado", d: "Taller externo demora lote GHN", time: "hace 2d", dot: "bg-amber-500" },
  { t: "Pedido listo", d: "PED-2026-0137 listo para entrega", time: "hace 1d", dot: "bg-emerald-500" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-800/40 bg-ink-900 transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-white/5 px-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 font-black text-white shadow-lg">T</div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">TextilPro</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-ink-400">Torre de Control</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="ml-auto text-ink-400 lg:hidden"><X size={18} /></button>
        </div>

        <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 py-4" style={{ height: "calc(100vh - 4rem - 5rem)" }}>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active ? "bg-brand-600 text-white shadow-sm" : "text-ink-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} className={active ? "text-white" : "text-ink-400 group-hover:text-white"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/5 p-3">
          <div className="rounded-xl bg-gradient-to-br from-brand-600/20 to-brand-900/20 p-3">
            <div className="flex items-center gap-2 text-brand-200">
              <Sparkles size={15} />
              <span className="text-xs font-semibold">Plan Enterprise</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-400">Prototipo de demostración · datos simulados</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink-200/60 bg-white/80 px-4 backdrop-blur-lg lg:px-6">
          <button onClick={() => setMobileOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-100 lg:hidden">
            <Menu size={20} />
          </button>

          <Link href="/buscar" className="relative hidden flex-1 max-w-md sm:block">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar pedidos, clientes, materiales…"
              className="input pl-9 py-2 bg-ink-50"
            />
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            <Link href="/pedidos/nuevo" className="btn-primary hidden sm:inline-flex">
              <Plus size={16} /> Nuevo pedido
            </Link>

            {/* Notifs */}
            <div className="relative">
              <button onClick={() => { setNotifOpen((v) => !v); setUserOpen(false); }} className="relative grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-100">
                <Bell size={19} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-80 card shadow-pop animate-scale-in">
                    <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
                      <p className="text-sm font-bold">Notificaciones</p>
                      <Link href="/notificaciones" onClick={() => setNotifOpen(false)} className="text-xs font-semibold text-brand-600">Ver todas</Link>
                    </div>
                    <div className="max-h-96 overflow-y-auto py-1">
                      {NOTIFS.map((n, i) => (
                        <div key={i} className="flex gap-3 px-4 py-2.5 hover:bg-ink-50">
                          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.dot}`} />
                          <div>
                            <p className="text-sm font-semibold text-ink-800">{n.t}</p>
                            <p className="text-xs text-ink-500">{n.d}</p>
                            <p className="mt-0.5 text-[11px] text-ink-400">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User */}
            <div className="relative">
              <button onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); }} className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-ink-100">
                <Avatar initials="SA" color="bg-emerald-500" size="md" />
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold leading-tight text-ink-800">Sofía Acosta</p>
                  <p className="text-[11px] text-ink-400">Supervisor</p>
                </div>
                <ChevronDown size={15} className="hidden text-ink-400 sm:block" />
              </button>
              {userOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-56 card shadow-pop animate-scale-in py-1">
                    <div className="border-b border-ink-100 px-4 py-3">
                      <p className="text-sm font-semibold text-ink-800">Sofía Acosta</p>
                      <p className="text-xs text-ink-400">sofia@textilpro.com</p>
                    </div>
                    <Link href="/perfil" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50"><User size={16} /> Mi perfil</Link>
                    <Link href="/configuracion" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50"><Settings size={16} /> Configuración</Link>
                    <div className="my-1 border-t border-ink-100" />
                    <Link href="/login" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"><LogOut size={16} /> Cerrar sesión</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8">{children}</main>
      </div>

      <Toaster />
    </div>
  );
}
