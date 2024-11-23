import { Link } from '@/app/navigation'
import { useCourseLesson } from '@/store/learn'
import { useUser } from '@/store/user'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { useQuery } from '@tanstack/react-query'
import LzString from 'lz-string'
import type React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiChevronDown, FiCode } from 'react-icons/fi'
import ComponentRenderer, { childRenderCallback } from '../..'
import { CHAIN_IDE } from '../../constants/data'
import type {
  ComponentRendererType,
  CustomComponent,
  ExampleComponent,
} from '../../constants/type'
import { ExampleContextProvider } from './type'

interface ExampleRendererProp {
  component: ExampleComponent
  parent: CustomComponent
}

const ExampleRenderer: React.FC<ExampleRendererProp> = ({ component }) => {
  const currentUser = useUser()
  const [exampleContent, setExampleContent] = useState('')
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [expand, setExpand] = useState(true)
  const lesson = useCourseLesson()
  const [parent] = useAutoAnimate()

  useEffect(() => {
    if (component) {
      const activeIndex = component.codeFiles?.findIndex(file => {
        return file.isActive
      })
      if (activeIndex !== -1) setActiveFileIndex(activeIndex)
    }
  }, [component])
  const { data: suiVersion } = useQuery({
    queryKey: ['sui-version'],
    queryFn: () =>
      fetch('https://prod-api.chainide.com/api/image/sui/version').then(res =>
        res.json(),
      ),
  })

  const getIdeLink = () => {
    try {
      if (component.ideUrl?.includes(CHAIN_IDE)) {
        const files =
          component.codeFiles?.map(item => {
            return {
              filename: item.filename,
              content: (
                item.codeContent?.content?.rich_text
                  ?.map((richText: any) => richText.plain_text)
                  .join('') || ''
              ).replaceAll(
                `rev = "framework/testnet"`,
                `rev = "${suiVersion?.data || 'framework/testnet'}"`,
              ),
            }
          }) || []

        return `
          ${CHAIN_IDE}createHackProject?version=soljson-v0.8.12.js&open=${files[0]?.filename || 'filename.move'}&chain=sui&type=type&uniqueId=${lesson.id + '-' + (currentUser?.id || new Date().getTime())}&code=${encodeURIComponent(
            JSON.stringify(files),
          )}`
      }
    } catch (err) {
      toast.error(err as string)
    }

    return `${component.ideUrl || process.env.IDE_URL || 'https://ide.dev.hackquest.io'}?code=${encodeURIComponent(
      LzString.compressToBase64(exampleContent),
    )}`
  }

  return (
    <div
      ref={parent}
      className={`flex h-fit w-full flex-col rounded-[.625rem] bg-neutral-white p-6 sm:p-8 ${expand ? 'min-h-[50%] flex-1' : ''}`}
    >
      <div className="flex cursor-pointer items-center justify-between gap-6">
        <span className="title-5 relative inline-flex items-center text-neutral-800">
          {component.title || 'Example'}
        </span>
        <span
          onClick={() => setExpand(!expand)}
          className="flex flex-1 justify-end"
        >
          <FiChevronDown
            className={`${expand ? 'rotate-180' : '0'} size-4 transition-all`}
          />
        </span>
      </div>
      {expand && (
        <ExampleContextProvider
          value={{
            updateExampleContent: (value: string) => setExampleContent(value),
          }}
        >
          <div className="relative mt-[20px] flex flex-1 flex-col overflow-hidden">
            {component.children.map(childRenderCallback(component))}
            {!!component.codeFiles?.length && (
              <div className="flex h-full flex-col">
                <div className="flex w-full gap-[5px]">
                  {component.codeFiles?.map((codeFile, index) => {
                    return (
                      <div
                        key={`${codeFile.filename}-${index}`}
                        className={cn(
                          'mt-4 cursor-pointer truncate rounded-t-[10px] px-[10px] py-[2px]',
                          index === activeFileIndex
                            ? 'border-neutral-500 border-b-2 bg-neutral-200 font-bold'
                            : 'bg-neutral-white',
                        )}
                        onClick={() => setActiveFileIndex(index)}
                      >
                        {codeFile.filename}
                      </div>
                    )
                  })}
                </div>
                <div className="!rounded-[10px] relative mb-[20px] flex flex-1 flex-col overflow-y-auto rounded-tl-[0px] bg-[#fafafa]">
                  <ComponentRenderer
                    component={
                      component.codeFiles[activeFileIndex]
                        ?.codeContent as ComponentRendererType
                    }
                    position={0}
                    prevComponent={null}
                    nextComponent={null}
                    parent={component}
                  />
                </div>
              </div>
            )}
          </div>
        </ExampleContextProvider>
      )}

      {expand && component.renderIdeBtn && (
        <Link href={getIdeLink()} target="_blank" className="mt-2">
          <Button size={'small'} variant={'outline'} color={'neutral'}>
            <span>Open in IDE</span>
            <FiCode className="size-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}

export default ExampleRenderer
