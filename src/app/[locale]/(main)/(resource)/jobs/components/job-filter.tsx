'use client'
import { usePathname, useRouter } from '@/app/navigation'
import { useListJobTagsQuery } from '@/graphql/generated/hooks'
import { createUrl } from '@/lib/utils'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import {
  CheckboxTags,
  CheckboxTagsItem,
} from '@hackquest/ui/shared/checkbox-tags'
import { Label } from '@hackquest/ui/shared/label'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import {
  workModes as WORK_MODES,
  workTypes as WORK_TYPES,
} from '../validations'
// import webApi from '@/service'

export function JobType() {
  const t = useTranslations('Jobs')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentParams = new URLSearchParams(searchParams.toString())
  const workTypes = currentParams.getAll('workTypes')

  function onCheckedChange(value: string) {
    const newSelection = workTypes?.includes(value)
      ? workTypes?.filter(item => item !== value)
      : [...(workTypes || []), value]

    currentParams.delete('workTypes')
    currentParams.delete('page')
    newSelection.forEach(value => currentParams.append('workTypes', value))

    const url = createUrl(pathname, currentParams)
    router.replace(url, { scroll: false })
  }

  return (
    <div className="flex flex-col space-y-4">
      {WORK_TYPES.map(item => (
        <div className="flex items-center space-x-2.5" key={item.id}>
          <Checkbox
            id={item.id}
            checked={workTypes?.includes(item.id)}
            onCheckedChange={() => onCheckedChange(item.id)}
          />
          <Label
            htmlFor={item.id}
            className="body-s text-primary-neutral peer-aria-checked:text-neutral-black"
          >
            {t(item.label)}
          </Label>
        </div>
      ))}
    </div>
  )
}

export function JobLocation() {
  const t = useTranslations('Jobs')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentParams = new URLSearchParams(searchParams.toString())
  const workModes = currentParams.getAll('workModes')

  function onCheckedChange(value: string) {
    const newSelection = workModes?.includes(value)
      ? workModes?.filter(item => item !== value)
      : [...(workModes || []), value]

    currentParams.delete('workModes')
    newSelection.forEach(value => currentParams.append('workModes', value))

    const url = createUrl(pathname, currentParams)
    router.replace(url, { scroll: false })
  }
  return (
    <div className="flex flex-col space-y-4">
      {WORK_MODES.map(item => (
        <div className="flex items-center space-x-2.5" key={item.id}>
          <Checkbox
            // size="large"
            id={item.id}
            checked={workModes?.includes(item.id)}
            onCheckedChange={() => onCheckedChange(item.id)}
          />
          <Label
            htmlFor={item.id}
            className="body-s text-primary-neutral peer-aria-checked:text-neutral-black"
          >
            {t(item.label)}
          </Label>
        </div>
      ))}
    </div>
  )
}

export function JobKeyword() {
  const _t = useTranslations('Jobs')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentParams = new URLSearchParams(searchParams.toString())
  const tags = currentParams.getAll('tags')

  const { data } = useSuspenseQuery({
    queryKey: useListJobTagsQuery.getKey({ limit: 10, page: 1 }),
    queryFn: useListJobTagsQuery.fetcher({ limit: 10, page: 1 }),
  })
  const tagsList = data.listJobTags.data

  function onValueChange(value: string[]) {
    currentParams.delete('tags')
    value?.forEach(value => currentParams.append('tags', value))
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }

  return (
    <CheckboxTags value={tags} onValueChange={onValueChange}>
      {tagsList?.map(item => (
        <CheckboxTagsItem
          value={item.name}
          key={item.id}
          className="body-s text-primary-neutral"
        >
          {item.name}
        </CheckboxTagsItem>
      ))}
    </CheckboxTags>
  )
}

export function JobFilter() {
  const t = useTranslations('Jobs')
  return (
    <div className="hidden w-56 sm:block">
      <h2 className="title-5 mb-4 text-primary-neutral">{t('jobType')}</h2>
      <JobType />
      <h2 className="title-5 mt-12 mb-4 text-primary-neutral">
        {t('jobLocation')}
      </h2>
      <JobLocation />
      <h2 className="title-5 mt-12 mb-4 text-primary-neutral">
        {t('keywords')}
      </h2>
      <JobKeyword />
    </div>
  )
}
