import { isUrl } from '@/lib/is'
import * as z from 'zod'

export const formSchema = z.object({
  name: z.string().min(1),
  logo: z.string().nullable().optional().default(null),
  oneLineIntro: z.string().nullable().optional().default(null),
  pitchVideo: z.string().nullable().optional().default(null),
  demoVideo: z.string().nullable().optional().default(null),
  detailedIntro: z.string().nullable().optional().default(null),
  progress: z.string().nullable().optional().default(null),
  fundraisingStatus: z.string().nullable().optional().default(null),
  wallet: z.string().nullable().optional().default(null),
  githubLink: z
    .string()
    .refine(isUrl, { message: 'Invalid URL' })
    .nullable()
    .optional()
    .or(z.literal(''))
    .default(null),
  isOpenSource: z.boolean().default(false),
  tracks: z.array(z.string()).nullable().optional(),
  ecology: z.array(z.string()).nullable().optional(),
  teachStack: z.array(z.string()).nullable().optional(),
  intro: z.string().nullable().optional(),
})

export type FormValues = z.infer<typeof formSchema>
