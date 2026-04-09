import { startOfDay, startOfMonth } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import heroSrc from '../../assets/wall-hero.svg'
import { useDateRangeSelection } from '../../hooks/useDateRangeSelection'
import { useTheme } from '../../hooks/useTheme'
import { parseMonthNotes } from '../../utils/calendar'
import { DayGrid } from './DayGrid'
import { MonthHeader } from './MonthHeader'
import { NotesPanel } from './NotesPanel'

export function WallCalendar() {
  const [monthDate, setMonthDate] = useState(() => startOfMonth(new Date()))
  const [noteRefresh, setNoteRefresh] = useState(0)
  const today = startOfDay(new Date())
  const { start, end, onDayClick, clear, setRange } = useDateRangeSelection(today, null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  const noteEntries = useMemo(() => parseMonthNotes(monthDate), [monthDate, noteRefresh])
  const handleNotesChange = () => setNoteRefresh((count) => count + 1)
  const handleNoteSelect = (entry) => setRange(entry.start, entry.end)
  const handleNoteDelete = (key) => {
    localStorage.removeItem(key)
    setNoteRefresh((count) => count + 1)
  }

  const selectionHint = useMemo(() => {
    if (!start) return 'Click a date to set the start of your range.'
    if (start && !end) return 'Now click an end date (or click the start date again).'
    return 'Tip: click any date to start a new range.'
  }, [start, end])

  return (
    <div className="bg-blue-100 h-screen w-full px-3 py-2 md:px-5 md:py-3">
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-950">
          <div className="grid grid-cols-1 md:grid-cols-[330px_1fr]">
            <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r md:p-5 dark:border-slate-800">
              <NotesPanel
                monthDate={monthDate}
                start={start}
                end={end}
                heroSrc={heroSrc}
                noteEntries={noteEntries}
                onNotesChange={handleNotesChange}
                onNoteSelect={handleNoteSelect}
                onNoteDelete={handleNoteDelete}
              />
            </div>

            <div>
              <MonthHeader
                monthDate={monthDate}
                onPrevMonth={(d) => setMonthDate(startOfMonth(d))}
                onNextMonth={(d) => setMonthDate(startOfMonth(d))}
                theme={theme}
                onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />

              <div className="px-4 py-2 pt-2 md:px-5 ">
                <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-2 py-1.5 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="text-[11px] text-slate-600 md:text-sm dark:text-slate-300">
                    {selectionHint}
                  </div>
                  <button
                    type="button"
                    onClick={clear}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <DayGrid monthDate={monthDate} start={start} end={end} onDayClick={onDayClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

