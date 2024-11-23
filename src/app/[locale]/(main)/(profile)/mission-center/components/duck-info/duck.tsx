import type React from 'react'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DuckProp {}

const Duck: React.FC<DuckProp> = () => {
  return <div>Duck</div>
}

export default Duck
