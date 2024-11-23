import fetchPonyfill from 'fetch-ponyfill'
import { GRAPHQL_ENDPOINT } from '@/constants/links'
import { getDebugToken, getToken } from '@/lib/user-token'

function extractGraphQLName(queryString:string) {
  // 正则表达式匹配 "query" 或 "mutation" 后的名称
  const regex = /(query|mutation)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/
  const match = queryString.match(regex)
  
  if (match && match[2]) {
    return match[2] // 返回查询或变更的名称
  } else {
    return null // 如果没有匹配到则返回 null
  }
}


export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers: RequestInit['headers'] = {},
) {
  return async (): Promise<TData> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZjM0ZDE5LWFiZjgtNDQ2Ni04YzU1LTE4NWE2NWVjYTJhOSIsImVtYWlsIjoiY2FtZXJvbkBtb29uc2hvdGNvbW1vbnMuY29tIiwibmFtZSI6bnVsbCwicm9sZSI6IkFETUlOIiwidm90ZVJvbGUiOiJVU0VSIiwiaWF0IjoxNzMwMzU1MzQ5LCJleHAiOjE3NjE4OTEzNDl9.mbqQO3MveLBITyrkH0MKP-QQ0FXdAwEzkgPPuGowhG4'
    }
    // const token = getToken()
    // if (token) {
    //   headers['Authorization'] = `Bearer ${getToken()}`
    // }

    const response = await fetchPonyfill().fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const json = await response.json()
    if (json.errors) {
      const { message } = json.errors[0]
      const debugToken = getDebugToken()

      let errorMessage = message || 'Network response was not ok'

      if(debugToken) {
        errorMessage = `
        Error Message: ${message || 'Network response was not ok'}
        Query Name: ${extractGraphQLName(query)}
        Query: ${query}
        Variables: ${JSON.stringify(variables)}
        `
      }

      throw errorMessage
    }

    return json.data
  }
}
