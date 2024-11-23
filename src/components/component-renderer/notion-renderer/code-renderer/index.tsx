import {
  ContentType,
  useContentContext,
} from '@/components/learn/constants/type'
import { copyText } from '@/lib/utils'
import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiCopy } from 'react-icons/fi'
import SyntaxHighlighter from 'react-syntax-highlighter'
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'

interface CodeSourceType {
  type: string
  content: {
    caption: any[]
    language: string
    rich_text: { plain_text: string }[]
  }
}
type CodeRendererProp = Omit<ComponentRendererProp, 'component'> & {
  component: CodeSourceType
}

const CodeRenderer: React.FC<CodeRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const language = component.content.language
  const { contentType } = useContentContext()
  // const exampleContext = useExampleContext()

  const isPractice = contentType === ContentType.PRACTICE
  const [codeContent, setCodeContent] = useState('')

  useEffect(() => {
    if (component.content.rich_text) {
      const code = component.content.rich_text
        .map((richText: any) => richText.plain_text)
        .join('')
      setCodeContent(code)
      // exampleContext?.updateExampleContent?.(code)
    }
  }, [component.content.rich_text])
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
  return (
    <div
      datatype={component.type}
      className={cn(
        `relative flex-1 overflow-hidden rounded-md`,
        isPractice ? 'flex flex-col' : '',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <div className="relative">
        <div
          className="absolute top-3 right-3 z-[10] cursor-pointer rounded-[0.5rem] text-neutral-500"
          onClick={() => {
            const text = component.content.rich_text
              .map((richText: any) => richText.plain_text)
              .join('')
            copyText(text)
            toast.success('Copied')
          }}
        >
          <FiCopy className="size-4" />
        </div>
      </div>
      {isPractice ? (
        <div className="relative w-full flex-1">
          <div className="scroll-wrap-x scroll-wrap-y absolute top-0 left-0 h-full w-full">
            <SyntaxHighlighter
              style={github}
              language={language}
              className="code-s scroll-wrap-x !px-3 !pb-3 !pt-8 scroll-wrap-y !bg-neutral-50 mt-[0!important] h-[calc(100%-10px)] rounded-[0.5rem] border border-neutral-300 text-code-blue [&>code]:text-code-blue"
              showLineNumbers
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <SyntaxHighlighter
          style={github}
          language={language}
          className={cn(
            'scroll-wrap-x scroll-wrap-y !px-3 !pb-3 !pt-8 code-s mt-[0!important] h-[calc(100%-20px)] rounded-[0.5rem] border border-neutral-200 [&>code]:text-code-blue',
          )}
          showLineNumbers
        >
          {codeContent}
        </SyntaxHighlighter>
      )}
    </div>
  )
}

export default CodeRenderer
