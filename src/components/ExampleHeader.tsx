export function ExampleHeader({
  badge,
  title,
}: {
  badge: string
  title: string
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-4 py-2.5 shadow-sm">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
        {badge}
      </span>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
    </div>
  )
}
