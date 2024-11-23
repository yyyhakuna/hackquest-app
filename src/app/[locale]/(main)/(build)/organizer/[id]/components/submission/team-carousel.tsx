import type {
  HackathonMemberExtend,
} from '@/graphql/generated/hooks'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@hackquest/ui/shared/carousel'
import MemberCard from './member-card'

const TeamCarousel = ({ members }: { members: HackathonMemberExtend[] }) => {

  return (
    <Carousel>
      <CarouselContent>
        {members.map(obj => (
          <CarouselItem className="basis-1/3" key={obj.id}>
            <MemberCard member={obj} key={obj.id} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default TeamCarousel
