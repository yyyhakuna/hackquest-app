import {
  MutationCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
  matchQuery,
} from '@tanstack/react-query'
import { structuralSharing } from 'wagmi/query'

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // @see https://github.com/wevm/wagmi/issues/4233
        structuralSharing,
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        queryClient.invalidateQueries({
          predicate: query =>
            // invalidate all matching tags at once
            // or everything if no meta is provided
            mutation.meta?.invalidates?.some(queryKey =>
              matchQuery({ queryKey }, query),
            ) ?? true,
        })
      },
    }),
  })

  return queryClient
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
