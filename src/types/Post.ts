export interface Post {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  languages: string[];
  categories: string[];
}

export interface PostItems extends Post {
  slug: string;
  content: string;
}

export type Fields = (keyof PostItems)[];

export interface Pagination {
  previous?: string;
  next?: string;
}

export interface PaginatedPosts {
  posts: PostItems[];
  pagination: Pagination;
}
