
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

interface IQueryToUrl {
  key: string
  defaultValue?: string
  isScroll?: boolean
  isClear?: boolean
}

const useQueryToUrl = (param: IQueryToUrl) => {
  const { key, isClear, defaultValue, isScroll } = param
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [_isPending, startTransition] = useTransition()

  const { replace } = useRouter()

  const onChange = (value: string) => {

    const params = new URLSearchParams(searchParams)

    if (isClear) {
      const keysToDelete = Array.from(params.keys())
      keysToDelete.forEach(key => {
        params.delete(key)
      })
    }

    if (value === defaultValue) {
      params.delete(key)
    } else if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: !!isScroll })
    })
  }

  return {
    searchParam: searchParams.get(key),
    onChange,
  }
}

export default useQueryToUrl
