import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import type { Glossary } from '@/graphql/generated/hooks'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

interface GlossaryCardProp {
  glossary: Glossary
}

const GlossaryCard: React.FC<GlossaryCardProp> = ({ glossary }) => {
  const titleRef = useRef<HTMLDivElement>(null)
  const [lineClamp2, setLineClamp2] = useState(true)

  useEffect(() => {
    const titleHeight = titleRef.current?.offsetHeight || 0
    setLineClamp2(titleHeight > 36)
  }, [])
  return (
    <Link href={`${MenuLink.GLOSSARY}/${glossary.alias}`} className="block">
      <Card>
        <div className=" flex h-[178px] flex-col justify-between rounded-2xl p-4 ">
          <div>
            <h2 ref={titleRef} className="headline-l line-clamp-2 text-neutral-800">
              {glossary.title}
            </h2>
            <div className={`body-s mt-4 text-neutral-600 ${lineClamp2 ? 'truncate' : 'line-clamp-3'}`}>
              {glossary.description}
            </div>
          </div>
          <div className=" flex gap-[.75rem] overflow-hidden">
            {glossary?.tracks?.map((v, i) => (
              <Tag key={i}>{v}</Tag>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default GlossaryCard
