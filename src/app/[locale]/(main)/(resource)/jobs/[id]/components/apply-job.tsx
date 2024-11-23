'use client'

import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { FaTelegram } from 'react-icons/fa'
import { GoLink } from 'react-icons/go'
import { MdOutlineEmail } from 'react-icons/md'
import { SiWechat } from 'react-icons/si'

const ApplyJob = ({ contact }: { contact: Record<string, string> }) => {
  const t = useTranslations('Jobs.detail')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Prevent rendering until component is mounted to avoid hydration issues
    return null
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="px-6 sm:px-8">{t('apply')}</Button>
      </DialogTrigger>
      <DialogContent className=" flex h-full flex-col sm:grid sm:h-auto ">
        <DialogHeader>
          <DialogTitle className="title-3 cursor-default text-primary-neutral">
            {t('applyRole')}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex h-full w-full flex-col justify-between sm:mt-0">
          {contact.wechat && (
            <div className="flex items-start ">
              <div className="flex shrink-0 items-center gap-2 sm:w-[120px]">
                <SiWechat />
                <span className="headline-s text-primary-neutral">wechat</span>
              </div>
              <span className="body-s w-3/5 break-words text-primary-neutral underline">
                {contact.wechat}
              </span>
            </div>
          )}
          {contact.telegram && (
            <div className="flex items-start">
              <div className="flex w-[120px] shrink-0 items-center gap-2">
                <FaTelegram />
                <span className="headline-s text-primary-neutral">
                  Telegram
                </span>
              </div>
              <span className="body-s w-3/5 break-words text-primary-neutral underline">
                {contact.telegram}
              </span>
            </div>
          )}
          {contact.link && (
            <div className="flex items-start">
              <div className="flex w-[120px] shrink-0 items-center gap-2">
                <GoLink />
                <span className="headline-s text-primary-neutral">Link</span>
              </div>
              <span className="body-s w-3/5 break-words text-primary-neutral underline">
                {contact.link}
              </span>
            </div>
          )}
          {contact.email && (
            <div className="flex items-start">
              <div className="flex w-[120px] shrink-0 items-center gap-2">
                <MdOutlineEmail />
                <span className="headline-s text-primary-neutral">Email</span>
              </div>
              <span className="body-s w-3/5 break-words text-primary-neutral underline">
                {contact.email}
              </span>
            </div>
          )}
          <DialogClose className="w-full sm:hidden">
            <Button className="w-full" color="neutral" variant="outline">
              {t('close')}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyJob
