import fetchPonyfill from 'fetch-ponyfill'
import { getToken } from '@/lib/user-token'
import type { TypedDocumentString } from './graphql'
import {  GRAPHQL_ENDPOINT } from '@/constants/links'

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/graphql-response+json',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZjM0ZDE5LWFiZjgtNDQ2Ni04YzU1LTE4NWE2NWVjYTJhOSIsImVtYWlsIjoiY2FtZXJvbkBtb29uc2hvdGNvbW1vbnMuY29tIiwibmFtZSI6bnVsbCwicm9sZSI6IkFETUlOIiwidm90ZVJvbGUiOiJVU0VSIiwiaWF0IjoxNzMwMzU1MzQ5LCJleHAiOjE3NjE4OTEzNDl9.mbqQO3MveLBITyrkH0MKP-QQ0FXdAwEzkgPPuGowhG4'
  }

  // const token = getToken()
  //   if (token) {
  //     headers['Authorization'] = `Bearer ${getToken()}`
  //   }

  const response = await fetchPonyfill().fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const res = (await response.json()) as { data: TResult; errors?: { message: string }[] }
  if (res.errors) {
    throw new Error(res.errors?.[0]?.message || 'Network response was not ok')
  }
  return res.data
}
