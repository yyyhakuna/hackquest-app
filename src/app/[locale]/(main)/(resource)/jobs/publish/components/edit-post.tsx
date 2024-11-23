'use client'

import { useRouter } from '@/app/navigation'
import { useFindUniqueJobStationQuery } from '@/graphql/generated/hooks'
import webApi from '@/service'
import { Editor } from '@hackquest/editor/react'
import { Button } from '@hackquest/ui/shared/button'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { Input } from '@hackquest/ui/shared/input'
import { RadioGroup, RadioGroupItem } from '@hackquest/ui/shared/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { omit } from 'lodash-es'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiCheck } from 'react-icons/fi'
import { LuX } from 'react-icons/lu'
import { LuUpload } from 'react-icons/lu'
import * as z from 'zod'
import { revalidate } from '../../utils'
import {
  contacts,
  currencies,
  formSchema,
  workModes,
  workTypes,
} from '../../validations'
import { TagCombobox } from './tag-combobox'

const EditPost = () => {
  const t = useTranslations('Jobs.publish')
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [pending, startTransition] = React.useTransition()
  const [html, setHtml] = React.useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      companyLogo: '',
      website: '',
      name: '',
      workMode: 'REMOTE',
      workType: 'FULL_TIME',
      minSalary: '',
      maxSalary: '',
      currency: '',
      tags: [],
      contractKey: [],
      contractValue: {},
    },
  })

  const { data } = useSuspenseQuery({
    queryKey: useFindUniqueJobStationQuery.getKey({ where: { id: params.id } }),
    queryFn: useFindUniqueJobStationQuery.fetcher({ where: { id: params.id } }),
  })
  const _j = data.findUniqueJobStation
  // React.useEffect(() => {
  //   if (data) {
  //     const contractKey = Object.keys(j?.contact || {})
  //     form.reset({
  //       currency: j.currency === null ? undefined : j.currency,
  //       tags: j.tags,
  //       ...j,
  //       minSalary: j?.minSalary?.toString() || '',
  //       maxSalary: j?.maxSalary?.toString() || '',
  //       location: j?.location || '',
  //       contractKey,
  //       contractValue: j?.contact || {},
  //     })
  //   }
  // })

  const companyLogo = form.watch('companyLogo')
  const tags = form.watch('tags')
  const description = form.watch('description')
  const isOnSite = form.watch('workMode') === 'ONSITE'
  const contractKey = form.watch('contractKey')

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => webApi.commonApi.uploadImage(data),
    onSuccess: ({ filepath }) => {
      form.setValue('companyLogo', filepath)
      form.clearErrors('companyLogo')
      toast.success('Upload success')
    },
  })

  const submit = useMutation({
    mutationKey: ['update', params.id],
    mutationFn: (values: any) => webApi.jobApi.updateJob(params.id, values),
    onSuccess: async () => {
      await revalidate()
      await queryClient.invalidateQueries({ queryKey: ['job', params.id] })
      toast.success('Job updated')
      startTransition(() => {
        router.back()
      })
    },
  })

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filepath', 'jobs')
      formData.append('isPublic', 'true')
      mutate(formData)
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const values = {
      ...data,
      description: html,
      location: data.location || null,
      minSalary: data.minSalary
        ? z.coerce.number().parse(data.minSalary)
        : null,
      maxSalary: data.maxSalary
        ? z.coerce.number().parse(data.maxSalary)
        : null,
      contact: data.contractValue,
    }

    submit.mutate(omit(values, ['contractKey', 'contractValue']))
  }

  React.useEffect(() => {
    if (description) {
      setHtml(description)
    }
  }, [description])

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-1 flex-col space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('companyName')}
                <span className="text-destructive-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('text')}
                  {...field}
                  value={field.value}
                  onChange={e => {
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('website')}
                <span className="text-destructive-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('text')}
                  {...field}
                  value={field.value}
                  onChange={e => {
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <FormLabel htmlFor="logo">
            {t('companyLogo')}
            <span className="text-destructive-700">*</span>
          </FormLabel>
          {isPending ? (
            <Spinner />
          ) : companyLogo ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={companyLogo} alt="logo" fill />
              <label className="absolute inset-0 h-full w-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onChange}
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button
                type="button"
                variant="outline"
                size="default"
                color="neutral"
                className="w-[140px]"
              >
                <div className="relative cursor-pointer">
                  <label className="absolute inset-0 h-full w-full cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onChange}
                    />
                  </label>
                  <div className="flex items-center gap-3">
                    {t('uploadFile')} <LuUpload />
                  </div>
                </div>
              </Button>
              <p className="text-neutral-600 text-sm">
                Support file type: jpeg, png, pdf no larger than 5mb
              </p>
            </div>
          )}
          {form.formState.errors.companyLogo && (
            <p role="alert" className="text-status-error-dark">
              {form.formState.errors.companyLogo?.message}
            </p>
          )}
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('jobTitle')}
                <span className="text-destructive-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('text')}
                  {...field}
                  value={field.value}
                  onChange={e => {
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <FormLabel>{t('location')}</FormLabel>
          <div className="space-y-3 sm:flex-row sm:items-center">
            <FormField
              control={form.control}
              name="workMode"
              render={({ field }) => (
                <FormItem className="shrink-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => {
                        field.onChange(value)
                      }}
                      value={field.value}
                      className=""
                    >
                      {workModes.map(item => (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={item.id} />
                          </FormControl>
                          <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                            {t(item.label)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isOnSite && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder={t('onSiteLocation')}
                        {...field}
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={value => {
                    field.onChange(value)
                  }}
                  value={field.value}
                  className=""
                >
                  {workTypes.map(item => (
                    <FormItem
                      key={item.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.id} />
                      </FormControl>
                      <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                        {t(item.label)}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <FormLabel>{t('yearlySalary')}</FormLabel>
          <div className="flex items-center gap-2 sm:w-full ">
            <div className="flex items-center gap-3 sm:w-full">
              <FormField
                control={form.control}
                name="minSalary"
                render={({ field }) => (
                  <FormItem className="sm:w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('minimum')}
                        className="w-[120px] sm:w-full"
                        {...field}
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <span>{t('to')}</span>
            <div className="flex items-center gap-3 sm:w-full">
              <FormField
                control={form.control}
                name="maxSalary"
                render={({ field }) => (
                  <FormItem className="sm:w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('maximum')}
                        className="w-[120px] sm:w-full"
                        {...field}
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full items-center gap-3">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-64 sm:shrink-0">
                    <Select
                      value={field.value}
                      onValueChange={value => {
                        field.onChange(value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-20 sm:w-full">
                          <SelectValue placeholder="USD" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <FormLabel>{t('tag')}</FormLabel>
          <TagCombobox
            value={tags || []}
            onValueChange={value => {
              form.setValue('tags', value)
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>{t('jobDescription')}</FormLabel>
              </div>
              <FormControl>
                <FormControl>
                  <Editor
                    {...field}
                    className=""
                    value={''}
                    onValueChange={v => {
                      field.onChange(v)
                    }}
                  />
                </FormControl>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel className="self-start text-base">
          How would applicants reach out to you? (You can choose multiple ways)
          <span className="text-destructive-700">*</span>
        </FormLabel>
        <form
          className="w-full flex-1 space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="contractKey"
            render={() => (
              <FormItem className="mt-4 flex w-full flex-col gap-3">
                {contacts.map(item => (
                  <div
                    key={item.id}
                    className="flex w-full flex-col gap-3 sm:min-h-[50px] "
                  >
                    <FormField
                      control={form.control}
                      name="contractKey"
                      render={({ field }) => (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-3 space-y-0 sm:min-w-36"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={checked => {
                                const newValues = checked
                                  ? [...field.value, item.id]
                                  : field.value?.filter(
                                      value => value !== item.id,
                                    )

                                field.onChange(newValues)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-neutral-medium-gray text-sm peer-aria-checked:text-neutral-black">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    {contractKey.includes(item.id) && (
                      <FormField
                        control={form.control}
                        name={`contractValue.${item.id}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={item.placeholder}
                                {...field}
                                value={field.value}
                                onChange={e => {
                                  field.onChange(e.target.value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Button
          type="submit"
          loading={isPending || pending}
          className="mx-4 w-full sm:mx-0 sm:w-auto"
        >
          {t('saveChanges')}
          <FiCheck />
        </Button>
      </form>
    </Form>
  )
}

export default function Page() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  return (
    <main className="relative w-full justify-between bg-neutral-white sm:py-12">
      <button
        aria-label="Close"
        className="absolute top-6 right-6 outline-none"
        onClick={() => router.back()}
      >
        <LuX size={28} />
      </button>
      <div className="flex h-full w-full flex-col items-center px-5 py-6 sm:mx-auto sm:max-w-5xl sm:p-0">
        <h1 className="mb-8 font-bold font-next-book-bold text-[22px] sm:text-[28px]">
          Edit Job Post
        </h1>
        <EditPost />
      </div>
    </main>
  )
}
