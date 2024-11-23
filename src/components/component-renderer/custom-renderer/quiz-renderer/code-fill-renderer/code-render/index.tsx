import type { WaitingRenderCodeType } from '@/hooks/learn/use-parse-quiz'
import type React from 'react'
import { useCodeFillContext } from '../type'

interface CodeRenderType {
  waitingRenderCodes: WaitingRenderCodeType[]
}
const CodeRender: React.FC<CodeRenderType> = ({ waitingRenderCodes }) => {
  const { answers } = useCodeFillContext()
  const fillStr = (index: number) => {
    return index < 10 ? `0${index}` : index
  }
  return (
    <div className='relative w-full rounded-[10px] bg-neutral-100 pr-[20px] sm:h-full'>
      <div className='scroll-wrap-x sm:scroll-wrap-y w-full sm:absolute sm:top-0 sm:left-0 sm:h-full'>
        <ul className="flex max-w-full flex-col gap-[5px] p-[15px]">
          {waitingRenderCodes.map((line, lineIndex) => (
            <li
              className="flex w-full list-decimal items-center justify-start whitespace-nowrap font-thin text-code-blue"
              key={lineIndex}
            >
              <span className="code-s mr-5 text-lesson-code-index">
                {fillStr(lineIndex + 1)}
              </span>
              <div className="flex flex-1 flex-shrink-0 items-center whitespace-pre-wrap break-all">
                {line.render(answers)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CodeRender
