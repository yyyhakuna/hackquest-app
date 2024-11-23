import { useRouter } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'

interface ActionButtonProp {
  onClick?: VoidFunction
  path?: string
  pathText?: string
  isComplete: boolean
  isClaimed?: boolean
  handleText?: string
}

const ActionButton: React.FC<ActionButtonProp> = ({
  onClick,
  path,
  pathText,
  isComplete,
  isClaimed,
  handleText,
}) => {
  const router = useRouter()
  const renderText = () => {
    if (isClaimed) {
      return 'Claimed'
    }
    if (isComplete) {
      return handleText || 'Claim'
    } else {
      return (
        <>
          <span>{pathText || 'Go Now'}</span>
          <FiArrowRight />
        </>
      )
    }
  }
  return (
    <Button
      variant={isComplete ? 'default' : 'outline'}
      color={isComplete ? 'primary' : 'neutral'}
      disabled={isClaimed}
      onClick={() => {
        if (isComplete) {
          onClick?.()
        } else {
          router.push(path as string)
        }
      }}
      className="w-full"
    >
      {renderText()}
    </Button>
  )
}

export default ActionButton
