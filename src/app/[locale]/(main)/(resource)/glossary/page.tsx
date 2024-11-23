import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import {
  type Glossary,
  useListGlossarysQuery,
  useListGlossarysTracksQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import type React from 'react'
import GlossaryContent from './components'
import type { LetterDataType } from './components/filter-letter'
import type { GlossaryListType } from './constants/type'

export type GlossaryPageProp = {
  params: { locale: string }
  searchParams: Record<string, any>
}

export async function generateMetadata({
  params,
}: GlossaryPageProp): Promise<Metadata> {
  const { locale } = params
  const metadata: Metadata = {
    title: 'Glossary',
    alternates: alternates(locale, MenuLink.GLOSSARY),
  }

  return metadata
}

const GlossaryPage: React.FC<GlossaryPageProp> = async ({ searchParams }) => {
  const track = searchParams.track
  const queryClient = getQueryClient()
  const { listGlossarys } = await queryClient.fetchQuery({
    queryKey: useListGlossarysQuery.getKey(),
    queryFn: useListGlossarysQuery.fetcher({
      page: -1,
    }),
  })
  const allGlossaries = listGlossarys.data as Glossary[]
  const { listGlossarysTracks } = await queryClient.fetchQuery({
    queryKey: useListGlossarysTracksQuery.getKey(),
    queryFn: useListGlossarysTracksQuery.fetcher(),
  })

  const dealList = () => {
    const tracks = track?.split(',') || []
    const gList = !tracks.length
      ? allGlossaries
      : allGlossaries?.filter(v => v?.tracks?.some(vv => tracks.includes(vv)))
    const newGlossaryList: GlossaryListType[] = []
    const letters: LetterDataType[] = []
    gList.forEach(v => {
      const firstLetter = v.title.charAt(0).toUpperCase()
      if (/\w/.test(firstLetter)) {
        if (!letters.some(v => v.value === firstLetter)) {
          letters.push({
            value: firstLetter,
            label: firstLetter,
          })
          const obj = {
            letter: firstLetter,
            list: [v],
          }
          newGlossaryList.push(obj)
        } else {
          const index = newGlossaryList.findIndex(g => g.letter === firstLetter)
          newGlossaryList[index]?.list?.push(v)
        }
      }
    })
    return {
      newGlossaryList,
      letters,
      tracks,
    }
  }
  const { newGlossaryList, letters, tracks } = dealList()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GlossaryContent
        tracks={tracks}
        filterTracks={listGlossarysTracks as string[]}
        list={newGlossaryList}
        letterData={letters}
      />
    </HydrationBoundary>
  )
}

export default GlossaryPage
