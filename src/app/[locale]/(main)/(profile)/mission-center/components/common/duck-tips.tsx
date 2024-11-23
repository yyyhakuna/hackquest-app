import { cn } from '@hackquest/ui/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import type React from 'react'
import { LuInfo } from 'react-icons/lu'

interface DuckTipsProp {
  className?: string
}

const DuckTips: React.FC<DuckTipsProp> = ({ className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="outline-none">
            <LuInfo className={cn('size-4 fill-primary', className)} />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className="body-s w-80 rounded-xl border border-neutral-300 bg-neutral-white p-6 text-primary-neutral"
        >
          Hybrid / Offline hackathon may have a limitation of the number of
          participants based on the physical location. You can have a better way
          to manage participants if users need approval from the organizers.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default DuckTips
