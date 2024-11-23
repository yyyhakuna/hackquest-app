'use client'

import { copyText } from '@/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { Label } from '@hackquest/ui/shared/label'
import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share'
import toast from 'react-hot-toast'
import { FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { LuCopy, LuShare } from 'react-icons/lu'

export function ShareProfile() {
  const sharedURL = `https://hackquest.io/user/evan`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="outline-none" aria-label="Share profile">
          <LuShare className="size-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[92.5%] gap-8 p-6 max-sm:rounded-xl">
        <DialogHeader className="mt-1">
          <DialogTitle className="title-3">Share Profile</DialogTitle>
        </DialogHeader>
        <div className="body-m space-y-2">
          <Label className="text-secondary-neutral">Custom Profile URL</Label>
          <p>{sharedURL}</p>
        </div>
        <div className="flex items-center gap-8">
          <Button
            onClick={() => {
              copyText(sharedURL)
              toast.success('Copied to clipboard')
            }}
          >
            Copy Link
            <LuCopy className="size-4" />
          </Button>
          <div className="flex items-center gap-6">
            <span className="body-s text-secondary-neutral">Or Share With</span>
            <TwitterShareButton url={sharedURL}>
              <FaXTwitter className="size-6" />
            </TwitterShareButton>
            <WhatsappShareButton url={sharedURL}>
              <FaWhatsapp className="size-6" />
            </WhatsappShareButton>
            <TelegramShareButton url={sharedURL}>
              <FaTelegram className="size-6" />
            </TelegramShareButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
