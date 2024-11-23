import { Link } from '@/app/navigation'
import { TEXT_EDITOR_TYPE } from '@/constants/enum'
import { HACKQUEST_DISCORD, HACKQUEST_TWITTER } from '@/constants/links'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type React from 'react'
import { useState } from 'react'
import { BsDiscord } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import { RiTwitterXLine } from 'react-icons/ri'

interface FaqsProp {
  hackathon: HackathonExtend
}

const Faqs: React.FC<FaqsProp> = ({ hackathon }) => {
  const [expandIndex, setExpandIndex] = useState<number[]>([])
  const handleExpand = (i: number) => {
    const newIndex = ~expandIndex.indexOf(i)
      ? expandIndex.filter(v => v !== i)
      : [...expandIndex, i]
    setExpandIndex(newIndex)
  }
  const [parent] = useAutoAnimate()
  const faqs = hackathon?.info?.sections?.textInfo?.faqs || []
  return (
    <div className="headline-m text-neutral-800">
      <p className="title-3 text-neutral-800">FAQs</p>
      <div className="mt-6">
        {faqs.map((v: any, i: number) => (
          <div
            key={i}
            className="border-neutral-200 border-b py-4"
            ref={parent}
          >
            <div
              className="relative z-[1] flex w-full cursor-pointer items-center justify-between gap-10"
              onClick={() => handleExpand(i)}
            >
              <div className="">{v.question}</div>
              <FiChevronDown
                className={`size-6 flex-shrink-0 transition-all ${~expandIndex.indexOf(i) ? 'rotate-180' : ''}`}
              />
            </div>
            {~expandIndex.indexOf(i) ? (
              <div className="overflow-hidden">
                {(v?.answer as any)?.type === TEXT_EDITOR_TYPE ? (
                  <div
                    className={`mt-4 text-neutral-500`}
                    dangerouslySetInnerHTML={{
                      __html: (v?.answer as any)?.content,
                    }}
                  />
                ) : (
                  <div
                    className={`prose mt-4 text-neutral-500`}
                    dangerouslySetInnerHTML={{ __html: v.answer }}
                  />
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 items-center sm:flex sm:gap-4">
        <span>Can’t find what you’re looking for? Reach out to us!</span>
        <div className="mt-4 flex items-center gap-6 sm:mt-0">
          <Link href={HACKQUEST_DISCORD} target="_blank">
            <span className="flex items-center gap-1">
              Discord <BsDiscord />
            </span>
          </Link>

          <Link href={HACKQUEST_TWITTER} target="_blank">
            <span className="flex items-center gap-1">
              Twitter <RiTwitterXLine />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Faqs
