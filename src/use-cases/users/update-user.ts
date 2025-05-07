import type { User } from '@prisma/client'
import type { UsersRepository } from '../../repositories/users-repository'

type UpdateUserUseCaseRequest = {
  userId: string
  data: {
    name?: string
    email?: string
    password?: string
    isEmailVerified?: boolean
  }
}

type UpdateUserUseCaseResponse = {
  user: Omit<User, 'passwordHash'>
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.update(userId, data)

    return { user }
  }
}
