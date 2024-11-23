'use client'

import { useRouter } from '@/app/navigation'
import webApi from '@/service'
import { Editor } from '@hackquest/editor/react'
import { cn } from '@hackquest/ui/lib/utils'
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
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash-es'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiCheck } from 'react-icons/fi'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { LuX } from 'react-icons/lu'
import { LuUpload } from 'react-icons/lu'
import { LuArrowRight } from 'react-icons/lu'
import * as z from 'zod'
import { revalidate } from '../../utils'
import { useJobStore } from '../../utils/store'
import {
  companySchema,
  contacts,
  contactsSchema,
  currencies,
  jobSchema,
  workModes,
  workTypes,
} from '../../validations'
import { Steps } from './steps'
import { TagCombobox } from './tag-combobox'

const Step1 = () => {
  const t = useTranslations('Jobs.publish')
  const { values, onNext, setValues } = useJobStore()
  const _submitRef = React.useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: values?.companyName || '',
      companyLogo: values?.companyLogo || '',
      website: values?.website || '',
    },
  })

  const companyLogo = form.watch('companyLogo')

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      return webApi.commonApi.uploadImage(data)
    },
    onSuccess: ({ filepath }) => {
      form.setValue('companyLogo', filepath)
      setValues({ companyLogo: filepath })
      form.clearErrors('companyLogo')
      toast.success('Company logo uploaded')
    },
    onError: () => {
      form.clearErrors('companyLogo')
      toast.error('Company logo upload failed')
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

  function onSubmit(data: z.infer<typeof companySchema>) {
    setValues(data)
    onNext()
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-1 flex-col justify-between space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-6">
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
                      setValues({ companyName: e.target.value })
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
                      setValues({ website: e.target.value })
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
              <p role="alert" className="font-next-book text-destructive-500">
                {form.formState.errors.companyLogo?.message}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="fixed bottom-6 w-[90%] sm:bottom-8 sm:w-auto sm:self-end"
        >
          {t('continue')} <LuArrowRight />
        </Button>
      </form>
    </Form>
  )
}

const Step2: React.FC = () => {
  const t = useTranslations('Jobs.publish')
  const { values, onBack, onNext, setValues } = useJobStore()

  const submitRef = React.useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: values?.name || '',
      workMode: values?.workMode || 'REMOTE',
      workType: values?.workType || 'FULL_TIME',
      minSalary: values?.minSalary?.toString() || '',
      maxSalary: values?.maxSalary?.toString() || '',
      currency: values?.currency || undefined,
      tags: values?.tags || [],
      description: values?.description || undefined,
    },
  })

  const isOnSite = form.watch('workMode') === 'ONSITE'

  const tags = form.watch('tags')

  function onSubmit(data: z.infer<typeof jobSchema>) {
    setValues({
      ...data,
      minSalary: data.minSalary
        ? z.coerce.number().parse(data.minSalary)
        : null,
      maxSalary: data.maxSalary
        ? z.coerce.number().parse(data.maxSalary)
        : null,
    })
    onNext()
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex-1 space-y-6 pb-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                    setValues({ name: e.target.value })
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
                        setValues({ workMode: value })
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
                          setValues({ location: e.target.value })
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
                    setValues({ workType: value })
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
                          setValues({ minSalary: e.target.value })
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
                          setValues({ maxSalary: e.target.value })
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
                        setValues({ currency: value })
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
              setValues({ tags: value })
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
                <Editor
                  {...field}
                  className=""
                  value={values.description}
                  onValueChange={v => {
                    field.onChange(v)
                    setValues({ description: v })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="submit" ref={submitRef} className="hidden" />
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Button
            type="button"
            color="neutral"
            variant="outline"
            onClick={onBack}
            className="hidden sm:flex "
          >
            <HiArrowLeft />
            {t('back')}
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={() => submitRef.current?.click()}
          >
            {t('continue')}
            <HiArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Step3: React.FC = () => {
  const t = useTranslations('Jobs.publish')
  const router = useRouter()
  const { values, setValues, reset, onBack } = useJobStore()
  const [pending, startTransition] = React.useTransition()

  const submitRef = React.useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof contactsSchema>>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      contractKey: values?.contractKey || [],
      contractValue: values?.contractValue || {},
    },
  })

  const contractKey = form.watch('contractKey')

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => webApi.jobApi.publishJob(values),
    onSuccess: async () => {
      await revalidate()
      toast.success('Job published')
      startTransition(() => {
        router.back()
        setTimeout(() => {
          reset()
        }, 1000)
      })
    },
  })

  function onSubmit(data: z.infer<typeof contactsSchema>) {
    const formatedValues = {
      ...values,
      contact: data.contractValue,
    }

    mutate(omit(formatedValues, ['contractKey', 'contractValue']))
  }

  return (
    <Form {...form}>
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
                              setValues({ contractKey: newValues })
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
                                setValues({
                                  contractValue: {
                                    ...values.contractValue,
                                    [item.id]: e.target.value,
                                  },
                                })
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
        <input ref={submitRef} type="submit" className="hidden" />
      </form>
      <div className="fixed bottom-7 flex w-full items-center sm:static sm:mt-32 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          color="neutral"
          onClick={onBack}
          className="hidden sm:flex"
        >
          <HiArrowLeft />
          {t('back')}
        </Button>
        <Button
          type="submit"
          loading={isPending || pending}
          className="mx-4 w-full sm:mx-0 sm:w-auto"
          onClick={() => submitRef.current?.click()}
        >
          {t('submit')}
          <FiCheck />
        </Button>
      </div>
    </Form>
  )
}

const steps = [Step1, Step2, Step3]

export default function Page() {
  const { step, reset, onBack } = useJobStore()
  const params = useParams()
  const router = useRouter()

  const Component = steps[step]

  return (
    <main className="relative h-full w-full justify-between overflow-y-auto bg-neutral-white sm:fixed sm:top-0 sm:left-0">
      <button
        aria-label="Close"
        className="absolute right-6 outline-none sm:top-4"
        onClick={() => {
          router.back()
          setTimeout(() => {
            reset()
          }, 300)
        }}
      >
        <LuX size={28} />
      </button>
      <button
        aria-label="Close"
        className={cn(
          'absolute top-6 left-6 outline-none sm:hidden',
          step === 0 ? 'hidden' : 'block',
        )}
        onClick={() => {
          onBack()
        }}
      >
        <HiArrowLeft size={28} />
      </button>
      <div className="flex h-full w-full flex-col items-center px-5 py-6 sm:mx-auto sm:max-w-5xl sm:p-0">
        <Steps currentStep={step + 1} />
        <h1 className="my-8 font-bold font-next-book-bold text-[22px] sm:text-[28px]">
          {params.id ? 'Edit Job Post' : 'Post a Web3 Position'}
        </h1>
        {Component ? <Component /> : null}
      </div>
    </main>
  )
}
