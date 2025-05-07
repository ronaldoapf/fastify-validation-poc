import type { Prisma, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async update(
    id: string,
    data: Prisma.UserUncheckedUpdateInput
  ): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    })

    return updatedUser
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      // omit: { passwordHash: true },
    })

    return user
  }

  async create(
    data: Prisma.UserUncheckedCreateInput
  ): Promise<Omit<User, 'passwordHash'>> {
    const user = await prisma.user.create({
      data,
      omit: { passwordHash: true },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return users
  }
}
