import {
  addDays,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  startOfDay,
  startOfMonth,
} from 'date-fns'

export function monthLabel(monthDate) {
  return format(monthDate, 'MMMM yyyy')
}

export function monthKey(monthDate) {
  return format(monthDate, 'yyyy-MM')
}

export function dayKey(date) {
  return format(date, 'yyyy-MM-dd')
}

export function isInRange(day, start, end) {
  if (!start) return false
  const d = startOfDay(day)
  const s = startOfDay(start)
  const e = end ? startOfDay(end) : s
  if (isEqual(s, e)) return isSameDay(d, s)
  if (isBefore(d, s) || isAfter(d, e)) return false
  return true
}

export function isStart(day, start) {
  return Boolean(start && isSameDay(day, start))
}

export function isEnd(day, end, start) {
  const effectiveEnd = end ?? start
  return Boolean(effectiveEnd && isSameDay(day, effectiveEnd))
}

export function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate)
  const last = endOfMonth(monthDate)
  const leadingBlanks = (getDay(first) + 6) % 7 // Monday=0 ... Sunday=6
  const daysInMonth = last.getDate()

  const cells = []
  for (let i = 0; i < leadingBlanks; i++) cells.push(null)
  for (let d = 0; d < daysInMonth; d++) cells.push(addDays(first, d))

  // pad to full weeks (up to 6 rows)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

