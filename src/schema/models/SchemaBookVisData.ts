import { SchemaBook } from './SchemaBook';
import { SchemaLocation } from './SchemaLocation';
import { SchemaCharacter } from './SchemaCharacter';
import { SchemaFaction } from './SchemaFaction';
import { SchemaRelationship } from './SchemaRelationship';
import { SchemaChapter } from './SchemaChapter';
import { SchemaHierarchyItem } from './SchemaHierarchy';

/**
 * Main BookVis data interface based on BookVis schema
 * This represents the complete structure of a BookVis data file
 */
export interface SchemaBookVisData {
  /** Book information */
  book: SchemaBook;
  /** URL to the map image for the book */
  map_url?: string;
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
} 