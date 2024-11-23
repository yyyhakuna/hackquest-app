import { Link } from '@/app/navigation'
import { trackTagColors } from '@/constants/global'
import MenuLink from '@/constants/menu-link'
import { useHighlightProjectQuery } from '@/graphql/generated/hooks'
import useMediaQuery from '@/hooks/use-media-query'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Button } from '@hackquest/ui/shared/button'
import { Card } from '@hackquest/ui/shared/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'
import { LuArrowRight, LuImage } from 'react-icons/lu'

export default function BuilderAlsoViewed() {
  const isLargeScreen = useMediaQuery('(min-width: 640px)')
  const { data: projects } = useHighlightProjectQuery()

  return (
    <Carousel
      className="w-full"
      options={{ slidesToScroll: isLargeScreen ? 3 : 1 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="title-3">Builders Also Viewed</h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <div className="relative">
        <CarouselContent className="mt-6">
          {projects?.highlightProject?.map(project => (
            <CarouselItem
              key={project.id}
              className="max-sm:w-full sm:basis-1/3"
            >
              <div className="p-1">
                <Link href={`${MenuLink.HACKATHON_PROJECTS}/${project.alias}`}>
                  <Card className="p-6">
                    <div className="flex justify-between">
                      <Avatar className="size-20 rounded-2xl">
                        <AvatarImage
                          className="object-cover"
                          src={project.logo ?? ''}
                        />
                        <AvatarFallback className="bg-neutral-100">
                          <LuImage className="size-9 text-secondary-neutral" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary">
                        <Image
                          src="/images/hackathon/champion.svg"
                          alt="champion"
                          width={14}
                          height={12}
                        />
                      </span>
                    </div>
                    <h1 className="sm:title-3 title-5 mt-3 line-clamp-1 sm:text-2xl">
                      {project.name}
                    </h1>
                    <p className="body-s mt-3 line-clamp-2 h-[42px] text-secondary-neutral">
                      {project.detail?.oneLineIntro}
                    </p>
                    <div className="mt-6 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="body-s text-neutral-400">Ecology</span>
                        <span className="headline-s text-primary-neutral">
                          {project.ecology?.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="body-s text-neutral-400">Builder</span>
                        <object>
                          <Link
                            href={`${MenuLink.USER_PROFILE}/${project.teamLead?.username}`}
                            className="inline-flex items-center gap-1.5"
                          >
                            <Avatar className="size-6">
                              <AvatarImage
                                className="object-cover"
                                src={project.teamLead?.avatar ?? ''}
                              />
                              <AvatarFallback className="bg-neutral-100">
                                {project.teamLead?.nickname?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="headline-s text-primary-neutral">
                              {project.teamLead?.nickname}
                            </span>
                          </Link>
                        </object>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {project?.tracks?.slice(0, 4)?.map((track: string) => (
                        <Tag
                          key={track}
                          color={trackTagColors[track]}
                          className="body-s"
                        >
                          {track}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <Link href="/explore">
        <Button variant="text" color="neutral" className="mt-4">
          <span className="headline-s">Explore More Project Archive</span>
          <LuArrowRight className="size-4" />
        </Button>
      </Link>
    </Carousel>
  )
}
