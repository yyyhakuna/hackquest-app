import { FormInput } from '@/components/common/form-input'
import { Button } from '@hackquest/ui/shared/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { z } from 'zod'
import type {
  HackathonPartnerAccountType,
  HackathonPartnerAccountValueType,
  HackathonPartnersContentType,
} from '../../constants/type'
import EditHeaderButton from '../edit-header-button'
import PartnerSpeakerEditItem from './partner-speaker-edit-item'

const formSchema = z.object({
  title: z.string().min(1).max(80),
  accounts: z.array(z.string()).min(1),
})
interface PartnerSpeakerEdit {
  type: HackathonPartnerAccountValueType
  initValue: HackathonPartnersContentType
  onSubmit: (val: HackathonPartnersContentType) => void
  onCancel: VoidFunction
  loading: boolean
}

const PartnerSpeakerEdit: React.FC<PartnerSpeakerEdit> = ({
  type,
  initValue,
  onSubmit,
  onCancel,
  loading,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initValue.title,
      accounts: initValue.accounts.map(v => v.id),
    },
  })

  const [accounts, setAccounts] = useState<HackathonPartnerAccountType[]>(
    initValue.accounts,
  )

  const addAccount = () => {
    const account = {
      id: crypto.randomUUID(),
      avatar: 'https://assets.hackquest.io/users/avatars/avatar-default-01.png',
      name: '',
      intro: '',
      link: 'https://x.com/hackquest_',
      type: type,
    }
    setAccounts([...accounts, account])
  }

  const onEdit = (val: HackathonPartnerAccountType) => {
    const index = accounts.findIndex(v => v.id === val.id)
    const newAccounts = [...accounts]
    newAccounts[index] = val
    setAccounts(newAccounts)
    if (val.name) {
      form.clearErrors(['accounts'])
    }
  }

  const onDelete = (val: HackathonPartnerAccountType) => {
    // confirmItem.current = val
    // setConfirmOpen(true)
    setAccounts(accounts.filter(v => v.id !== val?.id))
  }

  const onValid = (val: z.infer<typeof formSchema>) => {
    if (accounts.some(v => !v.name)) {
      form.setError('accounts', {
        message: 'Please fill in the name of each partner',
      })
      return
    }
    onSubmit({
      ...initValue,
      ...val,
      accounts,
    } as HackathonPartnersContentType)
  }

  useEffect(() => {
    form.setValue(
      'accounts',
      accounts.map(v => v.id),
    )
  }, [accounts, form.setValue])

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4"
        onSubmit={form.handleSubmit(onValid)}
      >
        <EditHeaderButton onCancel={onCancel} confirmLoading={loading} />
        <FormInput
          control={form.control}
          name="title"
          label="Partner Section Title"
          placeholder="Ex. Media Partners , Community Partners"
          requiredSymbol
          maxLength={80}
        />
        <FormField
          control={form.control}
          name="accounts"
          render={() => (
            <FormItem className={'flex w-full flex-col gap-2'}>
              <div className="flex items-center justify-start gap-2">
                <FormLabel>
                  Partner’s X<span className="text-destructive-600">*</span>
                </FormLabel>
              </div>
              <div className="flex flex-wrap gap-3">
                {accounts.map((v, _i) => (
                  <div className="w-[calc((100%-0.75rem)/2)]" key={v.id}>
                    <PartnerSpeakerEditItem
                      initValue={v}
                      onEdit={onEdit}
                      onDelete={() => onDelete(v)}
                    />
                  </div>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={'outline'}
          color={'neutral'}
          className="w-full"
          onClick={addAccount}
        >
          <FiPlus className="size-6" />
          <span>Add Partners</span>
        </Button>
      </form>
    </Form>
  )
}

export default PartnerSpeakerEdit
