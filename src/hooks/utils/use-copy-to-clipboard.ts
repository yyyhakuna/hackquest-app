import writeText from 'copy-to-clipboard'
import * as React from 'react'
import { useSetState } from '../use-set-state'
import { useMountedState } from './use-mounted-state'

export interface CopyToClipboardState {
  value?: string
  noUserInteraction: boolean
  error?: Error
}

export function useCopyToClipboard() {
  const isMounted = useMountedState()
  const [state, setState] = useSetState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  })

  const copyToClipboard = React.useCallback(
    (value?: any) => {
      if (!isMounted()) return
      let noUserInteraction
      let normalizedValue
      try {
        if (typeof value !== 'string' && typeof value !== 'number') {
          const error = new Error(
            `Cannot copy typeof ${typeof value} to clipboard, must be a string`,
          )
          if (process.env.NODE_ENV === 'development') {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.error(error)
          }
          setState({
            value,
            error,
            noUserInteraction: true,
          })
          return
        } else if (value === '') {
          const error = new Error('Cannot copy empty string to clipboard.')
          if (process.env.NODE_ENV === 'development') {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.error(error)
          }
          setState({
            value,
            error,
            noUserInteraction: true,
          })
          return
        }
        normalizedValue = value.toString()
        noUserInteraction = writeText(normalizedValue)
        setState({
          value: normalizedValue,
          error: undefined,
          noUserInteraction,
        })
      } catch (error: any) {
        setState({
          value: normalizedValue,
          error,
          noUserInteraction,
        })
      }
    },
    [isMounted, setState],
  )

  return [state, copyToClipboard] as const
}
