import { Card } from '@hackquest/ui/shared/card'
import Image from 'next/image'
import type React from 'react'
import { logosData } from '../../constants/data'
import Download from './download'

interface LogosProp {
  children: React.JSX.Element
}

const Logo: React.FC<LogosProp> = async ({ children }) => {
  return (
    <div>
      {children}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {logosData.map((v, i) => (
          <Card key={i} className="overflow-hidden rounded-[16px] border-2 border-neutral-200 bg-neutral-white p-4">
            <div className="relative h-0 w-full pt-[56.25%]">
              {v.img && <Image src={v.img} alt={v.name} fill className="object-contain" />}
            </div>
            <div className="flex flex-col pt-4">
              <h2 className="headline-m line-clamp-2 text-neutral-800">{v.name}</h2>
              <Download fileName={v.fileName} className="pt-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Logo
