import React from "react";
import { OrderStage, Priority, IncidentStatus } from "@/lib/types";
import { STAGE_META, PRIORITY_META, INCIDENT_STATUS_META } from "@/lib/constants";

export function StageBadge({ stage }: { stage: OrderStage }) {
  const m = STAGE_META[stage];
  return (
    <span className={`chip ${m.bg} ${m.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.short}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const m = PRIORITY_META[priority];
  return <span className={`chip ${m.bg} ${m.color}`}>{m.label}</span>;
}

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  const m = INCIDENT_STATUS_META[status];
  return <span className={`chip ${m.bg} ${m.color}`}>{m.label}</span>;
}
