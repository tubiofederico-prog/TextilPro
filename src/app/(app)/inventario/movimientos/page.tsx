"use client";
import { ArrowDownLeft, ArrowUpRight, Lock, Plus } from "lucide-react";
import { PageHeader, Badge, toast } from "@/components/ui";
import InventoryTabs from "@/components/InventoryTabs";

const MOVES = [
  { date: "2026-06-09 14:25", material: "Toalla premium 650g", type: "reserva", qty: 500, ref: "PED-2026-0139", by: "Sistema" },
  { date: "2026-06-09 11:10", material: "Hilo dorado para bordado", type: "salida", qty: 8, ref: "PED-2026-0142", by: "Lucía Ferreira" },
  { date: "2026-06-09 09:30", material: "Tela hotelera premium 300 hilos", type: "salida", qty: 40, ref: "PED-2026-0142", by: "Carlos Núñez" },
  { date: "2026-06-08 16:00", material: "Tela blanca algodón 200 hilos", type: "entrada", qty: 600, ref: "Compra #2281", by: "Raúl Cabrera" },
  { date: "2026-06-08 13:20", material: "Tela hotelera premium 300 hilos", type: "ajuste", qty: -4, ref: "INC-087", by: "Carlos Núñez" },
  { date: "2026-06-07 17:40", material: "Relleno siliconado edredón", type: "salida", qty: 24, ref: "PED-2026-0135", by: "Marta Giménez" },
  { date: "2026-06-07 10:15", material: "Toalla blanca rizo 500g", type: "reserva", qty: 300, ref: "PED-2026-0130", by: "Sistema" },
  { date: "2026-06-06 15:50", material: "Cenefa azul institucional", type: "salida", qty: 70, ref: "PED-2026-0137", by: "Patricia Rivas" },
  { date: "2026-06-06 09:00", material: "Hilo blanco poliéster", type: "entrada", qty: 200, ref: "Compra #2279", by: "Raúl Cabrera" },
  { date: "2026-06-05 14:30", material: "Lino europeo natural", type: "salida", qty: 45, ref: "PED-2026-0138", by: "Carlos Núñez" },
  { date: "2026-06-05 11:00", material: "Bolsa premium con logo", type: "entrada", qty: 500, ref: "Compra #2276", by: "Raúl Cabrera" },
  { date: "2026-06-04 16:20", material: "Hilo burdeos bordado", type: "salida", qty: 10, ref: "PED-2026-0141", by: "Lucía Ferreira" },
];

const meta: Record<string, { label: string; cls: string; icon: any; sign: string }> = {
  entrada: { label: "Entrada", cls: "bg-emerald-50 text-emerald-600", icon: ArrowDownLeft, sign: "+" },
  salida: { label: "Salida", cls: "bg-blue-50 text-blue-600", icon: ArrowUpRight, sign: "−" },
  reserva: { label: "Reserva", cls: "bg-amber-50 text-amber-600", icon: Lock, sign: "" },
  ajuste: { label: "Ajuste", cls: "bg-rose-50 text-rose-600", icon: ArrowUpRight, sign: "" },
};

export default function MovimientosPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Inventario" subtitle="Movimientos de entrada, salida y reservas"
        actions={<button onClick={() => toast("Registro de movimiento (simulado)", "info")} className="btn-primary"><Plus size={16} /> Registrar movimiento</button>} />
      <InventoryTabs />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-5 py-3">Fecha</th><th className="px-3 py-3">Material</th><th className="px-3 py-3">Tipo</th>
              <th className="px-3 py-3 text-right">Cantidad</th><th className="px-3 py-3">Referencia</th><th className="px-5 py-3">Responsable</th></tr></thead>
            <tbody className="divide-y divide-ink-50">
              {MOVES.map((mv, i) => {
                const m = meta[mv.type];
                const Icon = m.icon;
                return (
                  <tr key={i} className="hover:bg-ink-50/60">
                    <td className="px-5 py-3 font-mono text-xs text-ink-500">{mv.date}</td>
                    <td className="px-3 py-3 font-medium text-ink-800">{mv.material}</td>
                    <td className="px-3 py-3"><Badge className={m.cls}><Icon size={12} /> {m.label}</Badge></td>
                    <td className={`px-3 py-3 text-right font-bold ${mv.type === "salida" ? "text-blue-600" : mv.type === "entrada" ? "text-emerald-600" : "text-ink-700"}`}>{m.sign}{Math.abs(mv.qty)}</td>
                    <td className="px-3 py-3 text-brand-600">{mv.ref}</td>
                    <td className="px-5 py-3 text-ink-500">{mv.by}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
