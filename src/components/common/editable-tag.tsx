'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useControllableState } from '@hackquest/ui/lib/use-controllable-state'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import * as React from 'react'
import { LuPlus, LuX } from 'react-icons/lu'

export interface EditableTagProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}

export function EditableTag({
  className,
  defaultValue,
  value: valueProp,
  onValueChange,
  ...props
}: EditableTagProps) {
  const [parent] = useAutoAnimate()

  const [value = [], setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const [inputVisible, setInputVisible] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [editInputIndex, setEditInputIndex] = React.useState(-1)
  const [editInputValue, setEditInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const editInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  React.useEffect(() => {
    if (editInputValue && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editInputValue])

  const onRemove = React.useCallback(
    (removedValue: string) => {
      const newValues = value.filter(value => value !== removedValue)
      setValue(newValues)
    },
    [value, setValue],
  )

  function handleInputConfirm() {
    if (inputValue && !value.includes(inputValue)) {
      setValue([...value, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInputValue(e.target.value)
  }

  function handleEditInputConfirm() {
    const newValues = [...value]
    newValues[editInputIndex] = editInputValue
    setValue(newValues)
    setEditInputIndex(-1)
    setEditInputValue('')
  }

  return (
    <div
      ref={parent}
      className={cn(
        'body-s flex flex-wrap items-center gap-3 text-primary-neutral',
        className,
      )}
      {...props}
    >
      {value.map<React.ReactNode>((tag, index) => {
        if (editInputIndex === index) {
          return (
            <input
              ref={editInputRef}
              key={tag}
              type="text"
              className="w-16 rounded-lg bg-neutral-100 px-3 py-1 outline-none"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEditInputConfirm()
                }
              }}
            />
          )
        }

        const isLongTag = tag.length > 20
        const tagElement = (
          <button
            key={tag}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-100 px-3 py-1"
          >
            <LuX size={16} onClick={() => onRemove(tag)} />
            <span
              onDoubleClick={event => {
                setEditInputIndex(index)
                setEditInputValue(tag)
                event.preventDefault()
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </button>
        )

        return isLongTag ? (
          <TooltipProvider key={tag}>
            <Tooltip>
              <TooltipTrigger asChild>{tagElement}</TooltipTrigger>
              <TooltipContent>
                <p>{tag}</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          tagElement
        )
      })}
      {inputVisible ? (
        <input
          ref={inputRef}
          type="text"
          className="w-16 rounded-lg bg-neutral-100 px-3 py-1 outline-none"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleInputConfirm()
            }
          }}
        />
      ) : (
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1 ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-100"
          type="button"
          onClick={() => setInputVisible(true)}
        >
          <LuPlus size={16} />
          <span>Add</span>
        </button>
      )}
    </div>
  )
}
