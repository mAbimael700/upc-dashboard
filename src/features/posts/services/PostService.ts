import { BaseService } from '@/features/http/service/PaginationBaseService.ts'
import { PageResponse } from '@/features/http/types/PageResponse.type.ts'
import { PostResponse } from '@/features/posts/dto/PostResponse.type.ts'
import { PaginationOptions } from '@/features/http/types/PaginationOptions.type.ts'
import { PostCreationRequest } from '@/features/posts/dto/PostCreationRequest.type.ts'

export interface ImageUploadResponse {
  id: number
  url: string
  createdAt: string
}

export default class PostService extends BaseService {
  private static readonly endpoint = '/posts'

  static async getAll(token: string, options?: PaginationOptions): Promise<PageResponse<PostResponse>> {
    try {
      return await this.getPaginated<PageResponse<PostResponse>>(
        this.endpoint,
        options,
        { Authorization: `Bearer ${token}` }
      )
    } catch (_) {
      throw new Error('Error getting posts. Please try again.')
    }
  }

  static async getById(id: string, token: string): Promise<PostResponse> {
    try {
      return await this.get<PostResponse>(
        `${this.endpoint}/${id}`,
        { Authorization: `Bearer ${token}` }
      )
    } catch (_) {
      throw new Error('Error getting post. Please try again.')
    }
  }

  static async create(postData: PostCreationRequest, token: string): Promise<PostResponse> {
    try {
      return await this.post<PostResponse>(
        this.endpoint,
        postData,
        { Authorization: `Bearer ${token}` }
      )
    } catch (_) {
      throw new Error('Error creating post. Please try again.')
    }
  }

  static async update(id: string,
                      postData: Partial<PostCreationRequest>,
                      token: string): Promise<PostResponse> {
    try {
      return await this.put<PostResponse>(
        `${this.endpoint}/${id}`,
        postData,
        { Authorization: `Bearer ${token}` }
      )
    } catch (_) {
      throw new Error('Error updating post. Please try again.')
    }
  }

  static async deletePost(id: string, token: string): Promise<void> {
    try {
      return await this.deleteRequest<void>(
        `${this.endpoint}/${id}`,
        { Authorization: `Bearer ${token}` }
      )
    } catch (_) {
      throw new Error('Error deleting post. Please try again.')
    }
  }

  static async uploadImage(postId: string, file: File, token: string): Promise<ImageUploadResponse> {
    // eslint-disable-next-line no-useless-catch
    try {
      const formData = new FormData()
      formData.append('file', file)


      return await this.postFormData<ImageUploadResponse>(
        `${this.endpoint}/${postId}/images`,
        formData,
        { Authorization: `Bearer ${token}` }
      )
    } catch (error) {
      throw error
    }
  }
}