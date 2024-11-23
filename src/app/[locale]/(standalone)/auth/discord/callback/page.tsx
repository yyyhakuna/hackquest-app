'use client'

import ClientOnly from '@/components/common/client-only'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

export default function Page() {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('access_token')

  React.useEffect(() => {
    if (accessToken) {
      window.opener.postMessage({ accessToken, source: 'discord' }, '*')
      window.close()
    }
  }, [accessToken])

  return (
    <ClientOnly>
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size={32} />
      </div>
    </ClientOnly>
  )
}
