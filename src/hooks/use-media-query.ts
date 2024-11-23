import * as React from 'react'

function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener('change', callback)
      return () => {
        matchMedia.removeEventListener('change', callback)
      }
    },
    [query],
  )

  function getSnapshot() {
    return window.matchMedia(query).matches
  }

  function getServerSnapshot() {
    return false
  }

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useMediaQuery
