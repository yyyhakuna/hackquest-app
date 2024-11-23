export interface EcosystemType {
  id: string
  name: string
  description: string
  image: string
  lang: string
  language: string
  tags: string[]
  track: string
  certificateDesc: string
  enrolled: boolean
  projectCount: number
}

export enum CourseType {
  SYNTAX = 'SYNTAX',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
  LEARNING_TRACK = 'LEARNING_TRACK',
  MINI = 'MINI',
  UGC = 'UGC',
  CONCEPT = 'CONCEPT',
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum CourseLanguage {
  SOLIDITY = 'SOLIDITY',
  RUST = 'RUST',
  MOVE = 'MOVE',
}

export interface CourseBaseType {
  alias: string
  id: string
  title: string
  name: string
  description: string
  type: CourseType
  level: CourseLevel
  image?: string
  duration: number
  language: CourseLanguage
  track: string
  progress?: number
  peopleJoined: number
  intendedLearners: {
    audience?: string[]
    requirements?: string[]
  } | null
  knowledgeGain: {
    description?: string[]
    tags?: string[]
  } | null
  totalPages: number
  certificationId?: string
  creator?: {
    id: string
    name: string
    nickname: string
    profileImage: string
  }
  ecosystem: string[]
  courseCount?: number
  documentationId: string | null
}

export interface ProjectCourseType extends CourseBaseType {
  unitCount: number
}
