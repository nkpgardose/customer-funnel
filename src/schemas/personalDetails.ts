import { z } from 'zod'

export enum EmploymentStatuses {
  Employed = "Employed",
  Unemployed = "Unemployed",
  SelfEmployed = 'SelfEmployed',
}

export const personalFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Please provide your first name.' }),
  lastName: z
    .string()
    .min(1, { message: 'Please provide your last name.' }),
  email: z
    .string()
    .min(1, { message: 'Please provide your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  employmentStatus: z.nativeEnum(EmploymentStatuses, {
    message: 'Please choose one of the options'
  }),
  employerName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.employmentStatus === EmploymentStatuses.Employed) {
    if (data.employerName === undefined || data.employerName === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide your current employer name.',
        path: ['employerName']
      })
    }
  }
})