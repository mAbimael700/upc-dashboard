import { PostResponse } from '@/features/posts/dto/PostResponse.type.ts'

class Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover: string
  active: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  status: string
  author: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  categories: {
    id: number
    name: string
    description: string
  }[]

  constructor(
    id: number,
    title: string,
    slug: string,
    excerpt: string,
    content: string,
    cover: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    status: string,
    author: {
      id: number
      firstName: string
      lastName: string
      email: string
    },
    categories: {
      id: number
      name: string
      description: string
    }[]
  ) {
    this.id = id
    this.title = title
    this.slug = slug
    this.excerpt = excerpt
    this.content = content
    this.cover = cover
    this.active = active
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.publishedAt = publishedAt
    this.status = status
    this.author = author
    this.categories = categories
  }

  static fromPostResponse(postResponse: PostResponse): Post {
    return new Post(
      postResponse.idPost,
      postResponse.title,
      postResponse.slug,
      postResponse.excerpt,
      postResponse.content,
      postResponse.coverUrl,
      postResponse.isActive,
      postResponse.createdAt,
      postResponse.updatedAt,
      postResponse.publishedAt,
      postResponse.status,
      {
        id: postResponse.author.idPerson,
        firstName: postResponse.author.firstName,
        lastName: postResponse.author.lastName,
        email: postResponse.author.email,
      },
      postResponse.categories.map((category) => ({
        id: category.idCategory,
        name: category.name,
        description: category.description,
      }))
    )
  }
}

export default Post