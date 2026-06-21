interface LoadingStateProps {
  label?: string;
}

export default function LoadingState({
  label = "Loading archive",
}: LoadingStateProps) {
  return (
    <section className="ui-state" aria-live="polite">
      <div className="ui-spinner" aria-hidden="true" />
      <h2>{label}</h2>
      <p>Preparing the cinematic gallery.</p>
    </section>
  );
}
