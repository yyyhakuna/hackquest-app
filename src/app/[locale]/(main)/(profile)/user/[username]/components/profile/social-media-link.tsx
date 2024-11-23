import { Link } from '@/app/navigation'
import { isUrl } from '@/lib/is'
import { FaGithub, FaLinkedin, FaTelegram, FaXTwitter } from 'react-icons/fa6'
import { useDialogStore } from '../../utils/store'

const SOCIAL_CONFIG = {
  twitter: {
    icon: FaXTwitter,
    baseUrl: 'https://x.com/',
    className: 'text-social-twitter',
  },
  linkedIn: {
    icon: FaLinkedin,
    baseUrl: 'https://linkedin.com/in/',
    className: 'text-social-linkedin',
  },
  telegram: {
    icon: FaTelegram,
    baseUrl: 'https://t.me/',
    className: 'text-social-telegram',
  },
  github: {
    icon: FaGithub,
    baseUrl: 'https://github.com/',
    className: 'text-social-github',
  },
} as const

export function SocialMediaLink({
  type,
  url,
}: {
  type: keyof typeof SOCIAL_CONFIG
  url?: string
}) {
  const { onOpen } = useDialogStore()
  const { icon: Icon, baseUrl, className } = SOCIAL_CONFIG[type]

  return (
    <Link
      href={url ? (isUrl(url) ? url : `${baseUrl}${url}`) : '#'}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
      className={url ? 'opacity-100' : 'opacity-30'}
      onClick={event => {
        if (!url) {
          event.nativeEvent.stopImmediatePropagation()
          onOpen('edit-profile')
        }
      }}
    >
      <Icon className={`size-6 ${className}`} />
    </Link>
  )
}
