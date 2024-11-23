import { openWindow } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import { Form } from '@hackquest/ui/shared/form'
import { Label } from '@hackquest/ui/shared/label'
import { zodResolver } from '@hookform/resolvers/zod'
import omit from 'lodash-es/omit'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaDiscord } from 'react-icons/fa6'
import { LuArrowRight, LuCheck, LuPlus } from 'react-icons/lu'
import { useUpdateUserProfile } from '../../utils/mutation'
import { useUserProfile } from '../../utils/query'
import {
  type SocialLinkSchema,
  socialLinkSchema,
} from '../../utils/validations'
import { SocialMedia } from '../common/social-media'

export function ConnectAccounts({
  onClose,
}: {
  onClose: () => void
}) {
  const { data: profile } = useUserProfile()

  const links = profile?.personalLinks

  const update = useUpdateUserProfile({
    onSuccess: () => {
      onClose()
    },
  })

  const form = useForm<SocialLinkSchema>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      twitter: links?.twitter ?? '',
      github: links?.github ?? '',
      linkedIn: links?.linkedIn ?? '',
      telegram: links?.telegram ?? '',
      wechat: links?.wechat ?? '',
    },
  })

  function onValid(data: SocialLinkSchema) {
    const omitedData = omit(data, ['github'])
    if (Object.values(omitedData).every(value => !value)) {
      toast.error('Please fill in at least one link')
      return
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value != null && value !== ''),
    )

    const payload = {
      personalLinks: {
        ...links,
        ...filteredData,
      },
      progress: { push: [3] },
    }

    toast.promise(update.mutateAsync({ data: payload }), {
      loading: 'Updating profile...',
      success: 'Profile updated',
      error: 'Failed to update profile',
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 max-sm:px-6"
        onSubmit={form.handleSubmit(onValid)}
      >
        <h2 className="title-5 sm:title-3 max-sm:text-center">
          Connect accounts to grow your network
        </h2>
        <div className="flex flex-col gap-4">
          <Label className="headline-s">Link Accounts</Label>
          <div className="grid sm:grid-cols-2">
            <button
              type="button"
              disabled={!!links?.discord}
              className={cn(
                'inline-flex items-center gap-4 rounded-xl border border-neutral-200 p-3 outline-none transition-colors duration-300 enabled:hover:border-neutral-300',
                {
                  'border-success-600': links?.discord,
                },
              )}
              onClick={() => {
                openWindow('http://localhost:4002/auth/discord/connect')
              }}
            >
              <FaDiscord className="size-8 text-social-discord" />
              <div>
                {links?.discord ? (
                  <React.Fragment>
                    <h4 className="headline-s">Discord</h4>
                    <p className="body-xs text-secondary-neutral">
                      {links.discord}
                    </p>
                  </React.Fragment>
                ) : (
                  <span className="headline-s">Connect Github</span>
                )}
              </div>
              {links?.discord ? (
                <LuCheck className="ml-auto size-4 text-success-600" />
              ) : (
                <LuPlus className="ml-auto size-4" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label className="headline-s">Display on Profile</Label>
          <SocialMedia isOnboarding />
        </div>
        <DialogFooter className="mt-10 max-sm:gap-2 max-sm:py-6 sm:items-center">
          <Button
            variant="text"
            color="neutral"
            size="small"
            className="text-secondary-neutral"
            aria-label="Skip for now"
            onClick={() => onClose()}
          >
            Skip for now
            <LuArrowRight className="icon-hover-translate size-3" />
          </Button>
          <Button loading={update.isPending} type="submit">
            Continue
            <LuArrowRight className="icon-hover-translate size-4" />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
