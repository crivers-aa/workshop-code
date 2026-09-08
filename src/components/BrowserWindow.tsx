import type { ReactNode } from 'react'

import { cn } from '#/lib/utils'

type BrowserWindowProps = {
  children: ReactNode
  url?: string
  contentClassName?: string
}

export function BrowserWindow({
  children,
  url = 'example.com',
  contentClassName,
}: BrowserWindowProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
      <div className="flex items-center gap-3 border-b bg-muted/50 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="truncate rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            {url}
          </div>
        </div>
        <div className="w-[52px]" aria-hidden="true" />
      </div>
      <div
        className={cn(
          'relative aspect-video overflow-hidden bg-background',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
