import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiGitBranch,
  FiGitCommit,
  FiGitMerge,
} from 'react-icons/fi'
import {
  MdFlight,
  MdOutlineAccountCircle,
  MdOutlineCampaign,
  MdOutlineCreditCard,
  MdOutlineDirectionsCar,
  MdOutlineWeb,
} from 'react-icons/md'
import { TbTool } from 'react-icons/tb'

import { BackToWorkshop } from '#/components/BackToWorkshop'
import {
  BulletSlide,
  CodeBlock,
  FlowSlide,
  Presentation,
  Slide,
  Slides,
  TitleSlide,
} from '#/components/presentation'

export const Route = createFileRoute('/processes-recap')({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = Number(search.slide)
    return {
      slide: Number.isInteger(raw) && raw >= 1 ? raw : 1,
    }
  },
  component: ProcessesRecap,
})

function ProcessesRecap() {
  const { slide } = Route.useSearch()
  const navigate = useNavigate({ from: '/processes-recap' })

  return (
    <div className="relative">
      <BackToWorkshop className="absolute top-4 left-4 z-20" />
      <Presentation
        slide={slide}
        onSlideChange={(next) =>
          navigate({ search: { slide: next }, replace: true })
        }
      >
        <TitleSlide
          title="Processes Recap"
          description="How we ticket, branch, review, and ship."
        />
        <BulletSlide
          title="Jira spaces"
          items={[
            { icon: MdOutlineDirectionsCar, text: 'CH - Car rental' },
            { icon: MdOutlineCreditCard, text: 'PM - Payment methods' },
            { icon: MdOutlineCampaign, text: 'MAR - Marketing' },
            { icon: MdOutlineAccountCircle, text: 'CA - Customer account' },
            { icon: MdFlight, text: 'FLIG - Flight (results and checkout)' },
            { icon: MdOutlineWeb, text: 'LP - Landing pages' },
            { icon: TbTool, text: 'TI - Tech improvements' },
          ]}
        />
        <Slides title="Branch creation">
          <Slide>
            <div className="flex h-full min-h-0 flex-col justify-center">
              <h3 className="text-2xl font-bold tracking-tight">Ticket branches</h3>
              <ul className="mt-6 space-y-3 text-xl leading-snug">
                <li className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FiGitBranch size={24} aria-hidden="true" />
                  </span>
                  <span>Prefix, ticket, then a kebab-case name.</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="size-2.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Prefixes: <code className="font-mono">bugfix/</code>{' '}
                    <code className="font-mono">feature/</code>{' '}
                    <code className="font-mono">hotfix/</code>
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <CodeBlock
                  language="txt"
                  className="flex-none"
                  code={`feature/CH-001-nice-name
bugfix/PM-042-fix-card-retry
hotfix/FLIG-118-checkout-crash`}
                />
              </div>
            </div>
          </Slide>
          <Slide>
            <div className="flex h-full min-h-0 flex-col justify-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Project branches
              </h3>
              <ul className="mt-6 space-y-3 text-xl leading-snug">
                <li className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FiGitBranch size={24} aria-hidden="true" />
                  </span>
                  <span>
                    Big projects get a long-lived main branch.
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="size-2.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Name it <code className="font-mono">feature/</code> plus
                    the project.
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <CodeBlock
                  language="txt"
                  className="flex-none"
                  code={`feature/skyline
feature/car-rental`}
                />
              </div>
            </div>
          </Slide>
        </Slides>
        <div className="flex h-full flex-col justify-center px-16 py-12">
          <h2 className="text-4xl font-bold tracking-tight">Commit messages</h2>
          <ul className="mt-8 max-w-4xl space-y-4 text-2xl leading-snug">
            <li className="flex items-center gap-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiGitCommit size={28} aria-hidden="true" />
              </span>
              <span>Ticket key first, then what changed.</span>
            </li>
          </ul>
          <div className="mt-8 max-w-3xl">
            <CodeBlock
              language="txt"
              className="flex-none"
              code={`CH-001 Add weekend rate filter to search results`}
            />
          </div>
        </div>
        <BulletSlide
          title="Bugs and hotfixes"
          items={[
            {
              icon: FiAlertCircle,
              text: 'Notice a bug? Raise it in the relevant Jira space.',
            },
            {
              icon: FiCheckCircle,
              text: 'Hotfixes always get a ticket in that space before any changes.',
            },
          ]}
        />
        <FlowSlide
          title="Ticket lifecycle"
          steps={[
            'Refine and add details',
            'Ready for Dev',
            'Investigate',
            'Make changes',
            'PR',
            'QA',
            'Release',
            'Check in production',
          ]}
        />
        <Slides title="Pull requests">
          <Slide>
            <div className="flex h-full min-h-0 flex-col justify-center gap-8">
              <ul className="space-y-3 text-xl leading-snug">
                <li className="flex items-center gap-4">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary" />
                  <span>Catch bugs and share context before code reaches production.</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary" />
                  <span>Spread ownership - everyone understands what's changing.</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary" />
                  <span>A PR is a collaborative process.</span>
                </li>
              </ul>

              {/* Bar chart */}
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-2"><span className="inline-block h-3 w-6 rounded-sm bg-primary/50" /> Ticket work</span>
                  <span className="flex items-center gap-2"><span className="inline-block h-3 w-6 rounded-sm bg-amber-400" /> PR</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-36 shrink-0 text-right text-sm font-medium text-muted-foreground">PR at the end</span>
                  <div className="flex min-w-0 flex-1 overflow-hidden rounded-xl">
                    <div className="h-10 w-10/12 bg-primary/40" />
                    <div className="h-10 w-2/12 bg-amber-400" />
                  </div>
                  <span className="w-32 shrink-0 text-xs font-semibold text-amber-600">Feeback at end</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-36 shrink-0 text-right text-sm font-medium text-muted-foreground">Collaborative PR</span>
                  <div className="flex min-w-0 flex-1 overflow-hidden rounded-xl">
                    <div className="h-10 w-7/12 bg-primary/40" />
                    <div className="h-10 w-5/12 bg-amber-400" />
                  </div>
                  <span className="w-32 shrink-0 text-xs font-semibold text-emerald-700">Earlier review</span>
                </div>
              </div>

           
            </div>
          </Slide>
          <Slide>
            <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3">
              {(['PR', 'QA', 'Merge'] as const).map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-3">
                  {index > 0 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M7 15l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                    </svg>
                  ) : null}
                  <div className={`flex min-h-14 w-52 items-center justify-center rounded-2xl border px-6 py-3 text-center text-xl font-semibold shadow-sm ${step === 'Merge' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700' : 'border-border/70 bg-muted/50'}`}>
                    <code className="font-mono">{step}</code>
                  </div>
                </div>
              ))}
            </div>
          </Slide>
        </Slides>

        <BulletSlide
          title="Releasing to production"
          items={[
            {
              icon: FiGitMerge,
              text: 'stable is the production branch.',
            },
            'When QA has passed, merge into master.',
            'Then merge master into stable.',
          ]}
        />
      </Presentation>
    </div>
  )
}
