import { FormInput } from '@/components/common/form-input'
import GlobalSearchSelect from '@/components/global-search-select'
import {
  type CoLearningTodo,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@hackquest/ui/shared/form'
import { Input, InputSlot } from '@hackquest/ui/shared/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiSearch } from 'react-icons/fi'
import { LuArrowRight, } from 'react-icons/lu'
import * as z from 'zod'
import { useColearningContext } from '../common/creation-provider'
import { useTodoContext } from './todo-context'

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().optional(),
  urlPlaceholder: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function EditHackathon({ iniTodo }: { iniTodo?: CoLearningTodo }) {
  const {
    editingTodo,
    setHackathonCreatingTodo,
    setEditingTodo,
    data: coLearningList,
  } = useTodoContext()
  const coLearningId = useParams().id as string
  const { mutateAsync } = useUpdateCoLearningMutation()
  function onCancel() {
    if (iniTodo) {
      setEditingTodo(editingTodo.filter(iniId => iniId !== iniTodo.id))
      return
    }
    setHackathonCreatingTodo(prev => prev - 1)
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: iniTodo?.url ?? '',
      name: iniTodo?.name ?? '',
    },
  })

  const onSelect = (info: any) => {
    form.setValue('url', info._link)
    form.setValue('urlPlaceholder', info._name)
  }
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
                type: 1,
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
  const urlPlaceholder = form.watch('urlPlaceholder')
  const [focus, setFocus] = useState(false)

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
          placeholder="Hackathon To Do List Name"
          className="bg-white"
          requiredSymbol
          label="Hackathon To Do List Name"
          maxLength={80}
        />
        <FormField
          control={form.control}
          name={'urlPlaceholder'}
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <div className="flex items-center justify-start gap-2">
                <FormLabel>Search Hackquest To Do List</FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Search for Hackthon keywords, topics, etc..."
                    value={field.value}
                    onFocus={() => {
                      setFocus(true)
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setFocus(false)
                      }, 310)
                    }}
                    onChange={e => {
                      const val = e.target.value
                      field.onChange(val)
                    }}
                  >
                    <InputSlot>
                      <FiSearch />
                    </InputSlot>
                  </Input>
                  {urlPlaceholder && focus && (
                    <GlobalSearchSelect
                      onSelect={onSelect}
                      keyword={urlPlaceholder}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" onClick={form.handleSubmit(onConfirm)}>
          Confirm <LuArrowRight />
        </Button>
      </div>
    </Form>
  )
}
