'use client'

import { Link, usePathname, useRouter } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { useProjectQuery } from '@/hooks/project/query'
import { useEventListener } from '@/hooks/use-event-listener'
import { useUser } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import { Separator } from '@hackquest/ui/shared/separator'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import * as React from 'react'
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuChevronDown,
} from 'react-icons/lu'

export function ProjectTabs({
  value,
  onValueChange,
  isPending,
  onSubmit,
}: {
  value: string
  onValueChange: (value: string) => void
  isPending?: boolean
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const ref = React.useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = React.useState(false)
  const { data } = useProjectQuery()
  const currentUser = useUser()
  const [pending, startTransition] = React.useTransition()

  const isCreator = data?.creatorId === currentUser?.id

  const isEditPage = pathname.includes('edit')

  function handleScroll() {
    const top = ref.current?.getBoundingClientRect().top
    if (top && top <= 64) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }

  const versions = React.useMemo(() => {
    const mainVersion = {
      id: data?.id,
      alias: data?.alias,
      versionName: data?.versionName,
    }
    return [mainVersion, ...(data?.versions || [])]
  }, [data])

  useEventListener('scroll', handleScroll, undefined, true)

  return (
    <div ref={ref} className="-top-8 sticky z-50 bg-neutral-white">
      <Separator />
      <div className="sm:container max-sm:px-6">
        <div className="relative flex items-center gap-6 py-6 max-sm:overflow-x-auto sm:justify-center">
          {isSticky && (
            <button
              type="button"
              className="absolute left-0 flex items-center gap-1 outline-none"
              onClick={() => router.back()}
            >
              <LuArrowLeft className="size-4 max-sm:size-6" />
              <span className="body-m font-bold max-sm:hidden">Back</span>
            </button>
          )}
          <Tabs variant="fill" value={value} onValueChange={onValueChange}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsIndicator />
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              disabled={!data?.versions?.length || isEditPage}
            >
              <button
                type="button"
                className="group flex h-[58px] w-fit max-w-52 items-center justify-between gap-2 rounded-xl border-none bg-neutral-100 px-6 text-secondary-neutral outline-none disabled:cursor-not-allowed"
              >
                <span className="headline-s truncate">{data?.versionName}</span>
                <LuChevronDown className="size-5 shrink-0 text-primary-neutral transition-transform duration-300 group-aria-expanded:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-72 px-0 py-3">
              {versions?.map(version => (
                <DropdownMenuItem className="headline-s py-2" key={version.id}>
                  <Link
                    className="flex w-full items-center justify-between gap-2"
                    href={`${MenuLink.HACKATHON_PROJECTS}/${version?.alias}`}
                  >
                    <span className="truncate">{version.versionName}</span>
                    {data?.id === version.id && (
                      <LuCheck className="size-4 shrink-0" />
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {isSticky && isCreator && !isEditPage && (
            <Button
              type="button"
              className="h-[58px] w-[168px]"
              loading={pending}
              onClick={() => {
                startTransition(() => {
                  router.push(`${MenuLink.HACKATHON_PROJECTS}/${data?.id}/edit`)
                })
              }}
            >
              <span>Edit Project</span>
              <LuArrowRight className="size-4" />
            </Button>
          )}
          {isSticky && isCreator && isEditPage && (
            <Button
              type="submit"
              className="h-[58px] w-[168px]"
              loading={isPending}
              onClick={onSubmit}
            >
              Save Edit
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </div>
  )
}
