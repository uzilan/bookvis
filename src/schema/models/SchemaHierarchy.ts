/**
 * Chapter hierarchy type enum based on BookVis schema
 */
export type SchemaHierarchyType = 'chapter' | 'part' | 'book' | 'volume';

/**
 * Hierarchy item interface based on BookVis schema
 */
export interface SchemaHierarchyItem {
  /** ID of the chapter */
  chapter_id: string;
  /** Type of the chapter node */
  type: SchemaHierarchyType;
} 