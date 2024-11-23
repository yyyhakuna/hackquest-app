import { Link } from '@/app/navigation'
import { HackathonActionButton } from '@/components/hackathon/hackathon-action-button'
import HackathonTodoList from '@/components/hackathon/hackathon-todo-list'
import MenuLink from '@/constants/menu-link'
import { HackathonJoinState } from '@/graphql/generated/graphql'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import { useHackathonState } from '@/hooks/hackathon/query'
import { useToggle } from '@/hooks/utils/use-toggle'
import { separationNumber } from '@/lib/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Card } from '@hackquest/ui/shared/card'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hackquest/ui/shared/popover'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'
import * as React from 'react'
import { FiChevronDown, FiMoreHorizontal } from 'react-icons/fi'
import { InfoType } from '../../../explore/[alias]/constants/type'

interface HackathonCardProp {
  hackathon: HackathonExtend
  setShowDetail?: (show: boolean) => void
  isMyHackathon?: boolean
}

const HackathonCard: React.FC<HackathonCardProp> = ({
  hackathon,
  setShowDetail: setShow,
  isMyHackathon = false,
}) => {
  const { getTotalPrize, getDeadline } = useHackathonState()
  const totalPrize = getTotalPrize(hackathon)
  const deadline = getDeadline(hackathon)
  const [parent] = useAutoAnimate()
  const [showDetail, setShowDetail] = useToggle(true)
  const [showTodoList, setShowTodoList] = useToggle(false)
  const currentStatus = hackathon.currentStatus
  const isLive = !currentStatus?.some(
    status =>
      status === HackathonJoinState.RegisterNotOpen ||
      status === HackathonJoinState.VotingClose,
  )

  const isRegister = currentStatus?.includes(HackathonJoinState.Register)

  const isSubmit = currentStatus?.includes(HackathonJoinState.Submit)

  const isVoting = currentStatus?.includes(HackathonJoinState.Voting)

  const isRegistered =
    currentStatus?.includes(HackathonJoinState.UserRegistered) &&
    !currentStatus?.includes(HackathonJoinState.Submit)

  const isSubmitted = currentStatus?.includes(HackathonJoinState.UserSubmitted)

  const link = `${MenuLink.EXPLORE}/${hackathon.alias}${isVoting ? `?tab=${InfoType.PROJECT_GALLERY}` : ''}`

  const renderTodo = () => {
    if (hackathon.todos?.length) {
      const firstUnCompleted = hackathon.todos?.find(todo => !todo.completed)
      return (
        <Popover open={showTodoList} onOpenChange={setShowTodoList}>
          <PopoverTrigger asChild>
            {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
            <div
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="button"
              className="group flex items-center justify-between"
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                event.nativeEvent.stopImmediatePropagation()
                setShowTodoList(!showTodoList)
              }}
            >
              <div className="flex flex-1 flex-shrink-0 items-center gap-2">
                {!firstUnCompleted ? (
                  <>
                    <FeedbackIcon size="small" />
                    <span className="headline-m line-clamp-1 flex-1 text-neutral-800">
                      {hackathon.todos[hackathon.todos.length - 1]?.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="size-3 rounded-full bg-primary" />
                    <span className="headline-m line-clamp-1 flex-1 text-neutral-800">
                      {firstUnCompleted?.name}
                    </span>
                  </>
                )}
              </div>
              <FiChevronDown className="size-6 transition-all group-aria-expanded:rotate-180" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-xl border-2 border-neutral-200 p-5">
            <HackathonTodoList hackathon={hackathon} />
          </PopoverContent>
        </Popover>
      )
    } else {
      const getActionText = () => {
        if (isRegister) return 'Register Hackathon'
        if (isSubmit)
          return isSubmitted ? 'Submission Project' : 'Submit a Project'
        return 'Project Canvassing'
      }
      return (
        <div className="relative mt-3 flex w-full items-center justify-between gap-4 rounded-[4px] px-2 sm:w-[15.625rem]">
          <div className="flex flex-1 flex-shrink-0 items-center gap-2">
            {isRegistered || isSubmitted ? (
              <FeedbackIcon size={'small'} />
            ) : (
              <span className="size-3 rounded-full bg-primary" />
            )}
            <span className="headline-m line-clamp-1 flex-1 text-neutral-800">
              {getActionText()}
            </span>
          </div>
        </div>
      )
    }
  }

  const renderCenterInfo = () => {
    if (isLive && isMyHackathon) {
      return (
        <>
          <div className="!w-full">
            <p>To Do</p>
            {renderTodo()}
          </div>
          <div className="space-y-3">
            <p className="whitespace-nowrap">Deadline</p>
            <p className="headline-s sm:headline-m text-neutral-800">
              {`${deadline.timeDiff} ${deadline.timeDiff > 1 ? 'days' : 'day'} left`}
            </p>
          </div>
          <div className="space-y-3">
            <p>Total Prize</p>
            <p className="headline-s sm:headline-m text-neutral-800">
              {`${separationNumber(totalPrize)} ${hackathon?.rewards?.[0]?.currency || ''}`}
            </p>
          </div>
        </>
      )
    } else {
      return (
        <React.Fragment>
          <div>
            <p>Total Prize</p>
            <p className="headline-s sm:headline-m mt-3 text-neutral-800">
              {`${separationNumber(totalPrize)} ${hackathon?.rewards?.[0]?.currency || ''}`}
            </p>
          </div>
          <div>
            <p>Ecology</p>
            <div className="headline-s sm:headline-m mt-3 flex items-center gap-x-1.5 text-neutral-800">
              {hackathon?.ecosystem?.length! > 0
                ? hackathon?.ecosystem?.slice(0, 3)?.map(item => (
                    <Avatar className="size-8" key={item.id}>
                      <AvatarImage src={item.image} alt={item.type || ''} />
                      <AvatarFallback>{item.type?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))
                : '-'}
              {hackathon?.ecosystem?.length! > 3 && (
                <Avatar className="size-8">
                  <AvatarFallback className="flex items-center">
                    <FiMoreHorizontal />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          <div className="">
            <p>Host</p>
            <p className="headline-s sm:headline-m mt-3 line-clamp-1 text-neutral-800">
              {hackathon?.info?.host}
            </p>
          </div>
          <div className="">
            <p>Participants</p>
            <div className="headline-s sm:headline-m mt-3 flex items-center gap-[.375rem] text-neutral-800">
              {hackathon?.members?.length! > 0 ? (
                <>
                  <div className=" flex pl-[.625rem]">
                    {hackathon?.members?.slice(0, 3)?.map(m => (
                      <Avatar
                        key={m.userId}
                        className="ml-[-.625rem] h-[2rem] w-[2rem] overflow-hidden rounded-[50%] border-[1px] border-neutral-white"
                      >
                        <AvatarImage
                          src={m.avatar || ''}
                          alt={m.nickname || ''}
                        />
                        <AvatarFallback className="uppercase">
                          {m.nickname?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {hackathon.participants > 3 && (
                    <span>{hackathon.participants}</span>
                  )}
                </>
              ) : (
                '-'
              )}
            </div>
          </div>
        </React.Fragment>
      )
    }
  }

  const renderTag = () => {
    const isVotingClose = currentStatus?.includes(
      HackathonJoinState.VotingClose,
    )
    return (
      <div className="flex gap-4">
        <Tag
          className={`headline-s ${isVotingClose ? 'bg-destructive-100' : 'bg-primary-100'}`}
        >
          {deadline.schedule}
        </Tag>
        {!isVotingClose && (
          <Tag className={`headline-s bg-blue-100`}>
            {deadline.timeDiff} days left
          </Tag>
        )}
      </div>
    )
  }

  const renderCard = () => (
    <Link href={link} className="block">
      <div
        className={`flex flex-col gap-3 sm:flex-row sm:items-stretch`}
        ref={parent}
      >
        <div className="flex flex-col gap-6 sm:flex-1 sm:justify-between sm:py-3">
          <div className="w-full">
            <h2 className="hidden flex-1 flex-shrink-0 font-bold font-next-book text-lg text-neutral-800 sm:line-clamp-1 sm:text-2xl">
              {hackathon?.name}
            </h2>
            <div
              className="flex items-center justify-between gap-1 sm:hidden"
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                e.nativeEvent.stopImmediatePropagation()
                setShowDetail(!showDetail)
                setShow?.(!showDetail)
              }}
            >
              <h2 className="title-5 line-clamp-1 flex-1 flex-shrink-0 text-neutral-800">
                {hackathon?.name}
              </h2>
              <FiChevronDown
                className={`size-6 transition-all sm:hidden ${!showDetail ? 'rotate-0' : 'rotate-180'}`}
              />
            </div>
            {showDetail && (
              <div className="body-s mt-3 line-clamp-3 text-neutral-500 sm:line-clamp-2 sm:h-[42px]">
                {hackathon?.info?.intro}
              </div>
            )}
          </div>
          {isMyHackathon ? (
            <div
              className="w-full max-sm:hidden"
              onClick={e => e.stopPropagation()}
            >
              <HackathonActionButton hackathon={hackathon} />
            </div>
          ) : (
            <div className="w-full max-sm:hidden">{renderTag()}</div>
          )}
        </div>
        {showDetail && (
          <div
            className={`body-s flex w-full flex-wrap gap-y-3 p-0 text-neutral-400 sm:w-[18.625rem] sm:gap-y-6 sm:px-6 sm:py-4 [&>div]:w-[50%]`}
          >
            {renderCenterInfo()}
          </div>
        )}

        <div className="w-full sm:flex sm:w-[329px] sm:items-center">
          <div className="relative h-0 w-full overflow-hidden rounded-[.75rem] pt-[56%]">
            <Image
              src={hackathon?.info?.image || ''}
              alt={hackathon?.name}
              fill
              className="object-cover"
            />
          </div>
          {showDetail &&
            (isMyHackathon ? (
              <div
                className="mt-6 w-full sm:hidden"
                onClick={e => e.stopPropagation()}
              >
                <HackathonActionButton hackathon={hackathon} />
              </div>
            ) : (
              <div className="mt-6 w-full sm:hidden">{renderTag()}</div>
            ))}
        </div>
      </div>
    </Link>
  )

  return isMyHackathon ? (
    renderCard()
  ) : (
    <Card className="p-6">{renderCard()}</Card>
  )
}

export default HackathonCard
