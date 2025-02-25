import { type Prisma, type Token, TokenType } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { TokensRepository } from '../tokens-repository'

export class PrismaTokensRepository implements TokensRepository {
  async create(data: Prisma.TokenUncheckedCreateInput): Promise<Token> {
    const token = await prisma.token.create({
      data,
    })

    return token
  }

  async findByToken(token: string): Promise<Token | null> {
    const tokenExists = await prisma.token.findFirst({
      where: {
        token,
      },
    })

    if (tokenExists === null) {
      return null
    }

    return tokenExists
  }
}
