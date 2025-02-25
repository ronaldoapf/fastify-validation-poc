import type { RouteShorthandOptions } from 'fastify'
import z from 'zod'

export const validateUserConfig = {
  schema: {
    querystring: z.object({
      token: z.string().uuid(),
    }),
  },
} satisfies RouteShorthandOptions
