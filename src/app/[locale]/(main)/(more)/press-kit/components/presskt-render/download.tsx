'use client'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import { GrDownload } from 'react-icons/gr'

interface DownloadProp {
  fileName: string
  className?: string
  size?: number
}

const Download: React.FC<DownloadProp> = ({ fileName, className, size = 14 }) => {
  const t = useTranslations('PressKit.logo')

  const downloadFile = () => {
    const origin = window.location.origin
    const url = `${origin}/images/press-kit/${fileName}`
    window.location.href = url
  }

  return (
    <div
      className={cn('headline-s flex items-center gap-[4px] text-neutral-800', className)}
      onClick={downloadFile}
      onKeyUp={() => {}}
    >
      {/* <span>{t('download')}</span> */}
      <Button className="headline-s rounded-xl border border-neutral-600 bg-neutral-50 px-4 py-3 text-primary-neutral">
        <div className="flex gap-2">
          <span>{t('download')}</span>
          <GrDownload size={16} className="text-neutral-800" />
        </div>
      </Button>
    </div>
  )
}

export default Download
