import { format } from 'date-fns'
import { useMemo } from 'react'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import { dayKey, monthKey } from '../../utils/calendar'

function rangeTitle(monthDate, start, end) {
  if (!start) return `Notes`
  const s = start
  const e = end ?? start
  const same = dayKey(s) === dayKey(e)
  const label = same
    ? format(s, 'MMM d')
    : `${format(s, 'MMM d')} – ${format(e, 'MMM d')}`
  return `Notes (${label})`
}

export function NotesPanel({ monthDate, start, end, heroSrc }) {
  const mKey = monthKey(monthDate)

  const monthStorageKey = useMemo(() => `wc:month:${mKey}`, [mKey])
  const rangeStorageKey = useMemo(() => {
    if (!start) return null
    const s = dayKey(start)
    const e = dayKey(end ?? start)
    return `wc:range:${mKey}:${s}:${e}`
  }, [mKey, start, end])

  const [monthNote, setMonthNote] = useLocalStorageState(monthStorageKey, '')
  const [rangeNote, setRangeNote] = useLocalStorageState(rangeStorageKey ?? 'wc:range:none', '')

  const activeValue = start ? rangeNote : monthNote
  const setActiveValue = start ? setRangeNote : setMonthNote

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative h-64 w-full bg-slate-200 md:h-72">
          <img
            src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm font-bold tracking-wide text-slate-600 dark:text-slate-300">NOTES</div>

        <div className="mt-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:focus-within:ring-offset-slate-950">
          <textarea
          rows={1}
            className="min-h-3 w-full resize-none rounded-xl bg-transparent px-2 py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder={
              start ? `Write notes for ${rangeTitle(monthDate, start, end)}...` : 'Write notes for the month...'
            }
            value={activeValue}
            onChange={(e) => setActiveValue(e.target.value)}
          />

          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400">
              {start ? 'Saved to this selection automatically.' : 'Saved for this month automatically.'}
            </div>
            <button
              type="button"
              onClick={() => setActiveValue(activeValue)}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

