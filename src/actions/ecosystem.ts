'use server'

import { GRAPHQL_ENDPOINT } from '@/constants/links'
import {
  FindActiveEcosystemDocument,
  SwitchEcosystemDocument,
} from '@/graphql/generated/hooks'
import { getToken } from '@/lib/user-token'
import fetchPonyfill from 'fetch-ponyfill'
import { revalidateTag } from 'next/cache'

const CACHE_TAG = 'active-ecosystem'

export async function getActiveEcosystem() {
  const token = getToken()

  if (!token) return null

  const data = await fetchPonyfill().fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: FindActiveEcosystemDocument,
    }),
    next: {
      tags: [CACHE_TAG],
    },
  })

  const json = await data.json()

  return json.data.ecosystem
}

export async function switchEcosystem(ecosystemId: string) {
  await fetchPonyfill().fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      query: SwitchEcosystemDocument,
      variables: { ecosystemId },
    }),
  })

  revalidateTag(CACHE_TAG)
}
