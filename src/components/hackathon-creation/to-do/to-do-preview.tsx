import type { HackathonTodoExtend } from '@/graphql/generated/hooks'
import type React from 'react'
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi'
import PreviewHeader from '../common/preview-header'
import RenderToDoButton from './render-todo-button'

interface ToDoPreviewProp {
  initValue: HackathonTodoExtend
  onEdit: VoidFunction
  onDelete: VoidFunction
  onUp: VoidFunction
  onDown: VoidFunction
  len: number
  index: number
}

const ToDoPreview: React.FC<ToDoPreviewProp> = ({
  initValue,
  onEdit,
  onDelete,
  onUp,
  onDown,
  len,
  index,
}) => {
  return (
    <div className="rounded-xl border border-neutral-300 px-6 py-3">
      <PreviewHeader
        title={initValue.name}
        onEdit={onEdit}
        onDelete={onDelete}
        otherFunction={
          <>
            {index > 0 && (
              <FiChevronsUp className="size-6 cursor-pointer" onClick={onUp} />
            )}
            {index < len - 1 && (
              <FiChevronsDown
                className="size-6 cursor-pointer"
                onClick={onDown}
              />
            )}
          </>
        }
      />
      <p className="body-s mt-2 mb-3 min-h-[21px] text-neutral-800">
        {initValue.intro || ''}
      </p>
      <RenderToDoButton initValue={initValue} />
    </div>
  )
}

export default ToDoPreview
