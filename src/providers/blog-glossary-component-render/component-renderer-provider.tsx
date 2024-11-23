'use client'
import {
  RendererContext,
  type RendererContextType,
  defaultRendererContext,
} from '@/components/blog-glossary-component-renderer/context'
import type { PageType } from '@/components/blog-glossary-component-renderer/type'
import { type FC, type ReactNode, useMemo } from 'react'

interface ComponentRendererProviderProps {
  type: PageType
  isMobile?: boolean
  children: ReactNode
}

const ComponentRendererProvider: FC<
  ComponentRendererProviderProps & RendererContextType
> = props => {
  const { type, children, isMobile = false, ...rest } = props

  const contextValue = useMemo(() => {
    return {
      ...defaultRendererContext,
      ...rest,
      globalContext: {
        ...(rest?.globalContext || {}),
        pageType: type,
        isMobile,
      },
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [rest, type, isMobile])

  return (
    <RendererContext.Provider value={contextValue}>
      {children}
    </RendererContext.Provider>
  )
}

export default ComponentRendererProvider
