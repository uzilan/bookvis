import { SchemaAuthor } from './SchemaAuthor';

/**
 * Book interface based on BookVis schema
 */
export interface SchemaBook {
  /** Unique identifier for the book */
  id: string;
  /** Title of the book */
  title: string;
  /** Author information */
  author: SchemaAuthor;
} 