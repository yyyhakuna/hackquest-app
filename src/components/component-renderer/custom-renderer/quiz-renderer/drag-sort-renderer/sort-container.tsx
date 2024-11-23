import type { QuizOption } from '@/components/component-renderer/constants/type'
import TextRenderer from '@/components/component-renderer/notion-renderer/text-renderer'
import { cn } from '@hackquest/ui/lib/utils'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type React from 'react'
import { FiMenu } from 'react-icons/fi'

interface SortContainerProp {
  options: QuizOption[]
  setOptions: (options: QuizOption[]) => void
  showAnswer: boolean
}
const SortContainer: React.FC<SortContainerProp> = ({
  options,
  setOptions,
  showAnswer,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const newOptions = Array.from(options)
    const [movedOption] = newOptions.splice(result.source.index, 1)
    newOptions.splice(result.destination.index, 0, movedOption as QuizOption)
    setOptions(newOptions)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {options.map((item, index) => (
              <Draggable
                key={item.index}
                draggableId={String(item.index)}
                index={index}
              >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                    className="w-full select-none py-2 text-neutral-800"
                  >
                    <div
                      className={cn(
                        'flex w-full cursor-pointer select-none items-center gap-4 rounded-xl border-[2px] border-neutral-300 bg-neutral-white p-4 text-neutral-800 hover:bg-neutral-100',
                        showAnswer && 'bg-neutral-100',
                      )}
                    >
                      <div>
                        <FiMenu className="size-4" />
                      </div>
                      <div className="flex-1 text-base">
                        <TextRenderer
                          richTextArr={item.option?.content?.rich_text}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortContainer
