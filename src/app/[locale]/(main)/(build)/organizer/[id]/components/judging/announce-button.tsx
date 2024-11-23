'use client'
import {
  ModeEnum,
  useAnnounceJudgeMutation,
  useFindListTemplateQuery,
} from '@/graphql/generated/hooks'
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
import { Tag } from '@hackquest/ui/shared/tag'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import { useOrganizerStore } from '../../utils/store'

const AnnounnceButton = ({ judgeId }: { judgeId: string }) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const id = useParams().id as string
  const { hackathon } = useOrganizerStore()
  const mode =
    hackathon?.info?.mode === 'HYBRID' ? ModeEnum.Hybrid : ModeEnum.Online
  const { data } = useSuspenseQuery({
    queryKey: useFindListTemplateQuery.getKey({
      id,
      mode,
    }),
    queryFn: useFindListTemplateQuery.fetcher({
      id,
      mode,
    }),
  })
  const { mutateAsync } = useAnnounceJudgeMutation()

  const rewards = data.findListTemplate?.reward
  const closeRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {t('announceWinners')} <BsArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseIcon>
        <DialogHeader className="title-3 text-primary-neutral">
          {t('announceWinners')}
        </DialogHeader>
        <DialogDescription className="body-s space-y-6 text-primary-neutral">
          <span>
            This step cannot be undone and all submitters will be notified.
            Please check the reward announcement before you announce winners.
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <div className=" headline-m cursor-pointer text-center text-primary-neutral underline">
                {t('checkAnnouncement')}
              </div>
            </DialogTrigger>
            <DialogContent
              showCloseIcon
              className="max-h-[800px] overflow-auto sm:max-w-[57%] sm:max-w-[888px]"
            >
              <DialogHeader className="title-1 text-left text-primary-neutral">
                {t('reward')}
              </DialogHeader>
              <DialogDescription className="space-y-6">
                {rewards?.map(obj => {
                  return (
                    <div key={obj.type}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span>{obj.type} Notification</span>
                          <Tag className="headline-s text-primary-neutral">
                            {t('upcoming')}
                          </Tag>
                        </div>
                        <div className="">
                          <span>{t('receivers')}</span>
                          <span className="p-[38px]">{obj.receivers}</span>
                        </div>
                      </div>
                      <div className="mt-3 mb-2 flex justify-between">
                        <span className="body-s text-neutral-600">
                          Message sent to all {obj.type?.toLowerCase()}{' '}
                          participants
                        </span>
                        <span>
                          {obj.receivers}/{obj.receivers}
                        </span>
                      </div>
                      <div
                        className="body-s rounded-md border border-neutral-300 p-2 text-primary-neutral"
                        dangerouslySetInnerHTML={{
                          __html: obj.template ?? '',
                        }}
                      />
                    </div>
                  )
                })}
                <div className="h-[1px] bg-neutral-300 " />
                <Button
                  className="mt-8 w-full"
                  onClick={() => {
                    closeRef?.current?.click()
                  }}
                >
                  {t('saveAndContinue')} <BsArrowRight />
                </Button>
              </DialogDescription>
            </DialogContent>
            <DialogClose ref={closeRef} className="hidden" />
          </Dialog>
        </DialogDescription>
        <DialogFooter className="flex w-full gap-8">
          <DialogClose asChild>
            <Button className="flex-1 " color="neutral" variant="outline">
              {t('leaveNow')}
            </Button>
          </DialogClose>
          <Button
            className="flex-1 "
            onClick={() => {
              toast.promise(
                mutateAsync({
                  hackathonId: id,
                  id: judgeId,
                }),
                {
                  loading: 'loading',
                  success: 'Announce Success',
                  error: 'Failed to Announce',
                },
              )
            }}
          >
            {t('continue')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AnnounnceButton
