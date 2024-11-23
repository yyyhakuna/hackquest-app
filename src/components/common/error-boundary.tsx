'use client'

import { Button } from '@hackquest/ui/shared/button'
import type { FC, PropsWithChildren } from 'react'
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary'

const FallbackComponent = () => {
  return (
    <div className="center flex w-full flex-col py-6">
      Something went wrong. Please contract to{' '}
      <a href="mailto:support@hackquest.io" className="">
        support@hackquest.io
      </a>
      .
      <Button
        onClick={() => {
          window.location.reload()
        }}
      >
        Reload Page
      </Button>
    </div>
  )
}
export const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundaryLib
      FallbackComponent={FallbackComponent}
      onError={e => {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(e)
        // TODO  sentry

        // captureException(e)
      }}
    >
      {children}
    </ErrorBoundaryLib>
  )
}
