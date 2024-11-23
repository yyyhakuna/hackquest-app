'use client'

// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import webApi from '@/service'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@hackquest/ui/shared/command'
import { Popover, PopoverContent, PopoverTrigger } from '@hackquest/ui/shared/popover'
import { Tag } from '@hackquest/ui/shared/tag'
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@hackquest/ui/shared/tooltip'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { LuCheck, LuChevronsUpDown, LuPlus, LuX } from 'react-icons/lu'

function Tags({ value, onValueChange }: { value: string[]; onValueChange: (value: string[]) => void }) {
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
    editInputRef.current?.focus()
  }, [])

  function handleRemove(removedTag: string) {
    const newTags = value?.filter(tag => tag !== removedTag)
    onValueChange(newTags)
  }

  function showInput() {
    setInputVisible(true)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleInputConfirm() {
    if (inputValue && !value?.includes(inputValue)) {
      const newTags = [...value, inputValue]
      onValueChange(newTags)
    }
    setInputVisible(false)
    setInputValue('')
  }

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInputValue(e.target.value)
  }

  function handleEditInputConfirm() {
    const newValue = [...value]
    newValue[editInputIndex] = editInputValue
    onValueChange(newValue)
    setEditInputIndex(-1)
    setEditInputValue('')
  }
  type Color = 'grey' | 'blue' | 'brown' | 'purple' | 'orange' | 'pink' | 'yellow' | 'green' | 'red'
  function getRandomColor(): Color {
    const colors: Color[] = ['grey', 'blue', 'brown', 'purple', 'orange', 'pink', 'yellow', 'green', 'red']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]!
  }

  return (
    <div className="flex flex-wrap items-center gap-3 ">
      {value?.map<React.ReactNode>((item, index) => {
        if (editInputIndex === index) {
          return (
            <input
              ref={editInputRef}
              key={item}
              type="text"
              className="inline-flex w-16 items-center justify-center gap-2 rounded-full border border-neutral-rich-gray px-3.5 py-1.5"
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

        const isLongSkill = item.length > 20
        const skillElement = (
          <Tag
            key={item}
            color={getRandomColor()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-rich-gray px-3.5 py-1.5"
          >
            <LuX size={20} onClick={() => handleRemove(item)} />
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  setEditInputIndex(index)
                  setEditInputValue(item)
                  e.preventDefault()
                }
              }}
            >
              {isLongSkill ? `${item.slice(0, 20)}...` : item}
            </span>
          </Tag>
        )

        return isLongSkill ? (
          <TooltipProvider key="tool">
            <Tooltip>
              <TooltipTrigger asChild>{skillElement}</TooltipTrigger>
              <TooltipContent>
                <p>{item}</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          skillElement
        )
      })}
      {inputVisible ? (
        <input
          ref={inputRef}
          type="text"
          className="w-16 rounded-full border border-neutral-rich-gray px-3.5 py-1.5 outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleInputConfirm()
            }
          }}
        />
      ) : (
        <button
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-rich-gray px-3.5 py-1.5"
          type="button"
          onClick={showInput}
        >
          <LuPlus size={20} />
          <span>Add</span>
        </button>
      )}
    </div>
  )
}

export function TagCombobox({ value, onValueChange }: { value: string[]; onValueChange: (value: string[]) => void }) {
  const [open, setOpen] = React.useState(false)

  const { data } = useQuery({
    queryKey: ['tags'],
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: () => webApi.jobApi.getJobTags(),
  })

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            aria-controls="content"
            className="flex min-h-[50px] w-full items-center justify-between rounded-[8px] px-3 py-1.5 outline-none ring-1 ring-neutral-light-gray ring-inset transition-all duration-300 aria-expanded:shadow-field-valid aria-expanded:ring-neutral-medium-gray sm:w-96"
          >
            <span>Please select</span>
            <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 overflow-hidden rounded-[8px] border border-neutral-light-gray p-0">
          <Command>
            <CommandInput placeholder="Search tags..." className="h-9" />
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {data?.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item}
                    onSelect={currentValue => {
                      const newValue = value?.includes(currentValue)
                        ? value?.filter(val => val !== currentValue)
                        : [...value, currentValue]
                      onValueChange(newValue)
                    }}
                  >
                    {item}
                    <LuCheck className={cn('ml-auto h-4 w-4', value.includes(item) ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Tags value={value} onValueChange={onValueChange} />
    </div>
  )
}
