import * as React from 'react'

export function useMountedState() {
  const mountedRef = React.useRef(false)
  const get = React.useCallback(() => mountedRef.current, [])

  React.useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return get
}
