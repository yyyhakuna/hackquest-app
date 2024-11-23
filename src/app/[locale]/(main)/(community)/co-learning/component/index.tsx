'use client'
import { usePathname, useRouter } from '@/app/navigation'
import {
  type CoLearning,
  CoLearningStatus,
  useListCoLearningQuery,
} from '@/graphql/generated/hooks'
import { createUrl } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import CoLearningCard from './co-leaning-card'
import { CoLearningTabs } from './colearning-tabs'

const CoLearningPage = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const tab = searchParams.get('tab') || ''
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const router = useRouter()
  const _updatePage = (newPage: number) => {
    if (newPage === page) return
    if (newPage === 1) {
      currentParams.delete('page')
    } else {
      currentParams.set('page', String(newPage))
    }
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  const getParams = () => {
    switch (tab) {
      case 'Ongoing':
        return { where: { status: CoLearningStatus.OnGoing } }
      case 'Upcoming':
        return { where: { status: CoLearningStatus.OnGoing } }
      case 'Past':
        return { where: { status: CoLearningStatus.OnGoing } }
      default:
        return { where: { status: CoLearningStatus.Publish } }
    }
  }
  const { data } = useSuspenseQuery({
    queryKey: useListCoLearningQuery.getKey(getParams()),
    queryFn: useListCoLearningQuery.fetcher(getParams()),
  })
  const coLearnings = data.listCoLearning.data ?? []

  return (
    <div className="container sm:p-6 ">
      <div className="mb-6 space-y-4 sm:mb-14">
        <div className="flex items-end justify-between">
          <h1 className="title-1 text-primary-neutral">Co-learning Camp</h1>
          <img
            src="/images/jobs/asset.svg"
            alt=""
            className="h-[55px] w-[55px] sm:hidden"
          />
        </div>
        <div className="body-m text-secondary-neutral">
          Learn with the community, build your first Web3 Projects together with
          your peers
        </div>
      </div>
      <CoLearningTabs />
      <div className="mt-6 flex flex-1 flex-col gap-6">
        {coLearnings.length ? (
          coLearnings.map(coLearning => (
            <CoLearningCard
              key={coLearning.id}
              coLearning={coLearning as CoLearning}
            />
          ))
        ) : (
          <div>not found</div>
        )}
      </div>
    </div>
  )
}

export default CoLearningPage
