'use client'

import dayjs from '@/lib/dayjs'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FavoriteButton } from '../../components/favorite-button'
import ApplyJob from './apply-job'

export function Footer({
  favorited,
  id,
  createdAt,
  contact,
}: {
  favorited: boolean
  id: string
  createdAt: string
  contact: Record<string, string>
}) {
  const t = useTranslations('Jobs.detail')
  return (
    <motion.footer
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
      className='absolute bottom-2 flex w-[96%] border-t'
    >
      <div className="mt-2 flex h-full w-full items-center justify-between bg-neutral-white">
        <FavoriteButton favorited={favorited} jobId={id} />
        <div className="flex items-center gap-4">
          <time className="body-s text-secondary-neutral" dateTime={createdAt}>
            {t('update') + ' ' + dayjs(createdAt).fromNow()}
          </time>
          <ApplyJob contact={contact} />
          {/* <Button className="px-9">{t('apply')}</Button> */}
        </div>
      </div>
    </motion.footer>
  )
}
