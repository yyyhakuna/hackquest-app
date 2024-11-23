'use client'

import { AnimatedContent } from '@/components/common/animated-content'
import { useProjectQuery } from '@/hooks/project/query'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Hackathons } from '../components/hackathons'
import { ProjectTabs } from '../components/project-tabs'
import { SaveChangesAlertDialog } from '../components/save-changes-alert-dialog'
import { Overview } from './components/overview'
import { ProjectInfo } from './components/project-info'
import { Team } from './components/team'
import { useSubmit } from './utils/use-submit'
import { type FormValues, formSchema } from './utils/validations'

export default function Page({
  params,
}: {
  params: { projectId: string }
}) {
  const { projectId } = params
  const [selectedTab, setSelectedTab] = React.useState('overview')
  const { data } = useProjectQuery()

  if (!data) {
    return notFound()
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      logo: data?.logo,
      pitchVideo: data?.pitchVideo,
      demoVideo: data?.demoVideo,
      tracks: data?.tracks,
      ecology: data?.ecology,
      wallet: data?.wallet,
      teachStack: data?.teachStack,
      oneLineIntro: data?.detail?.oneLineIntro,
      detailedIntro: data?.detail?.detailedIntro,
      progress: data?.detail?.progress,
      isOpenSource: data?.addition?.isOpenSource,
      githubLink: data?.addition?.githubLink,
      fundraisingStatus: data?.addition?.fundraisingStatus,
      intro: data?.team?.intro,
    },
  })

  const { onSubmit, isPending } = useSubmit({ projectId, form })

  return (
    <Form {...form}>
      <form className="w-full space-y-6">
        <div className="sm:container max-sm:px-6">
          <div className="flex items-center">
            <SaveChangesAlertDialog />
          </div>
          <ProjectInfo />
        </div>
        <ProjectTabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          isPending={isPending}
          onSubmit={form.handleSubmit(onSubmit)}
        />
        <AnimatedContent value={selectedTab ? selectedTab : 'empty'}>
          {selectedTab === 'overview' && <Overview />}
          {selectedTab === 'hackathons' && (
            <Hackathons title="Submitted Hackahton" editable />
          )}
          {selectedTab === 'team' && <Team />}
        </AnimatedContent>
      </form>
    </Form>
  )
}
