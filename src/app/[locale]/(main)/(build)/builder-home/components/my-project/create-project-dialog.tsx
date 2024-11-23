'use client'

import { useRouter } from '@/app/navigation'
import { FormInput } from '@/components/common/form-input'
import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import MenuLink from '@/constants/menu-link'
import { useCreateProjectMutation } from '@/graphql/generated/hooks'
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

export function CreateProjectDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  const [transitionPending, startTransition] = React.useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const isValid = form.formState.isValid

  const { mutateAsync, isPending } = useCreateProjectMutation({
    meta: {
      invalidates: [['ListProjectsBySelf']],
    },
    onSuccess: data => {
      startTransition(() => {
        router.push(`${MenuLink.HACKATHON_PROJECTS}/${data.project?.id}/edit`)
      })
    },
  })

  function onSubmit(data: FormValues) {
    toast.promise(mutateAsync({ data: { name: data.name } }), {
      loading: 'Creating project...',
      success: 'Project created',
      error: 'Failed to create project',
    })
  }

  const fullPending = isPending || transitionPending

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
        <DialogTitle className="title-3">Project Name</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            control={form.control}
            name="name"
            placeholder="Enter your project name"
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
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ResponsiveDialog>
  )
}
