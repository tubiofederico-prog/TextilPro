"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Plus, Building2, Phone, Mail, ChevronRight, Star } from "lucide-react";
import { PageHeader, Badge, StatCard, Avatar, toast } from "@/components/ui";
import { clients, getClientOrders } from "@/lib/data";
import { CLIENT_TYPE_LABEL } from "@/lib/constants";
import { ClientType } from "@/lib/types";

const typeColor: Record<ClientType, string> = {
  hotel: "bg-brand-50 text-brand-600", restaurante: "bg-violet-50 text-violet-600",
  particular: "bg-amber-50 text-amber-600", mayorista: "bg-emerald-50 text-emerald-600",
};
const avatarColor: Record<ClientType, string> = {
  hotel: "bg-brand-500", restaurante: "bg-violet-500", particular: "bg-amber-500", mayorista: "bg-emerald-500",
};

export default function ClientesPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => clients.filter((c) => {
    if (q && !`${c.company} ${c.name} ${c.contact}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (type && c.type !== type) return false;
    return true;
  }), [q, type]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Clientes" subtitle={`${clients.length} clientes registrados`}
        actions={<button onClick={() => toast("Alta de cliente (simulado)", "info")} className="btn-primary"><Plus size={16} /> Nuevo cliente</button>} />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total clientes" value={clients.length} icon={<Building2 size={20} />} tone="brand" />
        <StatCard label="Hoteles" value={clients.filter((c) => c.type === "hotel").length} icon={<Building2 size={20} />} tone="cyan" />
        <StatCard label="Con pedidos activos" value={clients.filter((c) => c.activeOrders > 0).length} icon={<Star size={20} />} tone="amber" />
        <StatCard label="Valor histórico" value={`$${(clients.reduce((s, c) => s + c.lifetimeValue, 0) / 1000).toFixed(0)}k`} icon={<Star size={20} />} tone="emerald" />
      </div>

      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar cliente, empresa o contacto…" className="input pl-9" />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} className="input max-w-[180px]">
          <option value="">Todos los tipos</option>
          {Object.entries(CLIENT_TYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.id} href={`/clientes/${c.id}`} className="group card p-5 transition hover:shadow-soft hover:border-brand-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar initials={c.company.slice(0, 2).toUpperCase()} color={avatarColor[c.type]} size="lg" />
                <div>
                  <p className="font-bold text-ink-900 group-hover:text-brand-600">{c.company}</p>
                  <p className="text-xs text-ink-400">{c.name}</p>
                </div>
              </div>
              <Badge className={typeColor[c.type]}>{CLIENT_TYPE_LABEL[c.type]}</Badge>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-ink-500">
              <p className="flex items-center gap-2"><Phone size={14} /> {c.phone}</p>
              <p className="flex items-center gap-2 truncate"><Mail size={14} /> {c.email}</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-ink-100 pt-3 text-center">
              <div><p className="text-lg font-bold text-ink-900">{c.totalOrders}</p><p className="text-[11px] text-ink-400">Pedidos</p></div>
              <div><p className="text-lg font-bold text-brand-600">{c.activeOrders}</p><p className="text-[11px] text-ink-400">Activos</p></div>
              <div><p className="text-lg font-bold text-emerald-600">${(c.lifetimeValue / 1000).toFixed(0)}k</p><p className="text-[11px] text-ink-400">Histórico</p></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
