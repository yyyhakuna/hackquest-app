import { useRouter } from '@/app/navigation'
import useHackathonInfo, {
  type HackathonInfoType,
} from '@/hooks/use-hackathon-info'
import { separationNumber } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'

type HackathonHighlightCardProps = {
  hackathonInfo: HackathonInfoType
}

const HackathonHighlightCard = (
  hackathonHighlightCardProps: HackathonHighlightCardProps,
) => {
  const { hackathonInfo } = hackathonHighlightCardProps
  const { totalRewards, computedDays, getTotalPrize } =
    useHackathonInfo(hackathonInfo)
  const router = useRouter()

  return (
    <Card
      className="grid gap-6 p-6 sm:flex sm:justify-between sm:gap-12"
      onClick={() => {
        router.push(`/explore/${hackathonInfo.alias}`)
      }}
    >
      <div>
        <h2 className="title-5 text-primary-neutral sm:text-[1.5rem]">
          {hackathonInfo.name}
        </h2>
        <div className="body-s mt-3 mb-3 line-clamp-2 max-h-[42px] max-w-[395px] text-secondary-neutral sm:mb-6">
          {hackathonInfo.info?.intro}
        </div>
        <div className="flex gap-3">
          <Tag className="headline-s rounded bg-success-100 text-primary-neutral">
            Live
          </Tag>
          <Tag className="headline-s rounded bg-blue-100 text-primary-neutral">
            {' '}
            {`${computedDays(hackathonInfo.timeline?.submissionClose)} days left`}
          </Tag>
          <Tag className="headline-s rounded bg-tag-red text-primary-neutral">
            For newbie
          </Tag>
        </div>
        <div className="flex gap-[38px] pt-6">
          <div>
            <div>
              <p className="body-s text-neutral-400">Total Prize</p>
              <p className="headline-l pt-3 pb-[31px] text-primary-neutral">{`${separationNumber(getTotalPrize(totalRewards as Array<number>) || 0)} ${(hackathonInfo.rewards && hackathonInfo.rewards[0]?.currency) ?? 'USD'}`}</p>
            </div>
            <div>
              <p className="body-s text-neutral-400">Host</p>
              <p className="headline-m pt-3 text-primary-neutral">
                {hackathonInfo.info?.host}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="body-s text-neutral-400">Ecology</p>
              <div className="headline-l flex gap-[6px] pt-3 pb-6 text-primary-neutral ">
                <Image
                  src="/images/explore/BNB.png"
                  alt="BNB"
                  width={32}
                  height={32}
                />
                <Image
                  src="/images/explore/BTC.png"
                  alt="BTC"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div>
              <p className="body-s text-neutral-400">Participants</p>
              <div className="headline-l flex items-center gap-[6px] pt-3 text-primary-neutral">
                <div className="flex">
                  {hackathonInfo.members && (
                    <div className="flex">
                      {hackathonInfo.members.map((member, index) => (
                        <Image
                          key={index}
                          src={member.avatar as string}
                          className={cn('relative h-8 w-8 rounded-full', {
                            'ml-[-8px]': index > 0,
                          })}
                          alt="avatar"
                          width={32}
                          height={32}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <p>{hackathonInfo.participants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src={hackathonInfo.info?.image || ''}
          alt={hackathonInfo.alias}
          className="hidden h-[317px] w-[571px] sm:block"
          width={571}
          height={317}
        />
        <Image
          src={hackathonInfo.info?.image || ''}
          alt={hackathonInfo.alias}
          className="block h-[166px] w-[294px] sm:hidden"
          width={294}
          height={166}
        />
        <div className="absolute top-0 right-0">
          <Image
            src="/images/explore/hot.png"
            alt="hot"
            width={32}
            height={32}
          />
        </div>
      </div>
    </Card>
  )
}

export default HackathonHighlightCard
