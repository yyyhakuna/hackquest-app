'use client'

import { useRouter } from '@/app/navigation'
import { CopyToClipboard } from '@/components/common/copy-to-clipboard'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { Input } from '@hackquest/ui/shared/input'
import { Label } from '@hackquest/ui/shared/label'
import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { FiEdit3 } from 'react-icons/fi'
import { LuAlertCircle, LuCheck, LuCopy, LuShare } from 'react-icons/lu'
import { useUpdateUserProfile } from '../../utils/mutation'
import { useUserProfile } from '../../utils/query'

export function ShareProfile() {
  const sharedURL =
    typeof window !== 'undefined' ? `${window.location.origin}/user/` : ''

  const router = useRouter()
  const { data: profile } = useUserProfile()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isEditing, setIsEditing] = React.useState(false)
  const [username, setUsername] = React.useState(profile?.user?.username || '')
  const [message, setMessage] = React.useState('')

  const isOwnProfile = profile.isOwnProfile

  const update = useUpdateUserProfile({
    onSuccess: () => {
      router.replace(`/user/${username}`)
      setIsEditing(false)
      setMessage('')
    },
  })

  function onSave() {
    if (!username) {
      setMessage('Please enter a username')
      return
    }
    if (!username.match(/^[a-zA-Z0-9]{3,50}$/)) {
      setMessage(
        'The URL is usually 3-50 letters or numbers without special characters like @, !, &',
      )
      return
    }
    toast.promise(
      update.mutateAsync({
        data: {
          user: {
            update: {
              data: {
                username: { set: username },
              },
            },
          },
        },
      }),
      {
        loading: 'Updating username...',
        success: 'Username updated',
        error: 'Failed to update username',
      },
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="outline-none" aria-label="Share profile">
          <LuShare className="size-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[92.5%] max-w-[92.5%] gap-0 p-6 max-sm:rounded-xl">
        <DialogHeader className="mt-1">
          <DialogTitle className="title-3">Share Profile</DialogTitle>
        </DialogHeader>
        <div className="body-m mt-8">
          <Label className="text-secondary-neutral">Custom Profile URL</Label>
          <div className="flex h-10 items-center">
            <p
              className={cn('body-m', {
                hidden: isMobile && isEditing,
              })}
            >
              {sharedURL}
            </p>
            {isEditing ? (
              <div className="flex w-full items-center gap-3">
                <Input
                  value={username}
                  className="max-sm:mt-1 sm:ml-1"
                  onChange={e => setUsername(e.target.value)}
                />
                {message ? (
                  <LuAlertCircle className="size-5 text-destructive-600" />
                ) : (
                  <LuCheck className="size-5 text-success-600" />
                )}
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <span className="headline-m">{username}</span>
                {isOwnProfile && (
                  <button
                    className="outline-none max-sm:hidden"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit3 className="size-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className="mt-4 flex flex-col">
            {message ? (
              <p className="body-xs text-destructive-600">{message}</p>
            ) : (
              <p className="body-xs text-secondary-neutral">
                The URL is usually 3-50 letters or numbers
              </p>
            )}
            <Button
              className="mt-5 w-full sm:mt-8 sm:w-fit sm:self-end"
              loading={update.isPending}
              onClick={onSave}
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-4 sm:mt-8 sm:flex-row sm:gap-8">
            <Button
              className="w-full sm:hidden"
              variant="outline"
              color="neutral"
              onClick={() => setIsEditing(true)}
            >
              Edit Link
              <FiEdit3 className="size-4" />
            </Button>
            <CopyToClipboard text={sharedURL + username}>
              <Button className="w-full sm:w-fit">
                Copy Link
                <LuCopy className="size-4" />
              </Button>
            </CopyToClipboard>
            <div className="flex items-center gap-6">
              <span className="body-s text-secondary-neutral">
                Or Share With
              </span>
              <TwitterShareButton url={sharedURL}>
                <FaXTwitter className="size-6" />
              </TwitterShareButton>
              <WhatsappShareButton url={sharedURL}>
                <FaWhatsapp className="size-6" />
              </WhatsappShareButton>
              <TelegramShareButton url={sharedURL}>
                <FaTelegram className="size-6" />
              </TelegramShareButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
