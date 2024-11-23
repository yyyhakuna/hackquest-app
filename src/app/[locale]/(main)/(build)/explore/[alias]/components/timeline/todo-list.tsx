import HackathonTodoList from '@/components/hackathon/hackathon-todo-list'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import type React from 'react'

interface TodoListProp {
  hackathon: HackathonExtend
}

const TodoList: React.FC<TodoListProp> = ({ hackathon }) => {
  if (!hackathon.todos?.length) return null
  return (
    <div className="flex flex-col gap-6 rounded-[12px] border-[2px] border-neutral-200 p-6">
      <p className="title-3 text-neutral-800">To Do List</p>
      <HackathonTodoList hackathon={hackathon} />
    </div>
  )
}

export default TodoList
