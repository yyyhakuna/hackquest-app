import { childRenderCallback } from '@/components/component-renderer'
import type {
  CodeFillType,
  ComponentRendererType,
} from '@/components/component-renderer/constants/type'
import { type AnswerState, useParseQuiz } from '@/hooks/learn/use-parse-quiz'
import { adaptWidth, changeTextareaHeight, elementVibration } from '@/lib/utils'
import { useCourseLesson } from '@/store/learn'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import QuizFooter from '../quiz-footer'
import { useQuizContext } from '../type'
import CodeRender from './code-render'
import { CodeFillContextProvider } from './type'

interface CodeFillRendererProp {
  parent: ComponentRendererType
  quiz: CodeFillType
}

const CodeFillRenderer: React.FC<CodeFillRendererProp> = ({ parent, quiz }) => {
  const lesson = useCourseLesson()
  const { onPass } = useQuizContext()
  const [showAnswer, setShowAnswer] = useState(false)
  const [submitDisable, setSubmitDisable] = useState(true)
  const prevQuiz = useRef<any>({})
  const isCompleted = useRef(false)
  const [showHint, setShowHint] = useState(false)
  const { waitingRenderCodes, answerState, answerStateDispatch } = useParseQuiz(
    quiz.lines,
  )

  const dealInputValue = (show: boolean) => {
    const newAnswerState = structuredClone(answerState)
    newAnswerState.map((line: AnswerState) => {
      if (line.answers?.length) {
        line.answers.map((answer: AnswerState) => {
          let inputEle: HTMLTextAreaElement | HTMLInputElement
          inputEle = document.querySelector(
            `[data-uuid="${answer.id}"]`,
          ) as HTMLInputElement
          if (inputEle) {
            if (show) {
              inputEle.value = answer.answer
            } else {
              inputEle.value = answer.value
            }
            inputEle.disabled = show
            adaptWidth(inputEle)
          }
        })
      } else {
        let inputEle: HTMLTextAreaElement | HTMLInputElement
        inputEle = document.querySelector(
          `[data-uuid="${line.id}"]`,
        ) as HTMLTextAreaElement
        if (inputEle) {
          if (show) {
            inputEle.value = line.answer
          } else {
            inputEle.value = line.value
          }
          inputEle.disabled = show
          changeTextareaHeight(inputEle)
        }
      }
    })
  }
  const setAnswers = () => {
    const show = !showAnswer
    setShowAnswer(show)
    dealInputValue(show)
  }

  const onSubmit = async () => {
    const newAnswerState = structuredClone(answerState)
    let isCurrent = true
    newAnswerState.map(line => {
      if (line.answers?.length) {
        line.answers.map(answer => {
          if (!new RegExp(answer.regex).test(answer.value.trim())) {
            isCurrent = false
            answer.error = true
            const inputEle = document.querySelector(
              `[data-uuid="${answer.id}"]`,
            ) as HTMLTextAreaElement
            elementVibration(inputEle)
          }
        })
      } else {
        if (!new RegExp(line.regex).test(line.value.trim())) {
          isCurrent = false
          line.error = true
          const inputEle = document.querySelector(
            `[data-uuid="${line.id}"]`,
          ) as HTMLInputElement
          elementVibration(inputEle)
        }
      }
    })
    if (!isCurrent) {
      answerStateDispatch([...newAnswerState])
      // await webApi.courseApi.markQuestState(lesson.id, false);
      return
    }
    onPass()
  }

  // 自动填充
  const initCompleteInput = () => {
    if (!isCompleted.current) return
    const newAnswerState: AnswerState[] = JSON.parse(
      JSON.stringify(answerState),
    )
    if (newAnswerState.length) {
      newAnswerState.map(line => {
        if (line.answers?.length) {
          line.answers.map(l => {
            const { answer } = l
            l.inputValue = answer
            l.value = answer
            let inputEle: HTMLTextAreaElement | HTMLInputElement
            inputEle = document.querySelector(
              `[data-uuid="${l.id}"]`,
            ) as HTMLInputElement
            if (inputEle) {
              inputEle.value = answer
              adaptWidth(inputEle)
            }
          })
        } else {
          const { answer } = line
          line.inputValue = answer
          line.value = answer
          const inputEle = document.querySelector(
            `[data-uuid="${line.id}"]`,
          ) as HTMLTextAreaElement
          if (inputEle) {
            inputEle.value = answer
            changeTextareaHeight(inputEle)
          }
        }
      })
      answerStateDispatch(newAnswerState)
      isCompleted.current = false
    }
  }

  //submit是否可以点击
  //!isCompleted.current || !isInitAnswerState()为true 意味这手动输入input 判断value值
  //否者标识初始化 quiz.isCompleted为true 方法 return false
  const getSubmitDisable = () => {
    return !answerState.some(line => {
      if (line.answers?.length) {
        return line.answers.some(answer => answer.value)
      } else {
        return line.value
      }
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (JSON.stringify(quiz) !== JSON.stringify(prevQuiz.current)) {
      prevQuiz.current = JSON.parse(JSON.stringify(quiz))
      isCompleted.current = quiz.isCompleted as boolean
      setShowAnswer(false)
    }
    setSubmitDisable(getSubmitDisable())
    initCompleteInput()
    dealInputValue(false)
  }, [answerState])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (showAnswer) setSubmitDisable(true)
    else setSubmitDisable(getSubmitDisable())
  }, [showAnswer])

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="[&>p]:body-l inline-block font-bold">
          {quiz?.children?.map(childRenderCallback(quiz))}
        </div>
        {quiz.lines?.length > 0 && (
          <div className="flex w-full flex-1 flex-col overflow-hidden py-4 sm:h-full">
            <CodeFillContextProvider
              value={{
                answers: answerState,
                showAnswer,
                setAnswers,
              }}
            >
              <CodeRender waitingRenderCodes={waitingRenderCodes} />
            </CodeFillContextProvider>
          </div>
        )}
      </div>
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={submitDisable}
        setShowAnswer={setAnswers}
        onSubmit={onSubmit}
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

export default CodeFillRenderer
