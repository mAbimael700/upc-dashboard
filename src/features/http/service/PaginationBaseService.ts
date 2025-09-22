import ApiHttpClient from '@/config/HttpClient.ts'
import { PaginationOptions } from '@/features/http/types/PaginationOptions.type.ts'
import { buildPaginationOptionsUrl } from '@/features/http/utils/build-pagination-options-url.ts'


export abstract class BaseService {
  protected static apiHttpClient = ApiHttpClient

  /**
   * Método GET con paginación automática
   */
  protected static async getPaginated<T>(
    url: string,
    options?: PaginationOptions,
    headers?: Record<string, string>
  ): Promise<T> {

    // eslint-disable-next-line no-useless-catch
    try {
      const finalUrl = buildPaginationOptionsUrl(url, options)
      const response = await this.apiHttpClient.get<T>(finalUrl, {
        headers
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Método GET sin paginación
   */
  protected static async get<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<T> {

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.apiHttpClient.get<T>(url, {
        headers
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Método POST
   */
  protected static async post<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.apiHttpClient.post<T>(url, data, {
        headers
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Método PUT
   */
  protected static async put<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.apiHttpClient.put<T>(url, data, {
        headers
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Método DELETE
   */
  protected static async deleteRequest<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<T> {

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.apiHttpClient.delete<T>(url, {
        headers
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Método POST para FormData (archivos)
   */
  protected static async postFormData<T>(
    url: string,
    formData: FormData,
    headers?: Record<string, string>
  ): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      // Para FormData, no incluir Content-Type en headers
      // El browser lo maneja automáticamente con el boundary correcto
      const response = await this.apiHttpClient.post<T>(url, formData, {
        headers: {
          ...headers,
          // Explícitamente no establecer Content-Type para FormData
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

}