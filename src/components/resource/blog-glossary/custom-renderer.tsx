import { type FC, useEffect } from 'react'

interface CustomRendererProps {
  parent: any
  component: any
  isRenderChildren?: boolean
}

const CustomRenderer: FC<CustomRendererProps> = props => {
  const { component } = props
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    else {
       // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(`在blog中不受支持的渲染类型 => ${component?.type}`)
    }
  }, [component])

  return <></>
}

export default CustomRenderer
