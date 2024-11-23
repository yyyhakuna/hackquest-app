import { useListJobStationsQuery } from '@/graphql/generated/hooks'
import { QueryClient } from '@tanstack/react-query'
import Hiring from './components'
const Page = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: useListJobStationsQuery.getKey(),
    queryFn: useListJobStationsQuery.fetcher({
      limit: 1,
    }),
  })
  return (
    <div>
      <Hiring />
    </div>
  )
}

export default Page
