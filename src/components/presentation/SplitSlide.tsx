import type { ReactNode } from 'react'

import { BrowserWindow } from '#/components/BrowserWindow'
import { cn } from '#/lib/utils'

import { CodeBlock } from './CodeBlock'
import { useSlideLayout } from './Slides'

export function SplitSlide({
  title,
  code,
  language = 'tsx',
  url = 'example.com',
  children,
}: {
  title?: string
  code: string
  language?: string
  url?: string
  children: ReactNode
}) {
  const { stacked } = useSlideLayout()

  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col',
        stacked ? 'gap-3' : 'px-10 py-10',
      )}
    >
      {title ? (
        <h2
          className={cn(
            'font-bold tracking-tight',
            stacked ? 'text-xl' : 'mb-6 text-3xl',
          )}
        >
          {title}
        </h2>
      ) : null}
      <div
        className={cn(
          'grid min-h-0 flex-1',
          stacked
            ? 'grid-rows-[minmax(0,1fr)_auto] items-stretch gap-4'
            : 'grid-cols-2 items-center gap-8',
        )}
      >
        <CodeBlock code={code} language={language} />
        <BrowserWindow
          url={url}
          contentClassName={stacked ? 'aspect-auto p-5' : undefined}
        >
          {children}
        </BrowserWindow>
      </div>
    </div>
  )
}
