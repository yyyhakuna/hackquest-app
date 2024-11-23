import { useTranslations } from 'next-intl'

const usePasswordValidates = () => {
  const t = useTranslations()
  const getValidates = (password: string) => {
    const passwordStatus = [
      {
        label: t('Auth.verifyText.lowercaseCharacters'),
        isValid: false,
        reg: /[a-z]+/,
      },
      {
        label: t('Auth.verifyText.uppercaseCharacters'),
        isValid: false,
        reg: /[A-Z]+/,
      },
      {
        label: t('Auth.verifyText.numbers'),
        isValid: false,
        reg: /\d+/,
      },
      {
        label: t('Auth.verifyText.charactersMinimum'),
        isValid: false,
        reg: /^.{8,}/,
      },
    ]
    passwordStatus.map(v => {
      if (v.reg.test(password)) {
        v.isValid = true
      }
    })
    return passwordStatus
  }
  return {
    getValidates,
  }
}

export default usePasswordValidates
