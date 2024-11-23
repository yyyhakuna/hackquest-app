import { Domain } from '@/constants/enum'
import type MenuLink from '@/constants/menu-link'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import * as z from 'zod'

/** 向下保留小数  */
export const decimalCount = (number: number, digit = 1) => {
  if (isNaN(number)) return 0
  if (digit < 1) return number
  const digitHundred = Number.parseInt(`1${'0'.repeat(digit)}`)
  return Math.floor(number * digitHundred) / digitHundred
}

export const getDomain = (domain: string) => {
  switch (domain) {
    case 'dev':
      return Domain.DEV
    case 'staging':
      return Domain.STAGING
    case 'production':
      return Domain.PROD
    default:
      return Domain.LOCAL
  }
}

const checkByRegExp = (regExp: RegExp) => {
  return function (str: string) {
    return regExp.test(str)
  }
}

export const isEthAddress = checkByRegExp(/^(0x)?[0-9a-fA-F]{40}$/)

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`
  return `${pathname}${queryString}`
}

export const getSearchParamsUrl = (
  info: Record<string, any>,
  path: keyof typeof MenuLink,
) => {
  if (typeof window !== 'object') return ''
  const url = new URL(path, window.location.href)
  for (const key in info) {
    const value = info[key as keyof typeof info]
    if (!value) continue
    url.searchParams.append(key, value)
  }
  return url.toString()
}

export const onAllMediaLoaded = (
  container: HTMLDivElement,
  callback: VoidFunction,
) => {
  const mediaElements = container.querySelectorAll('img, video')
  let loadedCount = 0
  const totalMedia = mediaElements.length

  if (totalMedia === 0) {
    callback()
    return
  }

  mediaElements.forEach((media: any) => {
    // 检查 img 元素
    if (media.tagName.toLowerCase() === 'img') {
      if (media.complete) {
        incrementLoadedCount()
      } else {
        media.addEventListener('load', incrementLoadedCount)
        media.addEventListener('error', incrementLoadedCount)
      }
    }

    // 检查 video 元素
    if (media.tagName.toLowerCase() === 'video') {
      if (media.readyState >= 3) {
        // `readyState` 3 表示可以播放
        incrementLoadedCount()
      } else {
        media.addEventListener('loadeddata', incrementLoadedCount)
        media.addEventListener('error', incrementLoadedCount)
      }
    }
  })

  function incrementLoadedCount() {
    loadedCount++
    if (loadedCount === totalMedia) {
      callback()
    }
  }
}

export const getYoutubeId = (url: string) => {
  if (!url) return ''
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/)?([\w-]{11})(?:\S+)?$/
  const match = url.match(regex)

  // 如果匹配成功，则返回视频 ID
  if (match && match[1]) {
    return match[1]
  }
  return ''
}

export const copyText = async (text?: string) => {
  if (!text) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.warn('There is nothing to copy!')
  }
  try {
    await navigator.clipboard.writeText(text || '')
  } catch (_e) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.warn('The browser version is too low or incompatible！')
  }
}

export const transformQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

/**
 * 根据字符串生成一个负数id
 * @param str
 * @returns
 */
export const generateChainId = (str: string) => {
  let chainId = Number(stringToAscii()) << 10
  chainId = chainId > 0 ? chainId * -1 : chainId
  return chainId

  function stringToAscii() {
    return str
      .split('')
      .map(char => char.charCodeAt(0))
      .join('')
  }
}

export function enumToOptions<T extends Record<string, string>>(enumObj: T) {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: value,
  }))
}

export const separationNumber = (num: number, maxNum?: number) => {
  if (typeof num !== 'number' || isNaN(num)) return 0
  const isMaxNum = maxNum && num > maxNum
  let sNum
  if (isMaxNum) {
    sNum = maxNum
  } else {
    sNum = num
  }
  const str = String(sNum).replace(/(?!^)(?=(\d{3})+$)/g, ',')
  return isMaxNum ? `${str}+` : str
}

export function getZodKeys<T extends z.ZodTypeAny>(schema: T): string[] {
  if (schema === null || schema === undefined) {
    return []
  }
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getZodKeys(schema.unwrap())
  }
  if (schema instanceof z.ZodArray) {
    return getZodKeys(schema.element)
  }
  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape)
    return entries.flatMap(([key, value]) => {
      const nested =
        value instanceof z.ZodType
          ? getZodKeys(value).map(subKey => `${key}.${subKey}`)
          : []
      return nested.length ? nested : key
    })
  }
  return []
}

export function shortenHex(hex: string, length = 4) {
  return `${hex.slice(0, length + 2)}...${hex.slice(-length)}`
}

export function openWindow(url: string) {
  const width = 550
  const height = 470
  const left = Math.max(0, (screen.width - width) / 2)
  const top = Math.max(0, (screen.height - height) / 2)
  window.open(
    url,
    'authWindow',
    `width=${width},height=${height},left=${left},top=${top}status=0,location=0,toolbar=0,menubar=0`,
  )
}

export const changeTextareaHeight = (
  target: HTMLTextAreaElement,
  minHeight = 25,
) => {
  // 重置textarea的高度为默认值，以便可以正确计算其内容的高度
  target.style.height = `${minHeight}px`
  // 获取textarea的内容高度，并加上padding和border的高度
  const height =
    target.scrollHeight < minHeight ? minHeight : target.scrollHeight
  // 将textarea的高度设置为内容高度
  target.style.height = height + 'px'
}

//元素抖动
export const elementVibration = (ele: HTMLElement) => {
  ele.classList.add('input-quiver')
  setTimeout(() => {
    ele.classList.remove('input-quiver')
  }, 300)
}

export const adaptWidth = (target: HTMLInputElement, minWidth = 110) => {
  const parentEleWidth =
    target.parentElement?.getBoundingClientRect().width || 0
  const len = target.value.length
  let width = len * 7.6
  if (width < minWidth) width = minWidth
  else if (width > parentEleWidth / 2) width = parentEleWidth / 2
  target.style.width = `${width}px`
}

export const changeInputWidth = (target: HTMLInputElement, minWidth = 110) => {
  target.style.width = `${minWidth}px`
  // 获取input的内容宽度，并加上padding和border的高度
  const width = target.scrollWidth < minWidth ? minWidth : target.scrollWidth
  // 将input的宽度设置为内容宽度
  target.style.width = `${width}px`
}
