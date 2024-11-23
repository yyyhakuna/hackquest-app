import { availableLocalesMap, defaultLocale } from '@/i18n/config'
import { monaco, nextBook, nunito } from '@/lib/fonts'
import { WebAppProviders } from '@/providers/root'
import { cn } from '@hackquest/ui/lib/utils'
import type { Metadata, Viewport } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s - HackQuest',
      default: 'HackQuest',
    },
    description: 'Learn and Grow Careers in Web3.',
    robots: {
      index: process.env.RUNTIME_ENV === 'production',
      follow: process.env.RUNTIME_ENV === 'production',
      googleBot: {
        index: process.env.RUNTIME_ENV === 'production',
        follow: process.env.RUNTIME_ENV === 'production',
      },
    },
    icons: {
      icon: [
        {
          url: '/images/logo/logo.svg',
          href: '/images/logo/logo.svg',
        },
      ],
    },
  }
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const { hrefLang, langDir } = availableLocalesMap[locale] || defaultLocale

  return (
    <html lang={hrefLang} dir={langDir} suppressHydrationWarning>
      <body
        className={cn(
          nextBook.variable,
          nunito.variable,
          monaco.variable,
          'flex h-screen w-full font-nunito antialiased',
        )}
      >
        <WebAppProviders>{children}</WebAppProviders>
        <NextTopLoader
          color="hsl(var(--primary-500))"
          height={3}
          shadow={false}
          showSpinner={false}
        />
      </body>
    </html>
  )
}
