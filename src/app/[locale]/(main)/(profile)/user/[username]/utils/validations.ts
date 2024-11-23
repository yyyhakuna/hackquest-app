import * as z from 'zod'
import { FULL_MONTHS } from '../constants'

export const socialLinkSchema = z.object({
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
  telegram: z.string().optional(),
  wechat: z.string().optional(),
  github: z.string().optional(),
})

export const profileSchema = z.object({
  nickname: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  techStack: z.array(z.string()).optional().default([]),
  ...socialLinkSchema.shape,
})

export const experienceSchema = z
  .object({
    title: z.string().min(1),
    companyName: z.string().min(1),
    employmentType: z.string().min(1),
    location: z.string().optional(),
    description: z.string().optional(),
    startMonth: z.string().min(1),
    startYear: z.string().min(1),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endMonth && !data.endYear) {
      ctx.addIssue({
        path: ['endYear'],
        code: z.ZodIssueCode.custom,
        message: 'End year is required when end month is provided',
      })
    }

    if (!data.endMonth && data.endYear) {
      ctx.addIssue({
        path: ['endMonth'],
        code: z.ZodIssueCode.custom,
        message: 'End month is required when end year is provided',
      })
    }

    if (data.endMonth && data.endYear) {
      if (Number(data.endYear) < Number(data.startYear)) {
        ctx.addIssue({
          path: ['endYear'],
          code: z.ZodIssueCode.custom,
          message: 'End year must be greater than start year',
        })
      }

      if (Number(data.endYear) === Number(data.startYear)) {
        const startMonthIndex = FULL_MONTHS.indexOf(data.startMonth)
        const endMonthIndex = FULL_MONTHS.indexOf(data.endMonth)

        if (endMonthIndex < startMonthIndex) {
          ctx.addIssue({
            path: ['endMonth'],
            code: z.ZodIssueCode.custom,
            message: 'End month must be greater than start month',
          })
        }
      }
    }
  })

export type SocialLinkSchema = z.infer<typeof socialLinkSchema>

export type ProfileSchema = z.infer<typeof profileSchema>

export type ExperienceSchema = z.infer<typeof experienceSchema>
