import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import {
  type HackathonTodoExtend,
  useCreateHackathonTodoMutation,
  useDeleteHackathonTodoMutation,
  useUpdateHackathonTodoMutation,
} from '@/graphql/generated/hooks'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from '@hackquest/ui/shared/button'
import { Callout, CalloutText } from '@hackquest/ui/shared/callout'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
import SectionButton from '../common/section-button'
import { initToDos } from '../constants/data'
import { HackathonToDoType } from '../constants/type'
import ToDoEdit from './to-do-edit'
import ToDoPreview from './to-do-preview'

const ToDo: React.FC = () => {
  const { data: hackathon } = useHackathonQuery()

  const [parent] = useAutoAnimate()

  const [todoList, setTodoList] = useState<HackathonTodoExtend[]>([])

  const [editIds, setEditIds] = useState<string[]>([])

  const [addToDos, setAddToDos] = useState<HackathonTodoExtend[]>([])

  const confirmItem = useRef<HackathonTodoExtend>()

  const [confirmOpen, setConfirmOpen] = useState(false)

  const _queryClient = useQueryClient()

  const { mutate: create, isPending: createLoading } =
    useCreateHackathonTodoMutation({
      meta: {
        invalidates: [['FindUniqueHackathon']],
      },
      onSuccess: () => {
        removeEditItem(confirmItem.current!)
        toast.success('Hackathon updated')
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const { mutate: update, isPending: updateLoading } =
    useUpdateHackathonTodoMutation({
      meta: {
        invalidates: [['FindUniqueHackathon']],
      },
      onSuccess: () => {
        removeEditItem(confirmItem.current!)
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const { mutate: deleteToDo, isPending: deleteLoading } =
    useDeleteHackathonTodoMutation({
      meta: {
        invalidates: [['FindUniqueHackathon']],
      },
      onSuccess: () => {
        setConfirmOpen(false)
        toast.success('Delete success')
        // queryClient.invalidateQueries({ queryKey: ['FindUniqueHackathon'] })
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const renderComponent = (info: HackathonTodoExtend) => {
    if (~editIds.indexOf(info.id)) {
      return (
        <ToDoEdit
          initValue={info}
          onSubmit={onSubmit}
          onCancel={() => {
            removeEditItem(info)
          }}
          loading={
            (createLoading || updateLoading) &&
            confirmItem.current?.id === info.id
          }
        />
      )
    } else {
      return (
        <ToDoPreview
          len={todoList.length}
          index={todoList.findIndex(v => v.id === info.id)}
          initValue={info}
          onEdit={() => setEditIds([...editIds, info.id])}
          onDelete={() => {
            setConfirmOpen(true)
            confirmItem.current = info
          }}
          onUp={() => onChangeOrder(info, 'up')}
          onDown={() => onChangeOrder(info, 'down')}
        />
      )
    }
  }

  const removeEditItem = (item: HackathonTodoExtend) => {
    setEditIds(editIds.filter(v => v !== item.id))
    setAddToDos(addToDos.filter(v => v.id !== item.id))
  }

  const onChangeOrder = (
    item: HackathonTodoExtend,
    orderType: 'up' | 'down',
  ) => {
    const newToDos = structuredClone(todoList)
    const index = todoList.findIndex(v => v.id === item.id)
    const changedIndex = orderType === 'up' ? index - 1 : index + 1
    const changedOrder = todoList[changedIndex]?.order || 1

    newToDos[index] = {
      ...newToDos[changedIndex],
      order: item.order,
    } as HackathonTodoExtend
    newToDos[changedIndex] = {
      ...item,
      order: newToDos[changedIndex]?.order,
    } as HackathonTodoExtend

    setTodoList(newToDos)
    const { id, completed, ...info } = item
    const updateData = {
      todoId: item.id,
      data: {
        ...info,
        order: changedOrder,
      },
    }
    update(updateData as any)
  }

  const onSubmit = (val: HackathonTodoExtend, id: string) => {
    const editTodo = todoList.find(v => v.id === id)
    confirmItem.current = {
      ...val,
      id,
    }
    if (editTodo) {
      const updateData = {
        todoId: editTodo.id,
        data: {
          ...val,
        },
      }
      update(updateData as any)
    } else {
      const lastOrder = todoList?.[todoList.length - 1]?.order || 0
      const updateData = {
        hackathonId: hackathon!.id,
        data: {
          ...val,
          order: lastOrder + 1,
        },
      }
      create(updateData as any)
    }
  }

  const onAdd = (type: HackathonToDoType) => {
    const todo = {
      id: crypto.randomUUID(),
      type: type,
      name: '',
      intro: '',
      url: '',
      metadata: {
        urlType: type === HackathonToDoType.CUSTOMS ? 'input' : 'select',
        nameLabel:
          type === HackathonToDoType.CUSTOMS
            ? 'To Do List Name'
            : 'Hackquest To Do List Name',
        introLabel:
          type === HackathonToDoType.CUSTOMS
            ? 'To Do List Intro'
            : 'Hackquest To Do List Intro',
        urlLabel:
          type === HackathonToDoType.CUSTOMS
            ? 'Action Button URL'
            : 'Search Hackquest To Do List',
        buttonLabel: 'Go Visit Host Website',
      },
    }
    const newAddToDos = [...addToDos, todo] as unknown as HackathonTodoExtend[]
    setAddToDos(newAddToDos)
    setEditIds([...editIds, todo.id])
  }

  useEffect(() => {
    if (!hackathon?.todos?.length) {
      setAddToDos(initToDos as unknown as HackathonTodoExtend[])
      setEditIds(initToDos.map(v => v.id))
    }
    const todos = hackathon?.todos
    const unSortToDos = todos as HackathonTodoExtend[]
    const toDos = unSortToDos.sort((a, b) => {
      return a.order - b.order
    })
    setTodoList(toDos)
  }, [hackathon])

  return (
    <div className="flex flex-col gap-8">
      <Callout className="rounded-lg bg-neutral-100 px-6 py-3">
        <CalloutText className="body-s font-normal">
          Please recommend to-do items to users in order
        </CalloutText>
      </Callout>
      <div className="flex flex-col gap-4" ref={parent}>
        {todoList?.map(v => (
          <React.Fragment key={v.id}>{renderComponent(v)}</React.Fragment>
        ))}
        {addToDos.map(v => (
          <React.Fragment key={v.id}>{renderComponent(v)}</React.Fragment>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={() => onAdd(HackathonToDoType.CUSTOMS)}
        >
          <FiPlus className="size-4" />
          <span>Add Custom To Do List</span>
        </Button>
        <Button
          className="flex-1"
          onClick={() => onAdd(HackathonToDoType.HACKATHON)}
        >
          <FiPlus className="size-4" />
          <span>Add Hackquest To Do List</span>
        </Button>
      </div>
      <SectionButton />

      <DeleteAlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Delete the todo ${confirmItem.current?.name}?`}
        description="Are you sure you want to delete this todo? This action cannot be undone."
        loading={deleteLoading}
        onConfirm={() => {
          deleteToDo({
            todoId: confirmItem.current!.id,
          })
        }}
      />
    </div>
  )
}

export default ToDo
