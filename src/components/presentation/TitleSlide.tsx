import { SkyScene } from '#/components/SkyScene'

export function TitleSlide({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="relative flex h-full items-center justify-center px-12">
      <SkyScene />
      <div className="relative z-10 max-w-4xl text-center text-white">
        <h1 className="text-6xl font-bold tracking-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/90 drop-shadow-sm">
          {description}
        </p>
      </div>
    </div>
  )
}
