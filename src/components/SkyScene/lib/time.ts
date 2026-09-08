export function decimalHour(date: Date) {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
}

const STAR_NIGHT = 0.28
const STAR_TWILIGHT = 0.1
const HAZE_NIGHT = 0.18

export function starOpacityFromTime(date: Date) {
  const hour = decimalHour(date)

  if (hour >= 20 || hour < 5) return STAR_NIGHT
  if (hour >= 7 && hour < 17) return 0

  if (hour >= 5 && hour < 7) return (STAR_TWILIGHT * (7 - hour)) / 2

  if (hour < 19) return (STAR_TWILIGHT * (hour - 17)) / 2
  return STAR_TWILIGHT + (STAR_NIGHT - STAR_TWILIGHT) * (hour - 19)
}

export function hazeOpacityFromTime(date: Date) {
  const hour = decimalHour(date)

  if (hour >= 20 || hour < 5) return HAZE_NIGHT
  if (hour >= 7 && hour < 17) return 0

  if (hour >= 5 && hour < 7) return (HAZE_NIGHT * (7 - hour)) / 2

  return (HAZE_NIGHT * (hour - 17)) / 3
}

export function duskTime(date = new Date()) {
  const result = new Date(date)
  result.setHours(18, 30, 0, 0)
  return result
}
