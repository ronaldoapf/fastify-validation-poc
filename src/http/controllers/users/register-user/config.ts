import type { RouteShorthandOptions } from 'fastify'
import z from 'zod'

export const createUsersConfig = {
  schema: {
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    }),
  },
} satisfies RouteShorthandOptions
