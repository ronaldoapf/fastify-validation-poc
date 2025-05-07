import { PrismaTokensRepository } from '@/repositories/prisma/prisma-tokens-repository'
import { GenerateNewTokenUseCase } from '@/use-cases/tokens/generate-new-token'

export function makeGenerateNewTokenUseCase() {
  const tokensRepository = new PrismaTokensRepository()
  const useCase = new GenerateNewTokenUseCase(tokensRepository)

  return useCase
}
