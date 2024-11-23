'use client'

import { useLocalStorage } from '@/hooks/utils/use-local-storage'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import * as React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { useUserProfile } from '../../utils/query'
import { useDialogStore } from '../../utils/store'

const STORAGE_KEY = 'profile-completed'

export function CompleteProfile() {
  const { onOpen } = useDialogStore()
  const { data: profile } = useUserProfile()

  const [value, setValue] = useLocalStorage(STORAGE_KEY, false)

  const completed = (profile?.progress?.length ?? 0) >= 3

  React.useEffect(() => {
    if (!value && !completed && profile.isOwnProfile) {
      setTimeout(() => {
        onOpen('onboarding')
      }, 1000)
      setValue(true)
    }
  }, [completed, value, onOpen, setValue, profile.isOwnProfile])

  if (completed || !profile.isOwnProfile) {
    return null
  }

  return (
    <div className="flex w-full flex-col-reverse justify-between rounded-2xl bg-blue-100/50 p-4 max-sm:gap-4 sm:flex-row sm:items-center sm:p-6">
      <div>
        <h3 className="headline-l">
          Complete Profile ({profile?.progress?.length}/3)
        </h3>
        <p className="body-s mt-2 mb-4 text-secondary-neutral">
          Only a few steps toward your web3 builder profile
        </p>
        <Button
          variant="outline"
          color="neutral"
          onClick={() => onOpen('onboarding')}
        >
          Continue
          <LuArrowRight className="size-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {new Array(3).fill(0).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-2 w-14 rounded-full bg-neutral-white',
              index + 1 <= (profile?.progress?.length ?? 0) && 'bg-blue',
            )}
          />
        ))}
      </div>
    </div>
  )
}
