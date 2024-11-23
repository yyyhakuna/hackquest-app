'use client'
import { PageType } from '@/graphql/generated/hooks'
import { useCourseLesson } from '@/store/learn'
import type React from 'react'
import { useMemo } from 'react'
import ArticleContent from './article-content'
import PracticeContent from './practice-content'
import QuizContent from './quiz-content'
import VideoContent from './video-content'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface LearnProp {}

const Learn: React.FC<LearnProp> = () => {
  const lesson = useCourseLesson()
  const renderContent = useMemo(() => {
    switch (lesson?.type) {
      case PageType.Video:
        return <VideoContent />
      case PageType.Article:
        return <ArticleContent />
      case PageType.Quiz:
        return <QuizContent />
      default:
        return (
          <>
            {/* <LessonContent /> */}
            <PracticeContent />
          </>
        )
    }
  }, [lesson])
  return (
    <div className="h-full w-full justify-center sm:flex">{renderContent}</div>
  )
}

export default Learn
