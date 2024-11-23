import { FormInput } from '@/components/common/form-input'
import {
  type CoLearningTodo,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import * as z from 'zod'
import { useColearningContext } from '../common/creation-provider'
import { useTodoContext } from './todo-context'

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().url().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function EditCustom({ iniTodo }: { iniTodo?: CoLearningTodo }) {
  const {
    setCustomCreatingTodo,
    editingTodo,
    setEditingTodo,
    data: coLearningList,
  } = useTodoContext()
  const coLearningId = useParams().id as string
  const { mutateAsync, isPending } = useUpdateCoLearningMutation()
  function onCancel() {
    if (iniTodo) {
      setEditingTodo(editingTodo.filter(iniId => iniId !== iniTodo.id))
      return
    }
    setCustomCreatingTodo(prev => prev - 1)
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: iniTodo?.url ?? '',
      name: iniTodo?.name ?? '',
    },
  })

  function getParams(data: FormValues) {
    if (iniTodo) {
      return {
        id: coLearningId,
        data: {
          todos: {
            update: [
              {
                where: {
                  id: iniTodo!.id ?? '',
                },
                data: {
                  url: {
                    set: data.url,
                  },
                  name: {
                    set: data.name,
                  },
                },
              },
            ],
          },
        },
      }
    } else {
      return {
        id: coLearningId,
        data: {
          todos: {
            create: [
              {
                type: 0,
                url: data.url,
                name: data.name,
                order:
                  (coLearningList[coLearningList.length - 1]?.order ?? 0) + 1,
              },
            ],
          },
        },
      }
    }
  }

  const { setContinueButtonStatus } = useColearningContext()
  const onConfirm = (data: FormValues) => {
    toast
      .promise(mutateAsync(getParams(data)), {
        loading: 'Loading',
        success: 'Update success',
        error: 'Failed to update',
      })
      .then(() => {
        onCancel()
        setContinueButtonStatus(0)
      })
  }

  return (
    <Form {...form}>
      <div className="space-y-4 rounded-xl border border-neutral-300 bg-neutral-100 bg-neutral-50 p-4">
        <div className="flex items-center justify-between">
          <span />
          <div className="flex items-center gap-2">
            <Button
              size="small"
              variant="outline"
              color="neutral"
              //   loading={fullPending}
              onClick={onCancel}
            >
              cancel
            </Button>
          </div>
        </div>
        <FormInput
          control={form.control}
          name="name"
          placeholder="To Do List Name"
          className="bg-white"
          requiredSymbol
          label="To Do List Name"
          maxLength={60}
        />
        <FormInput
          control={form.control}
          name="url"
          className="bg-white"
          placeholder="Dev Docs Intro URL"
          label="Action Button Url"
          maxLength={100}
        />
        <Button
          className="w-full"
          loading={isPending}
          onClick={form.handleSubmit(onConfirm)}
        >
          Confirm <LuArrowRight />
        </Button>
      </div>
    </Form>
  )
}
