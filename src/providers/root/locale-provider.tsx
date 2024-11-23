import { NextIntlClientProvider, useMessages, useTimeZone } from 'next-intl'

export const LocaleProvider: Component = ({ children }) => {
  const messages = useMessages()
  const timeZone = useTimeZone()

  return (
    <NextIntlClientProvider messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  )
}
