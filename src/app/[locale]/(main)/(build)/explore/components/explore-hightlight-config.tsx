import { Link } from '@/app/navigation'
import BuilderHighlightCard from '@/components/hackathon/builder-highlight-card'
import MenuLink from '@/constants/menu-link'
import useHighExplore from '@/hooks/hackathon-explore/use-high-explore'
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import HackathonHighlightCard from './hackathon-hignlight-card'
import ProjectHighlightCard from './project-highlight-card'

const carouselClassName =
  ' absolute bottom-[50%] z-10 bg-primary-neutral text-neutral-white enabled:hover:bg-primary-neutral sm:hidden'

const CarouselPreviousAndNext = () => {
  return (
    <>
      <CarouselPrevious className={`${carouselClassName} -left-5`} />
      <CarouselNext className={`${carouselClassName} -right-5`} />
    </>
  )
}

const HackathonHighlight = () => {
  const { allHackathonInfo } = useHighExplore()

  return (
    allHackathonInfo.listHackathons.total !== 0 && (
      <div className="grid grid-cols-1">
        <CarouselPreviousAndNext />
        <CarouselContent>
          {allHackathonInfo.listHackathons.data?.map((hackathonInfo, index) => (
            <CarouselItem key={index}>
              <Link href={`${MenuLink.EXPLORE}/${hackathonInfo.alias}`}>
                <HackathonHighlightCard hackathonInfo={hackathonInfo} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    )
  )
}
const ProjectHighlight = () => {
  const { highlightProjectList } = useHighExplore()

  return (
    highlightProjectList.highlightProject?.length !== 0 && (
      <div>
        <CarouselPreviousAndNext />
        <CarouselContent>
          {highlightProjectList.highlightProject?.map(
            (projectHighlightInfo, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/3">
                <Link
                  href={`${MenuLink.HACKATHON_PROJECTS}/${projectHighlightInfo.alias}`}
                >
                  <ProjectHighlightCard
                    projectHighlightInfo={projectHighlightInfo}
                  />
                </Link>
              </CarouselItem>
            ),
          )}
        </CarouselContent>
      </div>
    )
  )
}

const BuilderHighlight = () => {
  const { highlightBuilderList } = useHighExplore()

  return (
    highlightBuilderList.highlightBuilder?.length !== 0 && (
      <div>
        <CarouselPreviousAndNext />
        <CarouselContent>
          {highlightBuilderList.highlightBuilder?.map(
            (builderHighlightInfo, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/3">
                <Link href={`/user/${builderHighlightInfo.username}`}>
                  <BuilderHighlightCard
                    builderHighlightInfo={builderHighlightInfo}
                  />
                </Link>
              </CarouselItem>
            ),
          )}
        </CarouselContent>
      </div>
    )
  )
}

export const ExploreHighlightConfig = [
  {
    value: 'hackathon',
    highlightCom: <HackathonHighlight />,
  },
  {
    value: 'project',
    highlightCom: <ProjectHighlight />,
  },
  {
    value: 'builder',
    highlightCom: <BuilderHighlight />,
  },
]
