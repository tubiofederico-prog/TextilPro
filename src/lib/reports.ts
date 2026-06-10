export const productionByDay = [
  { day: "Lun", pedidos: 8, entregados: 5 },
  { day: "Mar", pedidos: 11, entregados: 7 },
  { day: "Mié", pedidos: 9, entregados: 8 },
  { day: "Jue", pedidos: 13, entregados: 9 },
  { day: "Vie", pedidos: 12, entregados: 11 },
  { day: "Sáb", pedidos: 6, entregados: 6 },
  { day: "Dom", pedidos: 2, entregados: 1 },
];

export const ordersByStage = [
  { name: "Recibido", value: 2, color: "#94a3b8" },
  { name: "En corte", value: 3, color: "#3b82f6" },
  { name: "Confección", value: 3, color: "#6366f1" },
  { name: "Bordado", value: 2, color: "#8b5cf6" },
  { name: "Empaque", value: 1, color: "#06b6d4" },
  { name: "Entregado", value: 3, color: "#10b981" },
  { name: "Detenido", value: 1, color: "#f43f5e" },
];

export const avgTimePerStage = [
  { etapa: "Corte", horas: 4.2 },
  { etapa: "Confección", horas: 8.6 },
  { etapa: "Bordado", horas: 6.1 },
  { etapa: "Empaque", horas: 2.3 },
  { etapa: "Despacho", horas: 1.1 },
];

export const materialConsumption = [
  { mes: "Ene", consumo: 1240 },
  { mes: "Feb", consumo: 1380 },
  { mes: "Mar", consumo: 1190 },
  { mes: "Abr", consumo: 1620 },
  { mes: "May", consumo: 1840 },
  { mes: "Jun", consumo: 980 },
];

export const monthlyProduction = [
  { mes: "Ene", terminados: 142, atrasados: 8 },
  { mes: "Feb", terminados: 168, atrasados: 12 },
  { mes: "Mar", terminados: 151, atrasados: 6 },
  { mes: "Abr", terminados: 189, atrasados: 14 },
  { mes: "May", terminados: 204, atrasados: 9 },
  { mes: "Jun", terminados: 96, atrasados: 4 },
];

export const incidentsByType = [
  { name: "Falta material", value: 4, color: "#f43f5e" },
  { name: "Tela dañada", value: 2, color: "#f97316" },
  { name: "Error medida", value: 1, color: "#eab308" },
  { name: "Demoras", value: 2, color: "#8b5cf6" },
  { name: "Bordado", value: 2, color: "#06b6d4" },
  { name: "Reclamo cliente", value: 2, color: "#64748b" },
];

export const topClients = [
  { name: "Grupo Hospedaje Norte", pedidos: 67 },
  { name: "Hotel Central", pedidos: 48 },
  { name: "Resort Playa Dorada", pedidos: 41 },
  { name: "Hotel Vista Mar", pedidos: 34 },
  { name: "Restaurante La Terraza", pedidos: 21 },
];

export const topProducts = [
  { name: "Sábanas", value: 38, color: "#1e66f1" },
  { name: "Toallas", value: 27, color: "#06b6d4" },
  { name: "Fundas", value: 18, color: "#8b5cf6" },
  { name: "Servilletas", value: 11, color: "#10b981" },
  { name: "Edredones", value: 6, color: "#f59e0b" },
];

export const operatorProductivity = [
  { name: "Marta G.", piezas: 142 },
  { name: "Carlos N.", piezas: 128 },
  { name: "Patricia R.", piezas: 119 },
  { name: "Lucía F.", piezas: 96 },
  { name: "Andrés S.", piezas: 156 },
  { name: "Diego M.", piezas: 87 },
];

export const insights = [
  { tone: "amber", icon: "trending", title: "Confección demorada", text: "La etapa de confección está demorando 22% más que el promedio histórico esta semana." },
  { tone: "rose", icon: "box", title: "Stock crítico próximo", text: "La tela blanca premium 300 hilos alcanzará stock crítico en 4 días al ritmo actual." },
  { tone: "violet", icon: "factory", title: "Cuello de botella en corte", text: "Los pedidos urgentes están concentrados en la etapa de corte (3 simultáneos)." },
  { tone: "cyan", icon: "alert", title: "Bordado externo", text: "El bordado externo está generando retrasos recurrentes (2 incidencias este mes)." },
  { tone: "emerald", icon: "check", title: "Productividad de empaque", text: "El área de empaque opera 8% por encima del objetivo. Capacidad disponible." },
];
