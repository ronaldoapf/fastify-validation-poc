import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { PrismaTokensRepository } from '../../../repositories/prisma/prisma-tokens-repository'
import { GetTokenUseCase } from '../../../use-cases/tokens/get-token'
import { validateUserConfig } from './config'

export const validateUserEmail: FastifyPluginAsyncZod = async app => {
  app.get(
    '/auth/validate-email',
    validateUserConfig,
    async (request, reply) => {
      const { token } = request.query

      const tokensRepository = new PrismaTokensRepository()
      const tokenUseCase = new GetTokenUseCase(tokensRepository)

      const test = await tokenUseCase.execute({ token })
    }
  )
}
