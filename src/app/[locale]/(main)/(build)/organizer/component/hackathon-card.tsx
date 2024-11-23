'use client'
import { useRouter } from '@/app/navigation'
import { Link } from '@/app/navigation'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import useDealHackathon from '@/hooks/use-deal-hackathon'
import type { HackathonInfoType } from '@/hooks/use-hackathon-info'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Card } from '@hackquest/ui/shared/card'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { LuArrowRight } from 'react-icons/lu'

type HackathonCardProps = {
  hackathonInfo: HackathonInfoType
}

const HackathonCard = (hackathonCardProps: HackathonCardProps) => {
  const _t = useTranslations('HackathonOrganizer')
  const { getDeadline } = useDealHackathon()

  const { hackathonInfo } = hackathonCardProps

  const deadline = getDeadline(hackathonInfo as HackathonExtend)
  const router = useRouter()

  return (
    <Card
      className="grid-col-1 relative grid cursor-pointer justify-between rounded-xl border-[1px] border-neutral-200 bg-neutral-white p-6 sm:flex"
      onClick={() => {
        router.push(`/explore/${hackathonInfo.alias}`)
      }}
    >
      <div className="gird-col-1 grid gap-6 sm:flex">
        <div className="sm:pt-6">
          <h2 className="title-5 line-clamp-1 max-w-[268px] text-primary-neutral sm:text-[1.5rem]">
            {hackathonInfo.name}
          </h2>
          <div className="body-s mt-3 mb-3 line-clamp-2 h-[42px] w-[294px] text-secondary-neutral sm:mb-6 sm:w-[360px]">
            {hackathonInfo.info?.intro}
          </div>
          <div className="flex w-full gap-6">
            <Link
              href={`/organizer/${hackathonInfo.id}`}
              onClick={e => e.stopPropagation()}
              className="flex-1"
            >
              <Button className="w-full">
                Manage <LuArrowRight />
              </Button>
            </Link>
            <Link
              href={`hackathon/${hackathonInfo.id}/create`}
              onClick={e => e.stopPropagation()}
              className="flex-1"
            >
              <Button className="w-full" variant="outline" color="neutral">
                Edit <LuArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-6 sm:px-6 sm:py-4">
          <div className="sm:w-[120px]">
            <div>
              <p className="body-s text-neutral-400">Deadline</p>
              <p className="headline-l line-clamp-1 pt-3 pb-[31px] text-primary-neutral ">
                {deadline.timeDiff ?? 'End'}
              </p>
            </div>
            <div>
              <p className="body-s text-neutral-400">Schedule</p>
              <p className="headline-m line-clamp-1 pt-3 text-primary-neutral">
                {deadline.step}
              </p>
            </div>
          </div>
          <div>
            <div className="w-[119px]">
              <p className="body-s text-neutral-400">Submitted Projects</p>
              <div className="headline-l flex gap-[6px] pt-3 pb-[31px] text-primary-neutral ">
                {hackathonInfo.projectCount}
              </div>
            </div>
            <div>
              <p className="body-s text-neutral-400">Participants</p>
              <div className="headline-l flex items-center pt-3 text-primary-neutral">
                {hackathonInfo.members && (
                  <div className="flex">
                    {hackathonInfo.members.map((obj, index) => {
                      return (
                        <Image
                          key={index}
                          src={obj.avatar ?? ''}
                          className={cn('relative h-8 w-8 rounded-full', {
                            'ml-[-8px]': index > 0,
                          })}
                          alt="avatar"
                          width={32}
                          height={32}
                        />
                      )
                    })}
                  </div>
                )}
                <p>{hackathonInfo.participants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 sm:pt-0">
        <Image
          src={hackathonInfo.info?.image || ''}
          className="h-[186px] w-[330px] rounded-xl"
          alt={hackathonInfo.alias}
          width={330}
          height={186}
        />
      </div>
    </Card>
  )
}

export default HackathonCard
