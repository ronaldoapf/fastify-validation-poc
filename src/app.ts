import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { validateUserEmail } from './http/controllers/auth/validate-user-email'
import { registerUser } from './http/controllers/users/register-user'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(registerUser)
app.register(validateUserEmail)
