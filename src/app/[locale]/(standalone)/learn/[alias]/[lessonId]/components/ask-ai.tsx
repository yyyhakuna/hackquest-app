'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import type React from 'react'
import { useState } from 'react'
import { BsStars } from 'react-icons/bs'
import { askAiOptions } from '../constants/data'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface AskAiProp {}

const AskAi: React.FC<AskAiProp> = () => {
  const [open, setOpen] = useState(false)
  const onAskAt = (_item: any) => {
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`headline-xs flex items-center gap-1 rounded-lg border-none bg-blue-100 px-3 py-2 text-neutral-800 outline-none hover:bg-primary-link ${open && 'bg-neutral-800 text-neutral-white'}`}
        >
          <span>Ask AI</span>
          <BsStars className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[12.5rem] text-neutral-800">
        {askAiOptions.map(v => (
          <DropdownMenuItem
            key={v.value}
            className="gap-2"
            aria-label={v.label}
            onClick={() => {
              onAskAt(v)
            }}
          >
            {v.icon}
            <span className="headline-s">{v.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AskAi
