import type { Book } from './Book';
import type { Location } from './Location';

export interface Chapter {
  book: Book;
  id: string;                 // Chapter ID like 'chapter-1', 'part-1', etc.
  title: string;
  index: number;
  // Hierarchical structure support
  parent?: Chapter;           // Reference to parent chapter/part
  level?: number;             // Depth level (0 = top level, 1 = sub-level, etc.)
  type?: 'chapter' | 'part' | 'book' | 'volume'; // Type of this node
  // Metadata for display
  partTitle?: string;         // e.g., "Book One", "Part I"

  path?: string[];            // Full path like ["Book 1", "Part 1", "Chapter 1"]
  
  // Locations mentioned in this chapter
  locations?: Location[];
}
