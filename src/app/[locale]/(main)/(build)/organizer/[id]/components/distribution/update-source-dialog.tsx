'use client'
import { FormInput } from '@/components/common/form-input'
import {
  type HackathonUtmExtend,
  type ListOrganizerDistributionUtmSourcesQuery,
  useCreateHackathonUtmMutation,
  useUpdateHackathonUtmMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@hackquest/ui/shared/dialog'
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import * as z from 'zod'

const formSchema = z.object({
  url: z.string().min(1),
  sourceName: z.string().min(1),
  color: z.string().min(1),
})
type FormValues = z.infer<typeof formSchema>

const UpdateSourceDialog = ({
  type,
  refetch,
  source,
}: {
  type: 'add' | 'edit'
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<ListOrganizerDistributionUtmSourcesQuery, Error>
  >
  source?: HackathonUtmExtend
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const create = useCreateHackathonUtmMutation()
  const update = useUpdateHackathonUtmMutation()
  const color = form.watch('color')
  const closeRef = useRef<HTMLButtonElement>(null)
  const params = useParams()
  const hackathonId = params.id as string
  const iniSketchDisable = !source?.color

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (source) {
      form.reset({
        sourceName: source?.sourceName ?? '',
        url: source.url ?? '',
        color: source.color ?? '',
      })
    }
  }, [])

  const [sketchDisable, setSketchDisable] = useState(iniSketchDisable)
  const onSubmit = (data: FormValues) => {
    const { url, sourceName, color } = data
    if (source) {
      toast.promise(
        update.mutateAsync({
          where: {
            hackathonId: {
              equals: hackathonId,
            },
            id: source.id,
          },
          data: {
            color: {
              set: color,
            },
            sourceName: {
              set: sourceName,
            },
            url: {
              set: url,
            },
          },
        }),
        {
          loading: 'Loading...',
          success: 'Save Success',
          error: 'Failed to Save',
        },
      )
      closeRef.current?.click()
    } else {
      toast.promise(
        create.mutateAsync({
          data: {
            hackathonId,
            url,
            sourceName,
            color,
          },
        }),
        {
          loading: 'Loading...',
          success: 'Save Success',
          error: 'Failed to Save',
        },
      )
      closeRef.current?.click()
    }
  }

  return (
    <DialogContent showCloseIcon className="sm:max-w-[888px]">
      <DialogHeader className="title-1 text-left text-primary-neutral">
        {type === 'add' ? 'Add A New UTM Source' : 'Edit UTM Source'}
      </DialogHeader>
      <Form {...form}>
        <div className="flex w-full justify-between">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <div>
                <FormLabel>Legend Color*</FormLabel>
                <div
                  className="relative mt-[4px] h-[50px] w-[50px] cursor-pointer rounded-[8px]"
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    setSketchDisable(true)
                  }}
                >
                  <div
                    className={`absolute top-[-20px] left-[52px] ${sketchDisable ? 'block' : 'hidden'}`}
                  >
                    <HexColorPicker
                      color={color}
                      onChange={(color: string) => {
                        field.onChange(color)
                        setSketchDisable(false)
                      }}
                    />
                  </div>
                </div>
                <FormMessage />
              </div>
            )}
          />
          <div className="w-2/3">
            <FormInput
              name="sourceName"
              control={form.control}
              label="Source Name*"
              className="w-full"
            />
          </div>
        </div>
        <FormInput
          name="url"
          control={form.control}
          label="Custom UTM URL*"
          className="w-full"
        />
        <DialogFooter className="flex w-full gap-4">
          <Button
            className="flex flex-1 gap-1"
            onClick={form.handleSubmit(onSubmit)}
          >
            Save & Close <BsArrowRight />
          </Button>
          <DialogClose asChild ref={closeRef}>
            <Button
              variant="outline"
              color="neutral"
              className="flex flex-1 gap-1"
            >
              Close <BsArrowRight />
            </Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </DialogContent>
  )
}

export default UpdateSourceDialog
