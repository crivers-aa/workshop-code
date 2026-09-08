import type { IconType } from 'react-icons'

export type BulletItem =
  | string
  | { text: string; icon: IconType }

export function BulletSlide({
  title,
  items,
}: {
  title: string
  items: BulletItem[]
}) {
  return (
    <div className="flex h-full flex-col justify-center px-16 py-12">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      <ul className="mt-10 max-w-4xl space-y-5 text-2xl leading-snug">
        {items.map((item) => {
          const text = typeof item === 'string' ? item : item.text
          const Icon = typeof item === 'string' ? null : item.icon
          return (
            <li key={text} className="flex items-center gap-5">
              {Icon ? (
                <span
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Icon size={28} />
                </span>
              ) : (
                <span
                  className="mt-2.5 size-2.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <span>{text}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
