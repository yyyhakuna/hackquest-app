export const alternates = (locale: string, path: string) => {
  return {
    canonical: `https://www.hackquest.io${locale ? `/${locale}` : ''}${path}`,
    languages: {
      'x-default': `https://www.hackquest.io/${path}`,
      en: `https://www.hackquest.io/en/${path}`,
      zh: `https://www.hackquest.io/zh-cn/${path}`,
    },
  }
}
