import {
  type GlobalSearchKey,
  getGlobalSearch,
} from '@/components/global-search-select/utils'
import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import type { Metadata } from 'next'
import Search from './components'

interface SearchPageProps {
  searchParams: {
    searchType: GlobalSearchKey
    keyword: string
  }
  params: {
    locale: string
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  let query = new URLSearchParams(searchParams as any).toString()
  query = query ? '?' + query : ''
  const { locale } = params
  const metadata: Metadata = {
    title: 'Blog',
    alternates: alternates(locale, `${MenuLink.SEARCH}${query}`),
  }

  return metadata
}

const SearchPage: React.FC<SearchPageProps> = async ({
  searchParams: { searchType, keyword },
}) => {
  const list = await getGlobalSearch(keyword, searchType)
  return <Search list={list} keyword={keyword} />
}

export default SearchPage
