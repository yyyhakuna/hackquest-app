'use client'
import type { QuizType } from '@/components/component-renderer/constants/type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import type React from 'react'
import { useMemo, useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'

interface QuizHeaderProp {
  quiz: QuizType
  expand: boolean
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
  curQuizIndex: number
  setCurQuizIndex: React.Dispatch<React.SetStateAction<number>>
}

const QuizHeader: React.FC<QuizHeaderProp> = ({
  quiz: propQuiz,
  expand,
  setExpand,
  curQuizIndex,
  setCurQuizIndex,
}) => {
  const [open, setOpen] = useState(false)

  const quiz = useMemo(() => {
    let _preCompleted = true
    return propQuiz.children.map((v, _i) => {
      // const disabled = !v.isCompleted && !preCompleted
      _preCompleted = v.isCompleted as boolean
      return {
        ...v,
        disabled: false,
      }
    })
  }, [propQuiz])
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <div className="title-5 text-neutral-800">
              Quest {`${curQuizIndex + 1}/${quiz.length}`}
            </div>
            <BiSolidDownArrow
              className={`${open ? 'rotate-180' : '0'} size-4 transition-all`}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="rounded-[.5rem] text-neutral-800"
        >
          {quiz.map((v: any, i) => (
            <div
              className={`flex items-center justify-between rounded-[0.5rem] p-2 ${v.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${i === curQuizIndex ? 'bg-primary-50' : ''} ${v.isCompleted ? 'bg-neutral-50' : 'hover:bg-neutral-100'}`}
              key={v.id}
              onClick={() => {
                if (v.disabled || i === curQuizIndex) return
                setCurQuizIndex(i)
                setOpen(false)
              }}
            >
              <span
                className={`body-s ${v.isCompleted ? 'text-neutral-400' : 'text-neutral-800'}`}
              >{`${v.title ? 'Quiz' : 'Quiz'} ${i + 1}/${quiz.length}`}</span>
              {v.isCompleted && <FeedbackIcon size="small" />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <span
        onClick={() => setExpand(!expand)}
        className="flex flex-1 cursor-pointer justify-end"
      >
        <FiChevronDown
          className={`${expand ? 'rotate-180' : '0'} size-4 transition-all`}
        />
      </span>
    </div>
  )
}

export default QuizHeader
