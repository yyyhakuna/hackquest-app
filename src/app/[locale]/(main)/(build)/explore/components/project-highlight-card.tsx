import {
  Card,
  ProjectCardContent,
  ProjectCardDescription,
  ProjectCardHeader,
} from '@/components/hackathon/project-card'
import type { HighlightProjectQuery } from '@/graphql/generated/hooks'
import { CardFooter } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'

type HighlightProjectQueryNotNull = Exclude<
  HighlightProjectQuery['highlightProject'],
  null | undefined
>

interface ProjectHighlightCardProps {
  projectHighlightInfo: HighlightProjectQueryNotNull[number]
}

const ProjectHighlightCard = (props: ProjectHighlightCardProps) => {
  const { projectHighlightInfo } = props

  return (
    <Card
      type="button"
      buttonText={projectHighlightInfo?.winner![0]?.name}
      imgSrc={projectHighlightInfo.logo ?? ''}
      likeNum={56}
    >
      <ProjectCardHeader>{projectHighlightInfo.name}</ProjectCardHeader>
      <ProjectCardDescription>
        {projectHighlightInfo.detail?.oneLineIntro}
      </ProjectCardDescription>
      <ProjectCardContent
        contentObj={{
          Ecosystem: `${projectHighlightInfo.ecology?.join(',')}`,
          Builder: (
            <div className="flex items-center gap-1">
              {projectHighlightInfo.teamLead?.avatar ? (
                <Image
                  src={(projectHighlightInfo.teamLead?.avatar as string) ?? ''}
                  alt="winner avatar"
                  className="rounded-full bg-primary-500"
                  width={24}
                  height={24}
                />
              ) : (
                <div className="h-6 w-6 rounded-full bg-neutral-200" />
              )}

              <p className="line-clamp-1 w-[68px]">
                {projectHighlightInfo.teamLead?.nickname}
              </p>
            </div>
          ),
        }}
      />
      <CardFooter className="gap-[6px] p-0 pt-[6px]">
        {projectHighlightInfo?.tracks?.map((stack: string, index: number) => (
          <Tag
            key={index}
            className="body-s bg-primary-100 py-[2px] text-primary-n"
          >
            {stack}
          </Tag>
        ))}

        {(!projectHighlightInfo.tracks ||
          projectHighlightInfo.tracks.length === 0) && (
          <div className="h-[25px] py-[2px]" />
        )}
      </CardFooter>
    </Card>
  )
}

export default ProjectHighlightCard
