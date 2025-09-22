export interface AuthUser {
  idUser: number
  email: string
  roleName: string
  enabled: boolean
  credentialsNonExpired: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
}