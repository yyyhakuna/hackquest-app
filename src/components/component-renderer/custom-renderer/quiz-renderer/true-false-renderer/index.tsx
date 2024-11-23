import { childRenderCallback } from '@/components/component-renderer'
import {
  ChoiceAnswerState,
  type ComponentRendererType,
  type TrueFalseType,
} from '@/components/component-renderer/constants/type'
import { useCourseLesson } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import QuizFooter from '../quiz-footer'
import { useQuizContext } from '../type'

interface TrueFalseRendererProp {
  parent: ComponentRendererType
  quiz: TrueFalseType
}

const TrueFalseRenderer: React.FC<TrueFalseRendererProp> = ({
  quiz: propQuiz,
}) => {
  const quiz = useMemo(() => {
    return {
      ...propQuiz,
      answers: [[true, false].findIndex(v => v === propQuiz.answer) + 1],
      options: [
        {
          index: 1,
          option: true,
        },
        {
          index: 2,
          option: false,
        },
      ],
    }
  }, [propQuiz])
  const [answers, setAnswers] = useState<number[]>([])
  const { onPass } = useQuizContext()
  const lesson = useCourseLesson()

  const [answerState, setAnswerState] = useState<ChoiceAnswerState>(
    ChoiceAnswerState.Default,
  )

  const [showAnswer, setShowAnswer] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const submit = () => {
    const wrongAnswer = answers.find(answer => !quiz.answers.includes(answer))
    if (wrongAnswer) {
      setAnswerState(ChoiceAnswerState.Wrong)
      return
    }

    const rightAnswer = quiz.answers.find(
      (answer: any) => !answers.includes(answer),
    )
    if (rightAnswer) {
      setAnswerState(ChoiceAnswerState.Wrong)
      return
    }
    setAnswerState(ChoiceAnswerState.Correct)
    onPass()
  }

  useEffect(() => {
    if (quiz.isCompleted) {
      setAnswers(quiz.answers)
      setAnswerState(ChoiceAnswerState.Correct)
    } else {
      setAnswers([])
      setAnswerState(ChoiceAnswerState.Default)
    }
  }, [quiz])
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      <div className=" relative w-full gap-4 sm:flex-1">
        <div className="sm:scroll-wrap-y sn:left-0 flex w-full flex-col gap-4 sm:absolute sm:top-0 sm:h-full">
          <div className="flex flex-col gap-2">
            <div className="[&>p]:body-l inline-block font-bold">
              {quiz?.children?.map(childRenderCallback(quiz))}
            </div>
            <span className="body-s inline-block whitespace-nowrap text-neutral-500">
              [True or False]
            </span>
          </div>
          <div className=" flex w-full flex-wrap gap-4">
            {quiz?.options?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className={cn(
                    'flex cursor-pointer items-center gap-4 rounded-xl border-[2px] border-neutral-300 p-4 text-neutral-800 transition-all duration-200 max-sm:w-full sm:w-[calc((100%-1rem)/2)]',
                    !answers.includes(item.index) ? 'hover:bg-neutral-100' : '',
                    answers.includes(item.index)
                      ? 'border-primary-600 bg-primary-50'
                      : '',
                    answers.includes(item.index) &&
                      answerState === ChoiceAnswerState.Wrong
                      ? 'border-destructive-600 bg-destructive-50'
                      : '',
                    answers.includes(item.index) &&
                      answerState === ChoiceAnswerState.Correct
                      ? 'border-success-600 bg-success-50'
                      : '',
                    showAnswer && !!quiz.answers.includes(item.index)
                      ? 'border-neutral-300 bg-neutral-100'
                      : '',
                    showAnswer && 'pointer-events-none',
                  )}
                  onClick={() => {
                    if (answerState !== ChoiceAnswerState.Default)
                      setAnswerState(ChoiceAnswerState.Default)
                    if (quiz.answers.length > 1) {
                      if (answers.includes(item.index)) {
                        setAnswers(
                          answers.filter(answer => answer !== item.index),
                        )
                      } else {
                        setAnswers(answers.concat(item.index))
                      }
                    } else {
                      setAnswers([item.index])
                    }
                  }}
                >
                  <div className="flex-1 text-base">
                    {item.option ? 'True' : 'False'}
                  </div>

                  <div>
                    {!showAnswer &&
                      answerState === ChoiceAnswerState.Correct &&
                      answers.includes(item.index) && (
                        <FiCheck className="size-4 text-success-600" />
                      )}
                    {!showAnswer &&
                      answerState === ChoiceAnswerState.Wrong &&
                      answers.includes(item.index) && (
                        <FiX className="size-4 text-destructive-600" />
                      )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={!answers.length || showAnswer}
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

export default TrueFalseRenderer
