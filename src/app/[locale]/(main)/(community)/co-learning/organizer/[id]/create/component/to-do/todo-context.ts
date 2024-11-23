import type { CoLearningTodo } from '@/graphql/generated/hooks'
import * as React from 'react'

type TodoContextValue = {
  editingTodo: string[]
  customCreatingTodo: number
  hackathonCreatingTodo: number
  setEditingTodo: React.Dispatch<React.SetStateAction<string[]>>
  setCustomCreatingTodo: React.Dispatch<React.SetStateAction<number>>
  setHackathonCreatingTodo: React.Dispatch<React.SetStateAction<number>>
  data: CoLearningTodo[]
}

export const TodoContext = React.createContext<TodoContextValue>({
  setEditingTodo: () => {},
  setCustomCreatingTodo: () => {},
  editingTodo: [],
  customCreatingTodo: 0,
  hackathonCreatingTodo: 0,
  setHackathonCreatingTodo: () => {},
  data: [],
})

export function useTodoContext() {
  return React.useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider
