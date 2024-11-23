'use client'

import { useUserProfile } from '../../utils/query'
import { GithubActivity } from './github-activity'
import { OnChainActivity } from './on-chain-activity'

export function UserActivity() {
  const { data: profile } = useUserProfile()
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <GithubActivity
        isOwnProfile={profile.isOwnProfile}
        data={profile?.githubActivity}
      />
      <OnChainActivity
        isOwnProfile={profile.isOwnProfile}
        data={profile?.onChainActivity}
      />
    </div>
  )
}
