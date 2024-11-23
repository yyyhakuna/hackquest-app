import { transformQueryString } from '@/lib/utils'
import type { WebService } from '@hackquest/utils'
import {
  type LoginParamsType,
  type LoginResponse,
  type RegisterParamsType,
  type RegisterResponse,
  ThirdPartyAuthType,
  type UserProfileType,
} from './type'

export enum UserApiType {
  CheckEmail = '/users/verify-email',
  UserRegister = '/users',
  UserLogin = '/users/signin',
  TokenVerify = '/users/token',
  UpdatePassword = '/users/update-password',
  ForgetPassword = '/users/forgot-password',
  UploadAvatar = '/users/upload-avatar',
  UserInfo = '/users/info',
  AuthGoogle = 'auth/google',
  AuthGithub = 'auth/github',
  AuthDiscord = '/auth/discord',
  googleVerify = 'auth/google/callback',
  githubVerify = 'auth/github/callback',
  CheckInViteCode = '/users/verify-inviteCode',
  WalletVerify = '/auth/wallet',
  UserProfile = '/users/profile',
}

class UserApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  /** 检查邮箱是否存在 */
  checkEmailExists(email: string) {
    return this.service.post<{ exists: boolean; inWhitelist: boolean }>(`${UserApiType.CheckEmail}`, {
      data: { email },
    })
  }

  /** 用户注册 */
  userRegister(params: RegisterParamsType) {
    return this.service.post<RegisterResponse>(`${UserApiType.UserRegister}`, {
      data: params,
    })
  }

  /** 检查邀请码 */
  checkInviteCode(inviteCode: string) {
    return this.service.post<{ valid: boolean }>(UserApiType.CheckInViteCode, {
      data: { inviteCode },
    })
  }

  /** 检查邀请码 */
  checkInviteCodeByThirdParty(inviteCode: string, token: string) {
    return this.service.post<{ token: string }>('/users/invitee', {
      data: { inviteCode, token },
    })
  }

  /** 用户登录 */
  userLogin(params: LoginParamsType) {
    return this.service.post<LoginResponse | { isFail: boolean; msg: string }>(`${UserApiType.UserLogin}`, {
      data: params,
    })
  }

  /** 上传头像 */
  uploadAvatar(file: FormData) {
    return this.service.post<{ avatar: string }>(UserApiType.UploadAvatar, {
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  getUserProfileByUsername(username: string) {
    return this.service.get<UserProfileType>(`${UserApiType.UserProfile}/${username}`)
  }

  /** 更新密码 */
  updatePassword(params: {
    token?: string
    password?: string
    newPassword: string
    reenterPassword: string
    isForgot?: boolean
  }) {
    return this.service.post(UserApiType.UpdatePassword, {
      data: params,
    })
  }

  forgetPassword(email: string) {
    const queryString = transformQueryString({ email })
    const url = `${UserApiType.ForgetPassword}?${queryString}`
    return this.service.get(url)
  }

  /** 邮箱链接点击以后验证token */
  tokenVerify(token: { token: string }) {
    return this.service.post<LoginResponse>(UserApiType.TokenVerify, {
      data: token,
    })
  }

  /**
   * 三方登录
   */
  getAuthUrl(type: ThirdPartyAuthType, params?: object) {
    const url = type === ThirdPartyAuthType.GOOGLE ? UserApiType.AuthGoogle : UserApiType.AuthGithub
    return this.service.get(url, { params })
  }

  /** 谷歌验证 */
  googleVerify(code: string) {
    return this.service.get<LoginResponse>(`${UserApiType.googleVerify}?code=${code}`)
  }

  /** github验证 */
  githubVerify(code: string) {
    return this.service.get<LoginResponse>(`${UserApiType.githubVerify}?code=${code}`)
  }

  /** metamask验证 */
  walletVerify(account: string, type = 'metamask') {
    return this.service.post<LoginResponse>(UserApiType.WalletVerify, {
      data: {
        account,
        type,
      },
    })
  }

  /** 获取用户信息 */
  getUserProfile() {
    return this.service.get<UserProfileType>(UserApiType.UserProfile)
  }
}

export default UserApi
