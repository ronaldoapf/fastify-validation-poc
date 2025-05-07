import { env } from '@/env'
import { resend } from '@/lib/resend'
import type { Token } from '@prisma/client'

type SendValidationEmailTokenUseCaseRequest = {
  token: Token
  email: string
}

export class SendValidationEmailTokenUseCase {
  async execute({
    token,
    email,
  }: SendValidationEmailTokenUseCaseRequest): Promise<void> {
    const test = new URL('/auth/validate-email', env.API_BASE_URL)
    test.searchParams.set('token', token.token)
    test.searchParams.set('redirect', 'http://localhost:3000/auth/success')

    const { data, error } = await resend.emails.send({
      from: 'Acme <ronaldo.testapi.com>',
      to: email,
      subject: 'Hello World',
      html: `<strong>Hi! I noticed that you created a account with us</strong>
        <a href=${test.toString()}>Click here to validated your e-mail</a>
      `,
    })
  }
}
