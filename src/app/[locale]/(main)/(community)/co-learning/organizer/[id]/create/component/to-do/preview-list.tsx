'use client'
import type { CoLearningTodo } from '@/graphql/generated/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { EditCustom } from './edit-custom'
import { EditHackathon } from './edit-hackathon'
import PreviewCard from './preview-card'
import { useTodoContext } from './todo-context'

export function PreviewList() {
  const { editingTodo, data } = useTodoContext()
  const [parent] = useAutoAnimate()

  return (
    <div className="mt-8 space-y-4" ref={parent}>
      {data?.map(todo =>
        editingTodo.includes(todo.id) ? (
          todo.type === 0 ? (
            <EditCustom key={todo.id} iniTodo={todo} />
          ) : (
            <EditHackathon key={todo.id} iniTodo={todo} />
          )
        ) : (
          <PreviewCard
            key={todo.id}
            todo={todo as CoLearningTodo}
          />
        ),
      )}
    </div>
  )
}
