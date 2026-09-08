import { useEffect, useRef } from 'react'

import smokeTexture from './assets/smoke.webp'
import { hazeOpacityFromTime } from './lib/time'
import { useEffectiveTime } from './lib/useEffectiveTime'
import './Haze.css'

const TEX = 384
const rand = (a: number, b: number) => a + Math.random() * (b - a)

type Patch = {
  x: number
  y: number
  scale: number
  rotation: number
  alpha: number
}

function makePatches(width: number, height: number) {
  const count = Math.max(7, Math.round((width * height) / 140000))
  const patches: Patch[] = []

  for (let i = 0; i < count; i++) {
    patches.push({
      x: rand(-width * 0.15, width * 1.15),
      y: rand(-height * 0.1, height * 0.75),
      scale: rand(2.8, 5.5),
      rotation: rand(0, Math.PI * 2),
      alpha: rand(0.07, 0.16),
    })
  }

  return patches
}

function drawHaze(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  patches: Patch[],
) {
  for (const patch of patches) {
    ctx.save()
    ctx.globalAlpha = patch.alpha
    ctx.translate(patch.x, patch.y)
    ctx.rotate(patch.rotation)
    ctx.scale(patch.scale, patch.scale)
    ctx.drawImage(img, -TEX / 2, -TEX / 2, TEX, TEX)
    ctx.restore()
  }
}

export function Haze({ time }: { time?: Date }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const effectiveTime = useEffectiveTime(time)
  const opacity = hazeOpacityFromTime(effectiveTime)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    let w = canvas.parentElement?.clientWidth ?? window.innerWidth
    let h = canvas.parentElement?.clientHeight ?? window.innerHeight
    let patches = makePatches(w, h)

    const resize = () => {
      const parent = canvas.parentElement
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent?.clientWidth ?? window.innerWidth
      h = parent?.clientHeight ?? window.innerHeight
      patches = makePatches(w, h)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      if (img.complete) drawHaze(ctx, img, patches)
    }

    img.onload = resize
    img.src = typeof smokeTexture === 'string' ? smokeTexture : smokeTexture
    window.addEventListener('resize', resize, { passive: true })

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="haze"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
