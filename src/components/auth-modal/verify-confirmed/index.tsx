import type React from 'react'

enum VerifyStateType {
  VERIFYING = 'verifying',
  SUCCESS = 'success',
  FAIL = 'fail',
}

const VerifyConfirmed: React.FC = () => {
  // const { setUserInfo, setAuthType, setAuthModalOpen } = useAuthStore(
  //   useShallow(state => ({
  //     setUserInfo: state.setUserInfo,
  //     setAuthType: state.setAuthType,
  //     setAuthModalOpen: state.setAuthModalOpen,
  //   })),
  // )

  // const query = useSearchParams()
  // const router = useRouter()
  // const [verifyState, setVerifyState] = useState(VerifyStateType.VERIFYING)
  // const [source, setSource] = useState<ThirdPartyAuthType>(ThirdPartyAuthType.EMAIL)

  // const { mutate: verifyEmail } = useMutation({
  //   mutationFn: async (token: string) => {
  //     if (token) {
  //       return webApi.userApi.tokenVerify({ token: token as string })
  //     }
  //     return new Promise((_, reject) => {
  //       reject()
  //     })
  //   },
  //   onSuccess: (res: any, token) => {
  //     if (res.status === 'UNACTIVATED') {
  //       setVerifyState(VerifyStateType.FAIL)
  //     } else {
  //       setVerifyState(VerifyStateType.SUCCESS)
  //       setUserInfo(omit(res, 'token'))
  //       setToken(res.token || token)
  //       setAuthModalOpen(false)
  //       localStorage.removeItem('completeProfile')
  //       router.refresh()
  //     }
  //   },
  //   onError: () => {
  //     setVerifyState(VerifyStateType.FAIL)
  //   },
  // })

  // const { mutate: verifyGoogle } = useMutation({
  //   mutationFn: async ({
  //     code,
  //     inviteCode,
  //   }: {
  //     code: string
  //     inviteCode: string
  //   }) => {
  //     if (code) {
  //       return webApi.userApi.googleVerify(code)
  //     }
  //     return new Promise((_, reject) => {
  //       reject()
  //     })
  //   },
  //   onSuccess: (res: any, params) => {
  //     if (res.status === 'UNACTIVATED') {
  //       setTimeout(() => {
  //         setAuthType({
  //           type: AuthType.INVITE_CODE,
  //           params: {
  //             registerType: ThirdPartyAuthType.GOOGLE,
  //             ...res,
  //           },
  //         })
  //       }, 1000)
  //       router.replace(`/?type=${AuthType.INVITE_CODE}&inviteCode=${params.inviteCode}`)
  //     } else {
  //       setUserInfo(omit(res, 'token'))
  //       setToken(res.token)
  //       setAuthModalOpen(false)
  //       router.refresh()
  //     }
  //   },
  //   onError: () => {
  //     setVerifyState(VerifyStateType.FAIL)
  //   },
  // })

  // const { mutate: verifyGithub } = useMutation({
  //   mutationFn: async ({
  //     code,
  //     inviteCode,
  //   }: {
  //     code: string
  //     inviteCode: string
  //   }) => {
  //     if (code) {
  //       return webApi.userApi.githubVerify(code)
  //     }
  //     return new Promise((_, reject) => {
  //       reject()
  //     })
  //   },
  //   onSuccess: (res: any, params) => {
  //     if (res.status === 'UNACTIVATED') {
  //       setTimeout(() => {
  //         setAuthType({
  //           type: AuthType.INVITE_CODE,
  //           params: {
  //             registerType: ThirdPartyAuthType.GITHUB,
  //             ...res,
  //           },
  //         })
  //       }, 1000)
  //       router.replace(`/?type=${AuthType.INVITE_CODE}&inviteCode=${params.inviteCode}`)
  //     } else {
  //       setUserInfo(omit(res, 'token'))
  //       setToken(res.token)
  //       setAuthModalOpen(false)
  //       router.refresh()
  //     }
  //   },
  //   onError: () => {
  //     setVerifyState(VerifyStateType.FAIL)
  //   },
  // })

  // // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   const token = query.get('token')
  //   const state = query.get('state')
  //   const code = query.get('code')
  //   let querySource = query.get('source') || ThirdPartyAuthType.EMAIL
  //   let verifyData
  //   if (state) {
  //     verifyData = JSON.parse(atob(state as string))
  //     verifyData?.source && (querySource = verifyData?.source)
  //   }
  //   querySource = (querySource as string).toLocaleLowerCase().replace(/^\w/, s => s.toLocaleUpperCase())
  //   setSource(querySource as ThirdPartyAuthType)
  //   const codeInfo = {
  //     code:code as string,
  //     inviteCode: verifyData?.inviteCode || '',
  //   }
  //   switch (querySource) {
  //     case ThirdPartyAuthType.GOOGLE:
  //       verifyGoogle(codeInfo)
  //       break
  //     case ThirdPartyAuthType.GITHUB:
  //       verifyGithub(codeInfo)
  //       break
  //     default:
  //       verifyEmail(token as string)
  //   }
  // }, [])

  // return (
  //   <MotionContent>
  //     {verifyState === VerifyStateType.VERIFYING && <Verifying />}
  //     {verifyState === VerifyStateType.SUCCESS && <VerifySuccess />}
  //     {verifyState === VerifyStateType.FAIL && <VerifyFail />}
  //   </MotionContent>
  // )

  return null
}

export default VerifyConfirmed
