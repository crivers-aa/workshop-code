import { useEffect, useState } from 'react'

export function useEffectiveTime(time?: Date) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (time !== undefined) return undefined
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [time])

  return time ?? now
}
