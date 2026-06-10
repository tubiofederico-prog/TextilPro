"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Search, Plus, Check, Play, Square, Box, Truck, AlertTriangle, Send, Filter,
} from "lucide-react";
import { PageHeader, Badge } from "@/components/ui";
import { history, operators } from "@/lib/data";

const iconMap: Record<string, { icon: any; cls: string }> = {
  plus: { icon: Plus, cls: "bg-brand-50 text-brand-600" },
  send: { icon: Send, cls: "bg-violet-50 text-violet-600" },
  play: { icon: Play, cls: "bg-blue-50 text-blue-600" },
  check: { icon: Check, cls: "bg-emerald-50 text-emerald-600" },
  stop: { icon: Square, cls: "bg-rose-50 text-rose-600" },
  box: { icon: Box, cls: "bg-amber-50 text-amber-600" },
  truck: { icon: Truck, cls: "bg-cyan-50 text-cyan-600" },
  alert: { icon: AlertTriangle, cls: "bg-rose-50 text-rose-600" },
};

const TYPES = ["Pedido", "Etapa", "Incidencia", "Material"];

export default function HistorialPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [operator, setOperator] = useState("");

  const filtered = useMemo(() => history.filter((h) => {
    if (q && !`${h.orderCode ?? ""} ${h.client ?? ""} ${h.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (type && h.type !== type) return false;
    if (operator && h.operator !== operator) return false;
    return true;
  }), [q, type, operator]);

  // group by date
  const grouped = useMemo(() => {
    const g: Record<string, typeof history> = {};
    filtered.forEach((h) => { (g[h.date] ??= []).push(h); });
    return Object.entries(g);
  }, [filtered]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Historial y Trazabilidad" subtitle="Timeline global de eventos · auditoría de acciones" />

      <div className="card mb-5 flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por pedido, cliente o descripción…" className="input pl-9" />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} className="input max-w-[160px]">
          <option value="">Todo evento</option>{TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={operator} onChange={(e) => setOperator(e.target.value)} className="input max-w-[170px]">
          <option value="">Todos los responsables</option>
          {["Sistema", ...operators.map((o) => o.name)].map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="ml-auto chip bg-ink-100 text-ink-500"><Filter size={13} /> {filtered.length} eventos</span>
      </div>

      <div className="space-y-6">
        {grouped.map(([date, events]) => (
          <div key={date}>
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-sm font-bold text-ink-700">{date}</h3>
              <div className="h-px flex-1 bg-ink-200" />
              <Badge className="bg-ink-100 text-ink-500">{events.length} eventos</Badge>
            </div>
            <div className="card divide-y divide-ink-50">
              {events.map((h) => {
                const m = iconMap[h.icon] ?? iconMap.check;
                const Icon = m.icon;
                return (
                  <div key={h.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-ink-50/60">
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${m.cls}`}><Icon size={17} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-ink-800">{h.description}</p>
                        {h.orderCode && <Link href="#" className="text-xs font-semibold text-brand-600">{h.orderCode}</Link>}
                      </div>
                      <p className="text-xs text-ink-400">
                        {h.operator}{h.client && ` · ${h.client}`}{h.stage && ` · ${h.stage}`}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-mono text-ink-400">{h.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
