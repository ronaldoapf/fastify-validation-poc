import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { env } from '../../../../env'
import { resend } from '../../../../lib/resend'
import { PrismaTokensRepository } from '../../../../repositories/prisma/prisma-tokens-repository'
import { PrismaUsersRepository } from '../../../../repositories/prisma/prisma-users-repository'
import { SendValidationEmailTokenUseCase } from '../../../../use-cases/mails/send-validation-email-token'
import { CreateUserUseCase } from '../../../../use-cases/users/create-users'
import { createUsersConfig } from './config'

export const registerUser: FastifyPluginAsyncZod = async app => {
  app.post('/users', createUsersConfig, async (request, reply) => {
    const { email, name, password } = request.body

    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const { user } = await createUserUseCase.execute({ email, name, password })

    const tokensRepository = new PrismaTokensRepository()
    const createTokenUseCase = new SendValidationEmailTokenUseCase(
      tokensRepository
    )

    const token = await createTokenUseCase.execute({
      userId: user.id,
    })

    const test = new URL('/auth/validate-email', env.API_BASE_URL)
    test.searchParams.set('token', token.token)
    test.searchParams.set('redirect', 'http://localhost:3000/auth/success')

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['ronaldo.alves.1997@gmail.com'],
      subject: 'Hello World',
      html: `<strong>Hi! I noticed that you created a account with us</strong>
        <a href=${test.toString()}>Click here to validated your e-mail</a>
      `,
    })

    console.log({ data, error })
  })
}
