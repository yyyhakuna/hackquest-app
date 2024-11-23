import { VideoPlayer } from '@/components/common/video-player'
import type { ProjectExtend } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { Tag } from '@hackquest/ui/shared/tag'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { Suspense, useRef, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { RiFolderWarningLine } from 'react-icons/ri'
import { exportToCsv } from '../../utils'
import TeamCarousel from './team-carousel'

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

const ProjectDetail = ({
  projects,
  startIndex,
}: { projects: ProjectExtend[]; startIndex: number }) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const [aboutExpended, setAboutExpended] = useState(true)
  const [teamExpended, setTeamExpended] = useState(true)
  const [detailExpended, setDetailExpended] = useState(true)
  const [videosExpended, setVideosExpended] = useState(true)
  const [additionsExpended, setAdditionsExpended] = useState(true)
  const [techExpended, setTechExpended] = useState(true)

  const closeRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-1"
        onClick={e => e.stopPropagation()}
      >
        <RiFolderWarningLine /> {t('viewProject')}
      </DialogTrigger>
      <DialogContent
        showCloseIcon={true}
        className=" sm:max-w-[800px] "
        onClick={e => e.stopPropagation()}
      >
        <Carousel
          options={{ startIndex, watchDrag: false }}
          className="sm:max-w-[752px]"
        >
          <CarouselPrevious className="absolute top-[50%] left-[-80px] z-50 bg-neutral-white" />
          <CarouselNext className="absolute top-[50%] left-[800px] z-50 bg-neutral-white" />
          <CarouselContent>
            {projects.map(item => (
              <CarouselItem key={item.id} className="w-full space-y-6">
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
                            <Item
                              title={t('location')}
                              desc={item.location ?? ''}
                            />
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
                <DialogFooter className="mt-5 w-full">
                  <DialogClose className="hidden" ref={closeRef} />
                  <Button
                    className="flex-1"
                    onClick={() => {
                      closeRef?.current?.click()
                      const {
                        location,
                        demoVideo,
                        pitchVideo,
                        prizeTrack,
                        wallet,
                        tracks,
                        teachStack,
                      } = item
                      const newObj: any = {
                        location,
                        demoVideo,
                        pitchVideo,
                        wallet,
                        prizeTrack,
                      }
                      newObj.Sector = tracks?.join(',')
                      newObj.techStack = teachStack?.join(',')
                      if (item.addition?.githubLink) {
                        newObj.github = item.addition.githubLink
                      }
                      exportToCsv([newObj])
                    }}
                  >
                    {t('downloadSubmission')}
                    <BsArrowRight />
                  </Button>
                </DialogFooter>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetail
