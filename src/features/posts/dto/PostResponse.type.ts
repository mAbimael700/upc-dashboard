export type PostResponse = {
  idPost: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  author: {
    idPerson: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  categories: {
    idCategory: number;
    name: string;
    description: string;
  }[];
  categoryCount: number;
  authorName: string;
  authorEmail: string;
}