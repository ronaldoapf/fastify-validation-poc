import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '../../repositories/users-repository'

type CreateUserUseCaseRequest = {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = {
  user: Omit<User, 'passwordHash'>
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithEmailAlreadyExists =
      await this.usersRepository.findByEmail(email)

    if (userWithEmailAlreadyExists) {
      throw new Error('User with this email already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      email,
      name,
      passwordHash,
    })

    return { user }
  }
}
