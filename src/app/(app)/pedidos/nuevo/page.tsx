"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import {
  ClipboardList, User, Box, Ruler, Boxes, ImagePlus, Flag, MessageSquare,
  ArrowLeft, Check, UploadCloud, Sparkles,
} from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import { clients, materials, getOrder } from "@/lib/data";

const SECTIONS = [
  { id: "general", label: "Datos generales", icon: ClipboardList },
  { id: "cliente", label: "Cliente", icon: User },
  { id: "producto", label: "Producto", icon: Box },
  { id: "tecnico", label: "Especificaciones", icon: Ruler },
  { id: "materiales", label: "Materiales", icon: Boxes },
  { id: "adjuntos", label: "Adjuntos", icon: ImagePlus },
  { id: "prioridad", label: "Prioridad y entrega", icon: Flag },
  { id: "obs", label: "Observaciones", icon: MessageSquare },
];

const PRODUCTS = ["Sábanas", "Fundas", "Toallas", "Edredones", "Servilletas", "Manteles", "Juego de cama", "Producto especial"];

function NuevoPedidoInner() {
  const router = useRouter();
  const params = useSearchParams();
  const dup = params.get("duplicar");
  const base = dup ? getOrder(dup) : undefined;
  const [section, setSection] = useState("general");
  const [selMaterials, setSelMaterials] = useState<string[]>(base?.materials.map((m) => m.materialId) ?? []);

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div><label className="label">{label}</label>{children}</div>
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={dup ? "Duplicar pedido" : "Nuevo pedido"}
        subtitle={dup ? `Basado en ${base?.code} — ajustá los datos necesarios` : "Creá un pedido personalizado paso a paso"}
        actions={<Link href="/pedidos" className="btn-ghost"><ArrowLeft size={16} /> Volver</Link>}
      />

      {dup && (
        <div className="mb-5 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          <Sparkles size={16} /> Datos precargados desde <strong>{base?.code}</strong> ({base?.product}). Revisá y confirmá.
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        {/* Section nav */}
        <nav className="card sticky top-20 h-fit p-2">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={s.id} onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  section === s.id ? "bg-brand-50 text-brand-700" : "text-ink-500 hover:bg-ink-50"
                }`}>
                <span className={`grid h-6 w-6 place-items-center rounded-lg text-[11px] font-bold ${section === s.id ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"}`}>{i + 1}</span>
                {s.label}
              </button>
            );
          })}
        </nav>

        {/* Form body */}
        <form
          onSubmit={(e) => { e.preventDefault(); toast("Pedido creado correctamente"); router.push("/pedidos"); }}
          className="space-y-5"
        >
          {section === "general" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Datos generales</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="N° de pedido"><input className="input" defaultValue="PED-2026-0143" readOnly /></Field>
                <Field label="Fecha de ingreso"><input type="date" className="input" defaultValue="2026-06-10" /></Field>
                <Field label="Responsable comercial">
                  <select className="input" defaultValue="Sofía Acosta"><option>Sofía Acosta</option><option>Vendedor 2</option></select>
                </Field>
                <Field label="Canal de venta">
                  <select className="input"><option>Directo</option><option>Telefónico</option><option>Email</option><option>Recurrente</option></select>
                </Field>
              </div>
            </div>
          )}

          {section === "cliente" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Cliente</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cliente">
                  <select className="input" defaultValue={base?.clientId ?? ""}>
                    <option value="">Seleccionar cliente…</option>
                    {clients.map((c) => <option key={c.id} value={c.id}>{c.company} — {c.name}</option>)}
                  </select>
                </Field>
                <Field label="Tipo de cliente"><select className="input"><option>Hotel</option><option>Restaurante</option><option>Particular</option><option>Mayorista</option></select></Field>
                <Field label="Contacto"><input className="input" placeholder="Nombre de contacto" /></Field>
                <Field label="Teléfono"><input className="input" placeholder="+598…" /></Field>
              </div>
              <p className="mt-3 text-xs text-ink-400">¿Cliente nuevo? <Link href="/clientes" className="font-semibold text-brand-600">Registralo aquí</Link></p>
            </div>
          )}

          {section === "producto" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Producto</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Tipo de producto">
                  <select className="input" defaultValue={base?.category}>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select>
                </Field>
                <Field label="Descripción"><input className="input" defaultValue={base?.product} placeholder="Ej: Sábanas king con bordado" /></Field>
                <Field label="Cantidad"><input type="number" className="input" defaultValue={base?.qty} placeholder="0" /></Field>
                <Field label="Categoría comercial"><select className="input"><option>Hotelería</option><option>Gastronomía</option><option>Residencial</option></select></Field>
              </div>
            </div>
          )}

          {section === "tecnico" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Especificaciones técnicas</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Medidas"><input className="input" defaultValue={base?.techSheet.measures} placeholder="240 x 260 cm" /></Field>
                <Field label="Tipo de tela"><input className="input" defaultValue={base?.techSheet.fabric} placeholder="Algodón 300 hilos" /></Field>
                <Field label="Color"><input className="input" defaultValue={base?.techSheet.color} placeholder="Blanco óptico" /></Field>
                <Field label="Diseño"><input className="input" defaultValue={base?.techSheet.design} placeholder="Liso, con vivo" /></Field>
                <Field label="Bordado"><input className="input" defaultValue={base?.techSheet.embroidery} placeholder="Logo dorado esquina" /></Field>
                <Field label="Acabado"><input className="input" defaultValue={base?.techSheet.finish} placeholder="Dobladillo invisible" /></Field>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Field label="Instrucciones de corte"><textarea className="input" rows={2} defaultValue={base?.techSheet.cutInstructions} /></Field>
                <Field label="Instrucciones de confección"><textarea className="input" rows={2} defaultValue={base?.techSheet.sewInstructions} /></Field>
                <Field label="Instrucciones de empaque"><textarea className="input" rows={2} defaultValue={base?.techSheet.packInstructions} /></Field>
              </div>
            </div>
          )}

          {section === "materiales" && (
            <div className="card p-6">
              <h3 className="mb-1 font-bold text-ink-900">Materiales requeridos</h3>
              <p className="mb-4 text-xs text-ink-400">Seleccioná los materiales a reservar para este pedido.</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {materials.slice(0, 12).map((m) => {
                  const sel = selMaterials.includes(m.id);
                  const avail = m.stock - m.reserved;
                  return (
                    <button type="button" key={m.id}
                      onClick={() => setSelMaterials((prev) => sel ? prev.filter((x) => x !== m.id) : [...prev, m.id])}
                      className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${sel ? "border-brand-400 bg-brand-50" : "border-ink-200 hover:bg-ink-50"}`}>
                      <div>
                        <p className="text-sm font-semibold text-ink-800">{m.name}</p>
                        <p className="text-xs text-ink-400">Disponible: {avail} {m.unit}</p>
                      </div>
                      <span className={`grid h-5 w-5 place-items-center rounded-md border ${sel ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300"}`}>{sel && <Check size={13} />}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
                <Check size={16} /> {selMaterials.length} materiales seleccionados — disponibilidad validada
              </div>
            </div>
          )}

          {section === "adjuntos" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Adjuntos y fotos</h3>
              <div className="flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 text-ink-400">
                <UploadCloud size={32} />
                <p className="mt-2 text-sm font-medium">Arrastrá fotos de tela, color, bordado o referencia</p>
                <p className="text-xs">o hacé clic para seleccionar (simulado)</p>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {["Tela", "Color", "Bordado", "Referencia"].map((t, i) => (
                  <div key={t} className={`aspect-square rounded-xl ${["bg-slate-200", "bg-blue-200", "bg-amber-200", "bg-emerald-200"][i]} flex items-end p-2`}>
                    <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-ink-700">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "prioridad" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Prioridad y fecha de entrega</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Prioridad">
                  <select className="input" defaultValue={base?.priority}><option value="urgente">Urgente</option><option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option></select>
                </Field>
                <Field label="Fecha estimada de entrega"><input type="date" className="input" defaultValue="2026-06-25" /></Field>
              </div>
            </div>
          )}

          {section === "obs" && (
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink-900">Observaciones internas</h3>
              <textarea className="input" rows={5} defaultValue={base?.internalNotes} placeholder="Notas internas para producción, advertencias, detalles especiales…" />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => toast("Borrador guardado", "info")} className="btn-outline">Guardar borrador</button>
            <div className="flex gap-2">
              <Link href="/pedidos" className="btn-ghost">Cancelar</Link>
              <button type="submit" className="btn-primary"><Check size={16} /> Crear pedido</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NuevoPedidoPage() {
  return <Suspense fallback={<div className="p-8 text-ink-400">Cargando…</div>}><NuevoPedidoInner /></Suspense>;
}
