import { Spinner } from '@hackquest/ui/shared/spinner'
import { type MotionProps, motion } from 'framer-motion'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { type GlobalSearchKey, getGlobalSearch, } from './utils'

const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '0%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '12px',
    position: 'absolute',
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '12px',
    position: 'absolute',
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 'bottom' },
}

interface GlobalSearchSelectProp {
  onSelect: (info: any) => void
  searchType?: GlobalSearchKey
  keyword: string
}

const GlobalSearchSelect: React.FC<GlobalSearchSelectProp> = ({
  onSelect,
  searchType,
  keyword,
}) => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const timer = useRef<NodeJS.Timeout>()

  const getList = async () => {
    setLoading(true)
    const newList = await getGlobalSearch(keyword, searchType)
    setList(newList)
    setLoading(false)
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      getList()
      clearTimeout(timer.current)
    }, 500)
  }, [keyword, searchType])

  return (
    <motion.div
      {...animateProps}
      className={
        'no-scrollbar absolute top-[2rem] left-0 z-[999] max-h-[12.5rem] w-full overflow-y-auto rounded-[.5rem] border border-neutral-200 bg-neutral-white p-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.08),0_3px_10px_0_rgba(0,0,0,0.1)]'
      }
    >
      <div className="relative">
        {loading && (
          <div className="absolute top-0 left-0 flex h-full w-full justify-center pt-6">
            <Spinner />
          </div>
        )}
        {list.length > 0 ? (
          <div className="flex flex-col gap-4">
            {list?.map((v: any, i: number) => (
              <div key={i}>
                <p className="body-xs mb-2 text-neutral-400 uppercase">
                  {v.key}
                </p>
                <div className="flex flex-col gap-4">
                  {v.data.map((d: any, j: number) => (
                    <div
                      key={`${i}-${j}`}
                      className="headline-s flex cursor-pointer items-center gap-2 text-neutral-800"
                      onClick={() => onSelect(d)}
                    >
                      {v.icon}
                      <span className="line-clamp-1 flex-1 flex-shrink-0">
                        {d.name || d.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="headline-s flex h-20 items-center justify-center px-4 text-neutral-800">
            No result
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default GlobalSearchSelect
