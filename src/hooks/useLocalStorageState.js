import { useEffect, useMemo, useState } from 'react'

function readValue(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallbackValue
    return JSON.parse(raw)
  } catch {
    return fallbackValue
  }
}

export function useLocalStorageState(key, fallbackValue) {
  const initial = useMemo(() => readValue(key, fallbackValue), [key, fallbackValue])
  const [value, setValue] = useState(initial)

  useEffect(() => {
    setValue(readValue(key, fallbackValue))
  }, [key, fallbackValue])

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore quota / private mode errors
    }
  }, [key, value])

  return [value, setValue]
}

