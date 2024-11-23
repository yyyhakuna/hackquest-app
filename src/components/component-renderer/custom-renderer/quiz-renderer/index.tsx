'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type React from 'react'
import { useState } from 'react'
import ComponentRenderer from '../..'
import type {
  ComponentRendererType,
  CustomComponent,
  QuizType,
} from '../../constants/type'
import QuizHeader from './quiz-header'
import { QuizContextProvider } from './type'

interface QuizRendererProp {
  quiz: QuizType
  parent: CustomComponent
}

const QuizRenderer: React.FC<QuizRendererProp> = ({ quiz: propQuiz }) => {
  const [curQuizIndex, setCurQuizIndex] = useState(0)
  const [quiz, _setQuiz] = useState(propQuiz)
  const [expand, setExpand] = useState(true)
  const [parentRef] = useAutoAnimate()
  const onPass = () => {}
  return (
    <div
      className={`flex h-fit flex-col gap-4 border-neutral-200 border-t-[0.5px] p-6 sm:p-8 ${expand ? 'min-h-[50%] flex-1' : ''}`}
      ref={parentRef}
    >
      <QuizHeader
        quiz={quiz}
        expand={expand}
        setExpand={setExpand}
        curQuizIndex={curQuizIndex}
        setCurQuizIndex={setCurQuizIndex}
      />
      {expand && (
        <QuizContextProvider
          value={{
            onPass,
            curQuizIndex,
            parentQuiz: quiz,
          }}
        >
          <div className="w-full flex-1">
            <ComponentRenderer
              parent={quiz}
              component={quiz.children[curQuizIndex] as ComponentRendererType}
              prevComponent={null}
              nextComponent={null}
              position={curQuizIndex}
            />
          </div>
        </QuizContextProvider>
      )}
    </div>
  )
}

export default QuizRenderer
