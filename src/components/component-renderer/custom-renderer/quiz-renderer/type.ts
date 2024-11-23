import { createContext, useContext } from 'react'

interface QuizContextType {
  onPass: VoidFunction
  curQuizIndex: number
  parentQuiz: any
}

export const QuizContext = createContext<QuizContextType>(null!)

export const QuizContextProvider = QuizContext.Provider

export const useQuizContext = () => {
  return useContext(QuizContext)
}
