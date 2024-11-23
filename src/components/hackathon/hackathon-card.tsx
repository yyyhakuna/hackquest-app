import type { HackathonInfoType } from '@/hooks/use-hackathon-info'
import useHackathonInfo from '@/hooks/use-hackathon-info'
import { separationNumber } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'

type HackathonCardProps = {
  hackathonInfo: HackathonInfoType
  isRecommend?: boolean
  onClick?: (hackathonInfo: HackathonInfoType) => void
}

const HackathonCard = (hackathonCardProps: HackathonCardProps) => {
  const { hackathonInfo, isRecommend, onClick } = hackathonCardProps
  const { totalRewards, getTotalPrize, tagList } =
    useHackathonInfo(hackathonInfo)

  const totalPrize = separationNumber(
    getTotalPrize(totalRewards as Array<number>) || 0,
  )
  const currency =
    (hackathonInfo?.rewards && hackathonInfo?.rewards[0]?.currency) ?? 'USD'

  const ecosystem = hackathonInfo?.ecosystem
    ?.map((item, index) => {
      if (index === 3) {
        return (
          <Image
            key={index}
            src="/images/explore/omit-avatar.png"
            alt={'omit-avatar'}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
            objectFit="cover"
          />
        )
      }

      return (
        <Image
          key={index}
          src={item?.image}
          alt={item?.type as string}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
          objectFit="cover"
        />
      )
    })
    .slice(0, 4)

  return (
    <Card
      onClick={() => {
        onClick && onClick(hackathonInfo)
      }}
      className="grid-col-1 relative grid justify-between rounded-xl border-[1px] border-neutral-200 bg-neutral-white p-6 hover:cursor-pointer sm:flex"
    >
      {isRecommend && (
        <div className="headline-s absolute top-[366px] left-0 rounded-r-[18px] bg-primary-500 py-[6px] pr-5 pl-6 text-primary-neutral sm:top-3">
          RECOMMEND
        </div>
      )}
      <div className="gird-col-1 grid gap-6 sm:flex">
        <div className="sm:pt-6">
          <h2 className="title-5 line-clamp-1 max-w-[395px] text-primary-neutral sm:text-[1.5rem]">
            {hackathonInfo?.name}
          </h2>
          <div className="body-s mt-3 mb-3 line-clamp-2 h-[42px] w-[294px] text-secondary-neutral sm:mb-6 sm:w-[395px]">
            {hackathonInfo?.info?.intro}
          </div>
          <div className="flex gap-3">
            {tagList.map((tag, index) => (
              <Tag
                key={index}
                className={cn(
                  'headline-s rounded text-primary-neutral',
                  tag?.color,
                )}
              >
                {tag?.label}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex gap-6 sm:px-6 sm:py-4">
          <div className="sm:w-[120px]">
            <div className="mb-6 h-[65px]">
              <p className="body-s text-neutral-400">Total Prize</p>
              <p className="headline-l line-clamp-1 pt-3 text-primary-neutral ">{`${totalPrize} ${currency}`}</p>
            </div>
            <div>
              <p className="body-s text-neutral-400">Host</p>
              <p className="headline-m line-clamp-1 pt-3 text-primary-neutral">
                {hackathonInfo?.info?.host}
              </p>
            </div>
          </div>
          <div>
            <div className="mb-6 h-[65px]">
              <p className="body-s text-neutral-400">Ecology</p>
              <div className="headline-l flex gap-[6px] pt-3 text-primary-neutral ">
                {hackathonInfo?.ecosystem!.length > 0 && ecosystem}
              </div>
            </div>
            <div>
              <p className="body-s text-neutral-400">Participants</p>
              <div className="headline-l flex items-center gap-[6px] pt-3 text-primary-neutral">
                {hackathonInfo?.members?.length !== 0 && (
                  <div className="flex">
                    {hackathonInfo?.members?.map((member, index) => (
                      <Image
                        key={index}
                        src={member?.avatar ? (member.avatar as string) : ''}
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
                <p>
                  {hackathonInfo?.participants > 1586
                    ? `${hackathonInfo?.participants}+`
                    : hackathonInfo?.participants}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 sm:pt-0">
        <div className="relative h-[186px] w-[294px] rounded-xl sm:w-[330px]">
          <Image
            src={hackathonInfo?.info?.image || ''}
            className="rounded-xl"
            alt={hackathonInfo?.alias}
            fill
            objectFit="cover"
          />
        </div>
      </div>
    </Card>
  )
}

export default HackathonCard
