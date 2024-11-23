'use client'

import { CourseItem } from '@/components/ecosystem/course-item'
import { HackathonItem } from '@/components/ecosystem/hackathon-item'
import { QuizItem } from '@/components/ecosystem/quiz-item'
import { ResourceItem } from '@/components/ecosystem/resource-item'
import type { EcosystemPhaseExtend } from '@/graphql/generated/graphql'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { PhaseItem } from './phase-item'

export function PhaseList({
  phases,
  ecosystemId,
}: {
  phases?: EcosystemPhaseExtend[] | null
  ecosystemId?: string
}) {
  const [activePhaseIds, setActivePhaseIds] = React.useState<string[]>([])

  const onExpandPhase = React.useCallback((phaseId: string) => {
    setActivePhaseIds(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId],
    )
  }, [])

  const firstLearningPhase = phases?.find(
    phase => phase.progress && phase.progress > 0 && phase.progress < 1,
  )

  React.useEffect(() => {
    if (firstLearningPhase) {
      onExpandPhase(firstLearningPhase.id)
    }
  }, [firstLearningPhase, onExpandPhase])

  return (
    <div className="relative">
      {phases?.map((phase, index) => (
        <div key={phase.id}>
          <PhaseItem
            index={index + 1}
            phase={phase}
            onExpandPhase={onExpandPhase}
          />
          <AnimatePresence initial={false}>
            {activePhaseIds.includes(phase.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              >
                {phase.courses?.map(course => (
                  <CourseItem
                    key={course.id}
                    course={course}
                    href={`/learning-track/${ecosystemId}`}
                  />
                ))}
                {phase.quizzes?.map(quiz => (
                  <QuizItem key={quiz.id} quiz={quiz} />
                ))}
                {phase.extra?.build && <HackathonItem />}
                {phase.extra?.resource && <ResourceItem />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="-z-10 absolute top-0 left-6 h-full w-px border-l border-dashed" />
    </div>
  )
}
