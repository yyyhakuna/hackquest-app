import { ComponentRenderer } from '@/components/blog-glossary-component-renderer'
import {
  type CustomComponent,
  PageType,
} from '@/components/blog-glossary-component-renderer/type'
import type { Blog, Glossary } from '@/graphql/generated/hooks'
import ComponentRendererProvider from '@/providers/blog-glossary-component-render/component-renderer-provider'
import type React from 'react'
import { useMemo } from 'react'
import CustomRenderer from './custom-renderer'

interface DetailNotionContentProp {
  info: Blog & Glossary
}

const DetailNotionContent: React.FC<DetailNotionContentProp> = ({ info }) => {
  const parent = useMemo(() => {
    return {
      ...info,
      isRoot: true,
    }
  }, [info])
  return (
    <ComponentRendererProvider
      type={PageType.BLOG}
      CustomComponentRenderer={CustomRenderer}
    >
      {info?.content?.map((component: CustomComponent, index: number) => {
        const prevComponent = index === 0 ? null : info.content[index - 1]
        const nextComponent =
          index === info.content.length - 1 ? null : info.content[index + 1]
        return (
          <ComponentRenderer
            key={component.id}
            component={component}
            parent={parent}
            position={index}
            prevComponent={prevComponent}
            nextComponent={nextComponent}
          />
        )
      })}
    </ComponentRendererProvider>
  )
}

export default DetailNotionContent
