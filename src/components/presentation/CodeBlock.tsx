import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

import { cn } from '#/lib/utils'

const LANG_ALIASES: Record<string, string> = {
  txt: 'plaintext',
  text: 'plaintext',
  md: 'markdown',
}

const UTILITY_LANGS = new Set(['css', 'html', 'tailwind'])

export function CodeBlock({
  code,
  language = 'tsx',
  className,
}: {
  code: string
  language?: string
  className?: string
}) {
  const source = code.trim()
  const shikiLang = LANG_ALIASES[language] ?? language
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const highlight = async () => {
      if (UTILITY_LANGS.has(language)) {
        return `<pre class="shiki"><code>${highlightUtilities(source)}</code></pre>`
      }

      try {
        return await codeToHtml(source, {
          lang: shikiLang,
          theme: 'github-dark',
        })
      } catch {
        return codeToHtml(source, {
          lang: 'plaintext',
          theme: 'github-dark',
        })
      }
    }

    highlight().then((result) => {
      if (!cancelled) setHtml(result)
    })

    return () => {
      cancelled = true
    }
  }, [language, source, shikiLang])

  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-zinc-950 text-zinc-100 shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
        <span className="font-medium uppercase tracking-wide">{language}</span>
      </div>
      {html ? (
        <div
          className="min-h-0 flex-1 overflow-auto [&_pre]:m-0 [&_pre]:min-h-full [&_pre]:bg-transparent! [&_pre]:p-5 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:leading-relaxed [&_code]:font-inherit"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="min-h-0 flex-1 overflow-auto p-5 font-mono text-[13px] leading-relaxed">
          <code>{source}</code>
        </pre>
      )}
    </div>
  )
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function highlightUtilities(code: string) {
  return escapeHtml(code).replace(
    /(&quot;)|([\w-]+:)|(\[[^\]]+\])|(\/[0-9.]+)|(\b\d+(?:\.\d+)?\b)|((?:sky|indigo|emerald|amber|red|zinc|slate|rose|violet|cyan|primary|input|ring|muted|foreground|background)(?:-\w+)?)|([\w-]+)/g,
    (
      match,
      quote?: string,
      variant?: string,
      arbitrary?: string,
      opacity?: string,
      number?: string,
      color?: string,
      utility?: string,
    ) => {
      if (quote) return `<span style="color:#9CA3AF">${quote}</span>`
      if (variant) return `<span style="color:#C084FC">${variant}</span>`
      if (arbitrary) return `<span style="color:#F9A8D4">${arbitrary}</span>`
      if (opacity) return `<span style="color:#67E8F9">${opacity}</span>`
      if (number) return `<span style="color:#FBBF24">${number}</span>`
      if (color) return `<span style="color:#38BDF8">${color}</span>`
      if (utility) return `<span style="color:#86EFAC">${utility}</span>`
      return match
    },
  )
}
