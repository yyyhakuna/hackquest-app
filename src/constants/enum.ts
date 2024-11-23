/** 卡片类型 */
export enum CardType {
  HACKATHON = 'HACKATHON',
  LEARNING_TRACK = 'LEARNING_TRACK',
  SYNTAX = 'SYNTAX',
  TEASER = 'TEASER',
  CONCEPT = 'CONCEPT',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
}

/** Tab类型 */
export enum TabType {
  SYNTAX = 'SYNTAX',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
  CONCEPT = 'CONCEPT',
  TEASER = 'TEASER',
}

export enum LocalStorageKey {
  ShowAICostCoinModal = 'showCostCoinModal',
  ShowAnswerCostCoinModal = 'showAnswerCostCoinModal',
}

export enum Domain {
  DEV = 'https://dev.hackquest.io/',
  STAGING = 'https://test.hackquest.io/',
  PROD = 'https://www.hackquest.io/',
  LOCAL = 'http://localhost:3000/',
}

export const TEXT_EDITOR_TYPE = 'text-editor'

// eas ref uid
export const EAS_REF_UID =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

// zero address
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
