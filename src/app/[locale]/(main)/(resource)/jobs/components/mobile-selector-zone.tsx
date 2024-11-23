'use client'
import { usePathname, useRouter } from '@/app/navigation'
import { createUrl } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hackquest/ui/shared/select'
import { useSearchParams } from 'next/navigation'
import { workModes as WORK_MODES, workTypes as WORK_TYPES } from '../validations'
interface SelectorProps {
  placeholder: string
  items?: Array<Record<string, string>>
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {}

const CategorySelector: React.FC<SelectorProps> = props => {
  const { placeholder } = props
  return (
    <Select>
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Solana</SelectItem>
        <SelectItem value="dark">Mantle</SelectItem>
        <SelectItem value="system">Arbitrium</SelectItem>
        <SelectItem value="system">Ethereum</SelectItem>
        <SelectItem value="system">Linea</SelectItem>
        <SelectItem value="system">Sui</SelectItem>
      </SelectContent>
    </Select>
  )
}

const TypeSelector: React.FC<SelectorProps> = props => {
  const { placeholder } = props
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentParams = new URLSearchParams(searchParams.toString())
  const workTypes = currentParams.getAll('workTypes')

  function onChange(value: string) {
    const newSelection = workTypes?.includes(value)
      ? workTypes?.filter(item => item !== value)
      : [...(workTypes || []), value]

    currentParams.delete('workTypes')
    newSelection.forEach(value => currentParams.append('workTypes', value))

    const url = createUrl(pathname, currentParams)
    router.replace(url, { scroll: false })
  }
  return (
    <Select
      onValueChange={v => {
        onChange(v)
      }}
    >
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {WORK_TYPES.map(v => {
          return (
            <SelectItem value={v.id} key={v.id}>
              {v.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

const LocationSelector: React.FC<SelectorProps> = props => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentParams = new URLSearchParams(searchParams.toString())
  const workModes = currentParams.getAll('workModes')

  const { placeholder } = props

  function onChange(value: string) {
    const newSelection = workModes?.includes(value)
      ? workModes?.filter(item => item !== value)
      : [...(workModes || []), value]

    currentParams.delete('workModes')
    newSelection.forEach(value => currentParams.append('workModes', value))

    const url = createUrl(pathname, currentParams)
    router.replace(url, { scroll: false })
  }
  return (
    <Select
      onValueChange={v => {
        onChange(v)
      }}
    >
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {WORK_MODES.map(v => {
          return (
            <SelectItem value={v.id} key={v.id}>
              {v.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

const KeywordsSelector: React.FC<SelectorProps> = props => {
  const { placeholder } = props
  return (
    <Select>
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Meetup</SelectItem>
        <SelectItem value="dark">AMA</SelectItem>
        <SelectItem value="system">Workshop</SelectItem>
        <SelectItem value="system">Hackerhouse</SelectItem>
        <SelectItem value="system">Hackathon</SelectItem>
      </SelectContent>
    </Select>
  )
}

const MobileSelectZone: React.FC<PageProps> = ({ className }) => {
  return (
    <div className={'flex flex-wrap gap-3 ' + className}>
      <CategorySelector placeholder="Category" />
      <TypeSelector placeholder="Job Type" />
      <LocationSelector placeholder="Job Location" />

      <KeywordsSelector placeholder="Keywords" />
    </div>
  )
}

export default MobileSelectZone
