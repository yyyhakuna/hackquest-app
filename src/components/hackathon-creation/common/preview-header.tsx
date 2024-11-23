import type React from 'react'
import { FiEdit } from 'react-icons/fi'
import { LuTrash } from 'react-icons/lu'

interface PreviewHeaderProp {
  title: string
  onEdit: VoidFunction
  onDelete: VoidFunction
  otherFunction?: React.ReactNode
}

const PreviewHeader: React.FC<PreviewHeaderProp> = ({
  title,
  onEdit,
  onDelete,
  otherFunction,
}) => {
  return (
    <div className="flex justify-between gap-6 text-neutral-800">
      <p className="headline-m">{title}</p>
      <div className="flex items-center gap-4">
        <FiEdit className="size-5 cursor-pointer" onClick={onEdit} />
        <LuTrash className="size-5 cursor-pointer" onClick={onDelete} />
        {otherFunction}
      </div>
    </div>
  )
}

export default PreviewHeader
