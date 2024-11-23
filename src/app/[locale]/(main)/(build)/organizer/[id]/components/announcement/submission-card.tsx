import { Button } from '@hackquest/ui/shared/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@hackquest/ui/shared/dialog'
import { useTranslations } from 'next-intl'
import { BsArrowRight } from 'react-icons/bs'
import CardItem from './card-item'

type itemProp = {
  receivers: number
  template: string
  type: string
}

const SubmissionCard = ({
  afterSubmission,
  itemProps,
}: {
  afterSubmission: boolean
  itemProps: itemProp[]
}) => {
  const _t = useTranslations('HackathonOrganizer.manage')
  return (
    <DialogContent className="max-h-[760px] overflow-auto sm:max-w-[888px]">
      <DialogHeader className="title-1 text-left text-primary-neutral">
        Submission
      </DialogHeader>
      {itemProps.map(i => (
        <CardItem
          key={i.template}
          title={i.type + ' Notification'}
          receivers={i.receivers}
          content={i.template}
          status={afterSubmission ? 'end' : 'upcoming'}
          desc="Message sent to all registered applicants 3 days before submission deadline"
        />
      ))}
      <div className="mt-3 h-[1px] bg-neutral-300" />
      {afterSubmission ? (
        <DialogClose asChild>
          <Button variant="outline" color="neutral">
            close <BsArrowRight />
          </Button>
        </DialogClose>
      ) : (
        <Button className="mt-2 w-full">
          Send At Scheduled Time <BsArrowRight />
        </Button>
      )}
    </DialogContent>
  )
}

export default SubmissionCard
