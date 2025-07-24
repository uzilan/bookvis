/**
 * Faction interface based on BookVis schema
 */
export interface SchemaFaction {
  /** Unique identifier for the faction */
  id: string;
  /** Display name for the faction */
  title: string;
  /** Description of the faction */
  description: string;
  /** Hex color code for the faction */
  color: string;
} 