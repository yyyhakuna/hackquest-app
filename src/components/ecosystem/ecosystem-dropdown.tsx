'use client'

import { switchEcosystem } from '@/actions/ecosystem'
import { Link, useRouter } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { useListActiveEcosystemInfosQuery } from '@/graphql/generated/hooks'
import useMediaQuery from '@/hooks/use-media-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import { Skeleton } from '@hackquest/ui/shared/skeleton'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { LuChevronDown } from 'react-icons/lu'

export function EcosystemDropdown() {
  const locale = useLocale()
  const params = useParams()
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const ecosystemId = params?.ecosystemId as string

  const { data, isPending } = useListActiveEcosystemInfosQuery(
    {
      lang: locale === 'en' ? 'en' : 'zh',
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
    },
  )

  async function onSwitch(ecosystemId: string) {
    await switchEcosystem(ecosystemId)
    router.refresh()
  }

  const selectedEcosystem = data?.ecosystems?.find(
    ecosystem => ecosystem.ecosystemId === ecosystemId,
  )

  if (isPending && isMobile)
    return <Skeleton className="h-12 w-2/3 rounded-full" />

  if (!data || !selectedEcosystem) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 outline-none max-sm:h-12 max-sm:rounded-full max-sm:bg-neutral-100 max-sm:p-3"
        >
          <Image
            src={selectedEcosystem.basic.image}
            alt={selectedEcosystem.basic.type || ''}
            width={24}
            height={24}
            className="shrink-0"
          />
          <span className="sm:title-3 max-sm:title-5">
            {selectedEcosystem.basic.type} Ecosystem
          </span>
          <LuChevronDown className="size-5 text-neutral-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={isMobile ? 4 : 16}
        className="w-80 rounded-xl p-2"
      >
        {data.ecosystems?.map(ecosystem => (
          <DropdownMenuItem
            key={ecosystem.ecosystemId}
            className="flex h-12 items-center gap-4 px-3 py-4"
            asChild
          >
            <Link
              href={`${MenuLink.HOME}/${ecosystem.ecosystemId}`}
              onClick={() => onSwitch(ecosystem.ecosystemId)}
            >
              <Image
                src={ecosystem.basic.image}
                alt={ecosystem.basic.type || ''}
                width={24}
                height={24}
                className="shrink-0"
              />
              <span className="title-5">{ecosystem.basic.type}</span>
              <span className="headline-s ml-auto text-secondary-neutral">
                Phase 1 / 7
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
