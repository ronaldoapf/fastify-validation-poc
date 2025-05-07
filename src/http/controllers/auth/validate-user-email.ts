import { makeValidateTokenUseCase } from '@/use-cases/factories/tokens/make-validate-token.use-case'
import { makeGetUserUseCase } from '@/use-cases/factories/users/make-get-user.use-case'
import { makeUpdateUserUseCase } from '@/use-cases/factories/users/make-update-user.use-case copy'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { validateUserConfig } from './config'

export const validateUserEmail: FastifyPluginAsyncZod = async app => {
  app.get(
    '/auth/validate-email',
    validateUserConfig,
    async (request, reply) => {
      const { token } = request.query

      const validateTokenUseCase = makeValidateTokenUseCase()

      const validatedToken = await validateTokenUseCase.execute({ token })

      const getUserUseCase = makeGetUserUseCase()

      const { user } = await getUserUseCase.execute({
        userId: validatedToken.token.userId,
      })

      await makeUpdateUserUseCase().execute({
        userId: user.id,
        data: {
          isEmailVerified: true,
        },
      })

      return reply.status(200).send({
        message: 'Email validated successfully',
      })
    }
  )
}
