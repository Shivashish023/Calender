import { useCallback, useMemo, useState } from 'react'

const STORAGE_KEY = 'wc:calendarTheme'

function readStoredTheme() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'light'
    const parsed = JSON.parse(raw)
    return parsed === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function useTheme() {
  const [theme, _setTheme] = useState(() => readStoredTheme())

  const setTheme = useCallback((next) => {
    const value = next === 'dark' ? 'dark' : 'light'
    _setTheme(value)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // ignore storage errors
    }
  }, [])

  const api = useMemo(() => ({ theme, setTheme }), [setTheme, theme])
  return api
}