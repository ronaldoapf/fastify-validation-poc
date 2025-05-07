import { SendValidationEmailTokenUseCase } from '@/use-cases/emails/send-validation-email-token'
import { makeGenerateNewTokenUseCase } from '@/use-cases/factories/tokens/make-generate-new-token.use-case'
import { makeCreateUserUseCase } from '@/use-cases/factories/users/make-create-user.use-case'
import { TokenType } from '@prisma/client'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUsersConfig } from './config'

export const registerUser: FastifyPluginAsyncZod = async app => {
  app.post('/users', createUsersConfig, async (request, reply) => {
    const { email, name, password } = request.body

    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.execute({ email, name, password })

    const createTokenUseCase = makeGenerateNewTokenUseCase()

    const { token } = await createTokenUseCase.execute({
      userId: user.id,
      type: TokenType.EMAIL_VALIDATION,
    })

    const sendEmail = new SendValidationEmailTokenUseCase()

    sendEmail.execute({
      token,
      email,
    })

    return reply.status(201).send({
      message:
        'User created successfully. Please check your email to validate your account.',
    })
  })
}
