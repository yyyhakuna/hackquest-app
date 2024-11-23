'use client'
import {
  type CoLearning,
  type CoLearningTodo,
  useListCoLearningQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Back from '../../component/back'
import FrequentlyQuestions from './frequently-questions'
import PageHeader from './page-header'
import Timeline from './timeline'
import ToDoList from './to-do-list'

const Index = () => {
  const coLearningId = useParams().id as string
  const { data } = useSuspenseQuery({
    queryKey: useListCoLearningQuery.getKey({
      where: {
        id: {
          equals: coLearningId,
        },
      },
    }),
    queryFn: useListCoLearningQuery.fetcher({
      where: {
        id: {
          equals: coLearningId,
        },
      },
    }),
    staleTime: 0,
  })
  const coLearning = data.listCoLearning.data![0]
  coLearning?.todos
  return (
    <div className="container relative justify-start">
      <Back className="headline-s mb-6" />
      <PageHeader coLearning={coLearning as CoLearning} />
      <ToDoList todos={(coLearning?.todos as CoLearningTodo[]) || []} />
      <Timeline coLearning={coLearning as CoLearning} />
      <FrequentlyQuestions />
    </div>
  )
}

export default Index
