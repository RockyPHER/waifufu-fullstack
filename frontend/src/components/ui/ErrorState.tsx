import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "The archive could not be loaded. Try refreshing the local data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <section className="ui-state ui-state--error" role="alert">
      <div className="ui-state__icon">
        <AlertTriangle aria-hidden="true" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {onRetry ? (
        <button className="btn btn--secondary" type="button" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </section>
  );
}
