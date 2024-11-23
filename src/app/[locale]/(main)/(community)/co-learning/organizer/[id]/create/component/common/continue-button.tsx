'use client'

import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { useMemo } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { useColearningContext } from './creation-provider'

interface SectionButtonProp {
  onContinue?: VoidFunction
  loading?: boolean
}

const ContinueButton: React.FC<SectionButtonProp> = ({
  onContinue,
  loading,
}) => {
  const { continueButtonStatus, data } = useColearningContext()
  const continueButton = useMemo(() => {
    return (
      <Button type="submit" onClick={() => onContinue?.()} loading={loading}>
        Save & Continue
        <LuArrowRight className="size-4" />
      </Button>
    )
  }, [loading, onContinue])

  const previewHackathonButton = () => {
    return (
      <Link href={`/co-learning/${data.id}`}>
        <Button className="bg-neutral-100">
          Preview Colearning
          <LuArrowRight className="size-4" />
        </Button>
      </Link>
    )
  }
  return (
    <div className="flex justify-end">
      {continueButtonStatus === 0 ? continueButton : previewHackathonButton()}
    </div>
  )
}

export default ContinueButton
