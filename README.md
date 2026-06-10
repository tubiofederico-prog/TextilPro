# TextilPro — Torre de Control de Producción Textil

Prototipo visual **ultra premium B2B** para una fábrica de blancos (sábanas, fundas, toallas, edredones, servilletas, manteles) que produce para hoteles, restaurantes y clientes personalizados.

Funciona como un **"gerente de planta digital"**: ordena toda la producción de pedidos personalizados, controlando pedidos abiertos, producción por etapas, prioridades, responsables, inventario, historial de clientes, incidencias y trazabilidad completa.

> 100% visual y mockeado. Sin backend, base de datos, autenticación real ni integraciones externas.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system propio, estética Linear / Vercel / Monday)
- **Recharts** para gráficos
- **lucide-react** para iconografía

## Cómo correr
```bash
npm install
npm run dev      # http://localhost:3000
# o build de producción:
npm run build && npm run start
```
Arranca en `/login` (selector de rol simulado). "Entrar como invitado" o cualquier rol lleva al Dashboard. El rol *Operario* lleva al panel simplificado de planta.

## Módulos
1. **Dashboard / Torre de Control** — métricas, producción en tiempo real, cola tipo aeropuerto (reordenable), alertas operativas y gráficos.
2. **Pedidos** — listado con filtros, alta multi-sección, detalle con **ficha técnica reproducible**, edición, duplicar/repetir.
3. **Producción** — tabla, **Kanban** por etapas, **cola priorizada** tipo aeropuerto, detalle de orden con timeline y acciones de etapa.
4. **Operarios** — vista simplificada (cards/botones grandes) para cortadores, costureras, bordadores y empaque.
5. **Inventario** — materiales, movimientos, alertas de stock, reservas y validación de disponibilidad.
6. **Clientes** — base, ficha completa, historial comercial e incidencias, repetir pedido.
7. **Calidad / Incidencias** — registro, trazabilidad (producción vs. cliente), evidencia y resolución.
8. **Historial** — timeline global de eventos con filtros y auditoría.
9. **Reportes** — inteligencia operativa (cuellos de botella, recomendaciones) + reportes de producción, inventario y clientes.
10. **Configuración** — usuarios, matriz de roles/permisos, etapas productivas y alertas.
11. **Extras** — login, perfil, notificaciones, búsqueda global, 404, modales y toasts.

## Datos mock
`src/lib/data.ts` — 15 pedidos, 10 clientes, 8 operarios, 20 materiales, 12 incidencias, 30 eventos de historial. Charts en `src/lib/reports.ts`.

## Estructura
```
src/
  app/
    login/ not-found.tsx page.tsx
    (app)/            # layout con Shell (sidebar + topbar)
      dashboard/ pedidos/ produccion/ operarios/ inventario/
      clientes/ calidad/ historial/ reportes/ configuracion/
      perfil/ notificaciones/ buscar/
  components/         # Shell, ui, charts, badges, modals, *Tabs
  lib/               # types, constants, data, reports
```
