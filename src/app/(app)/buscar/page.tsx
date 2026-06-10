"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Package, Building2, Boxes, ShieldAlert } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui";
import { StageBadge } from "@/components/badges";
import { orders, clients, materials, incidents } from "@/lib/data";
import { INCIDENT_TYPE_LABEL } from "@/lib/constants";

export default function BuscarPage() {
  const [q, setQ] = useState("");
  const term = q.toLowerCase().trim();

  const results = useMemo(() => {
    if (!term) return null;
    return {
      orders: orders.filter((o) => `${o.code} ${o.clientName} ${o.product}`.toLowerCase().includes(term)),
      clients: clients.filter((c) => `${c.company} ${c.name}`.toLowerCase().includes(term)),
      materials: materials.filter((m) => m.name.toLowerCase().includes(term)),
      incidents: incidents.filter((i) => `${i.code} ${i.orderCode} ${INCIDENT_TYPE_LABEL[i.type]}`.toLowerCase().includes(term)),
    };
  }, [term]);

  const total = results ? results.orders.length + results.clients.length + results.materials.length + results.incidents.length : 0;

  return (
    <div className="animate-fade-in mx-auto max-w-4xl">
      <PageHeader title="Búsqueda global" subtitle="Encontrá pedidos, clientes, materiales e incidencias" />

      <div className="relative mb-6">
        <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Escribí para buscar en todo el sistema…" className="input py-3.5 pl-12 text-base" />
      </div>

      {!results && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[["Pedidos", orders.length, Package], ["Clientes", clients.length, Building2], ["Materiales", materials.length, Boxes], ["Incidencias", incidents.length, ShieldAlert]].map(([l, n, Icon]: any) => (
            <div key={l} className="card flex items-center gap-3 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100 text-ink-500"><Icon size={20} /></div><div><p className="text-xl font-bold text-ink-900">{n}</p><p className="text-xs text-ink-400">{l}</p></div></div>
          ))}
        </div>
      )}

      {results && total === 0 && (
        <EmptyState icon={<Search size={26} />} title="Sin resultados" desc={`No encontramos nada para "${q}". Probá con otro término.`} />
      )}

      {results && total > 0 && (
        <div className="space-y-6">
          {results.orders.length > 0 && (
            <Section title="Pedidos" icon={<Package size={16} />} count={results.orders.length}>
              {results.orders.map((o) => (
                <Link key={o.id} href={`/pedidos/${o.id}`} className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 hover:bg-ink-50/60">
                  <div><p className="font-semibold text-ink-800">{o.code}</p><p className="text-xs text-ink-400">{o.clientName} · {o.product}</p></div>
                  <StageBadge stage={o.stage} />
                </Link>
              ))}
            </Section>
          )}
          {results.clients.length > 0 && (
            <Section title="Clientes" icon={<Building2 size={16} />} count={results.clients.length}>
              {results.clients.map((c) => (
                <Link key={c.id} href={`/clientes/${c.id}`} className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 hover:bg-ink-50/60">
                  <div><p className="font-semibold text-ink-800">{c.company}</p><p className="text-xs text-ink-400">{c.name}</p></div>
                  <span className="text-xs text-ink-400">{c.totalOrders} pedidos</span>
                </Link>
              ))}
            </Section>
          )}
          {results.materials.length > 0 && (
            <Section title="Materiales" icon={<Boxes size={16} />} count={results.materials.length}>
              {results.materials.map((m) => (
                <Link key={m.id} href="/inventario/materiales" className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 hover:bg-ink-50/60">
                  <div><p className="font-semibold text-ink-800">{m.name}</p><p className="text-xs text-ink-400">{m.supplier}</p></div>
                  <span className="text-xs text-ink-400">{m.stock - m.reserved} {m.unit}</span>
                </Link>
              ))}
            </Section>
          )}
          {results.incidents.length > 0 && (
            <Section title="Incidencias" icon={<ShieldAlert size={16} />} count={results.incidents.length}>
              {results.incidents.map((i) => (
                <Link key={i.id} href={`/calidad/incidencias/${i.id}`} className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 hover:bg-ink-50/60">
                  <div><p className="font-semibold text-ink-800">{i.code} · {INCIDENT_TYPE_LABEL[i.type]}</p><p className="text-xs text-ink-400">{i.orderCode}</p></div>
                </Link>
              ))}
            </Section>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, count, children }: { title: string; icon: React.ReactNode; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-ink-700">{icon} {title} <span className="chip bg-ink-100 text-ink-500">{count}</span></div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
