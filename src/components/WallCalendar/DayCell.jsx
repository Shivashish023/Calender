import clsx from 'clsx'
import { isEnd, isInRange, isStart } from '../../utils/calendar'

export function DayCell({ date, start, end, onClick }) {
  if (!date) return <div className="h-9 md:h-10" />

  const selectedStart = isStart(date, start)
  const selectedEnd = isEnd(date, end, start)
  const inRange = isInRange(date, start, end)
  const isSingle = selectedStart && selectedEnd

  const base =
    'h-8 md:h-9 rounded-lg grid place-items-center text-sm font-semibold select-none transition'

  const bg = (() => {
    if (isSingle) return 'bg-blue-600 text-white'
    if (selectedStart || selectedEnd) return 'bg-blue-600 text-white'
    if (inRange) return 'bg-blue-100 text-slate-900 dark:bg-blue-900/40 dark:text-slate-100'
    return 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
  })()

  return (
    <button
      type="button"
      onClick={() => onClick?.(date)}
      className={clsx(
        base,
        bg,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      )}
      aria-pressed={inRange}
    >
      {date.getDate()}
    </button>
  )
}

