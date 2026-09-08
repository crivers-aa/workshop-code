import { Clouds } from './Clouds'
import { Haze } from './Haze'
import { Sky } from './Sky'
import { Stars } from './Stars'
import { duskTime } from './lib/time'
import './SkyScene.css'

const TITLE_SLIDE_TIME = duskTime()

export function SkyScene({
  time = TITLE_SLIDE_TIME,
  motion = true,
}: {
  time?: Date
  motion?: boolean
}) {
  return (
    <section className="sky-viewport" aria-hidden="true">
      <Sky time={time} />
      <Stars time={time} />
      <Haze time={time} />
      <Clouds motion={motion} />
    </section>
  )
}
