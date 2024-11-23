import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import { useShallow } from 'zustand/react/shallow'

export function Unauthorized() {
  const t = useTranslations()
  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )
  return (
    <div className="ml-auto flex items-center gap-4">
      <Button
        variant="outline"
        color="neutral"
        className="h-9"
        onClick={() => {
          setAuthModalOpen(true)
          setAuthType(AuthType.SIGN_IN)
        }}
      >
        {t('Auth.signIn')}
      </Button>
      <Button
        className="h-9"
        onClick={() => {
          setAuthModalOpen(true)
          setAuthType(AuthType.EMAIL_CHECK)
        }}
      >
        {t('Auth.signUp')}
      </Button>
    </div>
  )
}
