import { HackathonJoinState } from '@/graphql/generated/graphql'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Card } from '@hackquest/ui/shared/card'
import type React from 'react'
import { useState } from 'react'
import HackathonCard from '../hackathon-card'
import More from './more'
import ProjectCard from './project-card'

interface MyHackathonCardProp {
  hackathon: HackathonExtend
}

const MyHackathonCard: React.FC<MyHackathonCardProp> = ({ hackathon }) => {
  const [showDetail, setShowDetail] = useState(true)
  const [parent] = useAutoAnimate()
  const isLive = !hackathon.currentStatus?.some(
    status =>
      status === HackathonJoinState.RegisterNotOpen ||
      status === HackathonJoinState.VotingClose,
  )

  return (
    <Card className="sm:flex sm:items-stretch">
      <div className="p-6 sm:flex-1 sm:flex-shrink-0">
        <HackathonCard
          hackathon={hackathon}
          setShowDetail={setShowDetail}
          isMyHackathon={true}
        />
        {hackathon?.projectCount! > 0 && (
          <div ref={parent}>
            {showDetail && (
              <div className={`flex flex-col gap-6 pt-6 sm:gap-3 sm:pt-3`}>
                {hackathon?.submitted?.map(project => (
                  <div className="w-full" key={project.id}>
                    <ProjectCard
                      project={project}
                      isLive={isLive}
                      hackathonId={hackathon.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {isLive && (
        <div>
          <div className="flex h-[2rem] flex-shrink-0 items-center justify-center border-neutral-200 border-t-[2px] sm:h-full sm:w-[2rem] sm:border-t-0 sm:border-l-[2px]">
            <More hackathon={hackathon} className="rotate-90 sm:rotate-0" />
          </div>
        </div>
      )}
    </Card>
  )
}

export default MyHackathonCard
