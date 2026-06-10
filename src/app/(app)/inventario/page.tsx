"use client";
import Link from "next/link";
import { Boxes, AlertTriangle, Lock, TrendingDown, PackageCheck } from "lucide-react";
import { PageHeader, StatCard, Progress, Badge } from "@/components/ui";
import InventoryTabs from "@/components/InventoryTabs";
import { materials } from "@/lib/data";
import { MATERIAL_CAT_LABEL } from "@/lib/constants";

export default function InventarioPage() {
  const low = materials.filter((m) => m.stock - m.reserved < m.min);
  const totalValue = materials.reduce((s, m) => s + m.stock * m.costPerUnit, 0);
  const byCat = Object.entries(MATERIAL_CAT_LABEL).map(([k, label]) => ({
    label, count: materials.filter((m) => m.category === k).length,
  })).filter((c) => c.count > 0);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Inventario" subtitle="Materias primas, insumos y disponibilidad" />
      <InventoryTabs />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Materiales" value={materials.length} icon={<Boxes size={20} />} tone="brand" />
        <StatCard label="Bajo stock" value={low.length} icon={<TrendingDown size={20} />} tone="rose" hint="bajo el mínimo" />
        <StatCard label="Reservado activo" value={materials.filter((m) => m.reserved > 0).length} icon={<Lock size={20} />} tone="amber" />
        <StatCard label="Valor de stock" value={`$${(totalValue / 1000).toFixed(1)}k`} icon={<PackageCheck size={20} />} tone="emerald" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Stock levels */}
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-ink-900">Niveles de stock</h3>
            <Link href="/inventario/materiales" className="text-sm font-semibold text-brand-600">Ver todos →</Link>
          </div>
          <div className="space-y-3.5">
            {materials.slice(0, 8).map((m) => {
              const avail = m.stock - m.reserved;
              const pct = Math.min(100, (avail / (m.min * 2)) * 100);
              const critical = avail < m.min;
              return (
                <div key={m.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-700">{m.name}</span>
                    <span className={`font-semibold ${critical ? "text-rose-600" : "text-ink-500"}`}>
                      {avail} / mín {m.min} {m.unit}{critical && <AlertTriangle size={12} className="ml-1 inline" />}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                    <div className={`h-full rounded-full ${critical ? "bg-rose-500" : pct < 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.max(6, pct)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories + alert */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Por categoría</h3>
            <div className="space-y-2">
              {byCat.map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2 text-sm">
                  <span className="font-medium text-ink-700">{c.label}</span>
                  <Badge className="bg-white text-ink-500">{c.count}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="card border-rose-200 bg-rose-50/50 p-5">
            <div className="flex items-center gap-2 text-rose-700"><AlertTriangle size={18} /><h3 className="font-bold">Atención requerida</h3></div>
            <p className="mt-2 text-sm text-rose-600">{low.length} materiales por debajo del stock mínimo necesitan reposición.</p>
            <Link href="/inventario/alertas" className="btn-danger mt-3 w-full text-sm">Ver alertas de stock</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
