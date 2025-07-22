import type { Author } from './Author';

export interface Book {
  id: string;
  author: Author;
  title: string;
}
