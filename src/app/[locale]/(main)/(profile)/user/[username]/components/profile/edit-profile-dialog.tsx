'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { Button } from '@hackquest/ui/shared/button'
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { Form } from '@hackquest/ui/shared/form'
import { ScrollArea } from '@hackquest/ui/shared/scroll-area'
import { Separator } from '@hackquest/ui/shared/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import pick from 'lodash-es/pick'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useUpdateUserProfile } from '../../utils/mutation'
import { useUserProfile } from '../../utils/query'
import { useDialogStore } from '../../utils/store'
import { type ProfileSchema, profileSchema } from '../../utils/validations'
import { ProfileForm } from '../common/profile-form'
import { SocialMedia } from '../common/social-media'

export function EditProfileDialog() {
  const submitRef = React.useRef<HTMLInputElement>(null)

  const { data: profile } = useUserProfile()
  const { open, type, onClose } = useDialogStore()

  const update = useUpdateUserProfile({
    onSuccess: () => {
      onClose('edit-profile')
    },
    onError: () => {
      toast.error('Failed to update profile')
    },
  })

  const dialogOpen = open && type === 'edit-profile'

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: profile?.user?.nickname ?? '',
      bio: profile?.bio ?? '',
      location: profile?.location ?? '',
      techStack: profile?.techStack ?? [],
      ...profile?.personalLinks,
    },
  })

  function onValid(data: ProfileSchema) {
    const personalLinks = pick(data, [
      'twitter',
      'linkedIn',
      'telegram',
      'github',
      'wechat',
    ])
    toast.promise(
      update.mutateAsync({
        data: {
          bio: { set: data.bio || null },
          techStack: data.techStack || [],
          location: { set: data.location || null },
          personalLinks: {
            ...profile?.personalLinks,
            ...personalLinks,
          },
          user: {
            update: {
              data: {
                nickname: { set: data.nickname || null },
              },
            },
          },
        },
      }),
      {
        loading: 'Updating profile...',
        success: 'Profile updated',
        error: 'Failed to update profile',
      },
    )
  }
  return (
    <ResponsiveDialog
      open={dialogOpen}
      onOpenChange={() => onClose()}
      dialogContentProps={{ className: 'p-0 sm:w-full sm:max-w-xl' }}
    >
      <DialogHeader className="px-6 pt-6 pb-4">
        <DialogTitle className="title-3">Edit Profile</DialogTitle>
      </DialogHeader>
      <Separator className="max-sm:hidden" />
      <ScrollArea className="h-[50vh] sm:h-[60vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onValid)}
            className="space-y-4 px-6 pb-1 max-sm:py-4"
          >
            <ProfileForm />
            <SocialMedia />
            <input ref={submitRef} type="submit" className="hidden" />
          </form>
        </Form>
      </ScrollArea>
      <Separator className="max-sm:hidden" />
      <DialogFooter className="px-6 pb-4 max-sm:py-4">
        <Button
          loading={update.isPending}
          onClick={() => submitRef.current?.click()}
        >
          Save Changes
        </Button>
      </DialogFooter>
    </ResponsiveDialog>
  )
}
