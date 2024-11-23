import type {
  HackathonMemberExtend,
} from '@/graphql/generated/hooks'
import {
  Card,
  CardContent,
  CardHeader,
} from '@hackquest/ui/shared/card'
import Image from 'next/image'
import { HiOutlineLocationMarker } from 'react-icons/hi'
interface MemberCardProps {
  member: HackathonMemberExtend
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <Card className="relative p-6">
      <div className="flex justify-center">
        <Image
          src={member?.avatar ?? '/images/explore/builde_avatar.png'}
          alt="builde_avatar"
          className="rounded-full"
          width={80}
          height={80}
        />
      </div>
      <CardHeader className="title-5 py-6 text-center text-[1.5rem] text-primary-neutral">
        {member?.nickname}
      </CardHeader>
      <div className="body-s flex h-[21px] items-center justify-center gap-[6px] text-primary-neutral">
        {member?.location && <HiOutlineLocationMarker />}
        <p> {member?.location}</p>
      </div>
      <CardContent className="body-s my-6 line-clamp-2 min-h-[42px] p-0 text-secondary-neutral">
        {member?.bio}
      </CardContent>
    </Card>
  )
}
export default MemberCard
