import { usePathname, useRouter } from '@/app/navigation'
import { createUrl } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

interface SelectorProps {
  placeholder: string
}

const TotalSelector: React.FC<SelectorProps> = props => {
  const { placeholder } = props
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { all } = paramsObject
  const router = useRouter()
  const updateAll = (newAll: string) => {
    if (newAll === all) return
    currentParams.delete('all')
    currentParams.set('all', newAll)
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  return (
    <Select onValueChange={updateAll} defaultValue={all}>
      <SelectTrigger className="headline-m w-36 shrink border-none bg-neutral-100 px-6 text-primary-neutral sm:w-[103px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">All</SelectItem>
        <SelectItem value="winner">Winner</SelectItem>
      </SelectContent>
    </Select>
  )
}

const SectorSelector: React.FC<SelectorProps> = props => {
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { sector } = paramsObject
  const router = useRouter()
  const updateSector = (newSector: string) => {
    if (newSector === sector) return
    currentParams.delete('sector')
    currentParams.set('sector', newSector)
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  const { placeholder } = props

  return (
    <Select onValueChange={updateSector} defaultValue={sector}>
      <SelectTrigger className="headline-m w-36 shrink border-none bg-neutral-100 px-6 text-primary-neutral sm:w-[128px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="DeFi">Defi</SelectItem>
        <SelectItem value="SocialFi">SocialFi</SelectItem>
        <SelectItem value="NFT">NFT</SelectItem>
        <SelectItem value="DAO">DAO</SelectItem>
        <SelectItem value="Gaming">Gaming</SelectItem>
      </SelectContent>
    </Select>
  )
}

const TechSelector: React.FC<SelectorProps> = props => {
  const { placeholder } = props
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { stack } = paramsObject
  const router = useRouter()
  const updateStack = (newStack: string) => {
    if (newStack === stack) return
    currentParams.delete('stack')
    currentParams.set('stack', newStack)
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  return (
    <Select onValueChange={updateStack} defaultValue={stack}>
      <SelectTrigger className="headline-m w-36 shrink border-none bg-neutral-100 px-6 text-primary-neutral sm:w-[160px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="React">React</SelectItem>
        <SelectItem value="Next">Next</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="Web3">Web3</SelectItem>
        <SelectItem value="Ethers">Ethers</SelectItem>
        <SelectItem value="Node">Node</SelectItem>
        <SelectItem value="Go">Go</SelectItem>
        <SelectItem value="Python">Python</SelectItem>
        <SelectItem value="Solidity">Solidity</SelectItem>
        <SelectItem value="Rust">Rust</SelectItem>
        <SelectItem value="Move">Move</SelectItem>
      </SelectContent>
    </Select>
  )
}

const SortSelector: React.FC<SelectorProps> = props => {
  const { placeholder } = props
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { sort } = paramsObject
  const router = useRouter()
  const updateSort = (newSort: string) => {
    if (newSort === sort) return
    currentParams.delete('sort')
    currentParams.set('sort', newSort)
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  return (
    <Select onValueChange={updateSort} defaultValue={sort}>
      <SelectTrigger className="headline-m w-36 shrink border-none bg-neutral-100 px-6 text-primary-neutral sm:w-[136px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="popular">Most popular</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
      </SelectContent>
    </Select>
  )
}

const SelectorZone = () => {
  const t = useTranslations('Archive')
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const router = useRouter()
  const clear = () => {
    currentParams.delete('sector')
    currentParams.delete('all')
    currentParams.delete('stack')
    currentParams.delete('sort')
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  return (
    <div>
      <div
        className="my-6 flex gap-3 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <TotalSelector placeholder={t('all')} />
        <SectorSelector placeholder={t('sector')} />
        <TechSelector placeholder={t('techStack')} />
        <div className="ml-auto flex gap-6">
          <button
            className="headline-m ml-auto shrink-0 text-primary-neutral"
            onClick={clear}
          >
            {t('clearall')}
          </button>
          <SortSelector placeholder={'Sort By'} />
        </div>
      </div>
      <div className="my-6 hidden h-[1px] bg-gray-200 sm:block" />
    </div>
  )
}

export default SelectorZone
