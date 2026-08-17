import { useEffect, useState } from 'react'

const MINIMUM_MS = 400

export function useMinimumLoading(isLoading: boolean, minimumMs = MINIMUM_MS): boolean {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    if (isLoading) {
      setDisplay(true)
      return
    }
    const timer = setTimeout(() => setDisplay(false), minimumMs)
    return () => clearTimeout(timer)
  }, [isLoading, minimumMs])

  return display
}
