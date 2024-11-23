import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'
import { GRAPHQL_ENDPOINT } from './src/constants/links'

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_ENDPOINT,
  ignoreNoDocuments: true,
  documents: 'src/graphql/documents/**/*.graphql',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    'src/graphql/generated/hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: {
          func: './fetcher#fetcher',
        },
      },
    },
  },
}

export default config
