import { Operator, Client, Material, Order, Incident, HistoryEvent } from "./types";

export const operators: Operator[] = [
  { id: "op1", name: "Marta Giménez", role: "Costurera", avatarColor: "bg-rose-500", initials: "MG", area: "Confección", active: true, email: "marta@textilpro.com", phone: "+598 99 123 456", efficiency: 96, tasksToday: 5, completedToday: 3 },
  { id: "op2", name: "Carlos Núñez", role: "Cortador", avatarColor: "bg-blue-500", initials: "CN", area: "Corte", active: true, email: "carlos@textilpro.com", phone: "+598 99 234 567", efficiency: 91, tasksToday: 4, completedToday: 2 },
  { id: "op3", name: "Lucía Ferreira", role: "Bordador", avatarColor: "bg-violet-500", initials: "LF", area: "Bordado", active: true, email: "lucia@textilpro.com", phone: "+598 99 345 678", efficiency: 88, tasksToday: 3, completedToday: 1 },
  { id: "op4", name: "Andrés Soto", role: "Empaque", avatarColor: "bg-cyan-500", initials: "AS", area: "Empaque", active: true, email: "andres@textilpro.com", phone: "+598 99 456 789", efficiency: 94, tasksToday: 6, completedToday: 4 },
  { id: "op5", name: "Patricia Rivas", role: "Costurera", avatarColor: "bg-pink-500", initials: "PR", area: "Confección", active: true, email: "patricia@textilpro.com", phone: "+598 99 567 890", efficiency: 90, tasksToday: 4, completedToday: 2 },
  { id: "op6", name: "Diego Méndez", role: "Cortador", avatarColor: "bg-indigo-500", initials: "DM", area: "Corte", active: false, email: "diego@textilpro.com", phone: "+598 99 678 901", efficiency: 85, tasksToday: 0, completedToday: 0 },
  { id: "op7", name: "Sofía Acosta", role: "Supervisor", avatarColor: "bg-emerald-500", initials: "SA", area: "Planta", active: true, email: "sofia@textilpro.com", phone: "+598 99 789 012", efficiency: 98, tasksToday: 2, completedToday: 2 },
  { id: "op8", name: "Raúl Cabrera", role: "Despacho", avatarColor: "bg-amber-500", initials: "RC", area: "Logística", active: true, email: "raul@textilpro.com", phone: "+598 99 890 123", efficiency: 92, tasksToday: 3, completedToday: 3 },
];

export const clients: Client[] = [
  { id: "c1", name: "María Vázquez", company: "Hotel Vista Mar", type: "hotel", contact: "Gerencia de Compras", phone: "+598 2 710 4500", email: "compras@vistamar.com", address: "Rambla Costanera 1200, Punta del Este", notes: "Cliente premium. Exige bordado con logo dorado en todas las piezas.", since: "2021-03-14", lastPurchase: "2026-05-28", totalOrders: 34, activeOrders: 3, lifetimeValue: 184500 },
  { id: "c2", name: "Jorge Pérez", company: "Restaurante La Terraza", type: "restaurante", contact: "Jorge Pérez", phone: "+598 2 408 1122", email: "info@laterraza.com", address: "Av. Brasil 2450, Montevideo", notes: "Servilletas color burdeos con monograma. Pedidos recurrentes mensuales.", since: "2022-07-02", lastPurchase: "2026-06-01", totalOrders: 21, activeOrders: 2, lifetimeValue: 76200 },
  { id: "c3", name: "Ana Suárez", company: "Hotel Central", type: "hotel", contact: "Recepción / Ama de llaves", phone: "+598 2 902 3030", email: "amadellaves@hotelcentral.uy", address: "18 de Julio 980, Montevideo", notes: "Estándar hotelero blanco 300 hilos. Entregas quincenales.", since: "2020-11-20", lastPurchase: "2026-05-15", totalOrders: 48, activeOrders: 2, lifetimeValue: 252800 },
  { id: "c4", name: "Federico Lima", company: "Grupo Hospedaje Norte", type: "mayorista", contact: "Federico Lima", phone: "+598 4 733 8800", email: "operaciones@hospedajenorte.com", address: "Ruta 5 km 320, Tacuarembó", notes: "Compra para 6 hoteles. Volumen alto, precio negociado.", since: "2019-05-10", lastPurchase: "2026-05-30", totalOrders: 67, activeOrders: 2, lifetimeValue: 421000 },
  { id: "c5", name: "Carolina Méndez", company: "Cliente Particular Premium", type: "particular", contact: "Carolina Méndez", phone: "+598 99 111 222", email: "caro.mendez@gmail.com", address: "Carrasco, Montevideo", notes: "Juego de cama a medida para residencia. Telas importadas.", since: "2023-09-01", lastPurchase: "2026-04-22", totalOrders: 5, activeOrders: 1, lifetimeValue: 18900 },
  { id: "c6", name: "Hernán Díaz", company: "Hotel Brisas del Plata", type: "hotel", contact: "Hernán Díaz", phone: "+598 2 600 7711", email: "compras@brisasdelplata.com", address: "Rambla República de México 4100, Montevideo", notes: "Toallas premium con cenefa azul institucional.", since: "2021-08-17", lastPurchase: "2026-05-20", totalOrders: 19, activeOrders: 1, lifetimeValue: 98400 },
  { id: "c7", name: "Valeria Romero", company: "Restaurante Mar y Cielo", type: "restaurante", contact: "Valeria Romero", phone: "+598 2 711 9090", email: "valeria@marycielo.com", address: "Parada 5 Playa Mansa, Punta del Este", notes: "Manteles y servilletas de lino. Detalle artesanal.", since: "2022-02-28", lastPurchase: "2026-03-30", totalOrders: 12, activeOrders: 0, lifetimeValue: 41300 },
  { id: "c8", name: "Gonzalo Vidal", company: "Estancia Los Aromos", type: "particular", contact: "Gonzalo Vidal", phone: "+598 99 333 444", email: "gvidal@losaromos.com", address: "Ruta 9 km 145, Maldonado", notes: "Edredones de campo personalizados. Acabado rústico premium.", since: "2024-01-12", lastPurchase: "2026-02-10", totalOrders: 3, activeOrders: 1, lifetimeValue: 12600 },
  { id: "c9", name: "Lucía Ortega", company: "Hotel Boutique El Faro", type: "hotel", contact: "Lucía Ortega", phone: "+598 4 244 5566", email: "lucia@hotelelfaro.com", address: "Faro de José Ignacio, Maldonado", notes: "Piezas de lujo, bordado fino tono sobre tono.", since: "2023-04-05", lastPurchase: "2026-05-10", totalOrders: 8, activeOrders: 1, lifetimeValue: 67200 },
  { id: "c10", name: "Martín Cáceres", company: "Resort Playa Dorada", type: "mayorista", contact: "Martín Cáceres", phone: "+598 4 277 1234", email: "abastecimiento@playadorada.com", address: "La Barra, Maldonado", notes: "Reposición temporada alta. Pedidos grandes en diciembre.", since: "2020-06-30", lastPurchase: "2026-05-25", totalOrders: 41, activeOrders: 0, lifetimeValue: 310500 },
];

export const materials: Material[] = [
  { id: "m1", name: "Tela blanca algodón 200 hilos", category: "tela", unit: "m", stock: 1240, reserved: 380, min: 400, supplier: "Tejidos del Sur", lastMovement: "2026-06-08", costPerUnit: 4.2 },
  { id: "m2", name: "Tela hotelera premium 300 hilos", category: "tela", unit: "m", stock: 210, reserved: 160, min: 250, supplier: "Importadora Lino Fino", lastMovement: "2026-06-09", costPerUnit: 9.8 },
  { id: "m3", name: "Tela percal blanco", category: "tela", unit: "m", stock: 680, reserved: 120, min: 300, supplier: "Tejidos del Sur", lastMovement: "2026-06-07", costPerUnit: 3.6 },
  { id: "m4", name: "Lino europeo natural", category: "tela", unit: "m", stock: 95, reserved: 70, min: 120, supplier: "Importadora Lino Fino", lastMovement: "2026-06-06", costPerUnit: 14.5 },
  { id: "m5", name: "Toalla blanca rizo 500g", category: "toalla", unit: "u", stock: 540, reserved: 200, min: 250, supplier: "Rizos & Co", lastMovement: "2026-06-09", costPerUnit: 6.9 },
  { id: "m6", name: "Toalla premium 650g", category: "toalla", unit: "u", stock: 180, reserved: 140, min: 200, supplier: "Rizos & Co", lastMovement: "2026-06-08", costPerUnit: 11.2 },
  { id: "m7", name: "Hilo blanco poliéster", category: "hilo", unit: "cono", stock: 420, reserved: 60, min: 100, supplier: "Hilados Continental", lastMovement: "2026-06-05", costPerUnit: 2.1 },
  { id: "m8", name: "Hilo dorado para bordado", category: "hilo", unit: "cono", stock: 38, reserved: 28, min: 50, supplier: "Hilados Continental", lastMovement: "2026-06-09", costPerUnit: 5.4 },
  { id: "m9", name: "Hilo burdeos bordado", category: "hilo", unit: "cono", stock: 64, reserved: 20, min: 40, supplier: "Hilados Continental", lastMovement: "2026-06-04", costPerUnit: 4.8 },
  { id: "m10", name: "Cinta decorativa satinada", category: "accesorio", unit: "m", stock: 320, reserved: 80, min: 150, supplier: "Mercería Atlántida", lastMovement: "2026-06-03", costPerUnit: 1.3 },
  { id: "m11", name: "Cenefa azul institucional", category: "accesorio", unit: "m", stock: 90, reserved: 70, min: 100, supplier: "Mercería Atlántida", lastMovement: "2026-06-08", costPerUnit: 2.6 },
  { id: "m12", name: "Botones de nácar", category: "accesorio", unit: "u", stock: 1500, reserved: 200, min: 500, supplier: "Mercería Atlántida", lastMovement: "2026-06-02", costPerUnit: 0.4 },
  { id: "m13", name: "Insumo para bordado (entretela)", category: "insumo", unit: "m", stock: 240, reserved: 90, min: 120, supplier: "Bordados Express", lastMovement: "2026-06-07", costPerUnit: 1.9 },
  { id: "m14", name: "Relleno siliconado edredón", category: "insumo", unit: "kg", stock: 160, reserved: 60, min: 80, supplier: "Rellenos Sur", lastMovement: "2026-06-06", costPerUnit: 7.5 },
  { id: "m15", name: "Bolsa premium con logo", category: "empaque", unit: "u", stock: 800, reserved: 150, min: 300, supplier: "Packaging Premium", lastMovement: "2026-06-09", costPerUnit: 1.1 },
  { id: "m16", name: "Caja rígida presentación", category: "empaque", unit: "u", stock: 240, reserved: 90, min: 150, supplier: "Packaging Premium", lastMovement: "2026-06-05", costPerUnit: 3.2 },
  { id: "m17", name: "Papel seda blanco", category: "empaque", unit: "pliego", stock: 1200, reserved: 100, min: 400, supplier: "Packaging Premium", lastMovement: "2026-06-01", costPerUnit: 0.2 },
  { id: "m18", name: "Etiqueta textil bordada", category: "insumo", unit: "u", stock: 70, reserved: 60, min: 200, supplier: "Bordados Express", lastMovement: "2026-06-09", costPerUnit: 0.9 },
  { id: "m19", name: "Tela microfibra blanca", category: "tela", unit: "m", stock: 410, reserved: 40, min: 200, supplier: "Tejidos del Sur", lastMovement: "2026-06-04", costPerUnit: 5.1 },
  { id: "m20", name: "Cordón decorativo trenzado", category: "accesorio", unit: "m", stock: 150, reserved: 30, min: 80, supplier: "Mercería Atlántida", lastMovement: "2026-06-03", costPerUnit: 1.7 },
];

// Helper to build a timeline given the current stage index
import { OrderStage, StageEvent } from "./types";
import { STAGE_META } from "./constants";

const FLOW: OrderStage[] = [
  "recibido", "pendiente_materiales", "en_corte", "corte_terminado",
  "en_confeccion", "confeccion_terminada", "en_bordado", "bordado_terminado",
  "en_empaque", "listo_entrega", "entregado",
];

function buildTimeline(current: OrderStage, ops: string[], startDay: number): StageEvent[] {
  if (current === "detenido") {
    return [
      { stage: "recibido", label: STAGE_META.recibido.label, operator: "Sistema", start: `${startDay}/05 08:00`, end: `${startDay}/05 08:30`, durationH: 0.5, status: "done" },
      { stage: "en_corte", label: STAGE_META.en_corte.label, operator: ops[0], start: `${startDay}/05 09:00`, end: `${startDay}/05 13:00`, durationH: 4, status: "done" },
      { stage: "detenido", label: STAGE_META.detenido.label, operator: ops[1] ?? ops[0], start: `${startDay}/05 13:30`, note: "Detenido por falta de tela premium", status: "current" },
    ];
  }
  const idx = FLOW.indexOf(current);
  return FLOW.map((s, i) => {
    const m = STAGE_META[s];
    if (i < idx) {
      return { stage: s, label: m.label, operator: ops[i % ops.length], start: `${startDay + Math.floor(i / 2)}/05 ${8 + i}:00`, end: `${startDay + Math.floor(i / 2)}/05 ${9 + i}:30`, durationH: 1.5, status: "done" as const };
    }
    if (i === idx) {
      return { stage: s, label: m.label, operator: ops[i % ops.length], start: `${startDay + Math.floor(i / 2)}/05 ${8 + i}:00`, status: "current" as const };
    }
    return { stage: s, label: m.label, status: "pending" as const };
  });
}

function att(prefix: string): import("./types").Attachment[] {
  return [
    { id: `${prefix}-a1`, name: "Muestra de tela.jpg", type: "tela", color: "bg-slate-200" },
    { id: `${prefix}-a2`, name: "Referencia color.jpg", type: "color", color: "bg-blue-200" },
    { id: `${prefix}-a3`, name: "Diseño bordado.png", type: "bordado", color: "bg-amber-200" },
    { id: `${prefix}-a4`, name: "Producto anterior.jpg", type: "referencia", color: "bg-emerald-200" },
  ];
}

export const orders: Order[] = [
  {
    id: "o1", code: "PED-2026-0142", clientId: "c1", clientName: "Hotel Vista Mar", product: "Sábanas King Size con bordado", category: "Sábanas", qty: 120, priority: "urgente", stage: "en_corte", responsible: "Carlos Núñez", salesperson: "Sofía Acosta", createdAt: "2026-06-02", dueDate: "2026-06-14", progress: 35, delayed: false, queuePosition: 1,
    techSheet: { measures: "240 x 260 cm + funda 50x70", fabric: "Tela hotelera premium 300 hilos", color: "Blanco óptico", design: "Liso con vivo doble", embroidery: "Logo Vista Mar dorado, esquina inferior", finish: "Dobladillo invisible 4cm", cutInstructions: "Cortar con margen de 3cm. Verificar hilo recto.", sewInstructions: "Costura francesa en bordes. Refuerzo en esquinas.", packInstructions: "Doblar en cuartos, papel seda + bolsa premium con logo.", specialNotes: "Cliente exige tono dorado exacto (Pantone 871C)." },
    materials: [ { materialId: "m2", name: "Tela hotelera premium 300 hilos", qty: 280, unit: "m", available: false }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 12, unit: "cono", available: true }, { materialId: "m8", name: "Hilo dorado para bordado", qty: 8, unit: "cono", available: true }, { materialId: "m15", name: "Bolsa premium con logo", qty: 120, unit: "u", available: true } ],
    attachments: att("o1"), timeline: buildTimeline("en_corte", ["Carlos Núñez", "Marta Giménez"], 5), internalNotes: "Confirmar con cliente el tono dorado antes de bordar. Pedido prioritario de temporada.",
  },
  {
    id: "o2", code: "PED-2026-0141", clientId: "c2", clientName: "Restaurante La Terraza", product: "Servilletas burdeos con monograma", category: "Servilletas", qty: 300, priority: "alta", stage: "en_bordado", responsible: "Lucía Ferreira", salesperson: "Sofía Acosta", createdAt: "2026-06-01", dueDate: "2026-06-12", progress: 62, delayed: false, queuePosition: 2,
    techSheet: { measures: "45 x 45 cm", fabric: "Tela percal blanco", color: "Blanco con monograma burdeos", design: "Monograma 'LT' centrado", embroidery: "Hilo burdeos, 6cm de alto", finish: "Dobladillo 1cm a 4 puntas", cutInstructions: "Cortar en bloques de 50. Escuadrar perfectamente.", sewInstructions: "Dobladillo a máquina recta. Inglete en esquinas.", packInstructions: "Paquetes de 25 con cinta satinada.", specialNotes: "Monograma debe quedar centrado con tolerancia ±2mm." },
    materials: [ { materialId: "m3", name: "Tela percal blanco", qty: 70, unit: "m", available: true }, { materialId: "m9", name: "Hilo burdeos bordado", qty: 10, unit: "cono", available: true }, { materialId: "m13", name: "Insumo para bordado (entretela)", qty: 30, unit: "m", available: true } ],
    attachments: att("o2"), timeline: buildTimeline("en_bordado", ["Carlos Núñez", "Patricia Rivas", "Lucía Ferreira"], 4), internalNotes: "Pedido mensual recurrente. Mantener plantilla de monograma archivada.",
  },
  {
    id: "o3", code: "PED-2026-0140", clientId: "c3", clientName: "Hotel Central", product: "Juego de fundas hoteleras premium", category: "Fundas", qty: 200, priority: "media", stage: "en_confeccion", responsible: "Marta Giménez", salesperson: "Sofía Acosta", createdAt: "2026-05-30", dueDate: "2026-06-16", progress: 48, delayed: false, queuePosition: 4,
    techSheet: { measures: "50 x 70 cm con solapa", fabric: "Tela hotelera premium 300 hilos", color: "Blanco óptico", design: "Liso con solapa interna", embroidery: "Sin bordado", finish: "Solapa 20cm, costura reforzada", cutInstructions: "Cortar con solapa incluida. Verificar simetría.", sewInstructions: "Solapa interna oculta. Doble pespunte.", packInstructions: "Pares por bolsa, etiqueta de talle.", specialNotes: "Estándar 300 hilos institucional." },
    materials: [ { materialId: "m2", name: "Tela hotelera premium 300 hilos", qty: 160, unit: "m", available: false }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 8, unit: "cono", available: true }, { materialId: "m15", name: "Bolsa premium con logo", qty: 100, unit: "u", available: true } ],
    attachments: att("o3"), timeline: buildTimeline("en_confeccion", ["Carlos Núñez", "Marta Giménez"], 3), internalNotes: "Verificar stock de tela premium, podría faltar.",
  },
  {
    id: "o4", code: "PED-2026-0139", clientId: "c4", clientName: "Grupo Hospedaje Norte", product: "Toallas blancas bordadas (lote)", category: "Toallas", qty: 500, priority: "alta", stage: "pendiente_materiales", responsible: "Sin asignar", salesperson: "Sofía Acosta", createdAt: "2026-05-29", dueDate: "2026-06-20", progress: 8, delayed: false, queuePosition: 3,
    techSheet: { measures: "70 x 140 cm", fabric: "Toalla premium 650g", color: "Blanco", design: "Cenefa lisa", embroidery: "Iniciales 'GHN' tono sobre tono", finish: "Orillo reforzado", cutInstructions: "No requiere corte, pieza confeccionada.", sewInstructions: "Bordado directo sobre cenefa.", packInstructions: "Lotes de 50 en bolsa industrial.", specialNotes: "Volumen alto. Coordinar bordado externo si excede capacidad." },
    materials: [ { materialId: "m6", name: "Toalla premium 650g", qty: 500, unit: "u", available: false }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 20, unit: "cono", available: true }, { materialId: "m13", name: "Insumo para bordado (entretela)", qty: 40, unit: "m", available: true } ],
    attachments: att("o4"), timeline: buildTimeline("pendiente_materiales", ["Sin asignar"], 2), internalNotes: "Esperando reposición de toalla premium 650g del proveedor.",
  },
  {
    id: "o5", code: "PED-2026-0138", clientId: "c5", clientName: "Cliente Particular Premium", product: "Juego de cama a medida importado", category: "Juego de cama", qty: 1, priority: "media", stage: "en_empaque", responsible: "Andrés Soto", salesperson: "Sofía Acosta", createdAt: "2026-05-26", dueDate: "2026-06-11", progress: 88, delayed: false, queuePosition: 6,
    techSheet: { measures: "Cama 200x200, sábanas + 4 fundas + cubrecama", fabric: "Lino europeo natural", color: "Marfil", design: "Ribete tono madera", embroidery: "Monograma discreto 'CM'", finish: "Acabado a mano en ribetes", cutInstructions: "Corte a medida exacta de cama king especial.", sewInstructions: "Costura a mano en ribetes visibles.", packInstructions: "Caja rígida de presentación con papel seda.", specialNotes: "Pieza de lujo. Control de calidad doble." },
    materials: [ { materialId: "m4", name: "Lino europeo natural", qty: 45, unit: "m", available: false }, { materialId: "m16", name: "Caja rígida presentación", qty: 1, unit: "u", available: true }, { materialId: "m17", name: "Papel seda blanco", qty: 20, unit: "pliego", available: true } ],
    attachments: att("o5"), timeline: buildTimeline("en_empaque", ["Carlos Núñez", "Marta Giménez", "Andrés Soto"], 2), internalNotes: "Cliente VIP. Entrega coordinada a domicilio en Carrasco.",
  },
  {
    id: "o6", code: "PED-2026-0137", clientId: "c6", clientName: "Hotel Brisas del Plata", product: "Toallas premium con cenefa azul", category: "Toallas", qty: 250, priority: "media", stage: "listo_entrega", responsible: "Raúl Cabrera", salesperson: "Sofía Acosta", createdAt: "2026-05-24", dueDate: "2026-06-10", progress: 100, delayed: false, queuePosition: 8,
    techSheet: { measures: "50 x 100 cm", fabric: "Toalla blanca rizo 500g", color: "Blanco con cenefa azul", design: "Cenefa institucional", embroidery: "Sin bordado", finish: "Orillo reforzado", cutInstructions: "Pieza confeccionada.", sewInstructions: "Aplicar cenefa azul a 8cm del borde.", packInstructions: "Lotes de 25.", specialNotes: "Color azul institucional Pantone 286C." },
    materials: [ { materialId: "m5", name: "Toalla blanca rizo 500g", qty: 250, unit: "u", available: true }, { materialId: "m11", name: "Cenefa azul institucional", qty: 70, unit: "m", available: true } ],
    attachments: att("o6"), timeline: buildTimeline("listo_entrega", ["Carlos Núñez", "Patricia Rivas", "Andrés Soto"], 1), internalNotes: "Listo para despacho. Coordinar flete.",
  },
  {
    id: "o7", code: "PED-2026-0136", clientId: "c7", clientName: "Restaurante Mar y Cielo", product: "Manteles de lino artesanales", category: "Manteles", qty: 60, priority: "baja", stage: "entregado", responsible: "Raúl Cabrera", salesperson: "Sofía Acosta", createdAt: "2026-05-15", dueDate: "2026-06-02", progress: 100, delayed: false,
    techSheet: { measures: "180 x 320 cm", fabric: "Lino europeo natural", color: "Natural crudo", design: "Bordes deshilachados artesanales", embroidery: "Sin bordado", finish: "Dobladillo a mano artesanal", cutInstructions: "Corte respetando trama para deshilachado.", sewInstructions: "Dobladillo a mano. Acabado rústico.", packInstructions: "Enrollado en tubo, papel seda.", specialNotes: "Acabado artesanal, cada pieza única." },
    materials: [ { materialId: "m4", name: "Lino europeo natural", qty: 120, unit: "m", available: true } ],
    attachments: att("o7"), timeline: buildTimeline("entregado", ["Carlos Núñez", "Marta Giménez", "Andrés Soto"], 1), internalNotes: "Entregado y conforme. Cliente solicitó presupuesto para servilletas a juego.",
  },
  {
    id: "o8", code: "PED-2026-0135", clientId: "c8", clientName: "Estancia Los Aromos", product: "Edredones de campo personalizados", category: "Edredones", qty: 8, priority: "baja", stage: "detenido", responsible: "Marta Giménez", salesperson: "Sofía Acosta", createdAt: "2026-05-20", dueDate: "2026-06-18", progress: 25, delayed: true,
    techSheet: { measures: "230 x 250 cm", fabric: "Tela percal blanco", color: "Blanco con estampa campo", design: "Patchwork rústico", embroidery: "Sin bordado", finish: "Pespunte cuadriculado, relleno siliconado", cutInstructions: "Cortar paneles de patchwork.", sewInstructions: "Ensamble de patchwork + relleno.", packInstructions: "Bolsa de tela transpirable.", specialNotes: "Diseño rústico premium, relleno extra grueso." },
    materials: [ { materialId: "m3", name: "Tela percal blanco", qty: 90, unit: "m", available: true }, { materialId: "m14", name: "Relleno siliconado edredón", qty: 24, unit: "kg", available: false } ],
    attachments: att("o8"), timeline: buildTimeline("detenido", ["Carlos Núñez", "Marta Giménez"], 5), internalNotes: "DETENIDO: falta relleno siliconado. Proveedor entrega en 3 días.",
  },
  {
    id: "o9", code: "PED-2026-0134", clientId: "c9", clientName: "Hotel Boutique El Faro", product: "Sábanas de lujo bordado tono sobre tono", category: "Sábanas", qty: 40, priority: "alta", stage: "corte_terminado", responsible: "Carlos Núñez", salesperson: "Sofía Acosta", createdAt: "2026-06-03", dueDate: "2026-06-15", progress: 30, delayed: false, queuePosition: 5,
    techSheet: { measures: "240 x 260 cm", fabric: "Tela hotelera premium 300 hilos", color: "Blanco óptico", design: "Liso elegante", embroidery: "Filete fino tono sobre tono", finish: "Dobladillo invisible", cutInstructions: "Corte de precisión, verificar simetría.", sewInstructions: "Costura francesa premium.", packInstructions: "Caja rígida con papel seda.", specialNotes: "Bordado discreto, máxima sutileza." },
    materials: [ { materialId: "m2", name: "Tela hotelera premium 300 hilos", qty: 100, unit: "m", available: false }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 6, unit: "cono", available: true } ],
    attachments: att("o9"), timeline: buildTimeline("corte_terminado", ["Carlos Núñez"], 3), internalNotes: "Bordado tono sobre tono requiere prueba previa de tensión.",
  },
  {
    id: "o10", code: "PED-2026-0133", clientId: "c10", clientName: "Resort Playa Dorada", product: "Reposición sábanas estándar (lote)", category: "Sábanas", qty: 400, priority: "media", stage: "en_corte", responsible: "Diego Méndez", salesperson: "Sofía Acosta", createdAt: "2026-05-31", dueDate: "2026-06-19", progress: 22, delayed: false, queuePosition: 7,
    techSheet: { measures: "200 x 230 cm", fabric: "Tela blanca algodón 200 hilos", color: "Blanco", design: "Liso estándar", embroidery: "Sin bordado", finish: "Dobladillo estándar 3cm", cutInstructions: "Corte en serie automatizado.", sewInstructions: "Dobladillo a máquina overlock.", packInstructions: "Lotes de 50 en bolsa industrial.", specialNotes: "Producción en serie. Optimizar tiempos." },
    materials: [ { materialId: "m1", name: "Tela blanca algodón 200 hilos", qty: 380, unit: "m", available: true }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 16, unit: "cono", available: true } ],
    attachments: att("o10"), timeline: buildTimeline("en_corte", ["Diego Méndez", "Patricia Rivas"], 4), internalNotes: "Lote grande de reposición. Cliente mayorista habitual.",
  },
  {
    id: "o11", code: "PED-2026-0132", clientId: "c1", clientName: "Hotel Vista Mar", product: "Fundas decorativas con vivo dorado", category: "Fundas", qty: 80, priority: "media", stage: "confeccion_terminada", responsible: "Patricia Rivas", salesperson: "Sofía Acosta", createdAt: "2026-05-28", dueDate: "2026-06-17", progress: 55, delayed: false, queuePosition: 9,
    techSheet: { measures: "45 x 45 cm", fabric: "Tela hotelera premium 300 hilos", color: "Blanco con vivo dorado", design: "Vivo perimetral dorado", embroidery: "Logo pequeño esquina", finish: "Cierre invisible", cutInstructions: "Corte cuadrado preciso.", sewInstructions: "Aplicar vivo dorado perimetral.", packInstructions: "Pares en bolsa premium.", specialNotes: "Combina con sábanas PED-2026-0142." },
    materials: [ { materialId: "m2", name: "Tela hotelera premium 300 hilos", qty: 50, unit: "m", available: false }, { materialId: "m10", name: "Cinta decorativa satinada", qty: 80, unit: "m", available: true }, { materialId: "m8", name: "Hilo dorado para bordado", qty: 4, unit: "cono", available: true } ],
    attachments: att("o11"), timeline: buildTimeline("confeccion_terminada", ["Carlos Núñez", "Patricia Rivas"], 2), internalNotes: "Coordinar entrega junto con pedido 0142.",
  },
  {
    id: "o12", code: "PED-2026-0131", clientId: "c2", clientName: "Restaurante La Terraza", product: "Manteles burdeos a juego", category: "Manteles", qty: 40, priority: "baja", stage: "recibido", responsible: "Sin asignar", salesperson: "Sofía Acosta", createdAt: "2026-06-05", dueDate: "2026-06-22", progress: 4, delayed: false, queuePosition: 10,
    techSheet: { measures: "150 x 250 cm", fabric: "Tela percal blanco", color: "Burdeos", design: "Liso con dobladillo", embroidery: "Sin bordado", finish: "Dobladillo recto", cutInstructions: "Corte estándar.", sewInstructions: "Dobladillo a máquina.", packInstructions: "Doblado en bolsa.", specialNotes: "A juego con servilletas LT." },
    materials: [ { materialId: "m3", name: "Tela percal blanco", qty: 110, unit: "m", available: true } ],
    attachments: att("o12"), timeline: buildTimeline("recibido", ["Sin asignar"], 5), internalNotes: "Pendiente de asignar responsable y enviar a producción.",
  },
  {
    id: "o13", code: "PED-2026-0130", clientId: "c3", clientName: "Hotel Central", product: "Toallas estándar reposición", category: "Toallas", qty: 300, priority: "media", stage: "bordado_terminado", responsible: "Lucía Ferreira", salesperson: "Sofía Acosta", createdAt: "2026-05-27", dueDate: "2026-06-13", progress: 70, delayed: false, queuePosition: 11,
    techSheet: { measures: "50 x 90 cm", fabric: "Toalla blanca rizo 500g", color: "Blanco", design: "Cenefa lisa", embroidery: "Iniciales 'HC'", finish: "Orillo reforzado", cutInstructions: "Pieza confeccionada.", sewInstructions: "Bordado sobre cenefa.", packInstructions: "Lotes de 30.", specialNotes: "Estándar reposición quincenal." },
    materials: [ { materialId: "m5", name: "Toalla blanca rizo 500g", qty: 300, unit: "u", available: true }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 8, unit: "cono", available: true } ],
    attachments: att("o13"), timeline: buildTimeline("bordado_terminado", ["Carlos Núñez", "Patricia Rivas", "Lucía Ferreira"], 2), internalNotes: "Bordado finalizado, pasa a empaque.",
  },
  {
    id: "o14", code: "PED-2026-0129", clientId: "c4", clientName: "Grupo Hospedaje Norte", product: "Cubrecamas matrimoniales", category: "Edredones", qty: 120, priority: "alta", stage: "en_confeccion", responsible: "Marta Giménez", salesperson: "Sofía Acosta", createdAt: "2026-05-25", dueDate: "2026-06-14", progress: 45, delayed: true, queuePosition: 12,
    techSheet: { measures: "230 x 250 cm", fabric: "Tela microfibra blanca", color: "Blanco", design: "Pespunte rombos", embroidery: "Sin bordado", finish: "Relleno liviano, pespunte decorativo", cutInstructions: "Corte en serie.", sewInstructions: "Pespunte de rombos + relleno.", packInstructions: "Bolsa con cierre, lotes de 20.", specialNotes: "Pedido atrasado, priorizar confección." },
    materials: [ { materialId: "m19", name: "Tela microfibra blanca", qty: 280, unit: "m", available: true }, { materialId: "m14", name: "Relleno siliconado edredón", qty: 60, unit: "kg", available: false }, { materialId: "m7", name: "Hilo blanco poliéster", qty: 14, unit: "cono", available: true } ],
    attachments: att("o14"), timeline: buildTimeline("en_confeccion", ["Diego Méndez", "Marta Giménez"], 3), internalNotes: "ATRASADO 1 día. Reforzar turno de confección.",
  },
  {
    id: "o15", code: "PED-2026-0128", clientId: "c9", clientName: "Hotel Boutique El Faro", product: "Set de servilletas de lino premium", category: "Servilletas", qty: 150, priority: "baja", stage: "entregado", responsible: "Raúl Cabrera", salesperson: "Sofía Acosta", createdAt: "2026-05-10", dueDate: "2026-05-28", progress: 100, delayed: false,
    techSheet: { measures: "50 x 50 cm", fabric: "Lino europeo natural", color: "Marfil", design: "Dobladillo inglés", embroidery: "Sin bordado", finish: "Dobladillo a 4 puntas inglete", cutInstructions: "Corte preciso a escuadra.", sewInstructions: "Dobladillo inglés a máquina.", packInstructions: "Paquetes de 25 con cordón.", specialNotes: "Lino premium, control de calidad estricto." },
    materials: [ { materialId: "m4", name: "Lino europeo natural", qty: 60, unit: "m", available: true }, { materialId: "m20", name: "Cordón decorativo trenzado", qty: 30, unit: "m", available: true } ],
    attachments: att("o15"), timeline: buildTimeline("entregado", ["Carlos Núñez", "Marta Giménez", "Andrés Soto"], 1), internalNotes: "Entregado conforme. Excelente feedback del cliente.",
  },
];

export const incidents: Incident[] = [
  { id: "i1", code: "INC-088", orderCode: "PED-2026-0135", type: "falta_material", stage: "Confección", reportedBy: "Marta Giménez", date: "2026-06-08", status: "abierta", description: "No hay relleno siliconado suficiente para completar los 8 edredones.", impact: "Pedido detenido, retraso de 3 días estimado", severity: "alta" },
  { id: "i2", code: "INC-087", orderCode: "PED-2026-0142", type: "tela_danada", stage: "Corte", reportedBy: "Carlos Núñez", date: "2026-06-07", status: "en_revision", description: "Rollo de tela premium con mancha en 4m. Se descartó la sección.", resolution: "Solicitada reposición parcial al proveedor.", impact: "Pérdida de 4m de tela, sin impacto en entrega", severity: "media" },
  { id: "i3", code: "INC-086", orderCode: "PED-2026-0129", type: "demora_confeccion", stage: "Confección", reportedBy: "Sofía Acosta", date: "2026-06-06", status: "en_revision", description: "Confección de cubrecamas demorando más del promedio por complejidad del pespunte.", impact: "Posible retraso de 1 día", severity: "media" },
  { id: "i4", code: "INC-085", orderCode: "PED-2026-0140", type: "error_medida", stage: "Corte", reportedBy: "Carlos Núñez", date: "2026-06-05", status: "resuelta", description: "Primeras 10 fundas cortadas 2cm más cortas de lo especificado.", resolution: "Se recortaron nuevas piezas. Ajustado el patrón de corte.", impact: "10 piezas descartadas, recuperado", severity: "baja" },
  { id: "i5", code: "INC-084", orderCode: "PED-2026-0134", type: "demora_corte", stage: "Bordado externo", reportedBy: "Sofía Acosta", date: "2026-06-04", status: "escalada", description: "Taller de bordado externo demora la devolución de toallas GHN.", impact: "Riesgo de retraso en pedido de volumen", severity: "alta" },
  { id: "i6", code: "INC-083", orderCode: "PED-2026-0136", type: "reclamo_cliente", stage: "Post-entrega", reportedBy: "Raúl Cabrera", date: "2026-05-30", status: "resuelta", description: "Cliente reportó 2 manteles con dobladillo irregular.", resolution: "Se repusieron las 2 piezas sin costo. Cliente conforme.", impact: "Reposición de 2 piezas", severity: "baja" },
  { id: "i7", code: "INC-082", orderCode: "PED-2026-0142", type: "problema_bordado", stage: "Bordado", reportedBy: "Lucía Ferreira", date: "2026-06-09", status: "abierta", description: "Tensión del hilo dorado genera frunce en el logo. Requiere ajuste de máquina.", impact: "Bordado en pausa hasta ajuste", severity: "media" },
  { id: "i8", code: "INC-081", orderCode: "PED-2026-0133", type: "tela_danada", stage: "Corte", reportedBy: "Diego Méndez", date: "2026-06-03", status: "resuelta", description: "Defecto de tejido en 2m de algodón 200 hilos.", resolution: "Sección descartada, stock suficiente.", impact: "Mínimo", severity: "baja" },
  { id: "i9", code: "INC-080", orderCode: "PED-2026-0138", type: "defecto_entrega", stage: "Control calidad", reportedBy: "Sofía Acosta", date: "2026-06-02", status: "resuelta", description: "Detectado hilo suelto en ribete del cubrecama de lujo durante QC.", resolution: "Corregido antes de empaque.", impact: "Sin impacto, detectado a tiempo", severity: "baja" },
  { id: "i10", code: "INC-079", orderCode: "PED-2026-0129", type: "falta_material", stage: "Confección", reportedBy: "Marta Giménez", date: "2026-06-06", status: "en_revision", description: "Relleno siliconado insuficiente para los 120 cubrecamas.", impact: "Compartido con INC-088, compra urgente", severity: "alta" },
  { id: "i11", code: "INC-078", orderCode: "PED-2026-0141", type: "problema_bordado", stage: "Bordado", reportedBy: "Lucía Ferreira", date: "2026-05-31", status: "resuelta", description: "Monograma descentrado en lote de prueba de 5 servilletas.", resolution: "Recalibrada la plantilla. Lote rehecho.", impact: "5 piezas de prueba", severity: "baja" },
  { id: "i12", code: "INC-077", orderCode: "PED-2026-0128", type: "reclamo_cliente", stage: "Post-entrega", reportedBy: "Raúl Cabrera", date: "2026-05-29", status: "resuelta", description: "Cliente consultó por variación de tono entre lotes de lino.", resolution: "Explicada la naturaleza del lino natural. Cliente conforme.", impact: "Ninguno", severity: "baja" },
];

export const history: HistoryEvent[] = [
  { id: "h1", date: "2026-06-09", time: "16:42", type: "Incidencia", orderCode: "PED-2026-0142", client: "Hotel Vista Mar", operator: "Lucía Ferreira", stage: "Bordado", description: "Incidencia registrada: frunce en bordado dorado", icon: "alert" },
  { id: "h2", date: "2026-06-09", time: "15:10", type: "Etapa", orderCode: "PED-2026-0130", client: "Hotel Central", operator: "Lucía Ferreira", stage: "Bordado", description: "Bordado terminado — 300 toallas", icon: "check" },
  { id: "h3", date: "2026-06-09", time: "14:25", type: "Material", orderCode: "PED-2026-0139", operator: "Sistema", description: "Reserva de 500 toallas premium para GHN", icon: "box" },
  { id: "h4", date: "2026-06-09", time: "11:30", type: "Etapa", orderCode: "PED-2026-0138", client: "Cliente Particular Premium", operator: "Andrés Soto", stage: "Empaque", description: "Inicio de empaque del juego de cama a medida", icon: "play" },
  { id: "h5", date: "2026-06-09", time: "09:15", type: "Pedido", orderCode: "PED-2026-0142", client: "Hotel Vista Mar", operator: "Carlos Núñez", stage: "Corte", description: "Corte iniciado — sábanas king bordadas", icon: "play" },
  { id: "h6", date: "2026-06-08", time: "17:50", type: "Incidencia", orderCode: "PED-2026-0135", client: "Estancia Los Aromos", operator: "Marta Giménez", stage: "Confección", description: "Pedido detenido por falta de relleno siliconado", icon: "stop" },
  { id: "h7", date: "2026-06-08", time: "16:00", type: "Etapa", orderCode: "PED-2026-0137", client: "Hotel Brisas del Plata", operator: "Andrés Soto", stage: "Empaque", description: "Pedido listo para entrega — 250 toallas", icon: "check" },
  { id: "h8", date: "2026-06-08", time: "13:20", type: "Material", orderCode: "PED-2026-0142", operator: "Carlos Núñez", description: "Incidencia: tela premium con mancha, sección descartada", icon: "alert" },
  { id: "h9", date: "2026-06-08", time: "10:45", type: "Etapa", orderCode: "PED-2026-0140", client: "Hotel Central", operator: "Marta Giménez", stage: "Confección", description: "Confección iniciada — fundas hoteleras", icon: "play" },
  { id: "h10", date: "2026-06-07", time: "18:00", type: "Pedido", orderCode: "PED-2026-0136", client: "Restaurante Mar y Cielo", operator: "Raúl Cabrera", stage: "Despacho", description: "Pedido entregado — manteles de lino", icon: "truck" },
  { id: "h11", date: "2026-06-07", time: "15:30", type: "Material", operator: "Sistema", description: "Alerta: hilo dorado por debajo del stock mínimo", icon: "box" },
  { id: "h12", date: "2026-06-07", time: "12:10", type: "Etapa", orderCode: "PED-2026-0134", client: "Grupo Hospedaje Norte", operator: "Sofía Acosta", stage: "Bordado externo", description: "Lote enviado a taller de bordado externo", icon: "truck" },
  { id: "h13", date: "2026-06-06", time: "16:20", type: "Pedido", orderCode: "PED-2026-0131", client: "Restaurante La Terraza", operator: "Sofía Acosta", description: "Nuevo pedido creado — manteles burdeos", icon: "plus" },
  { id: "h14", date: "2026-06-06", time: "14:00", type: "Incidencia", orderCode: "PED-2026-0129", client: "Grupo Hospedaje Norte", operator: "Sofía Acosta", stage: "Confección", description: "Demora en confección reportada", icon: "alert" },
  { id: "h15", date: "2026-06-06", time: "09:30", type: "Etapa", orderCode: "PED-2026-0134", client: "Grupo Hospedaje Norte", operator: "Carlos Núñez", stage: "Corte", description: "Corte terminado — preparado para bordado", icon: "check" },
  { id: "h16", date: "2026-06-05", time: "17:00", type: "Pedido", orderCode: "PED-2026-0131", client: "Restaurante La Terraza", operator: "Sofía Acosta", description: "Pedido ingresado al sistema", icon: "plus" },
  { id: "h17", date: "2026-06-05", time: "11:15", type: "Incidencia", orderCode: "PED-2026-0140", client: "Hotel Central", operator: "Carlos Núñez", stage: "Corte", description: "Error de medida corregido en fundas", icon: "alert" },
  { id: "h18", date: "2026-06-04", time: "16:40", type: "Incidencia", orderCode: "PED-2026-0134", operator: "Sofía Acosta", stage: "Bordado externo", description: "Escalada: demora de taller externo", icon: "alert" },
  { id: "h19", date: "2026-06-04", time: "10:00", type: "Etapa", orderCode: "PED-2026-0133", client: "Resort Playa Dorada", operator: "Diego Méndez", stage: "Corte", description: "Corte iniciado — lote de 400 sábanas", icon: "play" },
  { id: "h20", date: "2026-06-03", time: "15:25", type: "Etapa", orderCode: "PED-2026-0134", client: "Hotel Boutique El Faro", operator: "Carlos Núñez", stage: "Corte", description: "Corte iniciado — sábanas de lujo", icon: "play" },
  { id: "h21", date: "2026-06-03", time: "12:00", type: "Material", orderCode: "PED-2026-0133", operator: "Diego Méndez", description: "Incidencia menor: defecto de tejido descartado", icon: "box" },
  { id: "h22", date: "2026-06-02", time: "17:30", type: "Pedido", orderCode: "PED-2026-0142", client: "Hotel Vista Mar", operator: "Sofía Acosta", description: "Nuevo pedido urgente creado", icon: "plus" },
  { id: "h23", date: "2026-06-02", time: "14:15", type: "Etapa", orderCode: "PED-2026-0138", client: "Cliente Particular Premium", operator: "Sofía Acosta", stage: "Control calidad", description: "QC: hilo suelto corregido en ribete", icon: "check" },
  { id: "h24", date: "2026-06-02", time: "09:00", type: "Pedido", orderCode: "PED-2026-0136", client: "Restaurante Mar y Cielo", operator: "Raúl Cabrera", description: "Pedido marcado como entregado", icon: "truck" },
  { id: "h25", date: "2026-06-01", time: "16:50", type: "Etapa", orderCode: "PED-2026-0141", client: "Restaurante La Terraza", operator: "Lucía Ferreira", stage: "Bordado", description: "Bordado de monograma iniciado", icon: "play" },
  { id: "h26", date: "2026-06-01", time: "10:30", type: "Pedido", orderCode: "PED-2026-0141", client: "Restaurante La Terraza", operator: "Sofía Acosta", description: "Pedido enviado a producción", icon: "send" },
  { id: "h27", date: "2026-05-31", time: "15:00", type: "Incidencia", orderCode: "PED-2026-0141", operator: "Lucía Ferreira", stage: "Bordado", description: "Monograma descentrado en prueba, plantilla recalibrada", icon: "alert" },
  { id: "h28", date: "2026-05-31", time: "11:20", type: "Pedido", orderCode: "PED-2026-0133", client: "Resort Playa Dorada", operator: "Sofía Acosta", description: "Pedido de reposición creado", icon: "plus" },
  { id: "h29", date: "2026-05-30", time: "16:00", type: "Pedido", orderCode: "PED-2026-0140", client: "Hotel Central", operator: "Sofía Acosta", description: "Pedido enviado a producción", icon: "send" },
  { id: "h30", date: "2026-05-30", time: "09:45", type: "Material", orderCode: "PED-2026-0139", operator: "Sistema", description: "Reserva de materiales para lote GHN", icon: "box" },
];

// ===== Helpers de consulta =====
export const getOrder = (id: string) => orders.find((o) => o.id === id);
export const getOrderByCode = (code: string) => orders.find((o) => o.code === code);
export const getClient = (id: string) => clients.find((c) => c.id === id);
export const getClientOrders = (clientId: string) => orders.filter((o) => o.clientId === clientId);
export const getOperator = (name: string) => operators.find((o) => o.name === name);
