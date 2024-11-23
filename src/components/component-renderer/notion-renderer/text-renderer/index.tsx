import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import MathJax from 'react-mathjax'
import type { AnnotationsType } from '../../constants/type'

interface TextRendererProp {
  richTextArr: any
  letterSpacing?: string
}

const getTextClassNames = (annotations: AnnotationsType) => {
  const className = cn(
    // `py-1`,
    annotations.bold ? 'font-bold' : '',
    annotations.code
      ? 'px-2 py-[.375rem] text-[85%] text-code-pink bg-neutral-100 mx-[0.25rem]'
      : '',
    annotations.italic ? 'italic' : '',
    annotations.strikethrough ? '' : '',
    annotations.underline ? 'underline' : '',
    annotations.color !== 'default'
      ? `${annotations.color.includes('background') ? `bg-[${annotations.color}]` : `text-${annotations.color}-400`}`
      : '',
  )
  return className
}

const TextRenderer: React.FC<TextRendererProp> = ({
  richTextArr,
  letterSpacing = '0.28px',
}) => {
  return (
    <>
      {richTextArr.map((richText: any, index: number) => {
        const annotations = richText.annotations
        const className = getTextClassNames(annotations)
        if (richText.href) {
          return (
            <a
              target="_blank"
              key={index}
              href={richText.href}
              className={`${className} whitespace-pre-line break-words underline hover:text-primary-link hover:underline`}
              style={{
                letterSpacing,
                color:
                  annotations.color !== 'default' &&
                  !annotations.code &&
                  !annotations.color.includes('background')
                    ? annotations.color
                    : '',
                backgroundColor:
                  annotations.color !== 'default' &&
                  annotations.color.includes('background')
                    ? annotations.color
                    : '',
              }}
              rel="noreferrer"
            >
              {richText.plain_text}
            </a>
          )
        }
        if (richText.equation) {
          return (
            <span key={index}>
              <MathJax.Provider>
                <span className="[&>div]:inline-block">
                  <MathJax.Node formula={richText.equation.expression} />
                </span>
              </MathJax.Provider>
            </span>
          )
        }
        return (
          <span
            key={index}
            className={`${className} whitespace-pre-line rounded-md`}
            style={{
              letterSpacing,
              color:
                annotations.color !== 'default' &&
                !annotations.color.includes('background')
                  ? annotations.color
                  : '',
              backgroundColor:
                annotations.color !== 'default' &&
                annotations.color.includes('background')
                  ? annotations.color
                  : '',
            }}
          >
            {richText.plain_text}
          </span>
        )
      })}
    </>
  )
}

export default TextRenderer
