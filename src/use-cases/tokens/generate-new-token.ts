import type { Token } from '@prisma/client'
import { TokenType } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { TokensRepository } from '../../repositories/tokens-repository'

type GenerateNewTokenUseCaseRequest = {
  userId: string
  type: TokenType
}

type GenerateNewTokenUseCaseResponse = {
  token: Token
}

export class GenerateNewTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({
    userId,
    type,
  }: GenerateNewTokenUseCaseRequest): Promise<GenerateNewTokenUseCaseResponse> {
    const TWENTY_MINUTES_EXPIRATION_DATE = new Date(Date.now() + 1000 * 60 * 24)

    const newToken = await this.tokensRepository.create({
      type,
      userId,
      token: randomUUID(),
      expiresAt: TWENTY_MINUTES_EXPIRATION_DATE,
    })

    return { token: newToken }
  }
}
