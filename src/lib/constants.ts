import { OrderStage, Priority, IncidentType, IncidentStatus, ClientType, MaterialCategory } from "./types";

export const STAGE_META: Record<OrderStage, { label: string; short: string; color: string; bg: string; dot: string }> = {
  recibido: { label: "Pedido recibido", short: "Recibido", color: "text-slate-700", bg: "bg-slate-100", dot: "bg-slate-400" },
  pendiente_materiales: { label: "Pendiente de materiales", short: "Pend. materiales", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
  en_corte: { label: "En corte", short: "En corte", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
  corte_terminado: { label: "Corte terminado", short: "Corte ok", color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-400" },
  en_confeccion: { label: "En confección", short: "Confección", color: "text-indigo-700", bg: "bg-indigo-100", dot: "bg-indigo-500" },
  confeccion_terminada: { label: "Confección terminada", short: "Confección ok", color: "text-indigo-700", bg: "bg-indigo-50", dot: "bg-indigo-400" },
  en_bordado: { label: "En bordado", short: "Bordado", color: "text-violet-700", bg: "bg-violet-100", dot: "bg-violet-500" },
  bordado_terminado: { label: "Bordado terminado", short: "Bordado ok", color: "text-violet-700", bg: "bg-violet-50", dot: "bg-violet-400" },
  en_empaque: { label: "En empaque", short: "Empaque", color: "text-cyan-700", bg: "bg-cyan-100", dot: "bg-cyan-500" },
  listo_entrega: { label: "Listo para entrega", short: "Listo", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  entregado: { label: "Entregado", short: "Entregado", color: "text-emerald-800", bg: "bg-emerald-50", dot: "bg-emerald-600" },
  detenido: { label: "Detenido / incidencia", short: "Detenido", color: "text-rose-700", bg: "bg-rose-100", dot: "bg-rose-500" },
};

export const KANBAN_STAGES: OrderStage[] = [
  "recibido",
  "pendiente_materiales",
  "en_corte",
  "en_confeccion",
  "en_bordado",
  "en_empaque",
  "listo_entrega",
  "entregado",
];

export const PRIORITY_META: Record<Priority, { label: string; color: string; bg: string; ring: string }> = {
  urgente: { label: "Urgente", color: "text-rose-700", bg: "bg-rose-100", ring: "ring-rose-200" },
  alta: { label: "Alta", color: "text-orange-700", bg: "bg-orange-100", ring: "ring-orange-200" },
  media: { label: "Media", color: "text-blue-700", bg: "bg-blue-100", ring: "ring-blue-200" },
  baja: { label: "Baja", color: "text-slate-600", bg: "bg-slate-100", ring: "ring-slate-200" },
};

export const INCIDENT_TYPE_LABEL: Record<IncidentType, string> = {
  tela_danada: "Tela dañada",
  falta_material: "Falta de material",
  error_medida: "Error de medida",
  demora_corte: "Demora en corte",
  demora_confeccion: "Demora en confección",
  problema_bordado: "Problema de bordado",
  defecto_entrega: "Producto con defecto",
  reclamo_cliente: "Reclamo de cliente",
};

export const INCIDENT_STATUS_META: Record<IncidentStatus, { label: string; color: string; bg: string }> = {
  abierta: { label: "Abierta", color: "text-rose-700", bg: "bg-rose-100" },
  en_revision: { label: "En revisión", color: "text-amber-700", bg: "bg-amber-100" },
  resuelta: { label: "Resuelta", color: "text-emerald-700", bg: "bg-emerald-100" },
  escalada: { label: "Escalada", color: "text-violet-700", bg: "bg-violet-100" },
};

export const CLIENT_TYPE_LABEL: Record<ClientType, string> = {
  hotel: "Hotel",
  restaurante: "Restaurante",
  particular: "Particular Premium",
  mayorista: "Mayorista",
};

export const MATERIAL_CAT_LABEL: Record<MaterialCategory, string> = {
  tela: "Tela",
  toalla: "Toalla",
  hilo: "Hilo",
  accesorio: "Accesorio",
  empaque: "Empaque",
  insumo: "Insumo",
};
