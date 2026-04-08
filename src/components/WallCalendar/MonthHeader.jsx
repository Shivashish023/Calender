import { addMonths, subMonths } from 'date-fns'
import { monthLabel } from '../../utils/calendar'
import { ThemeToggle } from './ThemeToggle'

function IconChevron({ direction = 'left' }) {
  const rotate = direction === 'right' ? 'rotate-180' : ''
  return (
    <svg
      className={`h-5 w-5 ${rotate}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.5 15.5L7.5 10l5-5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MonthHeader({ monthDate, onPrevMonth, onNextMonth, theme, onToggleTheme }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 md:px-5">
      <button
        type="button"
        onClick={() => onPrevMonth?.(subMonths(monthDate, 1))}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
        aria-label="Previous month"
      >
        <IconChevron direction="left" />
      </button>

      <div className="text-base font-semibold tracking-tight text-slate-900 md:text-lg dark:text-slate-100">
        {monthLabel(monthDate)}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          type="button"
          onClick={() => onNextMonth?.(addMonths(monthDate, 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
          aria-label="Next month"
        >
          <IconChevron direction="right" />
        </button>
      </div>
    </div>
  )
}

