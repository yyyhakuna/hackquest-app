'use client'

import { usePathname, useRouter } from '@/app/navigation'
import { FilterDropdown } from '@/components/common/filter-dropdown'
import { CourseLevel, Language } from '@/graphql/generated/graphql'
import { createUrl, enumToOptions } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

export function CourseFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const ecosystem = searchParams.get('ecosystem') ?? ''
  const language = searchParams.get('language') ?? ''
  const track = searchParams.get('track') ?? ''
  const difficulty = searchParams.get('level') ?? ''
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
  const difficultyOptions = enumToOptions(CourseLevel)

  return (
    <div
      className="grid grid-cols-2 items-center gap-4 sm:flex"
      data-pending={isPending ? '' : undefined}
    >
      <FilterDropdown
        label="Ecosystem"
        options={[
          { label: 'Artela', value: 'Artela' },
          { label: 'Vara', value: 'Vara' },
          { label: 'Eclipse', value: 'Eclipse' },
          { label: 'Telos', value: 'Telos' },
          { label: 'Linea', value: 'Linea' },
          { label: 'Arbitrum', value: 'Arbitrum' },
          { label: 'Ethereum', value: 'Ethereum' },
          { label: 'Solana', value: 'Solana' },
          { label: 'Sui', value: 'Sui' },
          { label: 'GaiaNet', value: 'GaiaNet' },
        ]}
        value={ecosystem}
        onValueChange={value => onFilterChange('ecosystem', value)}
      />
      <FilterDropdown
        label="Language"
        options={languageOptions}
        value={language}
        onValueChange={value => onFilterChange('language', value)}
      />
      <FilterDropdown
        label="Track"
        options={[
          { label: 'DeFi', value: 'DeFi' },
          { label: 'DAO', value: 'DAO' },
          { label: 'NFT', value: 'NFT' },
          { label: 'Gaming', value: 'Gaming' },
          { label: 'Security', value: 'Security' },
          { label: 'Infra', value: 'Infra' },
        ]}
        value={track}
        onValueChange={value => onFilterChange('track', value)}
      />
      <FilterDropdown
        label="Difficulty"
        options={difficultyOptions}
        value={difficulty}
        onValueChange={value => onFilterChange('level', value)}
      />
    </div>
  )
}
