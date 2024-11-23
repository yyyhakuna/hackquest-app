import type { Blog } from '@/graphql/generated/hooks'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@hackquest/ui/shared/carousel'
import type React from 'react'
import FeaturedCard from '../featured-card'

type FeaturedContentProp = {
  featuredBlogs: Blog[]
}

const FeaturedContent: React.FC<FeaturedContentProp> = ({ featuredBlogs }) => {
  return (
    <Carousel className="mt-[1rem] hidden w-full border-neutral-300 border-t pt-[2rem] sm:block">
      <div className="flex items-center justify-between">
        <h2 className="title-3 text-neutral-800">Featured</h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="mt-4">
        {featuredBlogs?.map((blog, index) => (
          <CarouselItem key={index}>
            <div className="container overflow-hidden p-0">
              <FeaturedCard blog={blog} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default FeaturedContent
