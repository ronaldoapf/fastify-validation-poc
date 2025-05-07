import type { User } from '@prisma/client'
import type { UsersRepository } from '../../repositories/users-repository'

type GetUserUseCaseRequest = {
  userId: string
}

type GetUserUseCaseResponse = {
  user: Omit<User, 'passwordHash'>
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return { user }
  }
}
