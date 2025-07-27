/**
 * Chapter interface based on BookVis schema
 */
export interface SchemaChapter {
  /** Unique identifier for the chapter */
  id: string;
  /** Title of the chapter */
  title: string;
  /** Location IDs mentioned in this chapter */
  locations: string[];
  /** Character IDs mentioned in this chapter */
  characters: string[];
} 