'use client'

import { CopyToClipboard } from '@/components/common/copy-to-clipboard'
import { useToggle } from '@/hooks/utils/use-toggle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hackquest/ui/shared/popover'
import * as React from 'react'
import { FiEdit } from 'react-icons/fi'
import { IoLogoWechat } from 'react-icons/io5'
import { LuCheck, LuCopy, LuMapPin } from 'react-icons/lu'
import { useUserProfile } from '../../utils/query'
import { useDialogStore } from '../../utils/store'
import { UserAvatar } from '../common/user-avatar'
import { ProfileBanner } from './profile-banner'
import { ShareProfile } from './share-profile'
import { SocialMediaLink } from './social-media-link'

export function BasicProfile() {
  const [copied, toggle] = useToggle(false)
  const { onOpen } = useDialogStore()
  const { data: profile } = useUserProfile()

  const links = profile?.personalLinks
  const isOwnProfile = profile.isOwnProfile

  return (
    <React.Fragment>
      <ProfileBanner
        src={profile?.backgroundImage}
        isOwnProfile={isOwnProfile}
      />
      <div className="space-y-8 sm:container max-sm:px-6">
        <div className="-mt-4 relative">
          <div className="sm:-top-24 -top-14 absolute left-0 size-20 rounded-full border-2 border-neutral-white bg-neutral-white sm:size-40 sm:border-4">
            <UserAvatar
              src={profile?.user?.avatar}
              isOwnProfile={isOwnProfile}
            />
          </div>
          <div className="flex items-start justify-between max-sm:relative sm:ml-[184px]">
            <div className="space-y-4 max-sm:mt-10">
              <h2 className="title-1">{profile?.user?.nickname}</h2>
              {profile?.bio && (
                <p className="body-m text-secondary-neutral">{profile.bio}</p>
              )}
              {profile?.location && (
                <div className="flex items-center gap-1 text-secondary-neutral">
                  <LuMapPin className="size-5" />
                  <span className="body-m">{profile.location}</span>
                </div>
              )}
              <div className="flex items-center gap-4">
                {(isOwnProfile || links?.twitter) && (
                  <SocialMediaLink type="twitter" url={links?.twitter} />
                )}
                {(isOwnProfile || links?.linkedIn) && (
                  <SocialMediaLink type="linkedIn" url={links?.linkedIn} />
                )}
                {(isOwnProfile || links?.telegram) && (
                  <SocialMediaLink type="telegram" url={links?.telegram} />
                )}
                {(isOwnProfile || links?.github) && (
                  <SocialMediaLink type="github" url={links?.github} />
                )}
                {(isOwnProfile || links?.wechat) && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="outline-none">
                        <IoLogoWechat className="size-6 text-social-wechat" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="sm:w-80 sm:p-6" sideOffset={12}>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <IoLogoWechat className="size-5 text-social-wechat" />
                          <span className="headline-m">Wechat ID</span>
                        </div>
                        <div className="flex h-9 items-center justify-between rounded-md border border-neutral-300 p-2">
                          <span className="body-s">{links?.wechat}</span>
                          <CopyToClipboard
                            text={links?.wechat}
                            onCopy={(_, _copied) => {
                              if (_copied) {
                                toggle(true)
                                setTimeout(() => {
                                  toggle(false)
                                }, 2000)
                              }
                            }}
                          >
                            <button type="button" className="outline-none">
                              {copied ? (
                                <LuCheck className="size-4" />
                              ) : (
                                <LuCopy className="size-4" />
                              )}
                            </button>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              {profile?.techStack?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5">
                  {profile.techStack.map((skill: string) => (
                    <span
                      key={skill}
                      className="body-m inline-flex h-8 items-center justify-center rounded-lg bg-neutral-100 px-3.5 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 max-sm:absolute max-sm:top-0 max-sm:right-0">
              {isOwnProfile && (
                <button
                  type="button"
                  className="outline-none"
                  onClick={() => onOpen('edit-profile')}
                >
                  <FiEdit className="size-6" />
                </button>
              )}
              <ShareProfile />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
