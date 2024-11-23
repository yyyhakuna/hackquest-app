import { useDeleteHackathonAnnouncementMutation } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'
import { useRef } from 'react'
import toast from 'react-hot-toast'

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Record<string, string>
  title: string
  CustomDialog: React.ReactElement
  tagClassName?: string
  isExpire?: boolean
  isCustomAnnouncement?: boolean
  announcementId?: number
  hackathonId?: string
  disable?: boolean
}

const BaseCard: React.FC<BaseCardProps> = ({
  items,
  title,
  CustomDialog,
  tagClassName,
  className,
  disable,
  announcementId,
  hackathonId,
  isExpire = false,
  isCustomAnnouncement = false,
}) => {
  const update = useDeleteHackathonAnnouncementMutation()
  const closeRef = useRef<HTMLButtonElement>(null)
  return (
    <div
      className={cn(
        'space-y-5 rounded-xl border-2 border-neutral-200 p-4 transition-colors duration-300 hover:bg-neutral-100 ',
        isExpire && 'bg-neutral-100 ',
        className,
      )}
    >
      <div
        className={cn(
          'headline-l text-secondary-neutral ',
          isExpire && 'text-neutral-400',
        )}
      >
        {title}
      </div>
      <div className="h-[111px] space-y-3">
        {isCustomAnnouncement ? (
          <div className="space-y-3">
            <div className="flex justify-between ">
              <span
                className={cn(
                  'body-m text-primary-neutral ',
                  isExpire && 'text-neutral-400',
                )}
              >
                Message
              </span>
              <FeedbackIcon />
            </div>
            <div className="flex justify-between">
              <span
                className={cn(
                  'body-m text-primary-neutral ',
                  isExpire && 'text-neutral-400',
                )}
              >
                Recievers
              </span>
              <FeedbackIcon />
            </div>
            <div className="flex justify-between">
              <span
                className={cn(
                  'body-m text-primary-neutral ',
                  isExpire && 'text-neutral-400',
                )}
              >
                Recievers
              </span>
              <Tag
                className={cn(
                  'headline-s bg-success-100 text-primary-neutral ',
                  tagClassName,
                  isExpire && ' bg-neutral-200 text-neutral-400',
                )}
              >
                {isExpire ? 'Sent' : 'Schedual'}
              </Tag>
            </div>
          </div>
        ) : (
          Object.entries(items ?? []).map(([k, v]) => {
            return (
              <div key={k} className="flex justify-between">
                <span
                  className={cn(
                    'body-m text-primary-neutral ',
                    isExpire && 'text-neutral-400',
                  )}
                >
                  {k}
                </span>
                <Tag
                  className={cn(
                    'headline-s text-primary-neutral ',
                    tagClassName,
                    isExpire && ' bg-neutral-200 text-neutral-400',
                  )}
                >
                  {v}
                </Tag>
              </div>
            )
          })
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          {isCustomAnnouncement ? (
            <div className="flex w-full gap-3">
              <Button
                className="flex-1"
                variant={isExpire ? 'outline' : 'default'}
                color={isExpire ? 'neutral' : 'primary'}
              >
                {isExpire ? 'View Detail' : 'Edit'}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="flex-1"
                    variant="outline"
                    color="neutral"
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    delete
                  </Button>
                </DialogTrigger>
                <DialogContent onClick={e => e.stopPropagation()}>
                  <DialogHeader className="title-3 text-primary-neutral">
                    Delete The Announcement?
                  </DialogHeader>
                  <DialogDescription>
                    All recipients have received the announcement. It will be
                    removed only from your dashboard.
                  </DialogDescription>
                  <DialogFooter className="flex w-full gap-8">
                    <DialogClose
                      asChild
                      onClick={e => e.stopPropagation()}
                      ref={closeRef}
                    >
                      <Button
                        className="flex-1"
                        variant="outline"
                        color="neutral"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        toast.promise(
                          update.mutateAsync({
                            id: announcementId!,
                            hackathonId: hackathonId!,
                          }),
                          {
                            loading: 'Deleting announcement...',
                            success: 'Announcement deleted',
                            error: 'Failed to delete',
                          },
                        )
                        closeRef.current?.click()
                      }}
                    >
                      Yes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Button
              className={cn(
                'w-full ',
                isExpire &&
                  ' headline-s border-neutral-600 text-primary-neutral',
              )}
              variant={isExpire ? 'outline' : 'default'}
            >
              {isExpire ? (
                'View Detail'
              ) : (
                <div className="flex items-center gap-1">
                  {/* <BiEdit className={cn(isExpire && 'hidden')} /> */}
                  {isExpire
                    ? 'View Detail'
                    : disable
                      ? 'Send At Scheduled Time'
                      : 'View Detail'}
                </div>
              )}
            </Button>
          )}
        </DialogTrigger>
        {CustomDialog}
      </Dialog>
    </div>
  )
}

export default BaseCard
