"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Settings, Users, Shield, Layers, BellRing } from "lucide-react";

const TABS = [
  { href: "/configuracion", label: "General", icon: Settings },
  { href: "/configuracion/usuarios", label: "Usuarios", icon: Users },
  { href: "/configuracion/roles", label: "Roles y permisos", icon: Shield },
  { href: "/configuracion/etapas", label: "Etapas productivas", icon: Layers },
  { href: "/configuracion/alertas", label: "Alertas", icon: BellRing },
];

export default function ConfigTabs() {
  const path = usePathname();
  return (
    <div className="mb-5 flex gap-1 overflow-x-auto border-b border-ink-200">
      {TABS.map((t) => {
        const Icon = t.icon;
        const active = path === t.href;
        return (
          <Link key={t.href} href={t.href}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              active ? "border-brand-600 text-brand-700" : "border-transparent text-ink-400 hover:text-ink-700"
            }`}>
            <Icon size={16} /> {t.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn((v) => !v)}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-brand-600" : "bg-ink-200"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
