'use client'
import { FormCombobox } from '@/components/common/form-combobox'
import { FormDatePicker } from '@/components/common/form-date-picker'
import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import {
  type HackathonAnnouncement,
  type HackathonAnnouncementInput,
  type ListHackathonAnnouncementQuery,
  useCreateAndUpdateHackathonAnnouncementMutation,
  useDeleteHackathonAnnouncementMutation,
  useFindReceiversQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@hackquest/ui/shared/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type QueryObserverResult,
  type RefetchOptions,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import * as z from 'zod'
import { timezoneMap } from '../../constant'
import ReceiverItem from './receiver-item'

const formSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  sendTime: z.string().optional(),
  isSendRightNow: z.boolean().default(false),
  timezone: z.string(),
  tags: z.array(z.string()).min(1),
})

type FormValues = z.infer<typeof formSchema>

const CreateModal = ({
  iniData,
  isExpired,
  refetch,
}: {
  iniData?: HackathonAnnouncement
  isExpired?: boolean
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ListHackathonAnnouncementQuery, Error>>
}) => {
  const t = useTranslations('HackathonOrganizer.manage')

  const params = useParams()
  const update = useCreateAndUpdateHackathonAnnouncementMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: iniData?.receivers?.split(',') ?? [],
      title: iniData?.title ?? '',
      message: iniData?.message || '',
      timezone: iniData?.timezone || '',
      isSendRightNow: iniData?.rightNow ?? false,
      sendTime: dayjs(iniData?.actualTime).format('YYYY-MM-DDTHH:mm'),
    },
  })

  const tags = form.watch('tags')

  const { data } = useSuspenseQuery({
    queryKey: useFindReceiversQuery.getKey({
      id: params.id as string,
    }),
    queryFn: useFindReceiversQuery.fetcher({
      id: params.id as string,
    }),
  })
  const d: { count: number; type: string }[] = data.findReceivers ?? []
  const closeRef = useRef<HTMLButtonElement>(null)
  const id = iniData?.id
  const deleteAcction = useDeleteHackathonAnnouncementMutation()
  const onSubmit = (data: FormValues) => {
    const { isSendRightNow, sendTime, message, tags, timezone, title } = data

    const innerData = {
      hackathonId: params.id as string,
      message,
      plannedTime: sendTime,
      receivers: tags,
      rightNow: isSendRightNow,
      timezone: timezone.toString(),
      title,
    } as HackathonAnnouncementInput
    if (id) {
      innerData.id = id
    }

    if (!isSendRightNow && !sendTime) {
      form.setError('sendTime', {
        message: 'sendTime must be filled',
      })
      return
    }
    toast.promise(
      update.mutateAsync({
        data: innerData,
      }),
      {
        loading: 'Updating announcement...',
        success: 'Update Success',
        error: 'Failed to Update',
      },
    )
    closeRef.current?.click()
  }
  return (
    <DialogContent className="max-h-[800px] overflow-auto sm:max-w-[888px]">
      <DialogClose ref={closeRef} className="hidden " />
      <Form {...form}>
        <DialogHeader className="text-left ">
          <FormInput
            control={form.control}
            name="title"
            className="title-1 border-none text-primary-neutral"
            placeholder="Enter Your Announce title "
            disabled={isExpired}
          />
        </DialogHeader>
        <div>
          <FormEditor
            control={form.control}
            name="message"
            label="Message sent to receivers"
            onValueChange={_v => {}}
            labelProps={{ className: 'flex-1' }}
            placeholder="message"
            disabled={isExpired}
          />
        </div>
        <div className="my-2 h-[1px] bg-neutral-300" />
        <FormCombobox
          control={form.control}
          name="timezone"
          label="Timezone"
          options={timezoneMap.map(v => {
            return { value: v, label: v }
          })}
          disabled={isExpired}
        />
        <div className="flex gap-6">
          <div className="w-[368px]">
            <FormDatePicker
              control={form.control}
              name="sendTime"
              label="sendTime"
              // value={new Date(iniData?.actualTime)}
              labelProps={{ className: 'body-s text-neutral-600' }}
              disabled={isExpired}
            />
          </div>
          <FormField
            control={form.control}
            name="isSendRightNow"
            render={({ field }) => (
              <FormItem id="disableJudge-item">
                <FormControl>
                  <div className="space-y-1">
                    <FormLabel className="body-s block text-neutral-600">
                      Send the announcement right now
                    </FormLabel>
                    <Checkbox
                      id="disableJudge"
                      className="h-[40px] w-[40px] border-neutral-300"
                      checked={field.value}
                      onCheckedChange={checked => {
                        field.onChange(checked as boolean)
                      }}
                      disabled={isExpired}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <div className="space-y-3">
              <FormLabel className="body-s block text-neutral-600">
                Receivers
              </FormLabel>
              <FormItem
                id="disableJudge-item"
                className="flex flex-wrap gap-3 space-y-0"
              >
                {d?.map(obj => {
                  const iniSelected = tags.includes(obj.type)
                  return (
                    <ReceiverItem
                      value={obj.type}
                      key={obj.type}
                      onSelect={() => {
                        if (iniSelected) {
                          form.setValue(
                            'tags',
                            tags.filter(cur => obj.type !== cur),
                          )
                        } else {
                          form.setValue('tags', [...tags, obj.type])
                        }
                      }}
                      disabled={isExpired}
                      iniSelected={iniSelected}
                    />
                  )
                })}
              </FormItem>
              <FormMessage />
            </div>
          )}
        />
      </Form>
      <div className="mt-2 h-[1px] bg-neutral-300" />
      {isExpired ? (
        <DialogClose asChild>
          <Button className="flex w-full" variant="outline" color="neutral">
            Close <BsArrowRight />
          </Button>
        </DialogClose>
      ) : (
        <DialogFooter className="mt-2 w-full">
          <Button className="flex-1" onClick={form.handleSubmit(onSubmit)}>
            Send At Scheduled Time
            <BsArrowRight />
          </Button>
          <Button
            className="flex-1"
            color="neutral"
            variant="outline"
            onClick={() => {
              closeRef.current?.click()
            }}
          >
            {t('saveAndContinue')}
            <BsArrowRight />
          </Button>
          <Button
            className="flex-1"
            color="neutral"
            variant="outline"
            onClick={() => {
              if (iniData?.id) {
                toast.promise(
                  deleteAcction.mutateAsync({
                    id: id!,
                    hackathonId: params.id as string,
                  }),
                  {
                    loading: 'Deleting announcement...',
                    success: 'Announcement Delete',
                    error: 'Failed to delete Announcement',
                  },
                )
                closeRef.current?.click()
              } else {
                form.reset()
                closeRef?.current?.click()
              }
            }}
          >
            Delete Annoncement
            <BsArrowRight />
          </Button>
        </DialogFooter>
      )}
    </DialogContent>
  )
}

export default CreateModal
