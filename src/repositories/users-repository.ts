import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(
    data: Prisma.UserUncheckedCreateInput
  ): Promise<Omit<User, 'passwordHash'>>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>
}
