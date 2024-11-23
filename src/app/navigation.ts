import { routing } from '@/i18n/config'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing)
