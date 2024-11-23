import { type User, VoteRole } from '@/graphql/generated/hooks'
import type React from 'react'
import { votingRoleList } from '../../constants/data'

interface UserRoleProp {
  userInfo: User
}

const UserRole: React.FC<UserRoleProp> = ({ userInfo }) => {
  const role = userInfo?.voteRole || VoteRole.User
  return (
    <div className="flex gap-6">
      {votingRoleList.map(v => (
        <div
          key={v.value}
          className={`flex-1 flex-shrink-0 flex-col items-center rounded-[.5rem] border py-[.375rem] text-neutral-800 ${v.value === role ? 'headline-m flex border-neutral-500' : 'body-s hidden border-neutral-200 bg-neutral-100 opacity-[0.5] sm:flex'}`}
        >
          {v.icon}
          <p className="mt-1">{v.label}</p>
          {/* <p className="body-xs text-neutral-500">{0} Votes</p> */}
        </div>
      ))}
    </div>
  )
}

export default UserRole
