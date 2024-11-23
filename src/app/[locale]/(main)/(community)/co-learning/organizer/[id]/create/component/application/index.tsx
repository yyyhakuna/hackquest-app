'use client'

import { useUpdateCoLearningMutation } from '@/graphql/generated/hooks'
import { useSetState } from '@/hooks/use-set-state'
import { Label } from '@hackquest/ui/shared/label'
import { useParams } from 'next/navigation'
import * as React from 'react'
import toast from 'react-hot-toast'
import { applicationQuestion } from '../../constant'
import ContinueButton from '../common/continue-button'
import { useColearningContext } from '../common/creation-provider'
import {
  ApplicationProvider,
  type Ids,
  defaultIds,
} from './application-context'
import { CustomSection } from './custom-section'
import { SelectSection } from './select-section'

export function Application() {
  const [ids, setIds] = useSetState<Ids>(defaultIds)

  const { data, setSelectedTab } = useColearningContext()
  const iniApplication = Object.keys(data?.application || {}).length
    ? data.application
    : applicationQuestion

  const [application, setApplication] = React.useState(iniApplication)

  const contextValue = React.useMemo(
    () => ({
      application,
      setApplication,
      ids,
      setIds,
    }),
    [application, ids, setIds],
  )
  const { mutateAsync, isPending } = useUpdateCoLearningMutation()
  const id = useParams().id as string
  const newProgress = data.progress?.includes('application')
    ? data.progress
    : [...(data?.progress ?? []), 'application']

  const onContinue = () => {
    toast
      .promise(
        mutateAsync({
          id,
          data: {
            application,
            progress: {
              set: newProgress,
            },
          },
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed to update',
        },
      )
      .then(() => {
        setSelectedTab('qr')
      })
  }
  return (
    <ApplicationProvider value={contextValue}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="headline-l">User Registration</h2>
          <div className="space-y-3">
            <Label className="body-s">Info</Label>
            <SelectSection sections={application.Info} type="Info" />
            <CustomSection sections={application.Info} type="Info" />
          </div>
          <div className="mt-4 space-y-3">
            <Label className="body-s">About</Label>
            <SelectSection sections={application.About} type="About" />
            <CustomSection sections={application.About} type="About" />
          </div>
        </div>
        <ContinueButton onContinue={onContinue} loading={isPending} />
      </div>
    </ApplicationProvider>
  )
}
