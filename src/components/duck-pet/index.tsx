'use client'
import React, { useEffect, useState } from 'react'
import Draggable, {
  type DraggableData,
  type DraggableEvent,
} from 'react-draggable'
import Duck from './duck'

const DuckPet = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const nodeRef = React.useRef<HTMLDivElement>(null)
  const [initTop, setInitTop] = useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y })
  }
  const handleStop = (_event: DraggableEvent, data: DraggableData) => {
    const refHeight = data.node.offsetHeight + data.node.offsetTop + 100
    const topHeight = 200
    const winHeight = window.innerHeight
    let y = data.y
    if (initTop + data.y <= topHeight) {
      y = topHeight - initTop
    }
    if (data.y + refHeight > winHeight) {
      y = winHeight - refHeight
    }
    setPosition({ x: 0, y })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (ref.current) {
      setInitTop(ref.current?.getBoundingClientRect()?.top || 0)
    }
  }, [ref])
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="body"
    >
      <div
        className="fixed right-0 bottom-[200px] z-[999] cursor-pointer"
        ref={nodeRef}
      >
        <div ref={ref} className="h-[7.5rem]">
          <Duck />
        </div>
        {/* <div>
          <AiModal>撒打算打算</AiModal>
        </div> */}
      </div>
    </Draggable>
  )
}

export default DuckPet
