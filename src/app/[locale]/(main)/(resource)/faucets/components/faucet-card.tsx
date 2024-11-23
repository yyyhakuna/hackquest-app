import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import type { Faucet } from '@/graphql/generated/graphql'
import { decimalCount } from '@/lib/utils'
import { Card } from '@hackquest/ui/shared/card'

import Image from 'next/image'
import type React from 'react'

interface FaucetCardProp {
  faucet: Partial<Faucet>
}

const FaucetCard: React.FC<FaucetCardProp> = ({ faucet }) => {
  return (
    <Card>
      <Link href={`${MenuLink.FAUCETS}/${faucet.chainId}`}>
        <div className=" overflow-hidden p-4">
          <Image
            src={faucet.thumbnail as string}
            alt={faucet.name as string}
            className="object-cover"
            width={48}
            height={48}
          />
          <div className="headline-s py-4 text-neutral-800">
            <p>{faucet.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="body-xs text-neutral-500">Faucet</p>
              <p className="body-s text-neutral-800">Drips {`${decimalCount(faucet.amount, 3)} ${faucet.symbol}`}</p>
            </div>
            <div>
              <p className="body-xs text-neutral-500">Stash</p>
              <p className="body-s text-neutral-800">{`${decimalCount(faucet.balance, 3)} ${faucet.symbol}`}</p>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default FaucetCard
