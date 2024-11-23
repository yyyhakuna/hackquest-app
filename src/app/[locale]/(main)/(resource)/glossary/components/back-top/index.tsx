import type React from 'react'
import { FiArrowUp } from 'react-icons/fi'

interface BackTopProp {
  handleBackTop: VoidFunction
}

const BackTop: React.FC<BackTopProp> = ({ handleBackTop }) => {
  return (
    <div
      className="fixed right-[0] bottom-[5rem] flex h-12 w-12 cursor-pointer items-center justify-center rounded-l-[.75rem] bg-primary-400 text-neutral-800"
      onClick={handleBackTop}
    >
      <FiArrowUp size={20} />
    </div>
  )
}

export default BackTop
