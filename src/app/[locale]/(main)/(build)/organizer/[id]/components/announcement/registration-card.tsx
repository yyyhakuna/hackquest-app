import {
  TemplateType,
  useToggleScheduleMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@hackquest/ui/shared/dialog'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import CardItem from './card-item'

type itemProp = {
  receivers: number
  template: string
  type: string
}

const RegistrationCard = ({
  afterSubmission,
  itemProps,
  disable,
}: {
  afterSubmission: boolean
  itemProps: itemProp[]
  disable: boolean
}) => {
  const { mutateAsync, isPending } = useToggleScheduleMutation()
  const id = useParams().id as string
  const onClick = () => {
    if (disable) {
      toast.promise(
        mutateAsync({
          id,
          type: [TemplateType.Success],
          isStart: false,
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed to update',
        },
      )
    } else {
      toast.promise(
        mutateAsync({
          id,
          type: [TemplateType.Success],
          isStart: false,
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed to update',
        },
      )
    }
  }
  return (
    <DialogContent className="max-h-[760px] overflow-auto sm:max-w-[888px]">
      <DialogHeader className="title-1 text-left text-primary-neutral">
        Registration
      </DialogHeader>
      {itemProps.map(i => (
        <CardItem
          key={i.template}
          title={i.type + ' Notification'}
          receivers={i.receivers}
          content={i.template}
          status={afterSubmission ? 'end' : 'inProgress'}
          desc="Message sent to applicants when their applications are approval"
        />
      ))}
      <div className="mt-3 h-[1px] bg-neutral-300" />
      {afterSubmission ? (
        <DialogClose asChild>
          <Button variant="outline" color="neutral">
            Close
            <BsArrowRight />
          </Button>
        </DialogClose>
      ) : (
        <Button className="mt-2 w-full" loading={isPending} onClick={onClick}>
          {disable ? 'Send At Scheduled Time' : 'Disable Announcement'}
          <BsArrowRight />
        </Button>
      )}
    </DialogContent>
  )
}

export default RegistrationCard
