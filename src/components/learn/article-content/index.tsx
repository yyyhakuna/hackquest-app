'use client'
import ComponentRenderer from '@/components/component-renderer'
import type { ComponentRendererType } from '@/components/component-renderer/constants/type'
import { useCourseLesson } from '@/store/learn'
import React from 'react'
import { useMemo, } from 'react'
import { ContentContextProvider, ContentType } from '../constants/type'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ArticleContentProp {}

const ArticleContent: React.FC<ArticleContentProp> = () => {
  const lesson = useCourseLesson()
  const components: ComponentRendererType[] = lesson.content

  const parent = useMemo(() => {
    return {
      ...lesson,
      isRoot: true,
    }
  }, [lesson])
  if (!components?.length) return null
  return (
    <ContentContextProvider
      value={{
        contentType: ContentType.ARTICLE,
      }}
    >
      <div className="scroll-wrap-y flex h-full max-w-[64rem] flex-1 flex-shrink-0 flex-col gap-6 p-8">
        {components.map((component, index) => {
          const prevComponent = index === 0 ? null : components![index - 1]
          const nextComponent =
            index === components!.length - 1 ? null : components![index + 1]
          return (
            <React.Fragment key={component.id}>
              <ComponentRenderer
                parent={parent}
                component={component}
                position={index}
                prevComponent={prevComponent as ComponentRendererType | null}
                nextComponent={nextComponent as ComponentRendererType | null}
              />
            </React.Fragment>
          )
        })}
      </div>
    </ContentContextProvider>
  )
}

export default ArticleContent
