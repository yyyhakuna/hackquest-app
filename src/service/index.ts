import { BACKEND_BASE_URL } from '@/constants/links'
import { getToken, } from '@/lib/user-token'
import { WebService } from '@hackquest/utils'
// import BlogApi from './blog/api'
import CommonApi from './common/api'
import CourseApi from './course/api'
import EcosystemApi from './ecosystem/api'
import FaucetsApi from './faucets/api'
// import GlossaryApi from './glossary/api'
import JobApi from './jobs/api'
import UserApi from './user/api'

class WebApi {
  protected baseURL: string
  protected service: WebService
  protected timeout = 10000

  public commonApi: CommonApi
  public faucetsApi: FaucetsApi
  public jobApi: JobApi
  public userApi: UserApi
  public ecosystemApi: EcosystemApi
  public courseApi: CourseApi

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.service = new WebService(baseURL, {
      url: '',
      // method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },

      interceptors: {
        requestInterceptor(config) {
          const token = getToken()
          if (token) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            }
          }
          return config
        },
        responseInterceptor(_response: any, data) {
          // const token = (response.headers['authorization'] || '')?.replace('Bearer ', '')
          // typeof window !== 'undefined' &&
          //   token &&
          //   setCookie(TOKEN_KEY, token, {
          //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
          //   })
          // token && setToken(token)
          return data
        },
      },
    })

    this.commonApi = new CommonApi(this.service)
    // this.blogApi = new BlogApi(this.service)
    // this.glossaryApi = new GlossaryApi(this.service)
    this.faucetsApi = new FaucetsApi(this.service)
    this.jobApi = new JobApi(this.service)
    this.userApi = new UserApi(this.service)
    this.commonApi = new CommonApi(this.service)
    this.ecosystemApi = new EcosystemApi(this.service)
    this.courseApi = new CourseApi(this.service)
  }
}

let webApi = null

if (!webApi) {
  webApi = new WebApi(BACKEND_BASE_URL)
}

export default webApi as WebApi
