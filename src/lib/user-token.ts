import { deleteCookie, setCookie } from 'cookies-next'

export const TOKEN_KEY = 'access_token'
export const DEBUG_TOKEN_KEY = 'debug_token'

export function setToken(token: string) {
  if (typeof window === 'object') {
    localStorage.setItem(TOKEN_KEY, token)
    setCookie(TOKEN_KEY, token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    })
  }
}

export function getToken() {
  if (typeof window === 'object') {
    return localStorage.getItem(TOKEN_KEY) || ''
  } else {
    const { cookies } = require('next/headers')
    return cookies().get(TOKEN_KEY)?.value || ''
  }
}

/** 上线时，通过在设置debug token，可以查看服务端渲染页面具体的请求和错误查询 */
export function getDebugToken() {
  if (typeof window === 'object') {
    return localStorage.getItem(DEBUG_TOKEN_KEY) || ''
  } else {
    const { cookies } = require('next/headers')
    return cookies().get(DEBUG_TOKEN_KEY)?.value || ''
  }
}

export function removeToken() {
  if (typeof window === 'object') {
    localStorage.removeItem(TOKEN_KEY)
    deleteCookie(TOKEN_KEY)
  }
}
