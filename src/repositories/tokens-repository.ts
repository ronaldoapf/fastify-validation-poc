import type { Prisma, Token } from '@prisma/client'

export interface TokensRepository {
  create(data: Prisma.TokenUncheckedCreateInput): Promise<Token>
  update(data: Prisma.TokenUpdateInput): Promise<Token>
  findByToken(token: string): Promise<Token | null>
}
