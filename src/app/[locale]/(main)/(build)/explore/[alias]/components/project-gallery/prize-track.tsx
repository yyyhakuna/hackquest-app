import type {
  HackathonRewardsExtend,
  ProjectExtend,
} from '@/graphql/generated/hooks'
import useMediaQuery from '@/hooks/use-media-query'
import { separationNumber } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import type React from 'react'
import NoData from './no-data'
import { ProjectCard } from './project-card'

interface PrizeTrackProp {
  reward: HackathonRewardsExtend
}

const PrizeTrack: React.FC<PrizeTrackProp> = ({ reward }) => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)')
  return (
    <>
      <Carousel
        className="flex flex-col gap-4 sm:gap-6"
        options={{ slidesToScroll: isLargeScreen ? 3 : 1 }}
      >
        <div className="flex items-center justify-between">
          <div className="title-3 flex items-center text-neutral-800">
            <span>{`${separationNumber(reward.totalRewards || 0)}${reward.currency || ''}`}</span>
            <span className="body-s ml-2 flex h-[2rem] items-center border-neutral-200 border-l pl-2 text-neutral-500">
              {reward.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        {reward.projects?.length! > 0 ? (
          <CarouselContent>
            {reward.projects?.map((project, i) => (
              <CarouselItem key={i} className="max-sm:w-full sm:basis-1/3">
                <ProjectCard
                  project={project as ProjectExtend}
                  rewardId={reward.id}
                  isReward={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <NoData />
        )}
      </Carousel>
    </>
  )
}

export default PrizeTrack
