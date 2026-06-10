"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Building2, Phone, Mail, MapPin, Calendar, Repeat, History,
  Image as ImageIcon, FileText, Package,
} from "lucide-react";
import { PageHeader, Badge, StatCard, Avatar, toast } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { getClient, getClientOrders } from "@/lib/data";
import { CLIENT_TYPE_LABEL } from "@/lib/constants";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id);
  if (!client) notFound();
  const orders = getClientOrders(client.id);
  const active = orders.filter((o) => o.stage !== "entregado");
  const past = orders.filter((o) => o.stage === "entregado");

  return (
    <div className="animate-fade-in">
      <Link href="/clientes" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Clientes</Link>

      {/* Header card */}
      <div className="card mb-5 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={client.company.slice(0, 2).toUpperCase()} color="bg-brand-500" size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-ink-900">{client.company}</h1>
                <Badge className="bg-brand-50 text-brand-600">{CLIENT_TYPE_LABEL[client.type]}</Badge>
              </div>
              <p className="text-sm text-ink-500">{client.name} · {client.contact}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/clientes/${client.id}/historial`} className="btn-outline"><History size={15} /> Historial</Link>
            <Link href="/pedidos/nuevo" className="btn-primary"><Package size={15} /> Nuevo pedido</Link>
          </div>
        </div>
        <div className="mt-5 grid gap-4 border-t border-ink-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-2 text-sm"><Phone size={16} className="text-ink-400" /> {client.phone}</div>
          <div className="flex items-center gap-2 text-sm truncate"><Mail size={16} className="text-ink-400" /> {client.email}</div>
          <div className="flex items-center gap-2 text-sm"><MapPin size={16} className="text-ink-400" /> {client.address}</div>
          <div className="flex items-center gap-2 text-sm"><Calendar size={16} className="text-ink-400" /> Cliente desde {client.since.slice(0, 7)}</div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Pedidos totales" value={client.totalOrders} icon={<Package size={20} />} tone="brand" />
        <StatCard label="Activos" value={client.activeOrders} icon={<Repeat size={20} />} tone="amber" />
        <StatCard label="Última compra" value={client.lastPurchase.slice(5)} tone="slate" />
        <StatCard label="Valor histórico" value={`$${(client.lifetimeValue / 1000).toFixed(1)}k`} tone="emerald" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Active orders */}
        <div className="card overflow-hidden lg:col-span-2">
          <div className="border-b border-ink-100 px-5 py-4"><h3 className="font-bold text-ink-900">Pedidos activos</h3></div>
          {active.length === 0 ? <p className="px-5 py-8 text-center text-sm text-ink-400">Sin pedidos activos</p> : (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-ink-50">
                {active.map((o) => (
                  <tr key={o.id} className="hover:bg-ink-50/60">
                    <td className="px-5 py-3"><Link href={`/pedidos/${o.id}`} className="font-semibold text-ink-800 hover:text-brand-600">{o.code}</Link><p className="text-xs text-ink-400">{o.product}</p></td>
                    <td className="px-3 py-3"><StageBadge stage={o.stage} /></td>
                    <td className="px-3 py-3"><PriorityBadge priority={o.priority} /></td>
                    <td className="px-5 py-3 text-right text-ink-500">{o.dueDate.slice(5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Notes + gallery */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="mb-2 font-bold text-ink-900">Observaciones</h3>
            <p className="text-sm text-ink-600">{client.notes}</p>
          </div>
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Archivos asociados</h3>
            <div className="grid grid-cols-3 gap-2">
              {["bg-slate-200", "bg-blue-200", "bg-amber-200"].map((c, i) => (
                <button key={i} onClick={() => toast("Vista previa (simulado)", "info")} className={`grid aspect-square place-items-center rounded-lg ${c}`}><ImageIcon size={20} className="text-white/70" /></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historical orders with fichas */}
      <div className="card mt-5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <div><h3 className="font-bold text-ink-900">Productos fabricados anteriormente</h3><p className="text-xs text-ink-400">Reproducibles con la ficha técnica archivada</p></div>
        </div>
        {past.length === 0 ? <p className="px-5 py-8 text-center text-sm text-ink-400">Sin pedidos históricos entregados</p> : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-5 py-3">Pedido</th><th className="px-3 py-3">Producto</th><th className="px-3 py-3">Cantidad</th><th className="px-3 py-3">Entregado</th><th className="px-5 py-3 text-right">Acciones</th></tr></thead>
            <tbody className="divide-y divide-ink-50">
              {past.map((o) => (
                <tr key={o.id} className="hover:bg-ink-50/60">
                  <td className="px-5 py-3 font-semibold text-ink-800">{o.code}</td>
                  <td className="px-3 py-3 text-ink-700">{o.product}</td>
                  <td className="px-3 py-3 text-ink-500">{o.qty} u</td>
                  <td className="px-3 py-3 text-ink-500">{o.dueDate.slice(5)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Link href={`/pedidos/${o.id}`} className="chip bg-ink-100 text-ink-600 hover:bg-ink-200"><FileText size={12} /> Ficha</Link>
                      <Link href={`/pedidos/nuevo?duplicar=${o.id}`} className="chip bg-brand-50 text-brand-600 hover:bg-brand-100"><Repeat size={12} /> Repetir pedido</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
