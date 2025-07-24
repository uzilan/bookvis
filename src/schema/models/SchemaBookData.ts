import type { SchemaBook } from './SchemaBook';
import type { SchemaLocation } from './SchemaLocation';
import type { SchemaCharacter } from './SchemaCharacter';
import type { SchemaFaction } from './SchemaFaction';
import type { SchemaRelationship } from './SchemaRelationship';
import type { SchemaChapter } from './SchemaChapter';
import type { SchemaHierarchyItem } from './SchemaHierarchy';

/**
 * Comprehensive BookData interface that contains all schema interfaces
 * This represents the complete structure of book data with all related entities
 */
export interface SchemaBookData {
  /** Book information */
  book: SchemaBook;
  /** All locations mentioned in the book */
  locations: SchemaLocation[];
  /** All characters in the book */
  characters: SchemaCharacter[];
  /** All factions in the book */
  factions: SchemaFaction[];
  /** Character relationships and their evolution */
  relationships: SchemaRelationship[];
  /** Chapter structure with locations */
  chapters: SchemaChapter[];
  /** Chapter hierarchy (optional - can be auto-generated) */
  hierarchy?: SchemaHierarchyItem[];
  /** URL to the map image for the book */
  map_url?: string;
} 