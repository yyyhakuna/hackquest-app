
import { QueryClient } from '@tanstack/react-query'
import Publish from './components'
const PublishPage: React.FC = () => {
  const _queryClient = new QueryClient()

  //   await queryClient.prefetchQuery({
  //     queryKey: useListJobStationsQuery.getKey(),
  //     queryFn: useListJobStationsQuery.fetcher({
  //         where: {
  //             userId: {
  //                 equals: userId
  //             }
  //         }
  //     }),
  //   })
  return <Publish />
}

export default PublishPage
