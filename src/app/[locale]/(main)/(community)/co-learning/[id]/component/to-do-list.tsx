import type { CoLearningTodo } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { Separator } from '@hackquest/ui/shared/separator'
import type React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isCompleted?: boolean
  needSeparator?: boolean
  title: string
  linkTo: string
}

const Item: React.FC<ItemProps> = ({
  isCompleted = false,
  className,
  title,
  needSeparator = true,
}) => {
  return (
    <div className={cn('space-y-4 ', !isCompleted && 'cursor-pointer')}>
      <div className="flex items-center gap-3">
        <FeedbackIcon disabled={!isCompleted} />
        <div className="flex w-full justify-between">
          <span
            className={cn(
              'headline-m text-primary-neutral',
              isCompleted && 'text-secondary-neutral',
            )}
          >
            {title}
          </span>
          {!isCompleted && <MdOutlineKeyboardArrowRight className="size-4" />}
        </div>
      </div>
      {needSeparator && <Separator />}
    </div>
  )
}

const ToDoList = ({ todos }: { todos: CoLearningTodo[] }) => {
  return (
    <div className="right-0 mt-6 space-y-6 rounded-2xl border-2 border-neutral-200 p-6 sm:absolute">
      <div className="title-5 text-primary-neutral">To Do List</div>
      <div className="space-y-4">
        {todos.map((todo, index) => {
          return (
            <Item
              key={todo.id}
              isCompleted={todo.completed}
              needSeparator={index !== todos.length - 1}
              title={todo.name}
              linkTo={todo.url ?? ''}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ToDoList
