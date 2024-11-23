import { FormInput } from '@/components/common/form-input'
import GlobalSearchSelect from '@/components/global-search-select'
import type { HackathonTodoExtend } from '@/graphql/generated/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@hackquest/ui/shared/form'
import { Input, InputSlot } from '@hackquest/ui/shared/input'
import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import { z } from 'zod'
import EditHeaderButton from '../common/edit-header-button'
import { HackathonToDoType } from '../constants/type'

const formSchema = z.object({
  name: z.string().min(1).max(80),
  intro: z.string().max(100).optional(),
  url: z.string().optional(),
  type: z.string().optional(),
  order: z.number().optional(),
})
interface ToDoEditProp {
  initValue: HackathonTodoExtend
  onSubmit: (data: HackathonTodoExtend, id: string) => void
  onCancel: VoidFunction
  loading: boolean
}

const ToDoEdit: React.FC<ToDoEditProp> = ({
  initValue,
  onSubmit,
  onCancel,
  loading,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initValue.name || '',
      intro: initValue.intro || '',
      url: initValue.url || '',
      type: initValue.type,
      order: initValue.order,
    },
  })

  const url = form.watch('url')
  const metadata = useRef<Record<string, any>>(initValue.metadata || {})

  const [focus, setFocus] = useState(false)

  const onSelect = (info: any) => {
    form.setValue('url', info._name)
    metadata.current = {
      ...metadata.current,
      data: info,
    }
  }

  const onValid = (val: z.infer<typeof formSchema>) => {
    const regex = /^(http:\/\/|https:\/\/)/
    if (metadata.current.urlType === 'input' && url && !regex.test(url)) {
      form.setError('url', {
        message: 'URL on invalid',
      })
      return
    }
    const newMetaData = metadata.current.data?.id
      ? metadata.current
      : initValue.metadata
    onSubmit(
      {
        ...val,
        metadata: newMetaData,
      } as HackathonTodoExtend,
      initValue.id,
    )
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4"
        onSubmit={form.handleSubmit(onValid)}
      >
        <EditHeaderButton
          onCancel={onCancel}
          confirmLoading={loading}
          title={
            initValue.type === HackathonToDoType.INIT ? initValue.name : null
          }
        />
        {initValue.type !== HackathonToDoType.INIT && (
          <FormInput
            control={form.control}
            name="name"
            label={initValue.metadata.nameLabel}
            placeholder="Use several words to describe the selections you want users to choose"
            requiredSymbol
            maxLength={80}
          />
        )}
        <FormInput
          control={form.control}
          name="intro"
          label={initValue.metadata.introLabel}
          placeholder={initValue.metadata.introLabel}
          maxLength={100}
        />
        {initValue.metadata.urlType === 'input' ? (
          <FormInput
            control={form.control}
            name="url"
            label={initValue.metadata.urlLabel}
            placeholder={initValue.metadata.urlLabel}
            maxLength={100}
          />
        ) : (
          <FormField
            control={form.control}
            name={'url'}
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <div className="flex items-center justify-start gap-2">
                  <FormLabel>{initValue.metadata.urlLabel}</FormLabel>
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
                          if (!metadata.current?.data?.id) {
                            field.onChange('')
                          }
                        }, 310)
                      }}
                      onChange={e => {
                        const val = e.target.value
                        field.onChange(val)
                        metadata.current = {
                          ...metadata.current,
                          data: {
                            id: '',
                          },
                        }
                      }}
                    >
                      <InputSlot>
                        <FiSearch />
                      </InputSlot>
                    </Input>
                    {url && focus && (
                      <GlobalSearchSelect onSelect={onSelect} keyword={url} />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  )
}

export default ToDoEdit
