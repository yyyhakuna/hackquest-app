import { useRouter } from '@/app/navigation'
import { Link } from '@/app/navigation'
import BuilderHighlightCard from '@/components/hackathon/builder-highlight-card'
import { ProjectCard } from '@/components/hackathon/project-card'
import MenuLink from '@/constants/menu-link'
import type {
  HackathonMemberExtend,
  ProjectExtend,
} from '@/graphql/generated/hooks'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useHighlightConfig } from '../utils'

const CarouselPreviousAndNext = () => {
  const carouselClassName =
    ' absolute bottom-[50%] z-10 bg-primary-neutral text-neutral-white enabled:hover:bg-primary-neutral sm:hidden'
  return (
    <>
      <CarouselPrevious className={`${carouselClassName} -left-5`} />
      <CarouselNext className={`${carouselClassName} -right-5`} />
    </>
  )
}
export const ProjectHighlight = ({
  highlightProject,
}: { highlightProject: ProjectExtend[] }) => {

  return (
    highlightProject?.length !== 0 && (
      <div>
        <CarouselPreviousAndNext />
        <CarouselContent>
          {highlightProject?.map((projectHighlightInfo, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/3">
              <ProjectCard
                project={projectHighlightInfo as ProjectExtend}
                contentObj={{
                  Ecology: `${projectHighlightInfo.ecology}`,
                  Builder: (
                    <div className="flex items-center gap-1">
                      {projectHighlightInfo.teamLead?.avatar ? (
                        <Image
                          src={
                            (projectHighlightInfo.teamLead?.avatar as string) ??
                            ''
                          }
                          alt="winner avatar"
                          className="rounded-full bg-primary-500"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-neutral-200" />
                      )}

                      <p className="line-clamp-1 w-[68px]">
                        {projectHighlightInfo.teamLead?.nickname}
                      </p>
                    </div>
                  ),
                }}
                type="button"
                buttonText={projectHighlightInfo?.winner![0]?.name}
                linkTo={`${MenuLink.HACKATHON_PROJECTS}/${projectHighlightInfo.alias}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    )
  )
}

export const BuilderHighlight = ({
  highlightBuilder,
}: { highlightBuilder: HackathonMemberExtend[] }) => {
  return (
    highlightBuilder?.length !== 0 && (
      <div>
        <CarouselPreviousAndNext />
        <CarouselContent>
          {highlightBuilder?.map((builderHighlightInfo, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/3">
              <Link href={`/user/${builderHighlightInfo.username}`}>
                <BuilderHighlightCard
                  builderHighlightInfo={builderHighlightInfo}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    )
  )
}

export const Highlight = () => {
  const t = useTranslations('Archive')
  const { highlightConfig, highlightProject, highlightBuilder } =
    useHighlightConfig()
  const _router = useRouter()

  const { searchParam, onChange } = useQueryToUrl({
    key: 'highlight',
    defaultValue: highlightConfig[0]?.value ?? '',
    isScroll: true,
  })

  const displayComp = searchParam || highlightConfig[0]?.value

  return (
    <Carousel className="w-full">
      {!!highlightConfig.length && (
        <Tabs
          defaultValue={highlightConfig[0]?.value ?? ''}
          onValueChange={onChange}
        >
          <TabsList className="relative overflow-x-auto">
            {highlightConfig.map(obj => (
              <TabsTrigger value={obj.value} key={obj.value}>
                {t(obj.label)}
              </TabsTrigger>
            ))}
            <TabsIndicator />
            <div className="absolute top-0 right-0 hidden h-full items-center sm:flex">
              <CarouselPrevious className="mr-[10px]" />
              <CarouselNext />
            </div>
          </TabsList>
          <div className="my-6 h-[1px] w-full bg-neutral-200" />
        </Tabs>
      )}
      <div className="relative">
        {displayComp && displayComp === 'builder' ? (
          <BuilderHighlight
            highlightBuilder={highlightBuilder as HackathonMemberExtend[]}
          />
        ) : (
          <ProjectHighlight
            highlightProject={highlightProject as ProjectExtend[]}
          />
        )}
      </div>
    </Carousel>
  )
}
