import { useEffect } from 'react'

export function useRenderName(name: string) {
  useEffect(() => {
    const start = performance.now()
    // no-op; we log after render via a second effect that runs after commit
    const handle = setTimeout(() => {
      console.log(`[render] ${name} took ${performance.now() - start} ms`)
    }, 0)
    return () => clearTimeout(handle)
  }, [name])
}
