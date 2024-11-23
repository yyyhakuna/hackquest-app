import * as React from 'react'

export const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const dimensions = React.useRef({ width: 0, height: 0 })

  React.useEffect(() => {
    dimensions.current.width = ref.current?.offsetWidth ?? 0
    dimensions.current.height = ref.current?.offsetHeight ?? 0
  }, [ref.current])

  return dimensions.current
}
