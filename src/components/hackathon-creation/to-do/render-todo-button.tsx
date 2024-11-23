import { Link } from '@/app/navigation'
import { GlobalSearchKeyIcon } from '@/components/global-search-select/utils'
import type { HackathonTodoExtend } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { LuArrowRight } from 'react-icons/lu'

interface RenderToDoButtonProp {
  initValue: HackathonTodoExtend
  onClick?: (event: React.MouseEvent) => void
}

const RenderToDoButton: React.FC<RenderToDoButtonProp> = ({
  initValue,
  onClick,
}) => {
  const metadata = initValue.metadata
  if (metadata.data?.id) {
    return (
      <Link href={metadata.data?._link || ''} target="_blank">
        <Button
          size={'small'}
          className="flex w-[11.25rem] overflow-hidden"
          onClick={event => {
            onClick?.(event)
          }}
        >
          {
            GlobalSearchKeyIcon[
              initValue.metadata.data?._type as keyof typeof GlobalSearchKeyIcon
            ]
          }
          <span className="line-clamp-1 flex-1 flex-shrink-0">
            {initValue.url?.length! > 18
              ? `${initValue.url?.substring(0, 18)}...`
              : initValue.url}
          </span>
        </Button>
      </Link>
    )
  } else {
    return (
      <Link href={initValue.url || ''} target="_blank">
        <Button
          className="flex w-[11.25rem] overflow-hidden"
          size={'small'}
          disabled={!initValue.url && !onClick}
          onClick={e => {
            if (!initValue.url) {
              e.stopPropagation()
            }
            onClick?.(e)
          }}
        >
          <span className="line-clamp-1 flex-1 flex-shrink-0">
            {initValue.metadata.buttonLabel}
          </span>
          <LuArrowRight className="size-4" />
        </Button>
      </Link>
    )
  }
}

export default RenderToDoButton
