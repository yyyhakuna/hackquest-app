'use client'

import { Role } from '@/graphql/generated/hooks'
import { useSetState } from '@/hooks/use-set-state'
import { useUser } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import { LuArrowRight } from 'react-icons/lu'
import { ApplyOrganizerDialog } from './apply-organizer-dialog'
import { CreateHackathonDialog } from './create-hackathon-dialog'

const PageHeader = () => {
  const t = useTranslations('HackathonOrganizer')
  const currentUser = useUser()

  const [open, toggle] = useSetState({
    create: false,
    apply: false,
  })

  function startNewHackathon() {
    if (![Role.Admin, Role.Organization].includes(currentUser?.role!)) {
      toggle({ apply: true })
    } else {
      toggle({ create: true })
    }
  }

  return (
    <div className="relative flex justify-between pb-8">
      <div className="max-w-[581px] space-y-6">
        <h1 className="title-1 text-primary-neutral">
          {t('hackathonOrganizer')}
        </h1>
        <p className="body-m text-secondary-neutral">{t('welcomeText')}</p>
        <Button onClick={startNewHackathon}>
          <span>Start A New Hackathon</span>
          <LuArrowRight className="size-4" />
        </Button>
      </div>
      <img
        src="/images/events/events_banner.png"
        alt="events_banner"
        width={273}
        height={220}
        className="absolute right-4 h-12 w-12 sm:static sm:right-0 sm:h-auto sm:w-auto"
      />
      <CreateHackathonDialog
        open={open.create}
        onOpenChange={open => toggle({ create: open })}
      />
      <ApplyOrganizerDialog
        open={open.apply}
        onOpenChange={open => toggle({ apply: open })}
      />
    </div>
  )
}

export default PageHeader
