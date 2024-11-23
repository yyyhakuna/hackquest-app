import { type FC, useEffect } from 'react'
import toast from 'react-hot-toast'

interface HackathonCustomRenderProps {
  parent: any
  component: any
  isRenderChildren?: boolean
}

const HackathonCustomRender: FC<HackathonCustomRenderProps> = props => {
  const { component } = props
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development')
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log('在hackathon中不受支持的渲染类型 => ', component?.type)
    else toast.error(`在hackathon中不受支持的渲染类型 => ${component?.type}`)
  }, [component])

  return <div />
}

export default HackathonCustomRender
