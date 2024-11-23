import { Nunito } from 'next/font/google'
import localFont from 'next/font/local'

export const nextBook = localFont({
  src: [
    {
      path: '../../public/fonts/NEXTBook.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/NEXTBook-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-next-book',
})

export const monaco = localFont({
  src: [
    {
      path: '../../public/fonts/Monaco.ttf',
      weight: '400',
    },
  ],
  variable: '--font-monaco',
})

export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})
