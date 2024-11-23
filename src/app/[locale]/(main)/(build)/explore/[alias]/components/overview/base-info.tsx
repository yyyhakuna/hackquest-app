import { Link } from '@/app/navigation'
import {
  type HackathonExtend,
  HackathonJoinState,
} from '@/graphql/generated/hooks'
import useDealHackathon, { StepEnum } from '@/hooks/use-deal-hackathon'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'
import { useMemo } from 'react'
import { linkIcons } from '../../constants/data'

interface BaseInfoProp {
  hackathon: HackathonExtend
}

const BaseInfo: React.FC<BaseInfoProp> = ({ hackathon }) => {
  const getLinks = () => {
    const keys = Object.keys(hackathon.links?.links || {}) || []
    const ls: Record<string, any>[] = []
    keys.map(k => {
      hackathon.links?.links?.[k] &&
        ls.push({
          icon: linkIcons[k as keyof typeof linkIcons],
          link: hackathon.links?.links?.[k],
          label: k,
        })
    })
    return ls || []
  }
  const { getDeadline } = useDealHackathon()
  const deadline = getDeadline(hackathon)
  const links = getLinks()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const renderStatus = useMemo(() => {
    return (
      <div className="headline-s flex gap-2 text-neutral-800">
        {!hackathon.currentStatus?.includes(HackathonJoinState.VotingClose) ? (
          <>
            <Tag className="bg-success-100">{deadline.step}</Tag>
            <Tag className="bg-blue-100">{deadline.timeDiff} days left</Tag>
          </>
        ) : (
          <Tag className="bg-destructive-100">{StepEnum.PAST}</Tag>
        )}
      </div>
    )
  }, [hackathon])
  return (
    <div className="">
      <img
        src={hackathon?.info?.image || ''}
        alt={hackathon?.name}
        className="w-full rounded-[.75rem]"
      />
      <div className="body-s mt-6 flex flex-col gap-6 rounded-[.75rem] border-[2px] border-neutral-200 p-6 text-neutral-400">
        <div className="headline-s flex flex-wrap gap-[.75rem] text-neutral-800">
          {renderStatus}
          {hackathon.info?.levelTag && (
            <div className="rounded-[.25rem] bg-tag-red px-2 py-1">
              For {hackathon.info?.levelTag}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-6 sm:gap-[1.5rem_2.5rem]">
          <div>
            <p>Host by</p>
            <p className="headline-m mt-1 text-neutral-800">
              {hackathon?.info?.host}
            </p>
          </div>
          <div>
            <p>Hackathon Mode</p>
            <p className="headline-m mt-1 text-neutral-800">
              {hackathon?.info?.allowSubmission === false
                ? 'OFFLINE'
                : hackathon?.info?.mode}
            </p>
          </div>
          <div>
            <p>Ecology</p>
            <div className="mt-1 flex h-6 items-center gap-2">
              {hackathon?.ecosystem?.map((v, _i) => (
                <Avatar
                  key={v.id}
                  className="h-[1.5rem] w-[1.5rem] overflow-hidden rounded-[50%] border-[1px] border-neutral-white"
                >
                  <AvatarImage src={v.image || ''} alt={v.type || ''} />
                  <AvatarFallback>
                    {v?.type?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>

        {hackathon?.info?.address && hackathon?.info?.mode === 'HYBRID' && (
          <div>
            <p>Venue</p>
            <p className="headline-m mt-1 text-neutral-800">
              {hackathon?.info?.address}
            </p>
          </div>
        )}
        <div>
          <p>Participants</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex pl-[.625rem]">
              {hackathon?.members?.slice(0, 3)?.map((m, i) => (
                <Avatar
                  key={i}
                  className="ml-[-.625rem] h-[2rem] w-[2rem] overflow-hidden rounded-[50%] border-[1px] border-neutral-white"
                >
                  <AvatarImage src={m.avatar || ''} alt={m.nickname || ''} />
                  <AvatarFallback className="uppercase">
                    {m.nickname?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {hackathon.participants > 3 && (
              <span>{hackathon.participants}+</span>
            )}
          </div>
        </div>
        {links.length > 0 && (
          <div>
            <p>Links</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {links?.map((v, i) => (
                <Link
                  key={i}
                  href={v.link}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-[.5rem] border border-neutral-200 text-[1.25rem]"
                >
                  <span className="text-neutral-500">{v.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BaseInfo
