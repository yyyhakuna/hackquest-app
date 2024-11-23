import { execute } from '@/graphql/generated/execute'
import {
  CreateFaucetClaimDocument,
  type CreateFaucetClaimMutationVariables,
  GetAllFaucetsDocument,
  type GetAllFaucetsQueryVariables,
  GetFaucetDetailByIdDocument,
  type GetFaucetDetailByIdQueryVariables,
  ListFaucetsClaimRecordByChainIdDocument,
  type ListFaucetsClaimRecordByChainIdQueryVariables,
} from '@/graphql/generated/graphql'
import { type DefaultError, type UseMutationOptions, queryOptions, useMutation } from '@tanstack/react-query'

export const faucetsQueryOptions = (where: GetAllFaucetsQueryVariables) => {
  return queryOptions({
    queryKey: ['faucets-get', where],
    queryFn: async () => execute(GetAllFaucetsDocument, where),
  })
}

export const faucetDetailQueryOptions = (where: GetFaucetDetailByIdQueryVariables) => {
  return queryOptions({
    queryKey: ['faucet-detail-get', where],
    queryFn: async () => execute(GetFaucetDetailByIdDocument, where),
  })
}

export const useFaucetClaimMutation = (
  options?: UseMutationOptions<unknown, DefaultError, CreateFaucetClaimMutationVariables>,
) => {
  return useMutation<unknown, DefaultError, CreateFaucetClaimMutationVariables>({
    mutationFn: (data: CreateFaucetClaimMutationVariables) => execute(CreateFaucetClaimDocument, data),
    ...options,
  })
}

export const faucetRecordsQueryOptions = (variabales: ListFaucetsClaimRecordByChainIdQueryVariables) => {
  return queryOptions({
    queryKey: ['faucet-records-get', variabales],
    queryFn: () => execute(ListFaucetsClaimRecordByChainIdDocument, variabales),
  })
}
