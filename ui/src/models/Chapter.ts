import type { Book } from './Book';

export interface Chapter {
  book: Book;
  title: string;
  index: number;
}
