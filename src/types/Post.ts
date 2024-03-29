export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  languages: Language[];
  categories: string[];
  readingDuration: string;
}

export type Language = "en" | "hu" | "fin";

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

export interface ViewCount {
  count: number;
}
