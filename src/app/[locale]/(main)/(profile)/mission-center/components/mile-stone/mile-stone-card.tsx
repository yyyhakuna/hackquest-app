
import Image from 'next/image'
import type React from 'react'
import ActionButton from '../common/action-button'

interface MileStoneCardProp {
  info: any
}

const MileStoneCard: React.FC<MileStoneCardProp> = ({ info }) => {
  const is = false
  return (
    <div className="body-m w-full text-neutral-800">
      <div className="relative mb-3 h-0 w-full pt-[100%]">
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
          {is ? (
            <div className="headline-l flex items-center gap-1 text-neutral-600">
              <Image
                src={'/images/layout/coin.png'}
                alt={'coin-icon'}
                width={48}
                height={48}
              />
              <span>{50}</span>
            </div>
          ) : (
            <Image src={info.image} alt={''} width={110} height={110} />
          )}
        </div>
      </div>
      {is ? (
        <ActionButton isComplete={true} />
      ) : (
        <div className="text-center">
          <p className="headline-l">{`${1}/${15}`}</p>
          <p>Daily</p>
        </div>
      )}
    </div>
  )
}

export default MileStoneCard
