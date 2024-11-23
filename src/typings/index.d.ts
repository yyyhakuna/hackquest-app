declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_MEASUREMENT_ID: string
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string
    NEXT_PUBLIC_EAS_CONTRACT_ADDRESS: string
    NEXT_PUBLIC_EAS_SCHEMA_ID: string
    NEXT_PUBLIC_ETH_SIGN_SCHEMA_ID: string
    NEXT_PUBLIC_VERAX_PORTAL_ADDRESS: string
    NEXT_PUBLIC_VERAX_SCHEMA_ID: string
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
  }
}
