/**
 * Relationship description interface based on BookVis schema
 */
export interface SchemaRelationshipDescription {
  /** Chapter ID where this relationship description applies */
  chapter: string;
  /** Description of the relationship at this point */
  description: string;
}

/**
 * Relationship interface based on BookVis schema
 */
export interface SchemaRelationship {
  /** ID of the first character in the relationship */
  character1: string;
  /** ID of the second character in the relationship */
  character2: string;
  /** Default description that applies when no chapter-specific description exists */
  defaultDescription?: string;
  /** Evolution of the relationship across chapters */
  descriptions: SchemaRelationshipDescription[];
} 