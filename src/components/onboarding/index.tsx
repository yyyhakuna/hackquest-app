'use client'

import { useListEcosystemInfosQuery } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { RadioCards, RadioCardsItem } from '@hackquest/ui/shared/radio-cards'
import Image from 'next/image'
import { LuArrowRight } from 'react-icons/lu'

export function Onboarding() {
  return (
    <Dialog open={false} onOpenChange={() => {}}>
      <DialogContent
        showCloseIcon={false}
        className="w-full min-w-[800px] gap-8 overflow-hidden bg-primary-100 p-8"
      >
        <Steps currentStep={2} />
        <Welcome />
      </DialogContent>
    </Dialog>
  )
}

function Welcome() {
  return (
    <div className="relative">
      <DialogHeader>
        <DialogTitle className="title-1">Welcome to HackQuest👋</DialogTitle>
      </DialogHeader>
      <div className="-translate-y-3/4 absolute top-1/2 left-0">
        <div className="after:-right-[10px] after:-mt-[10px] before:-right-[11px] before:-mt-[11px] relative rounded-xl border border-neutral-700 bg-neutral-50 px-3 py-2 font-bold text-sm before:absolute before:top-1/2 before:border-[11px] before:border-transparent before:border-r-0 before:border-l-neutral-700 after:absolute after:top-1/2 after:border-[10px] after:border-transparent after:border-r-0 after:border-l-neutral-white">
          <p>Quick!</p>
          <p>We have a few questions for you</p>
        </div>
      </div>
      <div className="mt-[118px] flex items-center justify-center">
        <Image
          src="/images/logo/onboarding.png"
          alt="hackquest"
          width={351}
          height={334}
        />
      </div>
      <DialogFooter className="-mt-12">
        <Button>
          <span>Continue</span>
          <LuArrowRight className="size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}

function Step1() {
  return (
    <div className="relative">
      <DialogHeader>
        <DialogTitle className="title-1">Are you new to Web3?</DialogTitle>
        <RadioCards className="grid gap-4">
          <RadioCardsItem
            className="justify-between p-6 font-bold text-lg"
            value="new"
          >
            I don’t know what blockchain is
            <Web3Level level={1} />
          </RadioCardsItem>
          <RadioCardsItem
            className="justify-between p-6 font-bold text-lg"
            value="intermediate"
          >
            I’ve heard of some basic concepts
            <Web3Level level={2} />
          </RadioCardsItem>
          <RadioCardsItem
            className="justify-between p-6 font-bold text-lg"
            value="advanced"
          >
            I know how to develop in Web3
            <Web3Level level={3} />
          </RadioCardsItem>
          <RadioCardsItem
            className="justify-between p-6 font-bold text-lg"
            value="expert"
          >
            I know everything
            <Web3Level level={4} />
          </RadioCardsItem>
        </RadioCards>
      </DialogHeader>
      <DialogFooter className="mt-12">
        <Button>
          <span>Continue</span>
          <LuArrowRight className="size-4" />
        </Button>
      </DialogFooter>
      <div className="-bottom-16 absolute left-16">
        <Image
          src="/images/logo/duck1.png"
          alt="hackquest"
          width={102}
          height={147}
        />
      </div>
    </div>
  )
}

function Step2() {
  return (
    <div>
      <DialogHeader>
        <DialogTitle className="title-1">
          What would you like to achieve at HackQuest?
        </DialogTitle>
        <RadioCards className="grid grid-cols-2 gap-4">
          <RadioCardsItem className="gap-3 p-6" value="founder">
            <Image
              src="/images/logo/duck1.png"
              alt="hackquest"
              width={102}
              height={147}
            />
            <div className="space-y-1 text-left">
              <span className="font-bold text-lg text-neutral-700">
                Web 3 Founder
              </span>
              <p className="text-base text-neutral-500 group-data-[state=checked]:font-normal">
                Understand web3 market and future. Look for assistance to launch
                a Web3 startup
              </p>
            </div>
          </RadioCardsItem>
          <RadioCardsItem className="gap-3 p-6" value="developer">
            <Image
              src="/images/logo/duck1.png"
              alt="hackquest"
              width={102}
              height={147}
            />
            <div className="space-y-1 text-left">
              <span className="font-bold text-lg text-neutral-700">
                Web 3 Developer
              </span>
              <p className="text-base text-neutral-500 group-data-[state=checked]:font-normal">
                Learn basic syntax in web3 development. Being able to develop a
                project independently
              </p>
            </div>
          </RadioCardsItem>
        </RadioCards>
      </DialogHeader>
      <DialogFooter className="mt-12">
        <Button>
          <span>Continue</span>
          <LuArrowRight className="size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}

function Step3() {
  const { data } = useListEcosystemInfosQuery({
    limit: null,
    where: {
      lang: {
        equals: 'en',
      },
    },
  })

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="title-1 text-balance text-center">
          Which ecosystem would you like to start with? You can always make
          changes later
        </DialogTitle>
        <RadioCards className="grid grid-cols-3 gap-4">
          {data?.listEcosystemInfos.data?.map(ecosystem => (
            <RadioCardsItem
              key={ecosystem.ecosystemId}
              className="justify-start gap-4 p-6"
              value={ecosystem.ecosystemId}
            >
              <div className="relative size-8">
                <Image
                  src={ecosystem.basic.image}
                  alt="hackquest"
                  fill
                  className="rounded-full"
                />
              </div>
              <span className="font-bold text-lg text-neutral-700">
                {ecosystem.basic.type}
              </span>
            </RadioCardsItem>
          ))}
        </RadioCards>
      </DialogHeader>
      <DialogFooter className="mt-12">
        <Button>
          <span>Continue</span>
          <LuArrowRight className="size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}

function StartJourney() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <DialogHeader>
        <DialogTitle className="title-1 text-balance text-center">
          Ready for launch!
        </DialogTitle>
      </DialogHeader>
      <Button variant="outline" color="neutral">
        Start Journey
      </Button>
      <Image
        src="/images/logo/onboarding.png"
        alt="hackquest"
        width={351}
        height={334}
      />
    </div>
  )
}

function Web3Level({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: level }).map((_, index) => (
        <Image
          key={index}
          src="/images/ecosystem/level.svg"
          alt="level"
          width={24}
          height={16}
        />
      ))}
    </div>
  )
}

function Steps({
  currentStep,
  totalStep = 3,
}: {
  currentStep: number
  totalStep?: number
}) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2.5">
      {[...Array(totalStep)].map((_, index) => (
        <span
          key={index}
          className={cn('h-1.5 w-10 rounded-sm bg-neutral-200', {
            'bg-primary': index + 1 <= currentStep,
          })}
        />
      ))}
    </div>
  )
}
