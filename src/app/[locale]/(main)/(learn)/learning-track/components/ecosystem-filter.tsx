'use client'

import { usePathname, useRouter } from '@/app/navigation'
import { FilterDropdown } from '@/components/common/filter-dropdown'
import { Language } from '@/graphql/generated/graphql'
import { createUrl, enumToOptions } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

export function EcosystemFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const language = searchParams.get('language') ?? ''
  const currentParams = new URLSearchParams(searchParams.toString())

  const onFilterChange = React.useCallback(
    (paramName: string, value: string | null) => {
      if (value === null) {
        currentParams.delete(paramName)
      } else {
        currentParams.set(paramName, value)
      }
      const url = createUrl(pathname, currentParams)
      startTransition(() => {
        router.replace(url)
      })
    },
    [currentParams, pathname, router],
  )

  const languageOptions = enumToOptions(Language)

  return (
    <div
      className="grid grid-cols-2 items-center gap-4 sm:flex"
      data-pending={isPending ? '' : undefined}
    >
      <FilterDropdown
        label="Language"
        options={languageOptions}
        value={language}
        onValueChange={value => onFilterChange('language', value)}
      />
    </div>
  )
}
