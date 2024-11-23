import { usePathname, useRouter } from '@/app/navigation'
import { createUrl } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hackquest/ui/shared/select'
import { useSearchParams } from 'next/navigation'

interface EventSelectorProps {
  placeholder: string
  items?: Array<Record<string, string>>
}

const CountrySelector: React.FC<EventSelectorProps> = props => {
  const { placeholder } = props
  return (
    <Select>
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral sm:w-[162px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">China</SelectItem>
        <SelectItem value="dark">India</SelectItem>
        <SelectItem value="system">United States</SelectItem>
        <SelectItem value="system">Singapore</SelectItem>
        <SelectItem value="system">HongKong</SelectItem>
        <SelectItem value="system">Taiwan</SelectItem>
      </SelectContent>
    </Select>
  )
}

const LocationSelector: React.FC<EventSelectorProps> = props => {
  const { placeholder } = props
  return (
    <Select>
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral sm:w-[108px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">IRL</SelectItem>
        <SelectItem value="dark">Hybrid</SelectItem>
        <SelectItem value="system">Online</SelectItem>
      </SelectContent>
    </Select>
  )
}

const TypeSelector: React.FC<EventSelectorProps> = props => {
  const { placeholder } = props
  return (
    <Select>
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral sm:w-[83px]">
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

const SortSelector: React.FC<EventSelectorProps> = ({ placeholder }) => {
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { orderby } = paramsObject
  const router = useRouter()

  const updateOrderby = (newOrderby: string) => {
    if (newOrderby === orderby) return
    if (newOrderby === 'default') {
      currentParams.delete('orderby')
    } else {
      currentParams.set('orderby', newOrderby)
    }
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  return (
    <Select onValueChange={updateOrderby}>
      <SelectTrigger className="headline-s w-36 shrink border-none bg-neutral-100 text-primary-neutral sm:ml-auto sm:w-[101px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
      </SelectContent>
    </Select>
  )
}

const EventSelectorZone = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <CountrySelector placeholder="Country / Region" />
      <LocationSelector placeholder="Location" />
      <TypeSelector placeholder="Type" />
      <SortSelector placeholder="Sort By" />
    </div>
  )
}

export default EventSelectorZone
