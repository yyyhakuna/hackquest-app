import { useTranslations } from 'next-intl'
import {
  FiAlertCircle,
  FiArrowLeft,
  FiFile,
  FiFolder,
  FiLink,
} from 'react-icons/fi'
import MenuLink from './menu-link'
import type { SidebarItem } from './sidebar-register'

export const sidebarPressKitRegister = () => {
  const t = useTranslations('PressKit')

  const sidebarPressKitList: SidebarItem[] = [
    {
      type: 'link',
      icon: <FiArrowLeft size={16} />,
      title: t('sideBarPressKit.back'),
      link: MenuLink.HOME,
    },
    {
      type: 'label',
      icon: '',
      title: t('sideBarPressKit.pressKit'),
    },
    {
      type: 'link',
      icon: <FiAlertCircle size={16} />,
      title: t('sideBarPressKit.about'),
      link: MenuLink.PRESS_KIT_ABOUT,
    },
    {
      type: 'link',
      icon: <FiFile size={16} />,
      title: t('sideBarPressKit.article'),
      link: MenuLink.PRESS_KIT_ARTICLE,
    },
    {
      type: 'link',
      icon: <FiFolder size={16} />,
      title: t('sideBarPressKit.logo'),
      link: MenuLink.PRESS_KIT_LOGO,
    },
    {
      type: 'link',
      icon: <FiLink size={16} />,
      title: t('sideBarPressKit.link'),
      link: MenuLink.PRESS_KIT_LINK,
    },
  ]

  return sidebarPressKitList
}
