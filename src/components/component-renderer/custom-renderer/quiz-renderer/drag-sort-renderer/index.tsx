import { childRenderCallback } from '@/components/component-renderer'
import {
  ChoiceAnswerState,
  type ChoiceType,
  type ComponentRendererType,
  type QuizOption,
} from '@/components/component-renderer/constants/type'
import { useCourseLesson } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import QuizFooter from '../quiz-footer'
import { useQuizContext } from '../type'
import SortContainer from './sort-container'

interface DragSortRendererProp {
  parent: ComponentRendererType
  quiz: ChoiceType
}

const DragSortRenderer: React.FC<DragSortRendererProp> = ({ quiz }) => {
  const { onPass } = useQuizContext()
  const lesson = useCourseLesson()
  const [options, setOptions] = useState(quiz.options)

  const [answerState, setAnswerState] = useState<ChoiceAnswerState>(
    ChoiceAnswerState.Default,
  )

  const [showAnswer, setShowAnswer] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const answerOptions = useMemo(() => {
    const ops = [] as QuizOption[]
    quiz.answers.forEach(v => {
      const option = quiz.options.find(o => o.index === v)
      ops.push(option as QuizOption)
    })
    return ops
  }, [quiz])

  const submit = () => {
    const optionsIndex = options.map(o => o.index)
    const wrong = optionsIndex.join(',') !== quiz.answers.join(',')
    if (wrong) {
      setAnswerState(ChoiceAnswerState.Wrong)
      return
    }
    setAnswerState(ChoiceAnswerState.Correct)
    onPass()
  }

  useEffect(() => {
    if (quiz.isCompleted) {
      setOptions(answerOptions)
      setAnswerState(ChoiceAnswerState.Correct)
    } else {
      setOptions(quiz.options)
      setAnswerState(ChoiceAnswerState.Default)
    }
  }, [quiz, answerOptions])

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      <div className=" relative w-full gap-4 sm:flex-1">
        <div className="sm:scroll-wrap-y sn:left-0 flex w-full flex-col gap-4 sm:absolute sm:top-0 sm:h-full">
          <div className="flex flex-col gap-2">
            <div className="[&>p]:body-l inline-block font-bold">
              {quiz?.children?.map(childRenderCallback(quiz))}
            </div>
            <span className="body-s inline-block whitespace-nowrap text-neutral-500">
              [Ordering]
            </span>
          </div>
          <div
            className={cn(
              'flex w-full flex-wrap gap-4 rounded-xl border-[2px] border-transparent bg-neutral-100 p-4',
              answerState === ChoiceAnswerState.Wrong
                ? 'border-destructive-600 bg-destructive-50'
                : '',
              answerState === ChoiceAnswerState.Correct
                ? 'border-success-600 bg-success-50'
                : '',
              showAnswer && 'pointer-events-none',
            )}
          >
            <SortContainer
              showAnswer={showAnswer}
              options={showAnswer ? answerOptions : options}
              setOptions={setOptions}
            />
          </div>
        </div>
      </div>
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={showAnswer}
        onSubmit={submit}
        setShowAnswer={setShowAnswer}
        includeHint={!!quiz.hint}
        showHint={showHint}
        setShowHint={setShowHint}
        isCompleted={!!quiz.isCompleted}
        lessonId={lesson.id}
        quiz={quiz}
      />
    </div>
  )
}

export default DragSortRenderer
