import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { HackathonJoinState } from '@/graphql/generated/graphql'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'

interface RenderButtonProp {
  className?: string
  type?: string
  hackathon: HackathonExtend
}

const RenderButton: React.FC<RenderButtonProp> = ({
  className,
  type = 'header',
  hackathon,
}) => {
  const isContinueRegister = hackathon.currentStatus?.includes(
    HackathonJoinState.UserContinueRegister,
  )

  const isContinueSubmit = hackathon.currentStatus?.includes(
    HackathonJoinState.UserContinueSubmit,
  )

  const renderButton = () => {
    const buttonConfig: Record<string, any> = {
      [HackathonJoinState.RegisterNotOpen]: {
        text: 'Pending',
        disabled: true,
      },
      [HackathonJoinState.Register]: {
        href: `/hackathon/${hackathon.id}/register`,
        text: isContinueRegister
          ? 'Continue Registration'
          : 'Start Registration',
      },
      [HackathonJoinState.UserPendingApproval]: {
        text: 'Pending',
        disabled: true,
      },
      [HackathonJoinState.UserApprovalConfirm]: {
        text: 'Confirm Attendance',
        color: 'success',
      },
      [HackathonJoinState.Submit]: {
        href: `/hackathon/${hackathon.id}/null/submit`,
        text: isContinueSubmit ? 'Continue Submission' : 'Start Submission',
      },
      [HackathonJoinState.UserSubmitted]: {
        href: MenuLink.BUILDER_HOME,
        text: 'View My Project',
      },
      [HackathonJoinState.Voting]: {
        text: 'View My Project',
        href: MenuLink.BUILDER_HOME,
      },
      [HackathonJoinState.VotingClose]: {
        text: 'View My Project',
        href: MenuLink.BUILDER_HOME,
      },
    }

    const status = Object.keys(buttonConfig).find(key =>
      hackathon.currentStatus?.includes(key as HackathonJoinState),
    )

    const config = buttonConfig[status as string]

    if (config?.href) {
      return (
        <object>
          <Link href={config.href}>
            <Button className="w-full">
              {config?.text}
              {type === 'header' && (
                <FiArrowRight className="icon-hover-translate size-4" />
              )}
            </Button>
          </Link>
        </object>
      )
    }

    return (
      <Button
        className="w-full"
        color={config?.color}
        disabled={config?.disabled}
      >
        {config?.text}
        {type === 'header' && (
          <FiArrowRight className="icon-hover-translate size-4" />
        )}
      </Button>
    )
  }

  return renderButton()
}

export default RenderButton
