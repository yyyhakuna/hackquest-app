import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { faucetsStepData } from '../constants/data'

interface StepCardProps {
  order: number
  title: string
  content: string
}

const FaucetHeader = () => {
  const t = useTranslations('Faucets')

  return (
    <>
      {/* web */}
      <div className="hidden grid-cols-10 sm:grid">
        <div className="col-span-7 pb-8">
          <h1 className="title-1 text-primary-neutral">{t('title')}</h1>
          <p className="body-m py-6 text-neutral-500">{t('description')}</p>
          <div className="grid grid-cols-3 gap-4">
            {faucetsStepData.map((step, index) => (
              <StepCard key={index} order={index + 1} title={step.title} content={step.content} />
            ))}
          </div>
        </div>
        <div className="col-span-3 flex items-center justify-center pl-3">
          <Image
            src={'/images/faucet/faucet_banner_bg.png'}
            alt=""
            style={{ height: 280, width: 296 }}
            height={280}
            width={296}
          />
        </div>
      </div>
      {/* mobile */}
      <div className="block sm:hidden">
        <div className="flex items-end justify-between">
          <h1 className="title-1 text-primary-neutral">{t('title')}</h1>
          <Image src={'/images/faucet/faucet_banner_bg_mob.png'} alt="faucet-logo" width={48} height={48} />
        </div>
        <p className="body-m py-4 text-neutral-500">{t('description')}</p>
        <div className="grid grid-cols-1 gap-4">
          {faucetsStepData.map((step, index) => (
            <StepCard key={index} order={index + 1} title={step.title} content={step.content} />
          ))}
        </div>
      </div>
    </>
  )
}

const StepCard: React.FC<StepCardProps> = props => {
  const { order, title, content } = props

  return (
    <div>
      <div className="flex items-center">
        <div className="headline-xs flex h-4 w-4 items-center justify-center rounded-full bg-primary">{order}</div>
        <p className="headline-s pl-3 text-primary-neutral">{title}</p>
      </div>
      <div className="body-s pt-2 text-secondary-neutral">
        <p>{content}</p>
      </div>
    </div>
  )
}

export default FaucetHeader
