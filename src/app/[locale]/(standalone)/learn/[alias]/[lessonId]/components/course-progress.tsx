'use client'
import useMediaQuery from '@/hooks/use-media-query'
import { useCourse } from '@/store/learn'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CourseProgressProp {}

const CourseProgress: React.FC<CourseProgressProp> = () => {
  const course = useCourse()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const progressRef = useRef<HTMLDivElement>(null)
  const [progressWidth, setProgressWidth] = useState(0)
  useEffect(() => {
    const len = course?.units?.length || 0
    const refWidth = progressRef.current?.offsetWidth || 0
    if (isDesktop) {
      if (80 * len + (len - 1) * 8 > refWidth) {
        setProgressWidth((refWidth - 8 * len - 1) / len)
      } else {
        setProgressWidth(80)
      }
    } else {
      setProgressWidth(refWidth / len)
    }
  }, [course, isDesktop])
  return (
    <div className="relative h-full w-full " ref={progressRef}>
      <div className="absolute top-0 left-0 flex h-full w-full items-center sm:justify-center sm:gap-2">
        {course?.units?.map((v, i) => (
          <div
            className={`relative h-[.3125rem] bg-neutral-300 sm:h-[.375rem] sm:rounded-[6.25rem] sm:opacity-60`}
            key={i}
            style={{
              width: progressWidth,
            }}
          >
            <div
              className="h-full bg-blue-500 sm:rounded-[6.25rem] sm:opacity-60"
              style={{ width: `${v.progress}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseProgress
