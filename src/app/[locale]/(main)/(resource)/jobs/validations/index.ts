import { LuBoxes, LuMegaphone, LuTerminal, LuWrench } from 'react-icons/lu'
import * as z from 'zod'

export const workModes = [
  {
    id: 'REMOTE',
    label: 'remote',
  },
  {
    id: 'ONSITE',
    label: 'onsite',
  },
] as const

export const workTypes = [
  {
    id: 'FULL_TIME',
    label: 'fulltime',
  },
  {
    id: 'PART_TIME',
    label: 'parttime',
  },
  {
    id: 'INTERNSHIP',
    label: 'internship',
  },
] as const

export const currencies = [
  {
    id: 'USD',
    label: 'USD - US Dollar $',
  },
  {
    id: 'EUR',
    label: 'EUR - Euro €',
  },
  {
    id: 'RMB',
    label: 'RMB - Chinese Yuan ¥',
  },
  {
    id: 'INR',
    label: 'INR - Indian Rupee ₹',
  },
  {
    id: 'SGD',
    label: 'SGD - Singapore Dollar SGD',
  },
  {
    id: 'MYR',
    label: 'MYR - Malaysian Ringgit RM',
  },
  {
    id: 'JPY',
    label: 'JPY - Japanese Yen ¥',
  },
  {
    id: 'GBP',
    label: 'GBP - British Pound £',
  },
] as const

export const contacts = [
  {
    id: 'link',
    label: 'Application Link',
    placeholder: 'Application link',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    placeholder: 'Telegram username',
  },
  {
    id: 'wechat',
    label: 'WeChat',
    placeholder: 'Wechat ID',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Email address',
  },
] as const

export const categories = [
  {
    id: 'marketing',
    label: 'Marketing',
    icon: LuMegaphone,
  },
  {
    id: 'operation',
    label: 'Operation',
    icon: LuWrench,
  },
  {
    id: 'frontend',
    label: 'Front-End',
    icon: LuTerminal,
  },
  {
    id: 'backend',
    label: 'Back-End',
    icon: LuTerminal,
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    icon: LuTerminal,
  },
  {
    id: 'blockchain',
    label: 'Blockchain Development',
    icon: LuBoxes,
  },
] as const

export const companySchema = z.object({
  companyName: z
    .string({
      required_error: 'Company name is required',
    })
    .min(1, { message: 'Company name is required' }),
  companyLogo: z.string().min(1, { message: 'Company logo is required' }),
  website: z
    .string({
      required_error: 'Website is required',
    })
    .url({ message: 'Please enter a valid URL' }),
})

const baseJobSchema = z.object({
  name: z.string().min(1, { message: 'Job title is required' }),
  workMode: z.enum(['REMOTE', 'ONSITE']).optional().default('REMOTE'),
  location: z.string().optional(),
  workType: z
    .enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACTOR'])
    .optional()
    .default('FULL_TIME'),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  currency: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  status: z.enum(['open', 'closed']).optional().default('open'),
})

export const jobSchema = baseJobSchema.superRefine((data, ctx) => {
  if (data.workMode === 'ONSITE') {
    if (!data.location) {
      ctx.addIssue({
        code: 'custom',
        message: 'location is required for on-site mode',
        path: ['location'],
      })
    }
  }
})

export const contactSchema = z.object({
  link: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  telegram: z.string().optional(),
  wechat: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email' }).optional(),
})

const baseContactsSchema = z.object({
  contractKey: z.array(z.string()).refine(values => values.some(item => item), {
    message: 'At least one contact is required',
  }),
  contractValue: contactSchema,
})

export const contactsSchema = z
  .object({
    contractKey: z
      .array(z.string())
      .refine(values => values.some(item => item), {
        message: 'At least one contact is required',
      }),
    contractValue: contactSchema,
  })
  .superRefine((data, ctx) => {
    contacts.forEach(contact => {
      if (data.contractKey.includes(contact.id)) {
        if (!data.contractValue[contact.id]) {
          ctx.addIssue({
            code: 'custom',
            message: `${contact.label} is required`,
            path: ['contractValue', contact.id],
          })
        }
      }
    })
  })

export const formSchema = z
  .object({
    ...companySchema.shape,
    ...baseJobSchema.shape,
    ...baseContactsSchema.shape,
    desc: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.workMode === 'ONSITE') {
      if (!data.location) {
        ctx.addIssue({
          code: 'custom',
          message: 'location is required for on-site mode',
          path: ['location'],
        })
      }
    }

    contacts.forEach(contact => {
      if (data.contractKey.includes(contact.id)) {
        if (!data.contractValue[contact.id]) {
          ctx.addIssue({
            code: 'custom',
            message: `${contact.label} is required`,
            path: ['contractValue', contact.id],
          })
        }
      }
    })
  })
