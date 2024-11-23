import { RendererContext } from '@/components/blog-glossary-component-renderer/context'
import { useContext } from 'react'

export const useCustomComponentRenderer = () => {
  const { CustomComponentRenderer } = useContext(RendererContext)
  return CustomComponentRenderer
}

export const useQuizBRendererContext = () => {
  const { quizBRendererContext } = useContext(RendererContext)
  return quizBRendererContext!
}

// export const useQuizARendererContext = () => {
//   const { quizARendererContext } = useContext(RendererContext);
//   return quizARendererContext!;
// };

export const useExampleRendererContext = () => {
  const { exampleRendererContext } = useContext(RendererContext)
  return exampleRendererContext!
}

export const useGlobalRendererContext = () => {
  const { globalContext } = useContext(RendererContext)
  return globalContext!
}

export const useCodeRendererContext = () => {
  const { codeRenderer } = useContext(RendererContext)
  return codeRenderer!
}
