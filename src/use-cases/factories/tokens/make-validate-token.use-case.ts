import { PrismaTokensRepository } from '@/repositories/prisma/prisma-tokens-repository'
import { ValidateTokenUseCase } from '@/use-cases/tokens/validate-token'

export function makeValidateTokenUseCase() {
  const tokensRepository = new PrismaTokensRepository()
  const useCase = new ValidateTokenUseCase(tokensRepository)

  return useCase
}
