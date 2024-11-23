import { ComponentRenderer } from '@/components/blog-glossary-component-renderer'
import {
  type CustomComponent,
  PageType,
} from '@/components/blog-glossary-component-renderer/type'
import ComponentRendererProvider from '@/providers/blog-glossary-component-render/component-renderer-provider'
import type React from 'react'
import HackathonCustomRender from './hackathon-custom-render'

interface HackathonRenderProp {
  content: CustomComponent[]
}

const HackathonRender: React.FC<HackathonRenderProp> = ({ content }) => {
  return (
    <div className="w-full">
      {content?.map && (
        <ComponentRendererProvider
          type={PageType.HACKATHON}
          CustomComponentRenderer={HackathonCustomRender}
        >
          {content?.map((component: CustomComponent, index: number) => {
            const prevComponent = index === 0 ? null : content[index - 1]
            const nextComponent =
              index === content.length - 1 ? null : content[index + 1]
            return (
              <ComponentRenderer
                key={component.id}
                component={component}
                parent={{}}
                position={index}
                prevComponent={prevComponent!}
                nextComponent={nextComponent!}
              />
            )
          })}
        </ComponentRendererProvider>
      )}
      {!content?.map && <p>{content as any}</p>}
    </div>
  )
}

export default HackathonRender
