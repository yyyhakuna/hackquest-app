'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuPlus, LuX } from 'react-icons/lu'
import type { FormValues } from '../utils/validations'

const techTags = [
  'React',
  'Next',
  'Vue',
  'Web3',
  'Ethers',
  'Node',
  'Java',
  'Go',
  'Python',
  'Solidity',
  'Rust',
  'Move',
] as const

export function TechTag() {
  const [parent] = useAutoAnimate()
  const { watch, setValue } = useFormContext<FormValues>()
  const [newTag, setNewTag] = React.useState('')
  const [isInputVisible, setInputVisible] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const teachStack = watch('teachStack') || []

  function handleAddNewTag() {
    if (teachStack.length >= 8) {
      toast.error('You can only add up to 8 tech tags')
      return
    }
    if (newTag && !teachStack.includes(newTag)) {
      setValue('teachStack', [...teachStack, newTag])
      setNewTag('')
      setInputVisible(false)
    }
  }

  React.useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isInputVisible])

  return (
    <div className="space-y-6">
      <h2 className="title-3">Tech Tag ({teachStack.length} / 8)</h2>
      <div className="flex flex-wrap gap-2" ref={parent}>
        {teachStack?.map(tag => (
          // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
          <div
            key={tag}
            // biome-ignore lint/a11y/useSemanticElements: <explanation>
            role="button"
            className="flex h-12 items-center gap-2 rounded-lg bg-neutral-100 px-6 py-2 outline-none"
          >
            <LuX
              className="size-4"
              onClick={() => {
                setValue(
                  'teachStack',
                  teachStack.filter(t => t !== tag),
                )
              }}
            />
            <span className="body-m">{tag}</span>
          </div>
        ))}
        {isInputVisible && (
          <div className='flex h-12 items-center gap-2 rounded-lg bg-neutral-100 px-6 py-2 outline-none '>
            {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
            <div
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="button"
              onClick={() => {
                setNewTag('')
                setInputVisible(false)
              }}
            >
              <LuX className="size-4" />
            </div>
            <input
              ref={inputRef}
              value={newTag}
              type="text"
              onChange={e => setNewTag(e.target.value)}
              onBlur={handleAddNewTag}
              className="body-m h-full w-16 bg-transparent outline-none"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleAddNewTag()
                  event.preventDefault()
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {techTags.map(tag => (
            <button
              key={tag}
              type="button"
              disabled={teachStack.includes(tag)}
              className="flex h-12 items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-white px-6 py-2 outline-none transition-colors duration-300 enabled:hover:bg-neutral-100 disabled:bg-neutral-100"
              onClick={() => {
                if (teachStack.length >= 8) {
                  toast.error('You can only add up to 8 tech tags')
                  return
                }
                setValue('teachStack', [...teachStack, tag])
              }}
            >
              <LuPlus className="size-4" />
              <span className="body-m">{tag}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={teachStack.length >= 8}
          onClick={() => setInputVisible(true)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-white px-6 py-2 outline-none transition-colors duration-300 enabled:hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuPlus className="size-4" />
          <span className="body-m">Add New</span>
        </button>
      </div>
    </div>
  )
}
