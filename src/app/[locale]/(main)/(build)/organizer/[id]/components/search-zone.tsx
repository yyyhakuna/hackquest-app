'use client'
import { usePathname, useRouter } from '@/app/navigation'
import { createUrl } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import { Input } from '@hackquest/ui/shared/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@hackquest/ui/shared/select'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { FaSearch } from 'react-icons/fa'

interface SearchZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  needWordSort?: boolean
  inputValue?: string
  onInputChange?: React.Dispatch<React.SetStateAction<string>>
}

const SearchZone: React.FC<SearchZoneProps> = ({
  className,
  inputValue,
  onInputChange,
  needWordSort = true,
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { sortBy } = paramsObject
  const router = useRouter()
  const updateSortBy = (newSector: string) => {
    if (newSector === sortBy) return
    currentParams.delete('sortBy')
    currentParams.set('sortBy', newSector)
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  return (
    <div className={cn('flex items-center justify-between ' + className)}>
      <Input
        placeholder={t('searchFor')}
        className="relative max-w-sm pl-8"
        value={inputValue}
        onChange={e => {

          onInputChange && onInputChange(e.target.value)
        }}
      >
        <FaSearch className="absolute left-2" />
      </Input>
      <Select onValueChange={updateSortBy}>
        <SelectTrigger className="headline-m w-[136px] text-primary-neutral">
          {t('sortBy')}
        </SelectTrigger>
        {needWordSort ? (
          <SelectContent>
            <SelectItem value="earliest">{t('earliest')}</SelectItem>
            <SelectItem value="latest">{t('latest')}</SelectItem>
            <SelectItem value="a-z">A - Z</SelectItem>
            <SelectItem value="z-a">Z - A</SelectItem>
          </SelectContent>
        ) : (
          <SelectContent>
            <SelectItem value="earliest">{t('earliest')}</SelectItem>
            <SelectItem value="latest">{t('latest')}</SelectItem>
          </SelectContent>
        )}
      </Select>
    </div>
  )
}

export default SearchZone
