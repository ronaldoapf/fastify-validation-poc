import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { generateNewEmailValidationTokenConfig } from './config'

export const registerUser: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users/validation-email',
    generateNewEmailValidationTokenConfig,
    async (request, reply) => {
      const { email } = request.body
    }
  )
}
