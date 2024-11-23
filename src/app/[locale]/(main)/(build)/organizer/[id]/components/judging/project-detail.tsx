import { VideoPlayer } from '@/components/common/video-player'
import {
  type ProjectExtend,
  useListOrganizerSubmissionProjectQuery,
} from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import {
  DialogContent,
} from '@hackquest/ui/shared/dialog'
import { Tag } from '@hackquest/ui/shared/tag'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { Suspense, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import TeamCarousel from '../submission/team-carousel'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  desc: string
}
const Item: React.FC<ItemProps> = ({ title, desc, className }) => (
  <div className={cn('space-y-2 ' + className)}>
    <div className="body-m text-secondary-neutral">{title}</div>
    <div className="headline-m truncate text-primary-neutral">{desc}</div>
  </div>
)

const ProjectDetail = ({ id }: { id: string }) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const [aboutExpended, setAboutExpended] = useState(true)
  const [teamExpended, setTeamExpended] = useState(true)
  const [detailExpended, setDetailExpended] = useState(true)
  const [videosExpended, setVideosExpended] = useState(true)
  const [additionsExpended, setAdditionsExpended] = useState(true)
  const [techExpended, setTechExpended] = useState(true)

  const { data } = useSuspenseQuery({
    queryKey: useListOrganizerSubmissionProjectQuery.getKey({
      where: {
        id: {
          equals: id,
        },
      },
    }),
    queryFn: useListOrganizerSubmissionProjectQuery.fetcher({
      where: {
        id: {
          equals: id,
        },
      },
    }),
  })
  const item = data.listOrganizerSubmissionProject?.data![0] as ProjectExtend

  return (
    <DialogContent
      showCloseIcon={true}
      className=" sm:max-w-[800px] "
      onClick={e => e.stopPropagation()}
    >
      <div className="title-1 flex items-center gap-6 text-primary-neutral">
        <img
          src={item.logo ?? ''}
          alt=""
          className="h-[60px] w-[60px] rounded-xl"
        />
        <span>{item.name}</span>
      </div>
      <div className="max-h-[540px] space-y-3 overflow-auto">
        <div>
          <button
            className="headline-l flex h-[50px] w-full items-center justify-between text-neutral-700"
            onClick={() => {
              setAboutExpended(!aboutExpended)
            }}
          >
            {t('about')}
            {aboutExpended ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {aboutExpended && (
            <div className="">
              <div className="flex flex-wrap gap-10">
                <div className="flex w-full gap-10">
                  <Item title={t('location')} desc={item.location ?? ''} />
                  <Item
                    title={t('sector')}
                    desc={item.tracks?.join(',') ?? ''}
                    className="max-w-[220px]"
                  />
                  <Item
                    title={t('prizeTrack')}
                    desc={item.prizeTrack ?? ''}
                    className="max-w-[220px]"
                  />
                </div>
                <div className="space-y-2">
                  <div className="body-m text-secondary-neutral">
                    {t('ecosystem')}
                  </div>
                  <div className="flex gap-3">
                    {item.ecosystem?.map(obj => (
                      <img
                        key={obj.id}
                        src={obj.image}
                        alt=""
                        className="h-[37px] w-[37px] rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="body-m text-secondary-neutral">
                    {t('walletInformation')}
                  </div>
                  <div className="headline-m flex gap-2 text-primary-neutral">
                    <img
                      src="https://s.gravatar.com/avatar/fcdfb9525fa0f02cdc2c83b248a9441a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fyj.png"
                      alt=""
                      className="h-[29px] w-[29px]"
                    />
                    {item.wallet ?? ''}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            className="headline-l flex h-[50px] w-full items-center justify-between text-neutral-700"
            onClick={() => {
              setTeamExpended(!teamExpended)
            }}
          >
            {t('team')}
            {teamExpended ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {teamExpended && (
            <Suspense>
              <TeamCarousel members={item.team?.members ?? []} />
            </Suspense>
          )}
        </div>
        <div>
          <button
            className="headline-l flex h-[50px] w-full items-center justify-between text-neutral-700"
            onClick={() => {
              setDetailExpended(!detailExpended)
            }}
          >
            {t('projectDetail')}
            {detailExpended ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {detailExpended && (
            <div>
              <div
                className="max-h-52 overflow-auto"
                dangerouslySetInnerHTML={{
                  __html: `<p className="h-2">${item.detail?.detailedIntro ?? ''}</p>`,
                }}
              />
            </div>
          )}
        </div>
        <div>
          <button
            className="headline-l flex h-[50px] w-full items-center justify-between text-neutral-700"
            onClick={() => {
              setVideosExpended(!videosExpended)
            }}
          >
            {t('video')}
            {videosExpended ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {videosExpended && (
            <div className="flex flex-wrap gap-10">
              {item.pitchVideo && (
                <div className="w-[239px] space-y-2">
                  <span className="body-m text-secondary-neutral">
                    pitch Video
                  </span>
                  <VideoPlayer url={item.pitchVideo} />
                </div>
              )}
              {item.demoVideo && (
                <div className="w-[239px] space-y-2">
                  <span className="body-m text-secondary-neutral">
                    demo Video
                  </span>
                  <VideoPlayer url={item.demoVideo} />
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <button
            className="headline-l flex h-[50px] w-full items-center justify-between text-neutral-700"
            onClick={() => {
              setTechExpended(!techExpended)
            }}
          >
            {t('techTag')}
            {techExpended ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {techExpended && (
            <div className="flex flex-wrap gap-2">
              {item.teachStack?.map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            className="headline-l flex h-[50px] w-full items-center justify-between text-neutral-700"
            onClick={() => {
              setAdditionsExpended(!additionsExpended)
            }}
          >
            {t('additions')}
            {additionsExpended ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {additionsExpended && (
            <div>
              <div className="flex flex-wrap gap-10">
                {item.addition?.githubLink && (
                  <Item
                    title="Project Github"
                    desc={item.addition?.githubLink}
                  />
                )}
                <Item
                  title="Open Source"
                  desc={item.addition?.isOpenSource ? 'Yes' : 'No'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="ml-0 h-0.5 bg-neutral-100" />
    </DialogContent>
  )
}

export default ProjectDetail
