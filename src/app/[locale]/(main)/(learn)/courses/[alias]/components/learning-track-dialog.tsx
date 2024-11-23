'use client'
import type { FindCourseDetailQuery } from '@/graphql/generated/hooks'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Card } from '@hackquest/ui/shared/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { capitalize } from 'lodash-es'
import { BsCodeSlash } from 'react-icons/bs'
import { IoFlagOutline } from 'react-icons/io5'

type EcosystemListNotNull = Exclude<
  FindCourseDetailQuery['findCourseDetail']['ecosystemInfoList'],
  null | undefined
>

const LearningTrackCard = ({
  ecosystem,
}: {
  ecosystem: EcosystemListNotNull[number]
}) => {
  return (
    <Card>
      <div className="flex items-center gap-4 p-4 hover:cursor-pointer">
        <div>
          <Avatar>
            <AvatarImage src={ecosystem.image} />
            <AvatarFallback>LT</AvatarFallback>
          </Avatar>
        </div>
        <div className="body-s text-secondary-neutral">
          <h3>Build on {ecosystem.type}</h3>
          <div className="flex items-center gap-2">
            <BsCodeSlash size={16} />
            <p>{capitalize(ecosystem.language)}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function LearningTrackDialog({
  course,
  open,
  onOpenChange,
}: {
  course: FindCourseDetailQuery['findCourseDetail']
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const ecosystemList = course.ecosystemInfoList ?? []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" sm:max-w-[800px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="title-3 flex items-center gap-3 text-primary-neutral">
            <IoFlagOutline size={32} />
            <p>Part of These Learning Tracks</p>
          </DialogTitle>
          <div className="grid gap-6 sm:grid-cols-2">
            {ecosystemList.map((ecosystem, index) => (
              <LearningTrackCard key={index} ecosystem={ecosystem} />
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
