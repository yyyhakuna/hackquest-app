import type { GetFaucetDetailByIdQuery } from '@/graphql/generated/graphql'
import Image from 'next/image'

interface FaucetInfoHeaderProps {
  faucetInfo: GetFaucetDetailByIdQuery['findFirstFaucet']
}

const FaucetInfoHeader: React.FC<FaucetInfoHeaderProps> = ({ faucetInfo }) => {
  return (
    <div>
      <Image src={faucetInfo.thumbnail} alt={faucetInfo.name} className="object-cover" height={48} width={48} />
      <h1 className="title-1 py-4 text-primary-neutral">Arbitrum Sepolia</h1>
      <div className="headline-m flex items-center gap-[15px] pb-8 text-secondary-neutral sm:pb-[34px]">
        <div className="flex flex-col sm:flex-row">
          <p>Dripping&nbsp;</p>
          <p>{`${faucetInfo.amount} ${faucetInfo.symbol}`} per day</p>
        </div>

        <div className="h-[26px] w-[0.5px] bg-secondary-neutral" />

        <div className="flex flex-col sm:flex-row">
          <p>Current Balance:</p>
          <p>{`${faucetInfo.balance} ${faucetInfo.symbol}`}</p>
        </div>
      </div>
    </div>
  )
}

export default FaucetInfoHeader
