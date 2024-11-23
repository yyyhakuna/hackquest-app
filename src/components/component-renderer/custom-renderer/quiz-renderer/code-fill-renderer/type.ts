import type { AnswerState } from '@/hooks/learn/use-parse-quiz'
import { createContext, useContext } from 'react'

interface CodeFillContextType {
  answers: AnswerState[]
  showAnswer: boolean
  setAnswers: VoidFunction
}

export const CodeFillContext = createContext<CodeFillContextType>(null!)

export const CodeFillContextProvider = CodeFillContext.Provider

export const useCodeFillContext = () => {
  return useContext(CodeFillContext)
}
