import type { RouteShorthandOptions } from 'fastify'
import z from 'zod'

export const generateNewEmailValidationTokenConfig = {
  schema: {
    body: z.object({
      email: z.string().email(),
    }),
  },
} satisfies RouteShorthandOptions
