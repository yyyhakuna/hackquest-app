import { Link } from '@/app/navigation'
import { CircularProgress } from '@/components/common/circular-progress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@hackquest/ui/shared/accordion'
import { INDICATORS } from '../../constants'
import { calculateGrade } from '../../utils'
import { useDialogStore } from '../../utils/store'

export function ScoreBreakdown({
  avgrateScore,
  progress = [],
}: {
  avgrateScore: number
  progress?: number[]
}) {
  const { onOpen } = useDialogStore()
  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center gap-4">
        <CircularProgress value={avgrateScore}>
          <span className="title-5 text-secondary-neutral">
            {calculateGrade(avgrateScore)}
          </span>
        </CircularProgress>
        <div className="space-y-1">
          <h3 className="body-s">Current Score</h3>
          <p className="headline-m">{avgrateScore}/100</p>
        </div>
      </section>
      <Accordion type="multiple" className="flex flex-col gap-4">
        {INDICATORS.map(({ title, icon: Icon, content }, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-3">
                <Icon className="size-5 sm:size-6" />
                <span className="body-m font-bold">{title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 px-9">
              {content.map((item, itemIndex) => (
                <Link
                  href={item.link ?? '#'}
                  target={item.link ? '_blank' : undefined}
                  rel={item.link ? 'noopener noreferrer' : undefined}
                  className="cursor-pointer self-start underline"
                  key={itemIndex}
                  onClick={event => {
                    event.preventDefault()
                    event.nativeEvent.stopImmediatePropagation()
                    if ('action' in item && item.action) {
                      if (item.action === 'onboarding') {
                        progress?.length < 3 && onOpen('onboarding')
                      } else {
                        onOpen(item.action)
                      }
                    }
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
