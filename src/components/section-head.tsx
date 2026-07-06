// Shared section header: mono eyebrow with an index + gradient rule,
// a bold title and an optional subtitle. Reused across every section.
export function SectionHead({
  index,
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`reveal ${centered ? "mx-auto max-w-2xl text-center" : ""}`}>
      <div
        className={`flex items-center gap-2.5 font-mono text-sm text-accent-2 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-6 bg-brand" />
        {index} — {eyebrow}
      </div>
      <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
