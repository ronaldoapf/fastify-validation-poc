import type { Prisma, Token, TokenType, User } from '@prisma/client'

export interface TokensRepository {
  create(data: Prisma.TokenUncheckedCreateInput): Promise<Token>
  findByToken(token: string): Promise<Token | null>
}
