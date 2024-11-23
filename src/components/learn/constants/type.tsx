import { createContext, useContext } from 'react'

export enum ContentType {
  LESSON = 'lesson',
  PRACTICE = 'practice',
  ARTICLE = 'article',
  QUIZ = 'quiz',
  VIDEO = 'video',
}
interface ContentContextType {
  contentType: ContentType
}

export const ContentContext = createContext<ContentContextType>(null!)

export const ContentContextProvider = ContentContext.Provider

export const useContentContext = () => {
  return useContext(ContentContext)
}
