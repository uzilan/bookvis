import type { Book } from './Book';

export interface Chapter {
  book: Book;
  title: string;
  index: number;
  // Hierarchical structure support
  parent?: Chapter;           // Reference to parent chapter/part
  level?: number;             // Depth level (0 = top level, 1 = sub-level, etc.)
  type?: 'chapter' | 'part' | 'book' | 'volume'; // Type of this node
  // Metadata for display
  partTitle?: string;         // e.g., "Book One", "Part I"
  globalIndex?: number;       // Overall sequential number across all levels
  path?: string[];            // Full path like ["Book 1", "Part 1", "Chapter 1"]
}
