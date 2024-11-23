import {
  type HackathonExtend,
  type HackathonTodoExtend,
  useCompleteHackathonTodoMutation,
} from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import * as TimelinePrimitive from '@hackquest/ui/shared/timeline'
import { useQueryClient } from '@tanstack/react-query'
import type React from 'react'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import RenderToDoButton from '../hackathon-creation/to-do/render-todo-button'

interface HackathonTodoListProp {
  hackathon: HackathonExtend
}

const HackathonTodoList: React.FC<HackathonTodoListProp> = ({ hackathon }) => {
  const queryClient = useQueryClient()
  const toDos = hackathon.todos?.sort((a, b) => a.order - b.order) || []
  const { mutate } = useCompleteHackathonTodoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query =>
          ['FindUniqueHackathon', 'ListHackathonsBySelf'].includes(
            query.queryKey[0] as string,
          ),
      })
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  const firstUnCompletedTodo = useMemo(() => {
    return toDos.find(todo => !todo.completed)
  }, [toDos])

  const completeTodo = (todoId: string) => {
    mutate({
      todoId,
    })
  }

  const renderTodoContent = (todo: HackathonTodoExtend, index: number) => {
    return (
      <>
        <TimelinePrimitive.Separator>
          <TimelinePrimitive.Dot asChild>
            {todo.completed ? (
              <FeedbackIcon size="small" className="size-4 bg-success" />
            ) : (
              <div className="!size-4 flex items-center justify-center bg-transparent">
                <span
                  className={cn(
                    'size-3 rounded-full bg-primary',
                    firstUnCompletedTodo?.id !== todo.id && 'bg-neutral-200',
                  )}
                />
              </div>
            )}
          </TimelinePrimitive.Dot>
          {index !== toDos.length - 1 && (
            <TimelinePrimitive.Connector className="bg-neutral-200" />
          )}
        </TimelinePrimitive.Separator>
        <TimelinePrimitive.Content
          className={`w-full pr-0 ${todo.id === firstUnCompletedTodo?.id ? 'text-neutral-800 ' : 'text-neutral-500 '}`}
        >
          <div className="w-full rounded-[.5rem] border border-neutral-300 p-3">
            <p className="headline-m">{todo.name}</p>
            {todo.id === firstUnCompletedTodo?.id && (
              <>
                <p className="body-xs my-2">{todo.intro}</p>
                <RenderToDoButton
                  initValue={todo as HackathonTodoExtend}
                  onClick={event => {
                    event.stopPropagation()
                    completeTodo(todo.id)
                  }}
                />
              </>
            )}
          </div>
        </TimelinePrimitive.Content>
      </>
    )
  }
  return (
    <TimelinePrimitive.Root>
      {toDos.map((todo, i) => (
        <TimelinePrimitive.Item key={todo.id} className="min-h-fit">
          {renderTodoContent(todo, i)}
        </TimelinePrimitive.Item>
      ))}
    </TimelinePrimitive.Root>
  )
}

export default HackathonTodoList
