'use client'
import { Link, useRouter } from '@/app/navigation'
import type { FindCourseDetailQuery } from '@/graphql/generated/hooks'
import { AuthType, useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { IoMdArrowForward } from 'react-icons/io'
import { useShallow } from 'zustand/react/shallow'
import State from './state'

export interface CourseDetailProps {
  course: FindCourseDetailQuery['findCourseDetail']
}

const LearnButton: React.FC<CourseDetailProps> = ({ course }) => {
  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )
  const { alias } = useParams()
  const _router = useRouter()
  const isAuthenticated = useAuthenticated()
  const learnMap = new Map([
    [0, 'Start learning'],
    [1, 'Learn again'],
  ])

  const btnText = learnMap.get(course.progress as number) ?? 'Continue'

  return (
    <Link href={`/learn/${alias}/${course.currentPageId}`}>
      <Button
        onClick={e => {
          if (!isAuthenticated) {
            setAuthType(AuthType.SIGN_IN)
            setAuthModalOpen(true)
            e.preventDefault()
            e.nativeEvent.stopImmediatePropagation()
          }
        }}
      >
        <div className="flex items-center gap-2">
          <span>{btnText}</span>
          <IoMdArrowForward size={16} />
        </div>
      </Button>
    </Link>
  )
}

const LearningDetailHeader: React.FC<CourseDetailProps> = ({ course }) => {
  const t = useTranslations()
  const router = useRouter()

  return (
    <div className="flex justify-between gap-8 sm:pb-8">
      <div className="flex-1">
        <div
          className="headline-s flex cursor-pointer items-center gap-2 text-neutral-800"
          onClick={() => router.back()}
        >
          <FiArrowLeft className="size-6 sm:size-4" />
          <span className="hidden sm:block">{t('Common.back')}</span>
        </div>
        <h1 className="title-1 my-6 text-neutral-800">{course.title}</h1>
        <p className="body-m text-neutral-500">{course.description}</p>
        <div className="mt-8 flex items-center gap-8">
          <LearnButton course={course} />
          <div className="flex items-center gap-2">
            <State progress={course.progress as number} />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Image
          width={330}
          height={280}
          className="hidden h-[280px] w-[320px] sm:block"
          src={
            course.image ?? '/images/learning-track/learning-detail-header.png'
          }
          alt={course.title}
        />
      </div>
    </div>
  )
}

export default LearningDetailHeader
