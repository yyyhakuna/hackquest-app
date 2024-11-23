import * as React from 'react'

type ParserOptions<T> =
  | {
      raw: true
    }
  | {
      raw: false
      serializer: (value: T) => string
      deserializer: (value: string) => T
    }

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  options?: ParserOptions<T>,
) {
  const deserializer = React.useMemo(
    () =>
      options
        ? options.raw
          ? (value: any) => value
          : options.deserializer
        : JSON.parse,
    [options],
  )

  const initializer = React.useRef((key: string) => {
    try {
      const serializer = options
        ? options.raw
          ? String
          : options.serializer
        : JSON.stringify
      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue !== null) {
        return deserializer(localStorageValue)
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue))
        return initialValue
      }
    } catch (_error) {
      return initialValue
    }
  })

  const [state, setState] = React.useState<T | undefined>(() =>
    initializer.current(key),
  )

  React.useLayoutEffect(() => setState(initializer.current(key)), [key])

  const set: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      valueOrFunc => {
        try {
          const newState =
            typeof valueOrFunc === 'function'
              ? (valueOrFunc as (state?: T) => void)(state)
              : valueOrFunc
          if (typeof newState === 'undefined') {
            return
          }
          let value: string

          if (options) {
            if (options.raw) {
              if (typeof newState === 'string') {
                value = newState
              } else {
                value = JSON.stringify(newState)
              }
            } else if (options.serializer) {
              value = options.serializer(newState)
            } else {
              value = JSON.stringify(newState)
            }
          } else {
            value = JSON.stringify(newState)
          }

          localStorage.setItem(key, value)
          setState(deserializer(value))
        } catch (_error) {}
      },
      [deserializer, key, options, state],
    )

  const remove = React.useCallback(() => {
    try {
      localStorage.removeItem(key)
      setState(undefined)
    } catch {}
  }, [key])

  return [state, set, remove] as const
}
