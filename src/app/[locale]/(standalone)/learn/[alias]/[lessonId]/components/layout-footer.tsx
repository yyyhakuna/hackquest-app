'use client'
import { useRouter } from '@/app/navigation'
import { setCourseLoading, useCourse, useCourseLoading } from '@/store/learn'
import { Button } from '@hackquest/ui/shared/button'
import { useParams } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import CourseProgress from './course-progress'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface LayoutFooterProp {}

const LayoutFooter: React.FC<LayoutFooterProp> = () => {
  const { alias } = useParams()
  const loading = useCourseLoading()
  const _setLoading = setCourseLoading()
  const course = useCourse()
  const router = useRouter()
  const progressRef = useRef<HTMLDivElement>(null)
  const [_progressWidth, setProgressWidth] = useState(80)
  useEffect(() => {
    const len = course?.units?.length || 0
    const refWidth = progressRef.current?.offsetWidth || 0
    if (80 * len + (len - 1) * 8 > refWidth) {
      setProgressWidth((refWidth - 8 * len - 1) / len)
    }
  }, [course])

  return (
    <footer className="flex h-[4.875rem] items-center border-neutral-300 border-t bg-neutral-white px-6 max-sm:justify-between">
      <div className="w-[7.5rem] flex-shrink-0">
        <Button
          variant={'outline'}
          color={'neutral'}
          onClick={() => router.back()}
        >
          <FiArrowLeft />
          <span>Back</span>
        </Button>
      </div>
      <div className="h-full flex-1 flex-shrink-0 max-sm:hidden">
        <CourseProgress />
      </div>
      <div className="flex w-[7.5rem] flex-shrink-0 justify-end">
        <Button
          loading={loading}
          elevated={true}
          onClick={() => {
            if (course?.nextPageId) {
              router.push(`/learn/${alias}/${course?.nextPageId}`)
            }
          }}
        >
          <span>Continue</span>
          <FiArrowRight />
        </Button>
      </div>
    </footer>
  )
}

export default LayoutFooter
