import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  RESEND_API_KEY: z.string(),
  API_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
})

export const env = envSchema.parse(process.env)
