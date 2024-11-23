import { useRouter } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import type React from 'react'

const VerifySuccess: React.FC = () => {
  const router = useRouter()
  router.push(MenuLink.HOME)
  return null
}

export default VerifySuccess
