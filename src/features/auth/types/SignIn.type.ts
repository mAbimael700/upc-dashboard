import { AuthUser } from '@/features/auth/types/AuthUser.type.ts'

export type SignInResponse = {
  accessToken: string
  tokenType:string
  expiration: string
  userInfo: AuthUser
}
