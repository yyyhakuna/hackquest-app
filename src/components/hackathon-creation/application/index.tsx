'use client'

import { useUpdateHackathon } from '@/hooks/hackathon/mutation'
import { useHackathonId, useHackathonQuery } from '@/hooks/hackathon/query'
import { useSetState } from '@/hooks/use-set-state'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import applications from '@/public/data/applications.json'
import { Callout, CalloutText } from '@hackquest/ui/shared/callout'
import { Label } from '@hackquest/ui/shared/label'
import * as React from 'react'
import toast from 'react-hot-toast'
import SectionButton from '../common/section-button'
import {
  ApplicationProvider,
  type Ids,
  defaultIds,
} from './application-context'
import { CustomSection } from './custom-section'
import { SelectSection } from './select-section'
import { Submission } from './submission'

function getInitialState<T extends any[]>(currentState: T, newState: T) {
  const newValuesMap = new Map(newState.map(item => [item.id, item]))
  return currentState
    .map(item => newValuesMap.get(item.id) || item)
    .concat(
      newState.filter(
        item => !currentState.some(existingItem => existingItem.id === item.id),
      ),
    )
}

export function Application() {
  const hackathonId = useHackathonId()

  const { data: hackathon } = useHackathonQuery()

  const initialApplication = hackathon?.info?.application

  const context = useHackathonCreationContext()

  const [ids, setIds] = useSetState<Ids>(defaultIds)

  const [application, setApplication] = React.useState(() => ({
    About: getInitialState(applications.About, initialApplication?.About || []),
    OnlineProfiles: getInitialState(
      applications.OnlineProfiles,
      initialApplication?.OnlineProfiles || [],
    ),
    Contact: getInitialState(
      applications.Contact,
      initialApplication?.Contact || [],
    ),
  }))

  const applicationStateRef = React.useRef(application)

  const update = useUpdateHackathon({
    onSuccess: () => {
      toast.success('Hackathon updated')
      context.setSelectedTab('rewards')
    },
  })

  React.useEffect(() => {
    applicationStateRef.current = application
  }, [application])

  function onSubmit() {
    const newApplication = structuredClone(applicationStateRef.current)
    const submitApplication = Object.entries(newApplication).reduce<
      Record<string, any[]>
    >((acc, [key, items]) => {
      if (Array.isArray(items)) {
        acc[key] = items.filter(item => item.selected)
      }
      return acc
    }, {})

    update.mutate({
      updateHackathonId: hackathonId,
      data: {
        progress: 'application',
        info: {
          upsert: {
            create: {
              application: submitApplication,
            },
            update: {
              application: submitApplication,
            },
          },
        },
      },
    })
  }

  const contextValue = React.useMemo(
    () => ({
      application,
      setApplication,
      ids,
      setIds,
    }),
    [application, ids, setIds],
  )

  return (
    <ApplicationProvider value={contextValue}>
      <div className="flex flex-col gap-6">
        <Callout className="rounded-lg bg-neutral-100 px-6 py-3">
          <CalloutText className="body-s font-normal">
            Select the profile fields you wish to make mandatory in your
            hackathon application. The shorter your form is, the faster you
            stack up the applications.
          </CalloutText>
        </Callout>
        <div>
          <h2 className="headline-l">User Registration</h2>
          <div className="space-y-3">
            <Label className="body-s">About</Label>
            <SelectSection sections={application.About} type="About" />
            <CustomSection sections={application.About} type="About" />
          </div>
          <div className="mt-4 space-y-3">
            <Label className="body-s">Online Profiles</Label>
            <SelectSection
              sections={application.OnlineProfiles}
              type="OnlineProfiles"
            />
            <CustomSection
              sections={application.OnlineProfiles}
              type="OnlineProfiles"
            />
          </div>
          <div className="mt-4 space-y-3">
            <Label className="body-s">Contact</Label>
            <SelectSection sections={application.Contact} type="Contact" />
            <CustomSection sections={application.Contact} type="Contact" />
          </div>
        </div>
        <Submission />
        <SectionButton loading={update.isPending} onContinue={onSubmit} />
      </div>
    </ApplicationProvider>
  )
}
