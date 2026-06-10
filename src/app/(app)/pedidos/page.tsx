"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, Eye, Pencil, Copy, Send, Filter, Package } from "lucide-react";
import { PageHeader, Progress, toast, EmptyState } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { orders, clients } from "@/lib/data";
import { STAGE_META, PRIORITY_META } from "@/lib/constants";
import { ConfirmModal } from "@/components/modals";

export default function PedidosPage() {
  const [q, setQ] = useState("");
  const [client, setClient] = useState("");
  const [stage, setStage] = useState("");
  const [priority, setPriority] = useState("");
  const [sendModal, setSendModal] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (q && !`${o.code} ${o.clientName} ${o.product}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (client && o.clientId !== client) return false;
      if (stage && o.stage !== stage) return false;
      if (priority && o.priority !== priority) return false;
      return true;
    });
  }, [q, client, stage, priority]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Pedidos"
        subtitle={`${orders.length} pedidos en total · ${orders.filter((o) => o.stage !== "entregado").length} activos`}
        actions={<Link href="/pedidos/nuevo" className="btn-primary"><Plus size={16} /> Nuevo pedido</Link>}
      />

      {/* Filters */}
      <div className="card mb-5 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por N° de pedido, cliente o producto…" className="input pl-9" />
          </div>
          <select value={client} onChange={(e) => setClient(e.target.value)} className="input max-w-[180px]">
            <option value="">Todos los clientes</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}
          </select>
          <select value={stage} onChange={(e) => setStage(e.target.value)} className="input max-w-[170px]">
            <option value="">Todos los estados</option>
            {Object.entries(STAGE_META).map(([k, v]) => <option key={k} value={k}>{v.short}</option>)}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input max-w-[150px]">
            <option value="">Toda prioridad</option>
            {Object.entries(PRIORITY_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          {(q || client || stage || priority) && (
            <button onClick={() => { setQ(""); setClient(""); setStage(""); setPriority(""); }} className="btn-ghost text-xs">Limpiar</button>
          )}
          <span className="ml-auto chip bg-ink-100 text-ink-500"><Filter size={13} /> {filtered.length} resultados</span>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={<Package size={26} />} title="Sin resultados" desc="No hay pedidos que coincidan con los filtros aplicados."
          action={<button onClick={() => { setQ(""); setClient(""); setStage(""); setPriority(""); }} className="btn-outline">Limpiar filtros</button>} />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3">Pedido</th>
                  <th className="px-3 py-3">Producto</th>
                  <th className="px-3 py-3">Cant.</th>
                  <th className="px-3 py-3">Estado</th>
                  <th className="px-3 py-3">Prioridad</th>
                  <th className="px-3 py-3">Responsable</th>
                  <th className="px-3 py-3 w-32">Avance</th>
                  <th className="px-3 py-3">Entrega</th>
                  <th className="px-5 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {filtered.map((o) => (
                  <tr key={o.id} className="group hover:bg-ink-50/60">
                    <td className="px-5 py-3">
                      <Link href={`/pedidos/${o.id}`} className="font-semibold text-ink-800 group-hover:text-brand-600">{o.code}</Link>
                      <p className="text-xs text-ink-400">{o.clientName}</p>
                    </td>
                    <td className="px-3 py-3 max-w-[200px]">
                      <p className="truncate text-ink-700">{o.product}</p>
                      <p className="text-xs text-ink-400">{o.category}</p>
                    </td>
                    <td className="px-3 py-3 font-medium text-ink-600">{o.qty}</td>
                    <td className="px-3 py-3"><StageBadge stage={o.stage} /></td>
                    <td className="px-3 py-3"><PriorityBadge priority={o.priority} /></td>
                    <td className="px-3 py-3 text-ink-600">{o.responsible}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={o.progress} className="w-16" />
                        <span className="text-xs font-semibold text-ink-500">{o.progress}%</span>
                      </div>
                    </td>
                    <td className={`px-3 py-3 ${o.delayed ? "font-semibold text-rose-600" : "text-ink-600"}`}>{o.dueDate.slice(5)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-60 transition group-hover:opacity-100">
                        <Link href={`/pedidos/${o.id}`} title="Ver" className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"><Eye size={16} /></Link>
                        <Link href={`/pedidos/${o.id}/editar`} title="Editar" className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"><Pencil size={15} /></Link>
                        <Link href={`/pedidos/nuevo?duplicar=${o.id}`} title="Duplicar" className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-brand-50 hover:text-brand-600"><Copy size={15} /></Link>
                        {o.stage === "recibido" && (
                          <button onClick={() => setSendModal(o.code)} title="Enviar a producción" className="grid h-8 w-8 place-items-center rounded-lg text-emerald-500 hover:bg-emerald-50"><Send size={15} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!sendModal} onClose={() => setSendModal(null)}
        title="Enviar a producción"
        message={`¿Confirmás enviar el pedido ${sendModal} a la línea de producción? Se reservarán los materiales y se asignará a la cola.`}
        confirmLabel="Enviar a producción"
        onConfirm={() => toast(`${sendModal} enviado a producción`)}
      />
    </div>
  );
}
