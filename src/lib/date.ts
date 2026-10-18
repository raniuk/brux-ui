export type CivilDate = {
  day: number
  month: number
  year: number
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export const WEEKDAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const

export const WEEKDAYS_LONG = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

const MIN_YEAR = 1900
const MAX_YEAR = 2100

function pad(value: number, length: number) {
  return String(value).padStart(length, '0')
}

export function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function isValidCivil(year: number, month: number, day: number) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false
  }

  if (year < MIN_YEAR || year > MAX_YEAR) {
    return false
  }

  if (month < 1 || month > 12) {
    return false
  }

  return day >= 1 && day <= daysInMonth(year, month)
}

export function toWire(date: CivilDate) {
  return `${pad(date.year, 4)}-${pad(date.month, 2)}-${pad(date.day, 2)}`
}

export function toDisplay(date: CivilDate) {
  return toWire(date)
}

export function parseWire(value: string | null | undefined): CivilDate | null {
  if (!value) {
    return null
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  return isValidCivil(year, month, day) ? { year, month, day } : null
}

export function parseDisplay(value: string): CivilDate | null {
  return parseWire(value)
}

export function applyDisplayMask(raw: string, previous: string) {
  let digits = raw.replace(/\D/g, '')

  if (raw.length < previous.length) {
    let index = 0

    while (index < raw.length && raw[index] === previous[index]) {
      index += 1
    }

    if (previous[index] === '-') {
      digits = digits.slice(0, -1)
    }
  }

  digits = digits.slice(0, 8)

  if (digits.length <= 4) {
    return digits
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`
  }

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`
}

export function sameCivil(a: CivilDate | null, b: CivilDate | null) {
  return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day
}

export function addDays(date: CivilDate, amount: number): CivilDate {
  const next = new Date(date.year, date.month - 1, date.day + amount)

  return { year: next.getFullYear(), month: next.getMonth() + 1, day: next.getDate() }
}

export function addMonths(year: number, month: number, amount: number) {
  const next = new Date(year, month - 1 + amount, 1)

  return { year: next.getFullYear(), month: next.getMonth() + 1 }
}

export function weekdayIndex(date: CivilDate) {
  return (new Date(date.year, date.month - 1, date.day).getDay() + 6) % 7
}

export function startOfWeek(date: CivilDate) {
  return addDays(date, -weekdayIndex(date))
}

export function endOfWeek(date: CivilDate) {
  return addDays(startOfWeek(date), 6)
}

export function startOfMonth(year: number, month: number): CivilDate {
  return { year, month, day: 1 }
}

export function buildMonthGrid(year: number, month: number) {
  const start = startOfWeek(startOfMonth(year, month))

  return Array.from({ length: 42 }, (_, index) => addDays(start, index))
}

export function today(): CivilDate {
  const now = new Date()

  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
}

export function formatLong(date: CivilDate) {
  return `${WEEKDAYS_LONG[weekdayIndex(date)]}, ${date.day} ${MONTHS[date.month - 1]} ${date.year}`
}

export function formatMonthLabel(year: number, month: number) {
  return `${MONTHS[month - 1]} ${year}`
}
