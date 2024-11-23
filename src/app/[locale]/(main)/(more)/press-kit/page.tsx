import MenuLink from '@/constants/menu-link'
import { permanentRedirect } from 'next/navigation'
import type React from 'react'
import { pressKitNavData } from './constants/data'

// type PressKitProp = {}

const PressKit: React.FC = () => {
  permanentRedirect(`${MenuLink.PRESS_KIT}/${pressKitNavData[0]?.id}`)
}

export default PressKit
