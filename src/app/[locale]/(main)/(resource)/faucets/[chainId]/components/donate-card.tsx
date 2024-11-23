import type { GetFaucetDetailByIdQuery } from '@/graphql/generated/graphql'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface DonatedCardProps {
  faucetInfo: GetFaucetDetailByIdQuery['findFirstFaucet']
}

const DonateCard: React.FC<DonatedCardProps> = ({ faucetInfo }) => {
  const t = useTranslations('Faucets')
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border-2 border-primary-600 bg-primary-50 p-4">
      <div className="text-primary-neutral">
        <p className="headline-s pb-2">{t('wantToDonate')}</p>
        <p className="body-s w-[245px] break-words sm:w-full">
          {t('donate', {
            symbol: faucetInfo.symbol,
            address: faucetInfo.owner,
          })}
        </p>
      </div>
      <div>
        <Image
          src={'/images/faucet/faucet_banner_bg_mob.png'}
          alt="faucet"
          width={48}
          height={48}
        />
      </div>
    </div>
  )
}

export default DonateCard
