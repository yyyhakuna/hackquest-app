'use client'

import * as ResizablePanel from '@/components/common/resizable-panel'
import {
  useSendContactEmailMutation,
  useVerifyContactEmailMutation,
} from '@/graphql/generated/hooks'
import { useHackathonId } from '@/hooks/hackathon/query'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@hackquest/ui/shared/input-otp'
import * as React from 'react'
import toast from 'react-hot-toast'
import { useTimer } from 'react-timer-hook'

export function VerifyEmailDialog({
  email,
  open,
  onOpenChange,
}: {
  email: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [state, setState] = React.useState<'form' | 'success'>('form')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <ResizablePanel.Root value={state}>
          <ResizablePanel.Item value="form">
            <Form email={email} onSuccess={() => setState('success')} />
          </ResizablePanel.Item>
          <ResizablePanel.Item value="success">
            <Success onOpenChange={onOpenChange} />
          </ResizablePanel.Item>
        </ResizablePanel.Root>
      </DialogContent>
    </Dialog>
  )
}

function Form({
  email,
  onSuccess,
}: {
  email: string
  onSuccess: () => void
}) {
  const hackathonId = useHackathonId()
  const [invalid, setInvalid] = React.useState(false)

  const timer = useTimer({
    expiryTimestamp: new Date(Date.now() + 60 * 1000),
    autoStart: true,
  })

  const sendEmail = useSendContactEmailMutation({
    onSuccess: () => {
      toast.success('Email resent')
      timer.restart(new Date(Date.now() + 60 * 1000))
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  const verifyEmail = useVerifyContactEmailMutation({
    onSuccess: () => {
      toast.success('Email verified')
      onSuccess()
    },
    onError: (error: string) => {
      toast.error(error)
      setInvalid(true)
    },
  })

  return (
    <div className="flex flex-col items-center gap-6">
      <DialogTitle className="title-3 mt-2">
        Verify Your Contact Email
      </DialogTitle>
      <DialogDescription className="body-m text-center">
        Please enter the six-digit verification code we just sent to
        abcdefg@gmail.com
      </DialogDescription>
      <InputOTP
        maxLength={6}
        error={invalid}
        onChange={newValue => {
          setInvalid(false)
          if (newValue.length === 6) {
            verifyEmail.mutate({ hackathonId, code: newValue })
          }
        }}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="headline-l size-12 rounded-lg"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button
        className="w-full"
        loading={sendEmail.isPending || verifyEmail.isPending}
        disabled={timer.isRunning}
        onClick={() => {
          sendEmail.mutate({ email })
        }}
      >
        Resend {timer.isRunning && `(${timer.seconds}s)`}
      </Button>
    </div>
  )
}

function Success({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const timer = useTimer({
    expiryTimestamp: new Date(Date.now() + 5000),
    autoStart: true,
    onExpire: () => onOpenChange(false),
  })
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="flex flex-col space-y-5 text-center">
        <DialogTitle className="title-3 mt-2">Email Verified! 🎉</DialogTitle>
        <DialogDescription className="body-m text-center">
          You have been successfully verified the email! This window will be
          closed in 5 seconds.
        </DialogDescription>
      </div>
      <Button
        variant="outline"
        color="neutral"
        className="w-full"
        onClick={() => onOpenChange(false)}
      >
        Close ({timer.seconds}s)
      </Button>
    </div>
  )
}
