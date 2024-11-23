export enum HackathonSectionsValue {
  TEXT_INFO = 'textInfo',
  PARTNERS = 'partners',
  SPEAKERS_JUDGES = 'speakersJudges',
  TO_DO = 'toDo',
}

export enum HackathonTextInfoValueType {
  FAQS = 'faqs',
  RESOURCE = 'resource',
  ANOTHER = 'another',
}

export interface HackathonTextInfoContentType {
  id: string
  title?: string
  question?: string
  answer?: string
  description?: string
}
export interface HackathonTextInfoType {
  [HackathonTextInfoValueType.FAQS]: HackathonTextInfoContentType[]
  [HackathonTextInfoValueType.RESOURCE]: HackathonTextInfoContentType[]
  [HackathonTextInfoValueType.ANOTHER]: HackathonTextInfoContentType[]
}

export enum HackathonPartnersSpeakersValueType {
  PARTNER = 'partner',
  MENTORS = 'mentors',
  SPEAKERS = 'speakers',
  JUDGES = 'judges',
  SPONSORS = 'sponsors',
  ANOTHER = 'another',
}

export enum HackathonPartnerAccountValueType {
  NAME = 'name',
  INTRO = 'intro',
}

export interface HackathonPartnerAccountType {
  id: string
  avatar: string
  name: string
  intro: string
  link: string
  type: HackathonPartnerAccountValueType
}

export interface HackathonPartnersContentType {
  id: string
  type: HackathonPartnerAccountValueType
  title: string
  accounts: HackathonPartnerAccountType[]
}

export interface HackathonPartnersSpeakersType {
  [HackathonPartnersSpeakersValueType.PARTNER]: HackathonPartnersContentType[]
  [HackathonPartnersSpeakersValueType.ANOTHER]: HackathonPartnersContentType[]
  [HackathonPartnersSpeakersValueType.MENTORS]: HackathonPartnersContentType[]
  [HackathonPartnersSpeakersValueType.SPEAKERS]: HackathonPartnersContentType[]
  [HackathonPartnersSpeakersValueType.JUDGES]: HackathonPartnersContentType[]
  [HackathonPartnersSpeakersValueType.SPONSORS]: HackathonPartnersContentType[]
}

export interface PartnersJudgesDataType {
  value: HackathonPartnersSpeakersValueType
  title: string
  type: HackathonPartnerAccountValueType
}

export enum HackathonToDoType {
  INIT = 'init',
  CUSTOMS = 'customs',
  HACKATHON = 'hackathon',
}
