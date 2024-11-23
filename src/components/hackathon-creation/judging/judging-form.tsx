import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import { FormEditor } from '@/components/common/form-editor'
import { FormRadioCards } from '@/components/common/form-radio-cards'
import {
  type HackathonJudgeUpdate,
  type JudgeAccount,
  type UserJudgeType,
  useCreateJudgeAccountMutation,
  useDeleteJudgeAccountMutation,
  useQueryQuery,
  useUpdateJudgeAccountMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import {
  CheckboxCards,
  CheckboxCardsItem,
} from '@hackquest/ui/shared/checkbox-cards'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { Input } from '@hackquest/ui/shared/input'
import { RadioCards, RadioCardsItem } from '@hackquest/ui/shared/radio-cards'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
import type { z } from 'zod'
import EditHeaderButton from '../common/edit-header-button'
import { formSchema, judgeModeData, votingUserTags } from '../constants/data'
import JudgingAccountCard from './judging-account-card'
import JudgingTooltip from './judging-tooltip'

const votesTab = [
  {
    type: 'fixed',
    title: 'Judge-Centric',
    value: 'Judge-Centric',
    buttonText: 'Apply Judge-Centric',
    userVotes: 1200,
    judgesVotes: 2800,
  },
  {
    type: 'fixed',
    title: 'Half-Half',
    value: 'Half-Half',
    buttonText: 'Apply Half-Half',
    userVotes: 3000,
    judgesVotes: 3000,
  },
  {
    type: 'fixed',
    title: 'Mass Voting',
    value: 'Mass Voting',
    buttonText: 'Apply Mass Voting',
    userVotes: 3000,
    judgesVotes: 7000,
  },
  {
    type: 'custom',
    title: 'Custom Voting',
    value: 'Custom Voting',
    buttonText: 'Apply Custom Vote Mode',
  },
]

const getDefaultValues = (judge: HackathonJudgeUpdate) => {
  let defaultValues = {}
  if (!judge.criteria) {
    defaultValues = {
      criteria: '',
      disableJudge: false,
    }
  } else {
    if (judge.disableJudge) {
      defaultValues = {
        criteria: judge.criteria,
        disableJudge: judge.disableJudge,
      }
    } else {
      if (judge.judgeMode === 'all') {
        const voteTab = votesTab.find(
          v =>
            v.judgesVotes === judge.judgeTotalVote &&
            v.userVotes === judge.userTotalVotes,
        )
        defaultValues = {
          criteria: judge.criteria,
          disableJudge: judge.disableJudge,
          judgeMode: judge.judgeMode,
          voteMode: judge.voteMode,
          userTotalVotes: judge.userTotalVotes || 0,
          judgeTotalVote: judge.judgeTotalVote || 0,
          userTags: judge.userTags || [votingUserTags[0]?.value],
          judgeAccounts: judge.judgeAccounts || [],
          fixedNumberVotes: voteTab?.value || '',
        }
      } else {
        defaultValues = {
          criteria: judge.criteria,
          disableJudge: judge.disableJudge,
          judgeMode: judge.judgeMode,
          voteMode: judge.voteMode,
          judgeProjectVote: judge.judgeProjectVote || 100,
          judgeAccounts: judge.judgeAccounts || [],
        }
      }
    }
  }

  return defaultValues
}

interface JudgingFormProp {
  judge: HackathonJudgeUpdate
  onSubmit: (val: HackathonJudgeUpdate) => void
  loading: boolean
  disabledAll: boolean
  onCancel: VoidFunction
}

const JudgingForm: React.FC<JudgingFormProp> = ({
  judge,
  onSubmit,
  loading,
  disabledAll,
  onCancel,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(judge),
  })

  const [fixedNumberVoteTabs, setFixedNumberVotesTabs] = useState(votesTab)
  const [judgeAccounts, setJudgeAccounts] = useState<JudgeAccount[]>(
    judge?.judgeAccounts || [],
  )
  const curHandleAccount = useRef<JudgeAccount>()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const disableJudge = form.watch('disableJudge')
  const judgeMode = form.watch('judgeMode')
  const fixedNumberVotes = form.watch('fixedNumberVotes')
  const userTags = form.watch('userTags') || [votingUserTags[0]?.value]

  const onDelete = (account: JudgeAccount) => {
    curHandleAccount.current = account
    setConfirmOpen(true)
  }

  const onInvalid = (error: FieldErrors<z.infer<typeof formSchema>>) => {
    const firstError = Object.keys(error)[0]
    const firstErrorElement = document.querySelector(`#${firstError}-item`)
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onValid = (data: z.infer<typeof formSchema>) => {
    let values: any = {
      criteria: '',
      disableJudge: false,
      judgeMode: null,
      voteMode: null,
      judgeTotalVote: null,
      userTotalVotes: null,
      judgeProjectVote: null,
    }
    if (!data.disableJudge) {
      if (!data.judgeMode) {
        form.setError('judgeMode', {
          message: 'Please select a judge mode',
        })
        return
      }
      if (data.judgeMode === 'all') {
        if (!data.userTotalVotes || !data.judgeTotalVote) {
          form.setError('fixedNumberVotes', {
            message: 'Please select user total votes and judge total votes',
          })
          return
        }
        values = {
          criteria: data.criteria,
          disableJudge: data.disableJudge,
          judgeMode: data.judgeMode,
          voteMode: data.voteMode,
          userTotalVotes: data.userTotalVotes,
          judgeTotalVote: data.judgeTotalVote,
          userTags: data.userTags,
        }
      } else {
        if (!judgeAccounts.length) {
          form.setError('judgeAccounts', {
            message: 'Please add at least one judge account',
          })
          return
        }
        values = {
          criteria: data.criteria,
          disableJudge: data.disableJudge,
          judgeMode: data.judgeMode,
          voteMode: data.voteMode,
          judgeProjectVote: data.judgeProjectVote,
        }
      }
    } else {
      values = {
        criteria: data.criteria,
        disableJudge: data.disableJudge,
      }
    }
    onSubmit(values)
  }

  const { mutate: judgeAccountAdd, isPending: judgeAccountAddPending } =
    useCreateJudgeAccountMutation({
      onSuccess: account => {
        setJudgeAccounts([
          ...judgeAccounts,
          {
            ...account.createJudgeAccount,
            nickname: '',
          },
        ] as JudgeAccount[])
        toast.success('Add success')
        form.clearErrors('judgeAccounts')
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const { mutate: judgeAccountUpdate, isPending: judgeAccountUpdatePending } =
    useUpdateJudgeAccountMutation({
      onSuccess: account => {
        setJudgeAccounts(
          judgeAccounts.filter(
            item => item.id !== curHandleAccount.current?.id,
          ),
        )
        const newJudgeAccounts = structuredClone(judgeAccounts)
        const index = newJudgeAccounts.findIndex(
          v => v.id === curHandleAccount.current?.id,
        )
        newJudgeAccounts[index] = account.updateJudgeAccount as JudgeAccount
        toast.success('update success')
        setJudgeAccounts(newJudgeAccounts)
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const { mutate: judgeAccountDelete, isPending: judgeAccountDeletePending } =
    useDeleteJudgeAccountMutation({
      onSuccess: _account => {
        setJudgeAccounts(
          judgeAccounts.filter(
            item => item.id !== curHandleAccount.current?.id,
          ),
        )
        toast.success('delete success')
        setConfirmOpen(false)
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const onAddJudgeAccount = () => {
    judgeAccountAdd({
      judgeId: judge.id.toString(),
    })
  }

  const { data: userTagsCount } = useQuery({
    queryKey: useQueryQuery.getKey({ userTags: userTags as UserJudgeType[] }),
    queryFn: useQueryQuery.fetcher({ userTags: userTags as UserJudgeType[] }),
  })

  const onEdit = (account: JudgeAccount, val: string) => {
    if (!val) return
    curHandleAccount.current = account
    judgeAccountUpdate({
      judgeId: judge.id.toString(),
      accountId: curHandleAccount.current?.id as string,
      nickname: val,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    switch (judgeMode) {
      case 'all':
        form.setValue('voteMode', 'fixed')
        return
      case 'judges':
        form.setValue('voteMode', 'score')
        form.setValue('judgeProjectVote', '100')
        return
    }
  }, [judgeMode])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form.setValue('judgeAccounts', judgeAccounts.map(v => v.id) as string[])
  }, [judgeAccounts])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (disabledAll && judgeMode === 'all') {
      form.setValue('judgeMode', null)
    }
  }, [disabledAll])

  return (
    <Form {...form}>
      <form
        className="rounded-2xl border border-neutral-300 bg-neutral-white p-6"
        onSubmit={form.handleSubmit(onValid, onInvalid)}
      >
        <EditHeaderButton
          onCancel={onCancel}
          title={judge.rewardName}
          confirmLoading={loading}
        />
        <div className="flex flex-col gap-4 border-neutral-300 border-b py-6">
          <FormEditor
            control={form.control}
            name="criteria"
            label="Judging Criteria for this track"
            output="html"
            requiredSymbol
            placeholder="Write a judging criteria for the hackathon"
            error={Boolean(form.formState.errors.criteria)}
          />
          <div>
            <FormRadioCards
              control={form.control}
              name="judgeMode"
              label="Hackathon Mode (Select one)"
              requiredSymbol
              tooltip={<JudgingTooltip type="judging" />}
              radioCardsProps={{
                disabled: disableJudge,
                onValueChange: val => {
                  if (val === 'all') {
                    const tags = form.getValues('userTags')
                    if (!tags?.length) {
                      form.setValue('userTags', [
                        votingUserTags?.[0]?.value || '',
                      ])
                    }
                  }
                },
              }}
              options={judgeModeData.map(mode => ({
                ...mode,
                disabled: mode.value === 'all' && disabledAll,
              }))}
            />
            <FormField
              control={form.control}
              name="disableJudge"
              render={({ field }) => (
                <FormItem
                  className="body-xs mt-2 flex items-center gap-2 text-neutral-500"
                  id="disableJudge-item"
                >
                  <FormControl>
                    <Checkbox
                      id="disableJudge"
                      className="border-neutral-300"
                      checked={field.value}
                      onCheckedChange={checked => {
                        field.onChange(checked as boolean)
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="disableJudge"
                    className="cursor-pointer select-none text-neutral-500 peer-data-[state=checked]:text-neutral-800"
                  >
                    We are not going to use HackQuest voting and judging system
                    for this track
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        {!!judgeMode && !disableJudge && (
          <div className="flex w-full flex-col gap-6 pt-6">
            {judgeMode === 'all' && (
              <>
                <div id="voteMode-item">
                  <FormField
                    control={form.control}
                    name="voteMode"
                    render={({ field }) => (
                      <FormItem className={'w-full text-left'}>
                        <div className="flex items-center justify-start gap-2">
                          <FormLabel>
                            Voting Mode
                            <span className="text-destructive-600">*</span>
                          </FormLabel>
                          <JudgingTooltip type="voting" />
                        </div>
                        <p className="body-xs my-2 text-neutral-500">
                          Only ‘Fixed Number of Vote’ is available to ‘Users +
                          Judges’ category.
                        </p>
                        <RadioCards
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <RadioCardsItem
                            value="fixed"
                            className="body-xs flex flex-col p-[.625rem] text-center"
                          >
                            <p className="headline-s text-neutral-800">
                              Fixed Number of Vote
                            </p>
                            <div className="body-xs mt-1 text-neutral-500">
                              Each user/judge has a certain number of votes to{' '}
                              <br /> distribute among the projects
                            </div>
                          </RadioCardsItem>
                        </RadioCards>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='id="fixedNumberVotes-item"'>
                  <FormField
                    control={form.control}
                    name="fixedNumberVotes"
                    render={({ field }) => (
                      <FormItem className={'w-full text-left'}>
                        <div className="flex items-center justify-start gap-2">
                          <FormLabel>
                            Fixed Number of Vote
                            <span className="text-destructive-600">*</span>
                          </FormLabel>
                        </div>
                        <RadioCards
                          value={field.value}
                          onValueChange={val => {
                            field.onChange(val)
                            form.clearErrors(['fixedNumberVotes'])
                            const votesItem = fixedNumberVoteTabs.find(
                              v => v.value === val,
                            )

                            form.setValue(
                              'userTotalVotes',
                              votesItem?.userVotes,
                            )
                            form.setValue(
                              'judgeTotalVote',
                              votesItem?.judgesVotes,
                            )
                          }}
                          className="flex flex-wrap gap-3"
                        >
                          {fixedNumberVoteTabs.map(vote => (
                            <RadioCardsItem
                              key={vote.value}
                              value={vote.value}
                              className="body-s flex w-[calc((100%-1.5rem)/2)] flex-col items-center gap-4 p-6 text-neutral-600"
                            >
                              <p className="headline-l text-neutral-800">
                                {vote.title}
                              </p>
                              <div className="w-full border-neutral-300 border-t border-b py-4 text-left">
                                <div className="flex h-[2.3125rem] w-full items-center gap-2">
                                  <span className="w-[7.5625rem] flex-shrink-0">
                                    Total Users Votes:
                                  </span>
                                  {vote.type === 'fixed' ? (
                                    <span className="body-m text-neutral-800">
                                      {vote.userVotes}
                                    </span>
                                  ) : (
                                    <Input
                                      className="flex-1"
                                      inputClassName="w-full"
                                      type="number"
                                      placeholder="e.g. 100.000"
                                      value={fixedNumberVoteTabs[3]?.userVotes}
                                      onChange={e => {
                                        const newVotes =
                                          structuredClone(fixedNumberVoteTabs)
                                        const inputVotes = Number(
                                          e.target.value,
                                        )
                                        newVotes[3]!.userVotes = inputVotes
                                        setFixedNumberVotesTabs(newVotes)
                                        if (
                                          fixedNumberVotes ===
                                          fixedNumberVoteTabs?.[3]?.value
                                        ) {
                                          form.setValue(
                                            'userTotalVotes',
                                            inputVotes,
                                          )
                                          form.clearErrors(['fixedNumberVotes'])
                                        }
                                      }}
                                      onClick={e => e.stopPropagation()}
                                    />
                                  )}
                                </div>
                                <div className="mt-2 flex h-[2.3125rem] w-full items-center gap-2">
                                  <span className="w-[7.5625rem] flex-shrink-0">
                                    Total Judges Votes:
                                  </span>
                                  {vote.type === 'fixed' ? (
                                    <span className="body-m text-neutral-800">
                                      {vote.judgesVotes}
                                    </span>
                                  ) : (
                                    <Input
                                      className="flex-1"
                                      inputClassName="w-full"
                                      type="number"
                                      placeholder="e.g. 100.000"
                                      value={
                                        fixedNumberVoteTabs[3]?.judgesVotes
                                      }
                                      onChange={e => {
                                        const newVotes =
                                          structuredClone(fixedNumberVoteTabs)
                                        const inputVotes = Number(
                                          e.target.value,
                                        )
                                        newVotes[3]!.judgesVotes = inputVotes
                                        setFixedNumberVotesTabs(newVotes)
                                        if (
                                          fixedNumberVotes ===
                                          fixedNumberVoteTabs?.[3]?.value
                                        ) {
                                          form.setValue(
                                            'judgeTotalVote',
                                            inputVotes,
                                          )
                                          form.clearErrors(['fixedNumberVotes'])
                                        }
                                      }}
                                      onClick={e => e.stopPropagation()}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="headline-s flex h-[2.6875rem] w-full items-center justify-center rounded-xl bg-primary text-neutral-800 hover:bg-primary-400">
                                {vote.buttonText}
                              </div>
                            </RadioCardsItem>
                          ))}
                        </RadioCards>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={'userTags'}
                  render={({ field }) => (
                    <FormItem className={'w-full text-left'}>
                      <div className="flex items-center justify-start gap-2">
                        <FormLabel>
                          <div className="flex items-center gap-1">
                            {`Specify precise voting user profiles (${userTagsCount?.getUserJudgeCount || 0} users participate)`}
                            <JudgingTooltip type="userTags" />
                          </div>
                          <p className="body-xs text-neutral-500">
                            Total users votes will be averaged to the precise
                            user you choosed
                          </p>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <CheckboxCards
                          value={field.value}
                          className="grid grid-cols-3"
                          onValueChange={value => {
                            field.onChange(value)
                          }}
                        >
                          {votingUserTags.map(option => (
                            <FormControl key={option.value}>
                              <CheckboxCardsItem
                                value={option.value}
                                disabled={option.disabled}
                              >
                                {option.label}
                              </CheckboxCardsItem>
                            </FormControl>
                          ))}
                        </CheckboxCards>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {judgeMode === 'judges' && (
              <>
                <FormField
                  control={form.control}
                  name="voteMode"
                  render={({ field }) => (
                    <FormItem className={'w-full text-left'}>
                      <div className="flex items-center justify-start gap-2">
                        <FormLabel>
                          Voting Mode
                          <span className="text-destructive-600">*</span>
                        </FormLabel>
                        <JudgingTooltip type="voting" />
                      </div>
                      <p className="body-xs my-2 text-neutral-500">
                        Only ‘Fixed Number of Vote’ is available to ‘Users +
                        Judges’ category.
                      </p>
                      <RadioCards
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <RadioCardsItem
                          value="score"
                          className="body-xs flex flex-col p-[.625rem] text-center"
                        >
                          <p className="headline-s text-neutral-800">
                            Project Scoring
                          </p>
                          <p className="body-xs mt-1 text-neutral-500">
                            Each project needs to be voted on by a certain
                            number of judges
                          </p>
                        </RadioCardsItem>
                      </RadioCards>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="judgeProjectVote"
                  render={({ field }) => (
                    <FormItem className={'w-full text-left'}>
                      <div className="flex items-center justify-start gap-2">
                        <FormLabel>
                          Project Scoring
                          <span className="text-destructive-600">*</span>
                        </FormLabel>
                      </div>
                      <RadioCards
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <RadioCardsItem
                          value="100"
                          className="body-xs flex flex-col p-6 text-center"
                        >
                          <p className="headline-s text-neutral-800">
                            Judge-Centric
                          </p>
                          <div className="body-xs mt-1 text-neutral-500">
                            Highest Score:{' '}
                            <span className="headline-l text-neutral-800">
                              100
                            </span>
                          </div>
                          <div className="body-xs mt-3 w-full border-neutral-300 border-t pt-3 text-left text-neutral-400">
                            The final score will be calculated as the average
                            score of all judges
                          </div>
                        </RadioCardsItem>
                      </RadioCards>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="judgeAccounts"
              render={() => (
                <FormItem
                  className={'flex w-full flex-col gap-2'}
                  id="judgeAccounts-item"
                >
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>
                      Judge Account
                      {judgeMode === 'judges' && (
                        <span className="text-destructive-600">*</span>
                      )}
                      （{judgeAccounts.length}）
                    </FormLabel>
                  </div>
                  {judgeAccounts.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {judgeAccounts.map(account => (
                        <JudgingAccountCard
                          isDelete={
                            judgeMode === 'all' ||
                            (judgeMode === 'judges' && judgeAccounts.length > 1)
                          }
                          account={account}
                          key={account.id}
                          onDelete={() => onDelete(account)}
                          onEdit={val => onEdit(account, val)}
                          loading={
                            judgeAccountUpdatePending &&
                            account.id === curHandleAccount.current?.id
                          }
                        />
                      ))}
                    </div>
                  )}
                  <Button
                    className="w-full"
                    onClick={onAddJudgeAccount}
                    loading={judgeAccountAddPending}
                  >
                    <FiPlus />
                    <span>Judge Account</span>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </form>
      <DeleteAlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={
          <p className="px-8">
            {`Delete this account ${curHandleAccount.current?.nickname}?`}
          </p>
        }
        description="Are you sure you want to delete this account? This action cannot be undone."
        loading={judgeAccountDeletePending}
        onConfirm={() =>
          judgeAccountDelete({
            judgeId: judge.id.toString(),
            accountId: curHandleAccount.current?.id as string,
          })
        }
      />
    </Form>
  )
}

export default JudgingForm
