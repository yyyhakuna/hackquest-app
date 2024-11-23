import type React from 'react'

const AiLoading: React.FC = () => {
  return (
    <div className="flex w-fit items-center gap-2 rounded-[.5rem] bg-neutral-100 px-4 py-3 text-neutral-800">
      <span className="inline-flex h-[2px] w-[2px] animate-ping rounded-full bg-neutral-800 " />
      <span className="inline-flex h-[2px] w-[2px] animate-ping rounded-full bg-neutral-800 delay-200" />
      <span className="inline-flex h-[2px] w-[2px] animate-ping rounded-full bg-neutral-800 delay-500" />
    </div>
  )
}

export default AiLoading
