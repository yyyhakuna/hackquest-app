'use client'

import { Link } from '@/app/navigation'
import useMediaQuery from '@/hooks/use-media-query'
import { Button } from '@hackquest/ui/shared/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import { LuArrowRight } from 'react-icons/lu'
import { useUserProfile } from '../../utils/query'
import { HackathonCard } from './hackathon-card'

export function Hackathon() {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { data: profile } = useUserProfile()

  // TODO: remove this
  const noHackathons = true

  if (noHackathons) {
    if (!profile?.isOwnProfile) {
      return null
    }

    return (
      <div className="flex flex-col gap-4">
        <h2 className="title-3">Hackathon</h2>
        <Link href="/explore">
          <Button variant="outline" color="neutral">
            Join a Hackathon
            <LuArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <Carousel
      className="w-full space-y-6"
      options={{ slidesToScroll: isDesktop ? 3 : 1 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="title-3">Hackathon</h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="sm:basis-1/3">
            <HackathonCard />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
