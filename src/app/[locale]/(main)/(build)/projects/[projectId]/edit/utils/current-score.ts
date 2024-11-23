import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from './validations'

export function getCurrentScore(form: UseFormReturn<FormValues>) {
  let score = 10

  const demoVideo = form.watch('demoVideo')
  const pitchVideo = form.watch('pitchVideo')

  const scoringStrategies: { [key: string]: (score: number) => number } = {
    name: score => score + 10,
    oneLineIntro: score => score + 10,
    logo: score => score + 10,
    ecology: score => score + 10,
    tracks: score => score + 10,
    githubLink: score => score + 10,
    detailedIntro: score => score + 10,
    wallet: score => score + 10,
  }

  for (const [key, strategy] of Object.entries(scoringStrategies)) {
    const value = form.watch(key as keyof FormValues)
    if (Array.isArray(value) ? value.length > 0 : value) {
      score = strategy(score)
    }
  }

  if (demoVideo || pitchVideo) {
    score += 10
  }

  return score
}
