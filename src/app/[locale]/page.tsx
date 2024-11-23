import { redirect } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Learn and Grow Careers in Web3',
    alternates: alternates(locale, ''),
  }
}

export default function Page() {
  redirect(MenuLink.HOME)
}
