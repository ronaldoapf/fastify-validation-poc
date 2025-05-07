import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '@/use-cases/users/update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}
