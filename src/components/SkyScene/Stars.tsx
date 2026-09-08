import { useEffect, useRef } from 'react'

import { starOpacityFromTime } from './lib/time'
import { useEffectiveTime } from './lib/useEffectiveTime'
import './Stars.css'

const rand = (a: number, b: number) => a + Math.random() * (b - a)

type Star = {
  x: number
  y: number
  r: number
  a: number
}

function makeStars(width: number, height: number) {
  const count = Math.round((width * height) / 3800)
  const stars: Star[] = []

  for (let i = 0; i < count; i++) {
    const large = Math.random() < 0.08
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.82,
      r: large ? rand(0.75, 1.35) : rand(0.35, 0.85),
      a: large ? rand(0.75, 1) : rand(0.35, 0.9),
    })
  }

  return stars
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height)

  for (const star of stars) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.a})`
    ctx.fill()
  }
}

export function Stars({ time }: { time?: Date }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const effectiveTime = useEffectiveTime(time)
  const opacity = starOpacityFromTime(effectiveTime)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.parentElement?.clientWidth ?? window.innerWidth
    let h = canvas.parentElement?.clientHeight ?? window.innerHeight
    let stars = makeStars(w, h)

    const resize = () => {
      const parent = canvas.parentElement
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent?.clientWidth ?? window.innerWidth
      h = parent?.clientHeight ?? window.innerHeight
      stars = makeStars(w, h)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawStars(ctx, stars, w, h)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="stars"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
