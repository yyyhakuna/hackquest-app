import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import { execute } from '@/graphql/generated/execute'
import { GetUserInfoDocument, type User } from '@/graphql/generated/graphql'
import { getToken } from '@/lib/user-token'
import type { Metadata } from 'next'
import type React from 'react'
import BuilderHome from './components'

type BuilderHomePageProp = {
  params: {
    locale: string
  }
}

export async function generateMetadata({
  params,
}: BuilderHomePageProp): Promise<Metadata> {
  const { locale } = params
  const metadata: Metadata = {
    title: 'Builder Home',
    alternates: alternates(locale, `${MenuLink.BUILDER_HOME}`),
  }

  return metadata
}

const BuilderHomePage: React.FC = async () => {
  let userInfo
  if (getToken()) userInfo = await execute(GetUserInfoDocument)
  return <BuilderHome userInfo={userInfo?.user as User} />
}

export default BuilderHomePage
