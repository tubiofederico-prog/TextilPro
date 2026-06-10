"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Package, ArrowLeftRight, BellRing } from "lucide-react";

const TABS = [
  { href: "/inventario", label: "Resumen", icon: Boxes },
  { href: "/inventario/materiales", label: "Materiales", icon: Package },
  { href: "/inventario/movimientos", label: "Movimientos", icon: ArrowLeftRight },
  { href: "/inventario/alertas", label: "Alertas", icon: BellRing },
];

export default function InventoryTabs() {
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
