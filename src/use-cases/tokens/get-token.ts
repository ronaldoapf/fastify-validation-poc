import type { Token } from '@prisma/client'
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

    if (!isBefore(new Date(), new Date(expiresAt))) {
      throw new Error('Token expired')
    }

    if (tokenExists.hasBeenValidated) {
      return { token: tokenExists }
    }

    tokenExists.hasBeenValidated = true

    await this.tokensRepository.update(tokenExists)

    return { token: tokenExists }
  }
}
