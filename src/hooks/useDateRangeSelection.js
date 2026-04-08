import { useCallback, useMemo, useState } from 'react'
import { isBefore, isEqual, startOfDay } from 'date-fns'

function normalizeDay(d) {
  return d ? startOfDay(d) : null
}

export function useDateRangeSelection(initialStart = null, initialEnd = null) {
  const [start, setStart] = useState(normalizeDay(initialStart))
  const [end, setEnd] = useState(normalizeDay(initialEnd))

  const setRange = useCallback((nextStart, nextEnd) => {
    const s = normalizeDay(nextStart)
    const e = normalizeDay(nextEnd)
    if (s && e && isBefore(e, s)) {
      setStart(e)
      setEnd(s)
      return
    }
    setStart(s)
    setEnd(e)
  }, [])

  const clear = useCallback(() => {
    setStart(null)
    setEnd(null)
  }, [])

  const onDayClick = useCallback(
    (day) => {
      const d = normalizeDay(day)
      if (!d) return

      if (!start || (start && end)) {
        setStart(d)
        setEnd(null)
        return
      }

      if (isBefore(d, start)) {
        setEnd(start)
        setStart(d)
        return
      }

      if (isEqual(d, start)) {
        setEnd(d)
        return
      }

      setEnd(d)
    },
    [start, end],
  )

  const hasSelection = useMemo(() => Boolean(start), [start])
  const isCompleteRange = useMemo(() => Boolean(start && end), [start, end])

  return {
    start,
    end,
    hasSelection,
    isCompleteRange,
    setRange,
    clear,
    onDayClick,
  }
}

