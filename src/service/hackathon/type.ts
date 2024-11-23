export type HackathonParterKeys =
  | 'partners'
  | 'mediaPartners'
  | 'communityPartners'
  | 'coHosts'
  | 'hosts'
export type HackathonSponsorsKeys = 'speakers' | 'sponsors'
export type HackathonThemeResource = 'theme' | 'resource'

export enum HackathonCustomType {
  CUSTOM_TEXT = 'customText',
  CUSTOM_IMAGE_NAME = 'customTextImageName',
  CUSTOM_IMAGE_TITLE = 'customTextImageTitle',
}

export interface MentorType {
  name: string
  title: string
  picture: string
  id: string
}
export interface HackathonInfoSectionCustomType {
  id: string
  type: HackathonCustomType
  title: string
  text: any
  list: MentorType[]
}
