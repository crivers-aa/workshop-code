import { useEffect, useRef } from 'react'

import cloudTexture from './assets/cloud.webp'

const Z_MIN = -420
const Z_MAX = 395
const Z_SPAN = Z_MAX - Z_MIN
const DRIFT = 42
const PERSPECTIVE = 380
const TEX = 384
const SPEED = 80
const CLOUD_SIZE = 35
const CLOUD_COUNT = 10
const FRAME_MS = 1000 / 30
const NEAR_FADE_START = 120
const NEAR_FADE_END = 280
const CURSOR_EPSILON = 0.001
const CURSOR_LERP = 0.04

const PARALLAX = {
  driftX: 80,
  driftY: 42,
  depth: 8,
  depthY: 1.1,
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

type Cloud = {
  scale: number
  rotation: number
  alpha: number
  flip: number
  x: number
  y: number
  phase: number
  speed: number
}

type Cursor = {
  x: number
  y: number
  tx: number
  ty: number
}

function depthT(z: number) {
  return clamp((z - Z_MIN) / Z_SPAN, 0, 1)
}

function cloudZ(cloud: Cloud, elapsed: number, frozen: boolean, speed: number) {
  if (frozen || speed <= 0) return Z_MIN + cloud.phase * Z_SPAN
  const driftRate = (speed / 100) * DRIFT * cloud.speed
  return Z_MIN + ((cloud.phase * Z_SPAN + elapsed * driftRate) % Z_SPAN)
}

function depthFade(z: number) {
  const far = clamp(depthT(z) / 0.26, 0, 1)
  const near =
    z <= NEAR_FADE_START
      ? 1
      : clamp(1 - (z - NEAR_FADE_START) / (NEAR_FADE_END - NEAR_FADE_START), 0, 1)
  return far * near
}

function devicePixelRatio(width: number, height: number) {
  const native = window.devicePixelRatio || 1
  return width * height > 1_500_000 ? Math.min(native, 1) : Math.min(native, 2)
}

function makeClouds(width: number, height: number) {
  const spread = width * 0.42 + 120
  const laneWidth = (spread * 2) / CLOUD_COUNT
  const anchorY = height * 0.58

  return Array.from({ length: CLOUD_COUNT }, (_, i) => {
    const rotation = rand(0, Math.PI * 2)
    return {
      scale: rand(5.5, 10),
      rotation,
      alpha: rand(0.66, 0.88),
      flip: Math.random() < 0.5 ? -1 : 1,
      x:
        -spread +
        laneWidth * (i + 0.5) +
        rand(-laneWidth * 0.18, laneWidth * 0.18),
      y: anchorY + rand(0, height * 0.04) + rand(-height * 0.012, height * 0.012),
      phase:
        (i / CLOUD_COUNT + (rotation / (Math.PI * 2)) * 0.18 + rand(0, 0.06)) %
        1,
      speed: 0.82 + (i % 5) * 0.08 + rand(-0.04, 0.04),
    } satisfies Cloud
  })
}

function updateCursor(cursor: Cursor) {
  const prevX = cursor.x
  const prevY = cursor.y
  cursor.x += (cursor.tx - cursor.x) * CURSOR_LERP
  cursor.y += (cursor.ty - cursor.y) * CURSOR_LERP

  const delta = (a: number, b: number) => Math.abs(a - b) > CURSOR_EPSILON
  return {
    moved: delta(cursor.x, prevX) || delta(cursor.y, prevY),
    settling: delta(cursor.tx, cursor.x) || delta(cursor.ty, cursor.y),
  }
}

function cloudScreenPos(
  cloud: Cloud,
  z: number,
  {
    centerX,
    centerY,
    driftX,
    driftY,
    height,
    cursor,
    animated,
  }: {
    centerX: number
    centerY: number
    driftX: number
    driftY: number
    height: number
    cursor: Cursor
    animated: boolean
  },
) {
  const t = depthT(z)
  const perspective = PERSPECTIVE / (PERSPECTIVE - z)
  const spread = 1 + t * t * 0.12
  const lift = t * t * height * 0.04
  const parallax = animated ? perspective : 0

  return {
    perspective,
    x:
      centerX +
      (cloud.x + driftX) * spread * perspective +
      cursor.x * PARALLAX.depth * parallax,
    y:
      centerY +
      (cloud.y + driftY + lift) * perspective +
      cursor.y * PARALLAX.depth * parallax * PARALLAX.depthY,
  }
}

function drawCloudSprite(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cloud: Cloud,
  {
    x,
    y,
    perspective,
    fade,
    dpr,
    cloudSize,
  }: {
    x: number
    y: number
    perspective: number
    fade: number
    dpr: number
    cloudSize: number
  },
) {
  const scale = perspective * cloud.scale * (cloudSize / 100)
  const cos = Math.cos(cloud.rotation)
  const sin = Math.sin(cloud.rotation)
  const sx = scale * cloud.flip * dpr
  const sy = scale * dpr

  ctx.globalAlpha = fade * cloud.alpha
  ctx.setTransform(cos * sx, sin * sx, -sin * sy, cos * sy, x * dpr, y * dpr)
  ctx.drawImage(img, -TEX / 2, -TEX / 2, TEX, TEX)
}

export function Clouds({
  motion = true,
  speed = SPEED,
  cloudSize = CLOUD_SIZE,
}: {
  motion?: boolean
  speed?: number
  cloudSize?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const motionRef = useRef(motion)
  const speedRef = useRef(speed)
  const cloudSizeRef = useRef(cloudSize)
  const scheduleRef = useRef<(() => void) | null>(null)
  motionRef.current = motion
  speedRef.current = clamp(speed, 0, 100)
  cloudSizeRef.current = clamp(cloudSize, 0, 100)

  useEffect(() => {
    scheduleRef.current?.()
  }, [motion, speed, cloudSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const img = new Image()
    const cursor: Cursor = { x: 0, y: 0, tx: 0, ty: 0 }

    let alive = true
    let raf = 0
    let start = performance.now()
    let pauseOffset = 0
    let pausedAt = 0
    let lastFrame = 0
    let visible = document.visibilityState !== 'hidden'
    let inView = true
    let width = 0
    let height = 0
    let dpr = 1
    let clouds: Cloud[] = []

    const stopAnimation = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const scheduleDraw = () => {
      if (!alive || !visible || !inView || raf) return
      raf = requestAnimationFrame(draw)
    }
    scheduleRef.current = scheduleDraw

    const resize = (nextWidth: number, nextHeight: number) => {
      width = nextWidth
      height = nextHeight
      dpr = devicePixelRatio(width, height)
      clouds = makeClouds(width, height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      if (!alive) return
      raf = 0

      const animated = motionRef.current
      if (now - lastFrame < FRAME_MS) {
        scheduleDraw()
        return
      }
      lastFrame = now

      const { moved: cursorMoved, settling } = updateCursor(cursor)
      const elapsed = (now - start - pauseOffset) / 1000
      const centerX = width / 2
      const centerY = height / 2
      const driftX = animated ? cursor.x * PARALLAX.driftX : 0
      const driftY = animated ? cursor.y * PARALLAX.driftY : 0

      ctx.clearRect(0, 0, width, height)

      const sorted = clouds
        .map((cloud) => ({
          cloud,
          z: cloudZ(cloud, elapsed, !animated, speedRef.current),
        }))
        .sort((a, b) => a.z - b.z)

      for (const { cloud, z } of sorted) {
        const fade = depthFade(z)
        if (fade < 0.02) continue

        const pos = cloudScreenPos(cloud, z, {
          centerX,
          centerY,
          driftX,
          driftY,
          height,
          cursor,
          animated,
        })
        drawCloudSprite(ctx, img, cloud, {
          ...pos,
          fade,
          dpr,
          cloudSize: cloudSizeRef.current,
        })
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalAlpha = 1

      if ((animated && speedRef.current > 0) || cursorMoved || settling) {
        scheduleDraw()
      }
    }

    img.onload = () => {
      if (!alive) return
      start = performance.now()
      pauseOffset = 0
      scheduleDraw()
    }
    img.src = typeof cloudTexture === 'string' ? cloudTexture : cloudTexture

    const resizeObserver = new ResizeObserver((entries) => {
      for (const { contentRect } of entries) {
        const { width: nextWidth, height: nextHeight } = contentRect
        if (nextWidth < 1 || nextHeight < 1) continue
        resize(nextWidth, nextHeight)
        scheduleDraw()
      }
    })
    resizeObserver.observe(canvas.parentElement ?? canvas)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting)
        if (inView) scheduleDraw()
        else stopAnimation()
      },
      { rootMargin: '50px' },
    )
    intersectionObserver.observe(canvas)

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width) return
      cursor.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      cursor.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      scheduleDraw()
    }

    const onPointerLeave = () => {
      cursor.tx = 0
      cursor.ty = 0
      scheduleDraw()
    }

    const onVisibilityChange = () => {
      const nowVisible = document.visibilityState !== 'hidden'
      if (nowVisible && !visible) {
        pauseOffset += performance.now() - pausedAt
        scheduleDraw()
      } else if (!nowVisible && visible) {
        pausedAt = performance.now()
        stopAnimation()
      }
      visible = nowVisible
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      alive = false
      scheduleRef.current = null
      img.onload = null
      img.src = ''
      stopAnimation()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
