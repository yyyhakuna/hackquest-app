import { Link } from '@/app/navigation'
import {
  type CoLearningTodo,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { HiChevronDoubleDown, HiChevronDoubleUp } from 'react-icons/hi'
import { LuDelete } from 'react-icons/lu'
import { useTodoContext } from './todo-context'

const PreviewCard = ({ todo }: { todo: CoLearningTodo }) => {
  const { data, setEditingTodo, editingTodo } = useTodoContext()
  const coLearningId = useParams().id as string

  const { mutateAsync, isPending } = useUpdateCoLearningMutation()
  const onEdit = () => {
    setEditingTodo(editingTodo.concat(todo!.id))
  }

  const onDelete = () => {
    toast.promise(
      mutateAsync({
        id: coLearningId,
        data: {
          todos: {
            delete: [
              {
                id: todo.id,
              },
            ],
          },
        },
      }),
      {
        loading: 'Loading',
        success: 'Delete success',
        error: 'Failed to delete',
      },
    )
  }

  const onUp = () => {
    const currentIndex = data.findIndex(item => item.id === todo?.id) ?? -1
    if (currentIndex > 0) {
      toast.promise(
        mutateAsync({
          id: coLearningId,
          data: {
            todos: {
              update: [
                {
                  where: {
                    id: todo!.id ?? '',
                  },
                  data: {
                    order: { set: data![currentIndex - 1]!.order },
                  },
                },
                {
                  where: {
                    id: data![currentIndex - 1]!.id,
                  },
                  data: {
                    order: { set: data![currentIndex]!.order },
                  },
                },
              ],
            },
          },
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed to update',
        },
      )
    }
  }

  const onDown = () => {
    const currentIndex = data.findIndex(item => item.id === todo?.id) ?? -1
    if (data[currentIndex + 1]) {
      toast.promise(
        mutateAsync({
          id: coLearningId,
          data: {
            todos: {
              update: [
                {
                  where: {
                    id: todo!.id ?? '',
                  },
                  data: {
                    order: { set: data![currentIndex + 1]!.order },
                  },
                },
                {
                  where: {
                    id: data![currentIndex + 1]!.id,
                  },
                  data: {
                    order: { set: data![currentIndex]!.order },
                  },
                },
              ],
            },
          },
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed to update',
        },
      )
    }
  }

  return (
    <div className=" rounded-lg border border-neutral-300 p-4">
      <div className="flex justify-between ">
        <span>{todo.name}</span>
        <div className="flex items-center gap-4">
          <button onClick={onEdit}>
            <FiEdit className="size-6" />
          </button>
          <button onClick={onDelete} disabled={isPending}>
            <LuDelete className="size-6" />
          </button>
          <button onClick={onUp} disabled={isPending}>
            <HiChevronDoubleUp className="size-6" />
          </button>
          <button onClick={onDown} disabled={isPending}>
            <HiChevronDoubleDown className="size-6" />
          </button>
        </div>
      </div>
      <Link href={todo.url ?? ''}>
        <Button>Go {todo.name}</Button>
      </Link>
    </div>
  )
}

export default PreviewCard
