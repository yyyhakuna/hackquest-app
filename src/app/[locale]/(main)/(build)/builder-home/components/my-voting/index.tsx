'use client'
import { type User, VoteRole } from '@/graphql/generated/hooks'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import Hackathons from './hackathons'
import UserRole from './user-role'
import Voting from './voting'

interface MyVotingProp {
  userInfo: User
  scrollToRef: (ref: HTMLDivElement) => void
}
const MyVoting: React.FC<MyVotingProp> = ({ userInfo, scrollToRef }) => {
  const t = useTranslations()
  const role = userInfo?.voteRole || VoteRole.User
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col gap-6" ref={ref}>
      <p className="title-3 text-neutral-800">{t('BuilderHome.myVoting')}</p>
      <UserRole userInfo={userInfo} />
      {role !== VoteRole.Judge ? (
        <Hackathons scrollToRef={() => scrollToRef(ref.current!)} />
      ) : (
        <Voting />
      )}
    </div>
  )
}

export default MyVoting
