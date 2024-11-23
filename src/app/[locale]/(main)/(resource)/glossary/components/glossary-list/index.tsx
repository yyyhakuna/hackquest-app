import type React from 'react'
import { useEffect, useRef } from 'react'
import type { GlossaryListType, OffsetTopsType } from '../../constants/type'
import GlossaryCard from '../glossary-card'

interface GlossaryListProp {
  list: GlossaryListType[]
  setOffsetTop: (tops: OffsetTopsType[]) => void
}

const GlossaryList: React.FC<GlossaryListProp> = ({ list, setOffsetTop }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const getOffsetTops = () => {
    const offsetTops = []
    const childNodes = boxRef.current?.childNodes || []
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0
      offsetTops.push({
        letter: `${list[i]?.letter}`,
        offsetTop: offsetTop - 120,
      })
    }
    setOffsetTop(offsetTops)
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getOffsetTops()
  }, [list])
  return (
    <div className="mt-[-40px] flex flex-col" ref={boxRef}>
      {list.map(item => (
        <div key={item.letter} className="pt-8">
          <div className="title-1 mb-6 text-neutral-800">{item.letter}</div>
          <div className="flex flex-wrap gap-4">
            {item.list.map(glossary => (
              <div
                key={glossary.id}
                className="w-full sm:w-[calc((100%-32px)/3)] "
              >
                <GlossaryCard glossary={glossary} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GlossaryList
