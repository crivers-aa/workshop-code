import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

export function Presentation({
  children,
  slide,
  onSlideChange,
}: {
  children: ReactNode
  slide?: number
  onSlideChange?: (slide: number) => void
}) {
  const slides = Children.toArray(children).filter(Boolean)
  const total = slides.length
  const [uncontrolled, setUncontrolled] = useState(1)
  const current = Math.min(Math.max(slide ?? uncontrolled, 1), Math.max(total, 1))

  const go = useCallback(
    (next: number) => {
      const value = Math.min(Math.max(next, 1), total)
      if (value === current) return
      onSlideChange?.(value)
      if (slide === undefined) setUncontrolled(value)
    },
    [current, onSlideChange, slide, total],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        go(current + 1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        go(current - 1)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        go(1)
      }
      if (event.key === 'End') {
        event.preventDefault()
        go(total)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, go, total])

  return (
    <div className="relative h-svh overflow-hidden bg-background">
      <div className="h-full w-full">{slides[current - 1]}</div>

      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Previous slide"
            disabled={current <= 1}
            onClick={() => go(current - 1)}
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index + 1 === current}
                className={cn(
                  'size-2 rounded-full transition-colors',
                  index + 1 === current
                    ? 'bg-primary'
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/70',
                )}
                onClick={() => go(index + 1)}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Next slide"
            disabled={current >= total}
            onClick={() => go(current + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
