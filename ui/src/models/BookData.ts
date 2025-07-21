import type { Book, Chapter, Character, Relationship, Faction } from './Book';

export interface BookData {
  book: Book;
  chapters: Chapter[];
  characters: Character[];
  relationships: Relationship[];
  factions: Faction[];
}
