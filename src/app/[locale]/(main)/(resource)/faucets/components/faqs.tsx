'use client'

import { Link } from '@/app/navigation'
import { HACKQUEST_DISCORD, HACKQUEST_TWITTER } from '@/constants/links'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@hackquest/ui/shared/accordion'
import { useTranslations } from 'next-intl'
import { BsDiscord } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'
import { FAQData } from '../constants/data'

const FAQS = () => {
  const t = useTranslations('Faucets.faucetFaq')

  return (
    <>
      <div className="pt-8">
        <h1 className="title-3 pb-2 text-neutral-800">{t('title')}</h1>
        <div>
          <Accordion type="single" collapsible className="w-full ">
            {FAQData.map((faq, index) => (
              <div
                className="border-neutral-200 border-b-[1px] py-4"
                key={index}
              >
                <AccordionItem
                  className="rounded-lg hover:bg-neutral-100"
                  value={`problem-${index}`}
                >
                  {/* border-neutral-200 border-b-[1px] */}
                  <AccordionTrigger className="headline-m py-2 pl-2 text-left text-neutral-800">
                    {t(faq.problem)}
                  </AccordionTrigger>
                  <AccordionContent className="body-s pl-2 text-secondary-neutral">
                    {t(faq.answer)}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
        <div className="block pt-4 text-neutral-800 sm:flex">
          <div className="headline-m pl-2">
            <p>Can’t find what you’re looking for? Reach out to us!</p>
          </div>
          <div className="flex items-center pt-4 sm:pt-0">
            <Link
              href={HACKQUEST_DISCORD}
              className="headline-s ml-0 cursor-pointer sm:ml-4"
            >
              <div className="flex items-center">
                <p className="pr-1">Discord</p>
                <BsDiscord size={16} />
              </div>
            </Link>
            <Link
              href={HACKQUEST_TWITTER}
              className="headline-s ml-6 cursor-pointer"
            >
              <div className="flex items-center">
                <p className="pr-1">Twitter</p>
                <FaXTwitter size={16} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQS
