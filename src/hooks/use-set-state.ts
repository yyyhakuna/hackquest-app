import * as React from 'react'

export function useSetState<T extends object>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] {
  const [state, set] = React.useState<T>(initialState)
  const setState = React.useCallback(
    (patch: Partial<T> | ((prevState: T) => Partial<T>)) => {
      set(prevState =>
        Object.assign(
          {},
          prevState,
          patch instanceof Function ? patch(prevState) : patch,
        ),
      )
    },
    [],
  )

  return [state, setState]
}
