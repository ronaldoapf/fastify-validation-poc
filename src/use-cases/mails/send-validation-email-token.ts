import { randomUUID } from 'node:crypto'
import { TokenType, type User } from '@prisma/client'
import { hash } from 'bcryptjs'
import type { TokensRepository } from '../../repositories/tokens-repository'
type SendValidationEmailTokenUseCaseRequest = {
  userId: string
}

type SendValidationEmailTokenUseCaseResponse = {
  token: string
}

export class SendValidationEmailTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({
    userId,
  }: SendValidationEmailTokenUseCaseRequest): Promise<SendValidationEmailTokenUseCaseResponse> {
    const TWENTY_MINUTES_EXPIRATION_DATE = new Date(
      Date.now() + 1000 * 60 * 60 * 24
    )

    const createToken = await this.tokensRepository.create({
      userId: userId,
      token: randomUUID(),
      type: TokenType.EMAIL_VALIDATION,
      expiresAt: TWENTY_MINUTES_EXPIRATION_DATE,
    })

    return { token: createToken.token }
  }
}
