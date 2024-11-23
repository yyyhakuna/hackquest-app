import { FormInput } from '@/components/common/form-input'
import { useSendContactEmailMutation } from '@/graphql/generated/hooks'
import { useUpdateHackathon } from '@/hooks/hackathon/mutation'
import { useHackathonId, useHackathonQuery } from '@/hooks/hackathon/query'
import { useToggle } from '@/hooks/utils/use-toggle'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import { useUser } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { omit } from 'lodash-es'
import * as React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import SectionButton from '../common/section-button'
import { VerifyEmailDialog } from './verify-email-dialog'

const formSchema = z.object({
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  discord: z.string().url().optional().or(z.literal('')),
  slack: z.string().url().optional().or(z.literal('')),
  farcaster: z.string().url().optional().or(z.literal('')),
  telegram: z.string().url().optional().or(z.literal('')),
})

type FormValues = z.infer<typeof formSchema>

const linksOptions = [
  {
    label: 'Instagram',
    value: 'instagram',
    placeholder: 'Enter hackathon Instagram account',
  },
  {
    label: 'Twitter',
    value: 'twitter',
    placeholder: 'Enter hackathon Twitter account',
  },
  {
    label: 'Discord',
    value: 'discord',
    placeholder: 'Enter hackathon Discord account',
  },
  {
    label: 'Slack',
    value: 'slack',
    placeholder: 'Enter hackathon Slack account',
  },
  {
    label: 'Farcaster',
    value: 'farcaster',
    placeholder: 'Enter hackathon Farcaster account',
  },
  {
    label: 'Telegram',
    value: 'telegram',
    placeholder: 'Enter hackathon Telegram account',
  },
] as const

export function Links() {
  const hackathonId = useHackathonId()
  const { data: hackathon } = useHackathonQuery()
  const context = useHackathonCreationContext()

  const links = hackathon?.links

  const currentUser = useUser()

  const [open, onOpenChange] = useToggle(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser?.email ?? '',
      website: links?.website ?? '',
      instagram: links?.links?.instagram ?? '',
      twitter: links?.links?.twitter ?? '',
      discord: links?.links?.discord ?? '',
      slack: links?.links?.slack ?? '',
      farcaster: links?.links?.farcaster ?? '',
      telegram: links?.links?.telegram ?? '',
    },
  })

  const email = useWatch({
    control: form.control,
    name: 'email',
  })

  const isValid = form.formState.isValid

  const update = useUpdateHackathon({
    onSuccess: () => {
      toast.success('Hackathon updated')
      context.setSelectedTab('cover')
    },
  })

  const sendEmail = useSendContactEmailMutation({
    onSuccess: () => {
      toast.success('Email sent')
      onOpenChange(true)
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  function onValid(data: FormValues) {
    update.mutate({
      updateHackathonId: hackathonId,
      data: {
        progress: 'links',
        links: {
          upsert: {
            create: {
              email: data.email,
              website: data.website,
              links: omit(data, ['email', 'website']),
            },
            update: {
              email: {
                set: data.email,
              },
              website: {
                set: data.website,
              },
              links: omit(data, ['email', 'website']),
            },
          },
        },
      },
    })
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onValid)}
        >
          <div className="flex w-full items-end gap-4">
            <FormInput
              control={form.control}
              name="email"
              label="Personal Contact Email"
              placeholder="Enter your email"
              requiredSymbol
              disabled={!!currentUser?.email}
            />
            {!currentUser?.email && (
              <Button
                className="h-10 rounded-lg"
                disabled={!isValid}
                loading={sendEmail.isPending}
                onClick={() => {
                  const email = form.getValues('email')
                  if (email) {
                    sendEmail.mutate({ email })
                  }
                }}
              >
                Verify
              </Button>
            )}
          </div>
          <FormInput
            control={form.control}
            name="website"
            label="Hackathon’s Website"
            placeholder="Enter your hackathon website"
          />

          <div className="grid grid-cols-2 gap-6">
            {linksOptions.map((option, index) => (
              <FormInput
                key={index}
                control={form.control}
                name={option.value}
                label={option.label}
                placeholder={option.placeholder}
              />
            ))}
          </div>

          <SectionButton loading={update.isPending} />
        </form>
      </Form>
      <VerifyEmailDialog
        email={email}
        open={open}
        onOpenChange={onOpenChange}
      />
    </React.Fragment>
  )
}
