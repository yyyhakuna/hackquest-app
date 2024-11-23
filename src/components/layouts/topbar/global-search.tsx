'use client'

import { usePathname, useRouter } from '@/app/navigation'
import GlobalSearchSelect, {} from '@/components/global-search-select'
import { GlobalSearchKey } from '@/components/global-search-select/utils'
import MenuLink from '@/constants/menu-link'
import { Input, InputSlot } from '@hackquest/ui/shared/input'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export function GlobalSearch() {
  const query = useSearchParams()
  const path = usePathname()
  const [keyword, setKeyword] = useState('')
  const router = useRouter()
  const [focus, setFocus] = useState(false)

  const [searchType, setSearchType] = useState<GlobalSearchKey>()
  function getSearchType() {
    const pathname = `/${path}`
    if (pathname.includes(MenuLink.LEARNING_TRACK)) {
      return GlobalSearchKey.ECOSYSTEM
    }
    if (pathname.includes(MenuLink.PRACTICES)) {
      return GlobalSearchKey.COURSE
    }
    if (pathname.includes(MenuLink.BLOG)) {
      return GlobalSearchKey.BLOG
    }
    if (pathname.includes(MenuLink.GLOSSARY)) {
      return GlobalSearchKey.GLOSSARY
    }
    if (pathname.includes(MenuLink.EVENTS)) {
      return GlobalSearchKey.EVENT
    }
    if (pathname.includes(MenuLink.HACKATHON_PROJECTS)) {
      return GlobalSearchKey.PROJECT
    }
    if (pathname.includes(MenuLink.JOB_STATION)) {
      return GlobalSearchKey.JOB
    }
    return GlobalSearchKey.HACKATHON
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const sType = query.get('searchType') as GlobalSearchKey
    setSearchType(sType || getSearchType())
  }, [query])

  return (
    <div className="relative w-[400px]">
      <Input
        className="w-full px-3"
        value={keyword}
        placeholder={'Search for keywords, etc.'}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false)
          }, 310)
        }}
        onChange={e => {
          const val = e.target.value
          setKeyword(val)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            const val = e.currentTarget.value
            setKeyword(val)
            setFocus(false)
            val &&
              router.push(`/search?searchType=${searchType}&keyword=${keyword}`)
          }
        }}
      >
        <InputSlot>
          <FiSearch className="size-4" />
        </InputSlot>
      </Input>
      {keyword && focus && (
        <GlobalSearchSelect
          searchType={searchType}
          keyword={keyword}
          onSelect={search => {
            setKeyword(search._name)
            router.push(search._link)
          }}
        />
      )}
    </div>
  )
}
