import { ChevronDown, ChevronRight, Flag } from 'lucide-react'
import { FaFlagCheckered } from 'react-icons/fa'

import { cn } from '#/lib/utils'

const COLUMNS = 4

type FlowNode =
  | { kind: 'start' }
  | { kind: 'end' }
  | { kind: 'step'; label: string }

export function FlowSlide({
  title,
  steps,
}: {
  title: string
  steps: string[]
}) {
  const nodes: FlowNode[] = [
    { kind: 'start' },
    ...steps.map((label) => ({ kind: 'step' as const, label })),
    { kind: 'end' },
  ]
  const rows = chunk(nodes, COLUMNS)

  return (
    <div className="flex h-full flex-col justify-center px-10 py-12">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      <ol className="mt-10 flex flex-col gap-3">
        {rows.map((row, rowIndex) => {
          const reverse = rowIndex % 2 === 1
          const isLastRow = rowIndex === rows.length - 1
          const cells = cellsForRow(row, reverse)

          return (
            <li key={rowKey(row)} className="flex flex-col gap-3">
              <div className="grid grid-cols-4 items-stretch gap-x-8">
                {cells.map((node, column) => (
                  <div key={`${rowIndex}-${column}`} className="relative min-w-0">
                    {node && hasIncoming(cells, column, reverse) ? (
                      <ChevronRight
                        className={cn(
                          'absolute top-1/2 size-7 -translate-y-1/2 text-primary',
                          reverse ? '-right-8 rotate-180' : '-left-8',
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                    {node ? <FlowNodeBox node={node} /> : null}
                  </div>
                ))}
              </div>
              {isLastRow ? null : (
                <ChevronDown
                  className={cn(
                    'size-7 shrink-0 text-primary',
                    reverse ? 'self-start' : 'self-end',
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function FlowNodeBox({ node }: { node: FlowNode }) {
  if (node.kind === 'start') {
    return (
      <div className="flex min-h-24 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-sm">
        <Flag className="size-5 shrink-0" aria-hidden="true" />
        <span className="text-lg font-bold tracking-wide">Start</span>
      </div>
    )
  }

  if (node.kind === 'end') {
    return (
      <div className="flex min-h-24 items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-white shadow-sm">
        <FaFlagCheckered size={18} aria-hidden="true" />
        <span className="text-lg font-bold tracking-wide">End</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-24 items-center justify-center rounded-2xl border border-border/70 bg-muted/50 px-3 py-3 text-center text-lg font-semibold leading-snug shadow-sm">
      {node.label}
    </div>
  )
}

function cellsForRow(row: FlowNode[], reverse: boolean) {
  const cells: Array<FlowNode | null> = Array.from({ length: COLUMNS }, () => null)
  row.forEach((node, index) => {
    cells[reverse ? COLUMNS - 1 - index : index] = node
  })
  return cells
}

function hasIncoming(
  cells: Array<FlowNode | null>,
  column: number,
  reverse: boolean,
) {
  const from = reverse ? column + 1 : column - 1
  return Boolean(cells[column] && cells[from])
}

function chunk<T>(items: T[], size: number) {
  const rows: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size))
  }
  return rows
}

function nodeKey(node: FlowNode, index: number) {
  if (node.kind === 'step') return node.label
  return `${node.kind}-${index}`
}

function rowKey(row: FlowNode[]) {
  return row.map((node, index) => nodeKey(node, index)).join('|')
}
