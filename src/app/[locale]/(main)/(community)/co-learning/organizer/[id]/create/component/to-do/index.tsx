import {
  type CoLearningTodo,
  SortOrder,
  useListCoLearningTodoQuery,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import { Callout, CalloutText } from '@hackquest/ui/shared/callout'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ContinueButton from '../common/continue-button'
import { useColearningContext } from '../common/creation-provider'
import EditTodoList from './edit-todo-list'
import { PreviewList } from './preview-list'
import { TodoProvider } from './todo-context'

const ToDo = () => {
  const [editingTodo, setEditingTodo] = useState<string[]>([])
  const [customCreatingTodo, setCustomCreatingTodo] = useState(0)
  const [hackathonCreatingTodo, setHackathonCreatingTodo] = useState(0)
  const id = useParams().id as string
  const { data: coLearning, setContinueButtonStatus } = useColearningContext()
  const { data: t } = useListCoLearningTodoQuery(
    {
      orderBy: [
        {
          order: SortOrder.Asc,
        },
      ],
      where: {
        coLearningId: {
          equals: id,
        },
      },
    },
    {
      staleTime: 0,
    },
  )
  const getNewProgress = () => {
    if (coLearning.progress?.includes('todo')) return coLearning.progress
    return [...(coLearning?.progress ?? []), 'todo']
  }
  const { mutateAsync } = useUpdateCoLearningMutation()

  const onContinue = () => {
    toast
      .promise(
        mutateAsync({
          id,
          data: {
            progress: {
              set: getNewProgress(),
            },
          },
        }),
        {
          loading: 'Loading',
          success: 'Update success',
          error: 'Failed to update',
        },
      )
      .then(() => {
        setContinueButtonStatus(1)
      })
  }
  const data = (t?.listCoLearningTodo.data as CoLearningTodo[]) || []
  return (
    <TodoProvider
      value={{
        editingTodo,
        data,
        setEditingTodo,
        customCreatingTodo,
        setCustomCreatingTodo,
        hackathonCreatingTodo,
        setHackathonCreatingTodo,
      }}
    >
      <div>
        <div className="flex flex-col gap-6">
          <Callout className="rounded-lg bg-neutral-100 px-6 py-3">
            <CalloutText className="body-s font-normal">
              Please recommend to-do items to users in order
            </CalloutText>
          </Callout>
        </div>
        <PreviewList />
        <EditTodoList />
        <ContinueButton onContinue={onContinue} />
      </div>
    </TodoProvider>
  )
}

export default ToDo
