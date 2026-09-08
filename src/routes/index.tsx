import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

const examples = [
  {
    badge: '1',
    title: 'Compound components',
    description: 'Props-based vs compound APIs, shown in a mock browser.',
    to: '/compound-components',
  },
  {
    badge: '2',
    title: 'Shadcn',
    description: 'Owned UI primitives, composition, and CVA variants.',
    to: '/shadcn',
  },
] as const

function Home() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Workshop</h1>
        <p className="text-muted-foreground">
          Choose an example to walk through.
        </p>
      </div>

      <nav className="space-y-4">
        {examples.map((example) => (
          <Link
            key={example.to}
            to={example.to}
            className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/40 p-5 shadow-sm transition-colors hover:bg-muted/70"
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
              {example.badge}
            </span>
            <div className="space-y-1">
              <h2 className="text-base font-semibold tracking-tight">
                {example.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {example.description}
              </p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}
