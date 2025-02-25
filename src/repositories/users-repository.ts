import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(
    data: Prisma.UserUncheckedCreateInput
  ): Promise<Omit<User, 'passwordHash'>>
  findByEmail(email: string): Promise<User | null>
}
