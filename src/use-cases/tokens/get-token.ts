import type { Token, User } from '@prisma/client'
import { isBefore } from 'date-fns'
import type { TokensRepository } from '../../repositories/tokens-repository'

type GetTokenUseCaseRequest = {
  token: string
}

type GetTokenUseCaseResponse = {
  token: Token
}

export class GetTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({
    token,
  }: GetTokenUseCaseRequest): Promise<GetTokenUseCaseResponse> {
    const tokenExists = await this.tokensRepository.findByToken(token)

    if (!tokenExists) {
      throw new Error('Token expired')
    }

    const { expiresAt } = tokenExists

    if (!isBefore(new Date(expiresAt), new Date())) {
      throw new Error('Token expired')
    }

    return { token: tokenExists }
  }
}
