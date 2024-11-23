import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { useTranslations } from 'next-intl'
import { LuArrowRight } from 'react-icons/lu'
import { creationBaseTabs, creationMoreTabs } from '../utils'

const OrganizerCard = ({
  progress,
  name,
  id,
}: { progress: string[]; name: string; id: string }) => {
  const t = useTranslations('HackathonOrganizer')

  const baseEqual = progress.filter(v =>
    creationBaseTabs.some(tab => tab.value === v),
  ).length
  const moreEqual = progress.filter(v =>
    creationMoreTabs.some(tab => tab.value === v),
  ).length
  return (
    <div className="space-y-6 rounded-xl border-2 border-neutral-200 p-6 transition-colors duration-300 hover:bg-neutral-100 ">
      <h2 className="font-bold font-next-book text-2xl text-primary-neutral">
        {name}
      </h2>
      <div className="space-y-2">
        <span className="body-s text-secondary-neutral">
          {t('requiredSections')} ({baseEqual}/7)
        </span>
        <div className="flex gap-5">
          {creationBaseTabs.map(obj => (
            <div
              key={obj.value}
              className="headline-m flex items-center gap-1 rounded-lg border border-neutral-300 bg-neutral-100 p-[12px_20px] text-primary-neutral"
            >
              {obj.label}
              {progress.includes(obj.value) ? (
                <FeedbackIcon size="small" />
              ) : (
                <FeedbackIcon size="small" disabled />
              )}
            </div>
          ))}
        </div>
        <span className="body-s text-secondary-neutral">
          {t('optionalSections')} ({moreEqual}/4)
        </span>
        <div className="flex gap-5">
          {creationMoreTabs.map(obj => (
            <div
              key={obj.value}
              className="headline-m flex items-center gap-1 rounded-lg border border-neutral-300 bg-neutral-100 p-[12px_20px] text-primary-neutral"
            >
              {obj.label}
              {progress.includes(obj.value) ? (
                <FeedbackIcon size="small" />
              ) : (
                <FeedbackIcon size="small" disabled />
              )}
            </div>
          ))}
        </div>
      </div>
      <Link href={`hackathon/${id}/create`} className="block w-full">
        <Button className="w-full">
          {t('continueEditing')}
          <LuArrowRight />
        </Button>
      </Link>
    </div>
  )
}

export default OrganizerCard
