import type { CSSProperties } from 'react'

import { decimalHour } from './lib/time'
import { useEffectiveTime } from './lib/useEffectiveTime'
import './Sky.css'

type Rgb = [number, number, number]

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function rgbToHex([r, g, b]: Rgb) {
  return `#${[r, g, b]
    .map((c) => Math.round(clamp(c, 0, 255)).toString(16).padStart(2, '0'))
    .join('')}`
}

const SKY_DARK: Rgb[] = [
  [11, 18, 32],
  [21, 34, 56],
  [31, 51, 84],
  [42, 68, 104],
]

const SKY_LIGHT: Rgb[] = [
  [30, 92, 150],
  [52, 112, 158],
  [90, 140, 175],
  [120, 158, 185],
]

const DAWN_DUSK_SKY: Rgb[] = [
  [62, 40, 118],
  [126, 82, 210],
  [236, 220, 245],
  [236, 220, 245],
]

function skyLightnessFromTime(date: Date) {
  const hour = decimalHour(date)
  return (1 + Math.cos(((hour - 12) / 12) * Math.PI)) / 2
}

function dawnDuskFactor(date: Date) {
  const hour = decimalHour(date)

  if (hour >= 5 && hour < 7) {
    if (hour <= 6) return hour - 5
    return 7 - hour
  }

  if (hour >= 17 && hour < 20) {
    if (hour <= 18.5) return (hour - 17) / 1.5
    return (20 - hour) / 1.5
  }

  return 0
}

export function skyStyleFromTime(date: Date) {
  const t = skyLightnessFromTime(date)
  const dd = dawnDuskFactor(date)

  const blueStops = SKY_DARK.map((dark, i) => lerpRgb(dark, SKY_LIGHT[i], t))
  const stops = blueStops.map((blue, i) =>
    rgbToHex(lerpRgb(blue, DAWN_DUSK_SKY[i], dd)),
  )

  return {
    '--sky-0': stops[0],
    '--sky-1': stops[1],
    '--sky-2': stops[2],
    '--sky-3': stops[3],
  } as CSSProperties
}

export function Sky({ time }: { time?: Date }) {
  const effectiveTime = useEffectiveTime(time)
  const style = skyStyleFromTime(effectiveTime)

  return <div className="sky" style={style} aria-hidden="true" />
}
