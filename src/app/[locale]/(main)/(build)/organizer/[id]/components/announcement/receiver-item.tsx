import { cn } from '@hackquest/ui/lib/utils'
import { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'

const ReceiverItem = ({
  value,
  onSelect,
  iniSelected,
  disabled = false,
}: {
  value: string
  onSelect: () => void
  iniSelected: boolean
  disabled?: boolean
}) => {
  const [selected, setSelected] = useState(iniSelected)

  const onClick = () => {
    if (disabled) return
    onSelect()
    setSelected(!selected)
  }
  return (
    <button
      className={cn(
        'body-s flex items-center gap-2 rounded-lg bg-neutral-100 px-6 py-3 text-primary-neutral',
        selected && 'bg-primary-100',
        disabled && 'cursor-not-allowed ',
        selected && disabled && 'bg-neutral-200',
      )}
      onClick={onClick}
    >
      <IoIosAdd className={cn(selected && 'hidden')} />
      {value.charAt(0).toUpperCase() + value.slice(1)}
      <IoCloseOutline className={cn('hidden', selected && 'block')} />
    </button>
  )
}

export default ReceiverItem
