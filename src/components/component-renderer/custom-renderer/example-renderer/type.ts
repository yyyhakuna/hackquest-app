import { createContext, useContext } from 'react'

interface ExampleContextType {
  updateExampleContent: (value: string) => void
}

export const ExampleContext = createContext<ExampleContextType>(null!)

export const ExampleContextProvider = ExampleContext.Provider

export const useExampleContext = () => {
  return useContext(ExampleContext)
}
