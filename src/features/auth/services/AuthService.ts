import { AuthUser } from "@/features/auth/types/AuthUser.type.ts";
import ApiHttpClient from '@/config/HttpClient.ts'
import { SignInResponse } from '@/features/auth/types/SignIn.type.ts'
import { SignInCredentials } from '@/features/auth/types/SignInCredentials.type.ts'


export default class AuthService {
  private static readonly endpoint = '/auth'

  static async login(credentials: SignInCredentials) {
    try {
      const response = await ApiHttpClient.
      post<SignInResponse>(`${this.endpoint}/login`, credentials);
      return response.data
    } catch (_) {
      throw new Error('Sign-in error. Verify your credentials.');
    }
  }

  /**
   * Obtiene el perfil del usuario autenticado
   */
  static async getUserProfile(accessToken: string): Promise<AuthUser> {
    try {
      const response = await ApiHttpClient.get<AuthUser>(
        `${this.endpoint}/me`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } });

      return response.data;

    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Token inválido o expirado');
      }
      if (error.response?.status === 403) {
        throw new Error('No tienes permisos para acceder a esta información');
      }

      throw new Error('Error al obtener el perfil del usuario');
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  static async logout(accessToken: string): Promise<void> {
    try {
      await ApiHttpClient.post(
        `${this.endpoint}/logout`, {},
        { headers: { 'Authorization': `Bearer ${accessToken}` } });

    } catch (error) {
      // No lanzamos error aquí porque el logout local debe funcionar
      // incluso si el logout del servidor falla
      console.warn('Error en logout del servidor:', error);
    }
  }

}