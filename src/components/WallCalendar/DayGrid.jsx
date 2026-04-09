import { buildMonthGrid, isInRange } from '../../utils/calendar'
import { DayCell } from './DayCell'

const DOW = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export function DayGrid({ monthDate, start, end, onDayClick, noteRanges = [] }) {
  const cells = buildMonthGrid(monthDate)

  return (
    <div className="px-4 pb-4 md:px-5">
      <div className="grid grid-cols-7 gap-2 pb-2 pt-2.5 text-center text-[11px] font-semibold tracking-widest text-slate-500 md:pb-2.5 md:text-xs dark:text-slate-400">
        {DOW.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-2.5">
        {cells.map((date, idx) => {
          const hasNote = date
            ? noteRanges.some((range) => isInRange(date, range.start, range.end))
            : false

          return (
            <DayCell
              key={date ? `${date.toISOString()}-${idx}` : `blank-${idx}`}
              date={date}
              start={start}
              end={end}
              onClick={onDayClick}
              hasNote={hasNote}
            />
          )
        })}
      </div>
    </div>
  )
}

