import {
  addDays,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  parseISO,
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

export function parseMonthNotes(monthDate) {
  const notes = []
  const monthPrefix = `wc:month:${monthKey(monthDate)}`
  const rangePrefix = `wc:range:${monthKey(monthDate)}:`
  const monthStart = startOfMonth(monthDate)
  const monthEnd = endOfMonth(monthDate)

  for (const key of Object.keys(localStorage)) {
    if (key === monthPrefix) {
      const rawValue = localStorage.getItem(key)
      if (!rawValue) {
        continue
      }

      const value = (() => {
        try {
          return JSON.parse(rawValue)
        } catch {
          return rawValue
        }
      })()

      if (value) {
        notes.push({
          id: key,
          title: 'Month note',
          content: value,
          start: monthStart,
          end: monthEnd,
          type: 'month',
        })
      }
      continue
    }

    if (!key.startsWith(rangePrefix)) continue
    const parts = key.split(':')
    if (parts.length !== 5) continue

    const rawValue = localStorage.getItem(key)
    if (!rawValue) continue

    const value = (() => {
      try {
        return JSON.parse(rawValue)
      } catch {
        return rawValue
      }
    })()

    if (!value) continue

    try {
      const start = startOfDay(parseISO(parts[3]))
      const end = startOfDay(parseISO(parts[4]))
      notes.push({
        id: key,
        title: `${format(start, 'MMM d')} – ${format(end, 'MMM d')}`,
        content: value,
        start,
        end,
        type: 'range',
      })
    } catch {
      // ignore malformed keys
    }
  }

  return notes.sort((a, b) => a.start.getTime() - b.start.getTime())
}


