import { Button } from '@hackquest/ui/shared/button'
import { EditCustom } from './edit-custom'
import { EditHackathon } from './edit-hackathon'
import { useTodoContext } from './todo-context'

const EditTodoList = () => {
  const {
    customCreatingTodo,
    hackathonCreatingTodo,
    setCustomCreatingTodo,
    setHackathonCreatingTodo,
  } = useTodoContext()

  return (
    <div className="mt-4 mb-8 space-y-4">
      {Array(customCreatingTodo)
        .fill(0)
        .map((_, index) => (
          <EditCustom key={index} />
        ))}
      {Array(hackathonCreatingTodo)
        .fill(0)
        .map((_, index) => (
          <EditHackathon key={index} />
        ))}
      <div className="flex w-full gap-4">
        <Button
          className="flex-1"
          onClick={() => {
            setCustomCreatingTodo(prev => prev + 1)
          }}
        >
          Add Custom To Do List
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            setHackathonCreatingTodo(prev => prev + 1)
          }}
        >
          Add Hackathon To Do List
        </Button>
      </div>
    </div>
  )
}

export default EditTodoList
