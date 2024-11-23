import { useRouter } from '@/app/navigation'
import { useUpdateCoLearningMutation } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import { creationBaseTabs } from '../constant'

const OrganizerCard = ({
  progress,
  name,
  id,
}: { progress: string[]; name: string; id: string }) => {
  const t = useTranslations('HackathonOrganizer')
  const router = useRouter()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { mutateAsync, isPending } = useUpdateCoLearningMutation()

  const baseEqual = progress.filter(v =>
    creationBaseTabs.some(tab => tab.value === v),
  ).length

  const onPublish = () => {
    toast
      .promise(
        mutateAsync({
          id,
          data: {
            status: {
              set: 1,
            },
          },
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed update',
        },
      )
      .then(() => {
        closeRef.current?.click()
      })
  }
  return (
    <div
      className='cursor-pointer space-y-6 rounded-xl border-2 border-neutral-200 p-6 transition-colors duration-300 hover:bg-neutral-100'
      onClick={() => {
        router.push(`organizer/${id}/create`)
      }}
    >
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
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" onClick={e => e.stopPropagation()}>
            Publish Now
            <LuArrowRight />
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseIcon
          className="gap-0"
          onClick={e => e.stopPropagation()}
        >
          <DialogClose className="hidden" ref={closeRef} />
          <DialogHeader className="title-3 text-primary-neutral">
            Publish Now
          </DialogHeader>
          <DialogFooter className="mt-6 w-full gap-8">
            <DialogClose asChild>
              <Button variant="outline" color="neutral" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex-1" onClick={onPublish} loading={isPending}>
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrganizerCard
