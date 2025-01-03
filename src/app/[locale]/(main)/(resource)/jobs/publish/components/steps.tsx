import { cn } from '@hackquest/ui/lib/utils'

export function Steps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 sm:mt-16">
      {[...Array(3)].map((_, index) => (
        <span
          key={index}
          className={cn('h-1.5 w-10 rounded-[2px] bg-neutral-300', {
            'bg-primary-400': index + 1 <= currentStep,
          })}
        />
      ))}
    </div>
  )
}
