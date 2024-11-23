import type { FindCourseDetailQuery } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import { capitalize, random } from 'lodash-es'
import { useState } from 'react'
import { BsCodeSlash } from 'react-icons/bs'
import { IoMdTime } from 'react-icons/io'
import { IoFlagOutline } from 'react-icons/io5'
import type { CourseDetailProps } from './course-detail-header'
import { LearningTrackDialog } from './learning-track-dialog'
import State from './state'

const RandomeTag = ({ content }: { content: string }) => {
  type Color =
    | 'grey'
    | 'blue'
    | 'brown'
    | 'purple'
    | 'orange'
    | 'pink'
    | 'yellow'
    | 'green'
    | 'red'
  const tagColor: Color[] = [
    'blue',
    'brown',
    'purple',
    'orange',
    'pink',
    'yellow',
    'green',
    'red',
  ]

  return <Tag color={tagColor[random(7)]}>{content}</Tag>
}

const CourseCard: React.FC<
  CourseDetailProps & { className?: string; onOpen?: () => void }
> = ({ course, className, onOpen }) => {
  const ecosystemText = (course: FindCourseDetailQuery['findCourseDetail']) => {
    const ecosystem = course.ecosystemInfoList ?? []
    if (ecosystem.length === 0) return ''

    if (ecosystem.length < 5)
      return `Build on ${ecosystem[0]?.type} + ${ecosystem.length}`

    return `Build on ${ecosystem[0]?.type} + ${ecosystem.length} more`
  }

  return (
    <div className={className}>
      <Card>
        <div className="flex w-[280px] flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <BsCodeSlash size={32} />
            <div>
              <p className="body-xs text-neutral-500">Language</p>
              <p className="headline-s text-primary-neutral">
                {capitalize(course.language ?? '')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IoMdTime size={32} />
            <div>
              <p className="body-xs text-neutral-500">Total Length</p>
              <p className="headline-s text-primary-neutral">
                {(course.duration / 60).toFixed(1)}h
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IoFlagOutline size={32} />
            <div>
              <p className="body-xs text-neutral-500">Part of Learning Track</p>
              <p
                className="headline-s text-primary-neutral underline decoration-solid hover:cursor-pointer"
                onClick={onOpen}
              >
                {ecosystemText(course)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const LearningDetailContent: React.FC<CourseDetailProps> = ({ course }) => {
  const [open, setOpen] = useState(false)

  const learnContent = course.knowledgeGain?.description.join(' ')

  return (
    <div className="flex flex-wrap justify-between gap-8 pt-8">
      <CourseCard className="flex-1 sm:hidden" course={course} />
      <div className="flex-1">
        <h2 className="title-3 text-primary-neutral">What You’ll Learn</h2>
        {/* <ul className="list-disc gap-2 py-6">
          {course.knowledgeGain?.description.map(
            (content: string, index: number) => (
              <li className="body-m text-neutral-800" key={index}>
                {content}
              </li>
            ),
          )}
        </ul> */}
        <div className="body-m py-6 text-neutral-800">{learnContent}</div>
        <div className="flex gap-4">
          {course.knowledgeGain?.tags.map((tag: string, index: number) => (
            <RandomeTag key={index} content={tag} />
          ))}
        </div>
        <h2 className="title-3 mt-8 mb-6 text-primary-neutral">Syllabus</h2>
        <div className="flex flex-col gap-4">
          {course.units?.map((unit, index) => (
            <div key={index}>
              <div
                className={cn(
                  'flex items-center justify-between gap-3 rounded-xl p-4',
                  {
                    'bg-neutral-100':
                      unit.progress === 1 || unit.progress === 0,
                    'border-2 border-neutral-200 bg-neutral-white':
                      unit.progress! > 0 && unit.progress! < 1,
                  },
                )}
              >
                <div>
                  <h3 className="headline-m text-neutral-800">{unit.title}</h3>
                  <p className="body-s mt-2 text-secondary-neutral">
                    {unit.description}
                  </p>
                </div>
                <div>
                  <State
                    progress={unit.progress as number}
                    onlyShowIcon={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CourseCard
        className="hidden sm:block"
        course={course}
        onOpen={() => {
          setOpen(true)
        }}
      />
      <LearningTrackDialog
        course={course}
        open={open}
        onOpenChange={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}

export default LearningDetailContent
