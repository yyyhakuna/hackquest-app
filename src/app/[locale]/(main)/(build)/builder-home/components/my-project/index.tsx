'use client'

import { type ProjectExtend, ProjectType } from '@/graphql/generated/graphql'
import { useListProjectsBySelfQuery } from '@/graphql/generated/hooks'
import useMediaQuery from '@/hooks/use-media-query'
import dayjs from '@/lib/dayjs'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import { useTranslations } from 'next-intl'
import type * as React from 'react'
import MyProjectSkeleton from '../hackathon-skeleton/my-project-skeleton'
import { CreateProjectCard } from './add-project-card'
import { ProjectCard } from './project-card'

const MyProject: React.FC = () => {
  const t = useTranslations()
  const isLargeScreen = useMediaQuery('(min-width: 640px)')

  const { data, isLoading } = useListProjectsBySelfQuery(
    {
      where: {
        type: {
          equals: ProjectType.Main,
        },
      },
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      select: data => data.listProjectsBySelf?.data,
    },
  )

  return (
    <div>
      {isLoading ? (
        <MyProjectSkeleton />
      ) : (
        <>
          <Carousel
            className="flex flex-col gap-4 sm:gap-6"
            options={{ slidesToScroll: isLargeScreen ? 3 : 1 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="title-3">{t('BuilderHome.myProject')}</h3>
              <div className="flex items-center gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
            <CarouselContent>
              <CarouselItem className="max-sm:w-full sm:basis-1/3">
                <CreateProjectCard />
              </CarouselItem>
              {data
                ?.sort((a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)))
                ?.map((project, i) => (
                  <CarouselItem key={i} className="max-sm:w-full sm:basis-1/3">
                    <ProjectCard project={project as ProjectExtend} />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </>
      )}
    </div>
  )
}

export default MyProject
