import MenuLink from '@/constants/menu-link'
import { upperFirst } from 'lodash-es'
import type { Metadata } from 'next'
import type React from 'react'
import type { ReactNode } from 'react'
import About from '../components/presskt-render/about'
import Article from '../components/presskt-render/article'
import Links from '../components/presskt-render/links'
import Logo from '../components/presskt-render/logo'
import { PressNav } from '../constants/type'
import { alternates } from '@/constants/metadata'

export async function generateMetadata(props: {
  params: { locale: string; pressKitId: string }
}): Promise<Metadata> {
  const { locale, pressKitId } = props.params

  return {
    title: 'Press Kit',
    alternates: alternates(locale, `${MenuLink.PRESS_KIT}/${pressKitId}`)
  }
}
interface PressKitProp {
  params: { pressKitId: string }
}

const PressKit: React.FC<PressKitProp> = ({ params }) => {
  const { pressKitId } = params

  const MobileTitle = () => {
    return (
      <h1 className="title-3 block pb-6 text-neutral-800 sm:hidden">
        {upperFirst(pressKitId)}
      </h1>
    )
  }

  const showPage: Record<string, ReactNode> = {
    [PressNav.ARTICLE]: (
      <Article>
        <MobileTitle />
      </Article>
    ),
    [PressNav.LOGO]: (
      <Logo>
        <MobileTitle />
      </Logo>
    ),
    [PressNav.LINK]: <Links />,
    [PressNav.ABOUT]: <About />,
  }

  return <div className="px-6 sm:container">{showPage[pressKitId]}</div>
}

export default PressKit
