import {
  Children,
  createContext,
  type ReactNode,
  useContext,
} from 'react'

type SlideLayout = {
  stacked: boolean
}

const SlideLayoutContext = createContext<SlideLayout>({ stacked: false })

export function useSlideLayout() {
  return useContext(SlideLayoutContext)
}

export function Slides({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  const slides = Children.toArray(children).filter(Boolean)
  const stacked = slides.length > 1

  return (
    <SlideLayoutContext.Provider value={{ stacked }}>
      <div className="flex h-full flex-col px-10 py-10">
        {title ? (
          <h2 className="mb-6 text-3xl font-bold tracking-tight">{title}</h2>
        ) : null}
        <div
          className="grid min-h-0 flex-1 gap-6"
          style={{
            gridTemplateColumns: `repeat(${slides.length || 1}, minmax(0, 1fr))`,
          }}
        >
          {slides}
        </div>
      </div>
    </SlideLayoutContext.Provider>
  )
}

export function Slide({ children }: { children: ReactNode }) {
  return <div className="flex h-full min-h-0 min-w-0 flex-col">{children}</div>
}
