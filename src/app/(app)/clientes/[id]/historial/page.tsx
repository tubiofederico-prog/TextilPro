"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, AlertTriangle, Repeat, FileText } from "lucide-react";
import { PageHeader, Badge } from "@/components/ui";
import { StageBadge } from "@/components/badges";
import { getClient, getClientOrders, incidents } from "@/lib/data";
import { INCIDENT_TYPE_LABEL } from "@/lib/constants";

export default function ClientHistoryPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id);
  if (!client) notFound();
  const orders = getClientOrders(client.id);
  const clientOrderCodes = orders.map((o) => o.code);
  const clientIncidents = incidents.filter((i) => clientOrderCodes.includes(i.orderCode));

  return (
    <div className="animate-fade-in">
      <Link href={`/clientes/${client.id}`} className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> {client.company}</Link>
      <PageHeader title="Historial comercial" subtitle={`${client.company} · ${orders.length} pedidos en total`} />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Timeline of orders */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-5 font-bold text-ink-900">Línea de pedidos</h3>
          <ol className="relative ml-3 border-l-2 border-ink-100">
            {orders.map((o) => (
              <li key={o.id} className="mb-6 ml-6 last:mb-0">
                <span className="absolute -left-[9px] grid h-4 w-4 place-items-center rounded-full bg-brand-500 ring-4 ring-brand-100" />
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/pedidos/${o.id}`} className="font-semibold text-ink-800 hover:text-brand-600">{o.code}</Link>
                  <StageBadge stage={o.stage} />
                  <span className="text-xs text-ink-400">{o.createdAt}</span>
                </div>
                <p className="text-sm text-ink-600">{o.product} · {o.qty} unidades</p>
                <div className="mt-1.5 flex gap-1.5">
                  <Link href={`/pedidos/${o.id}`} className="chip bg-ink-100 text-ink-600 hover:bg-ink-200"><FileText size={12} /> Ficha técnica</Link>
                  <Link href={`/pedidos/nuevo?duplicar=${o.id}`} className="chip bg-brand-50 text-brand-600 hover:bg-brand-100"><Repeat size={12} /> Repetir</Link>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Incidents */}
        <div className="card p-5 h-fit">
          <h3 className="mb-3 flex items-center gap-2 font-bold text-ink-900"><AlertTriangle size={18} className="text-amber-500" /> Reclamos e incidencias</h3>
          {clientIncidents.length === 0 ? (
            <p className="rounded-xl bg-emerald-50 px-3 py-4 text-center text-sm text-emerald-600">Sin incidencias registradas ✓</p>
          ) : (
            <div className="space-y-3">
              {clientIncidents.map((i) => (
                <div key={i.id} className="rounded-xl border border-ink-100 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink-700">{i.code} · {i.orderCode}</span>
                    <Badge className={i.status === "resuelta" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}>{i.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs font-medium text-ink-600">{INCIDENT_TYPE_LABEL[i.type]}</p>
                  <p className="text-xs text-ink-400">{i.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
