// ===== Tipos del dominio TextilPro =====

export type Priority = "urgente" | "alta" | "media" | "baja";

export type OrderStage =
  | "recibido"
  | "pendiente_materiales"
  | "en_corte"
  | "corte_terminado"
  | "en_confeccion"
  | "confeccion_terminada"
  | "en_bordado"
  | "bordado_terminado"
  | "en_empaque"
  | "listo_entrega"
  | "entregado"
  | "detenido";

export type ClientType = "hotel" | "restaurante" | "particular" | "mayorista";

export type MaterialCategory = "tela" | "toalla" | "hilo" | "accesorio" | "empaque" | "insumo";

export type IncidentType =
  | "tela_danada"
  | "falta_material"
  | "error_medida"
  | "demora_corte"
  | "demora_confeccion"
  | "problema_bordado"
  | "defecto_entrega"
  | "reclamo_cliente";

export type IncidentStatus = "abierta" | "en_revision" | "resuelta" | "escalada";

export type Role =
  | "Administrador"
  | "Vendedor"
  | "Cortador"
  | "Costurera"
  | "Bordador"
  | "Empaque"
  | "Despacho"
  | "Supervisor";

export interface Operator {
  id: string;
  name: string;
  role: Role;
  avatarColor: string;
  initials: string;
  area: string;
  active: boolean;
  email: string;
  phone: string;
  efficiency: number; // %
  tasksToday: number;
  completedToday: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  type: ClientType;
  contact: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  since: string;
  lastPurchase: string;
  totalOrders: number;
  activeOrders: number;
  lifetimeValue: number;
}

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  unit: string;
  stock: number;
  reserved: number;
  min: number;
  supplier: string;
  lastMovement: string;
  costPerUnit: number;
}

export interface StageEvent {
  stage: OrderStage;
  label: string;
  operator?: string;
  start?: string;
  end?: string;
  durationH?: number;
  note?: string;
  status: "done" | "current" | "pending";
}

export interface OrderMaterial {
  materialId: string;
  name: string;
  qty: number;
  unit: string;
  available: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: "tela" | "color" | "bordado" | "final" | "referencia";
  color: string;
}

export interface TechSheet {
  measures: string;
  fabric: string;
  color: string;
  design: string;
  embroidery: string;
  finish: string;
  cutInstructions: string;
  sewInstructions: string;
  packInstructions: string;
  specialNotes: string;
}

export interface Order {
  id: string;
  code: string;
  clientId: string;
  clientName: string;
  product: string;
  category: string;
  qty: number;
  priority: Priority;
  stage: OrderStage;
  responsible: string;
  salesperson: string;
  createdAt: string;
  dueDate: string;
  progress: number; // 0-100
  delayed: boolean;
  techSheet: TechSheet;
  materials: OrderMaterial[];
  attachments: Attachment[];
  timeline: StageEvent[];
  internalNotes: string;
  queuePosition?: number;
}

export interface Incident {
  id: string;
  code: string;
  orderCode: string;
  type: IncidentType;
  stage: string;
  reportedBy: string;
  date: string;
  status: IncidentStatus;
  description: string;
  resolution?: string;
  impact: string;
  severity: "alta" | "media" | "baja";
}

export interface HistoryEvent {
  id: string;
  date: string;
  time: string;
  type: string;
  orderCode?: string;
  client?: string;
  operator?: string;
  stage?: string;
  description: string;
  icon: string;
}
