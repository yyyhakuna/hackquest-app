import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import { Form } from '@hackquest/ui/shared/form'
import { ScrollArea } from '@hackquest/ui/shared/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import type * as z from 'zod'
import { useUpdateUserProfile } from '../../utils/mutation'
import { useUserProfile } from '../../utils/query'
import { profileSchema } from '../../utils/validations'
import { ProfileForm } from '../common/profile-form'
import { UserAvatar } from '../common/user-avatar'

const formSchema = profileSchema.omit({
  twitter: true,
  linkedIn: true,
  telegram: true,
  github: true,
  wechat: true,
})

type FormSchema = z.infer<typeof formSchema>

export function ProfileInfo({
  setStep,
}: {
  setStep: (step: number) => void
}) {
  const submitRef = React.useRef<HTMLInputElement>(null)
  const { data: profile } = useUserProfile()

  const update = useUpdateUserProfile({
    onSuccess: () => {
      setStep(2)
    },
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: profile?.user?.nickname ?? '',
      bio: profile?.bio ?? '',
      location: profile?.location ?? '',
      techStack: profile?.techStack ?? [],
    },
  })

  function onValid(data: FormSchema) {
    toast.promise(
      update.mutateAsync({
        data: {
          bio: { set: data.bio || null },
          location: { set: data.location || null },
          techStack: data.techStack || [],
          progress: { set: [1] },
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
    <React.Fragment>
      <ScrollArea className="max-sm:h-[50vh] max-sm:px-6 sm:max-h-[70vh]">
        <h2 className="title-4 sm:title-3">
          We would like to know more about you!
        </h2>
        <div className="relative mt-4 size-24">
          <UserAvatar
            src={profile?.user?.avatar}
            isOwnProfile={profile.isOwnProfile}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onValid)}
            className="mt-4 space-y-4 p-0.5"
          >
            <ProfileForm />
            <input type="submit" ref={submitRef} className="hidden" />
          </form>
        </Form>
      </ScrollArea>
      <DialogFooter className="max-sm:p-6 sm:mt-6">
        <Button
          loading={update.isPending}
          onClick={() => submitRef.current?.click()}
        >
          Continue
          <LuArrowRight className="icon-hover-translate size-4" />
        </Button>
      </DialogFooter>
    </React.Fragment>
  )
}
