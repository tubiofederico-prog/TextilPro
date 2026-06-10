"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import { getOrder, clients } from "@/lib/data";

export default function EditOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const order = getOrder(params.id);
  if (!order) notFound();

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div><label className="label">{label}</label>{children}</div>
  );

  return (
    <div className="animate-fade-in">
      <Link href={`/pedidos/${order.id}`} className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> {order.code}</Link>
      <PageHeader title={`Editar ${order.code}`} subtitle="Modificá los datos del pedido" />

      <form onSubmit={(e) => { e.preventDefault(); toast("Pedido actualizado correctamente"); router.push(`/pedidos/${order.id}`); }} className="space-y-5">
        <div className="card p-6">
          <h3 className="mb-4 font-bold text-ink-900">Datos generales</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cliente"><select className="input" defaultValue={order.clientId}>{clients.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></Field>
            <Field label="Producto"><input className="input" defaultValue={order.product} /></Field>
            <Field label="Cantidad"><input type="number" className="input" defaultValue={order.qty} /></Field>
            <Field label="Categoría"><input className="input" defaultValue={order.category} /></Field>
            <Field label="Prioridad"><select className="input" defaultValue={order.priority}><option value="urgente">Urgente</option><option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option></select></Field>
            <Field label="Fecha de entrega"><input type="date" className="input" defaultValue={order.dueDate} /></Field>
            <Field label="Responsable"><input className="input" defaultValue={order.responsible} /></Field>
            <Field label="Responsable comercial"><input className="input" defaultValue={order.salesperson} /></Field>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 font-bold text-ink-900">Especificaciones técnicas</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Medidas"><input className="input" defaultValue={order.techSheet.measures} /></Field>
            <Field label="Tipo de tela"><input className="input" defaultValue={order.techSheet.fabric} /></Field>
            <Field label="Color"><input className="input" defaultValue={order.techSheet.color} /></Field>
            <Field label="Bordado"><input className="input" defaultValue={order.techSheet.embroidery} /></Field>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 font-bold text-ink-900">Observaciones internas</h3>
          <textarea className="input" rows={4} defaultValue={order.internalNotes} />
        </div>

        <div className="flex justify-end gap-2">
          <Link href={`/pedidos/${order.id}`} className="btn-ghost">Cancelar</Link>
          <button type="submit" className="btn-primary"><Check size={16} /> Guardar cambios</button>
        </div>
      </form>
    </div>
  );
}
