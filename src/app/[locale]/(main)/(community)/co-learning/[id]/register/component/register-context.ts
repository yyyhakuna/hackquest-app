import { createContext, useContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'

type RegisterContext = {
  baseInfoForm: UseFormReturn<
    {
      [x: string]: string
    },
    any,
    undefined
  >
}

const registerContext = createContext<RegisterContext>(null!)

export const useRegisterContext = () => {
  return useContext(registerContext)
}

export const RegisterContextProvider = registerContext.Provider
