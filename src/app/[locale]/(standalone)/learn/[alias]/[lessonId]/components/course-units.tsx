'use client'
import { Link } from '@/app/navigation'
import { useCourse, useCourseLesson } from '@/store/learn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { Progress } from '@hackquest/ui/shared/progress'
import { useParams } from 'next/navigation'
import type React from 'react'
import { useMemo, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CourseUnitsProp {}

const CourseUnits: React.FC<CourseUnitsProp> = () => {
  const [open, setOpen] = useState(false)
  const course = useCourse()
  const courseLesson = useCourseLesson()
  const { alias, lessonId } = useParams()
  const units = useMemo(() => {
    let preProgress = 1
    const newUnits = course?.units?.map(u => {
      let preIsCompleted = true
      const newUnit = {
        ...u,
        pages: u.pages?.map(p => {
          const _disabled = !preIsCompleted || preProgress < 1
          const newPage = {
            ...p,
            disabled: false,
          }
          preIsCompleted = p.isCompleted as boolean
          return newPage
        }),
      }
      preProgress = u.progress as number
      return newUnit
    })
    return newUnits
  }, [course])
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="headline-s flex h-[2.1875rem] items-center gap-[.625rem] rounded-lg border border-neutral-500 px-3 text-neutral-800 outline-none">
          <FiMenu />
          <span>{courseLesson.title}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[100vw] rounded-[0] p-0 sm:w-[37.5rem]"
        sideOffset={17}
      >
        <div className=" w-full text-neutral-800">
          <div className="flex h-[4.375rem] items-center justify-between px-6">
            <span className="title-5 text-neutral-800">
              {courseLesson.title}
            </span>
            <FiX
              className="size-5 cursor-pointer text-neutral-500"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="scroll-wrap-y flex flex-1 flex-col gap-4 px-6 pb-6 max-sm:h-[calc(100vh-8.375rem)] sm:max-h-[60vh]">
            {units?.map((v, index) => (
              <div
                key={index}
                className="w-full rounded-xl border border-neutral-300 px-4 pb-4"
              >
                <div className="flex items-center justify-between py-4">
                  <span className="headline-s flex-shrink-0 text-neutral-800">
                    {v.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20">
                      <Progress value={v.progress} />
                    </div>
                    <span className="body-xs">{`${v.progress}%`}</span>
                  </div>
                </div>
                <div className="body-s border-neutral-200 border-t pt-4 text-neutral-800">
                  {v.pages?.map(p => (
                    <Link
                      href={`/learn/${alias}/${p.id}`}
                      className={`flex items-center justify-between p-2 ${p.id === lessonId ? 'bg-primary-50' : ''} ${p.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} `}
                      key={p.id}
                      onClick={e => {
                        if (p.disabled || p.id === lessonId) {
                          e.preventDefault()
                          e.nativeEvent.stopImmediatePropagation()
                          return
                        }
                        setOpen(false)
                      }}
                    >
                      <span
                        className={`${p.isCompleted ? 'text-neutral-400' : 'text-neutral-800'}`}
                      >
                        {p.title}
                      </span>
                      {p.isCompleted && <FeedbackIcon size={'small'} />}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CourseUnits
