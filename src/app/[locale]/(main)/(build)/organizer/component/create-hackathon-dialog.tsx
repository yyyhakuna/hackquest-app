'use client'

import { useRouter } from '@/app/navigation'
import { FormInput } from '@/components/common/form-input'
import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { useCreateHackathonMutation } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormValues = z.infer<typeof formSchema>

export function CreateHackathonDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const create = useCreateHackathonMutation({
    onSuccess: data => {
      startTransition(() => {
        router.push(`/hackathon/${data.hackathon?.id}/create`)
      })
    },
    onError: (error: any) => {
      toast.error(error)
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const isValid = form.formState.isValid

  function onValid(data: FormValues) {
    toast.promise(create.mutateAsync({ name: data.name }), {
      loading: 'Creating hackathon...',
      success: 'Hackathon created',
      error: 'Failed to create hackathon.',
    })
  }

  const fullPending = create.isPending || isPending

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      drawerContentProps={{
        className: 'gap-6 px-5 pb-8',
      }}
      dialogContentProps={{
        className: 'gap-6 sm:max-w-[28.75rem]',
      }}
    >
      <DialogHeader className="space-y-4">
        <DialogTitle className="title-3">Hackathon Name</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="space-y-6">
          <FormInput
            control={form.control}
            name="name"
            placeholder="Enter your hackathon name"
          />
          <DialogFooter className="max-sm:gap-3 sm:space-x-8">
            <Button
              variant="outline"
              color="neutral"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-full"
              type="submit"
              disabled={!isValid}
              loading={fullPending}
            >
              Create Hackathon
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ResponsiveDialog>
  )
}
