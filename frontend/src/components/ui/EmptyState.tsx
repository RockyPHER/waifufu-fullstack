import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  Icon?: LucideIcon;
}

export default function EmptyState({
  title,
  description,
  action,
  Icon = Sparkles,
}: EmptyStateProps) {
  return (
    <section className="ui-state">
      <div className="ui-state__icon">
        <Icon aria-hidden="true" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? <div className="ui-state__action">{action}</div> : null}
    </section>
  );
}
