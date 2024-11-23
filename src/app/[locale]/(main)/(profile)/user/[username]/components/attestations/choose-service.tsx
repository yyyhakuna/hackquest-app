import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import { RadioCards, RadioCardsItem } from '@hackquest/ui/shared/radio-cards'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { SERVICE_CONFIG } from '../../constants'
import { useAttestationStore } from '../../utils/store'

const services = [
  {
    value: SERVICE_CONFIG.Verax,
    name: 'Verax Attestation Registry',
    icon: '/images/wallet/verax.svg',
  },
  {
    value: SERVICE_CONFIG.EAS,
    name: 'EAS',
    icon: '/images/wallet/eas.svg',
  },
  {
    value: SERVICE_CONFIG.EthSign,
    name: 'EthSign',
    icon: '/images/wallet/eth-sign.svg',
  },
] as const

export function ChooseService() {
  const { state, setState, setStep } = useAttestationStore()

  function onValid() {
    if (!state.service) {
      toast.error('Please select a service')
      return
    }
    setStep(3)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 max-sm:mt-4">
      <RadioCards
        value={state?.service}
        onValueChange={value => setState({ service: value })}
        className="grid grid-cols-1 gap-4"
      >
        {services.map(service => (
          <RadioCardsItem
            key={service.value}
            value={service.value}
            className="flex h-16 items-center justify-start gap-4 p-3"
          >
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
              <Image src={service.icon} alt={service.name} fill />
            </div>
            <span className="headline-s">{service.name}</span>
          </RadioCardsItem>
        ))}
      </RadioCards>
      <DialogFooter className="max-sm:gap-3 max-sm:pt-6 max-sm:pb-10">
        <Button
          variant="outline"
          color="neutral"
          className="sm:w-32"
          onClick={() => setStep(1)}
        >
          <LuArrowLeft className="group-enabled:group-hover:-translate-x-1 size-4 transition-transform duration-300" />
          Back
        </Button>
        <Button onClick={onValid} className="sm:w-32">
          Continue
          <LuArrowRight className="icon-hover-translate size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}
