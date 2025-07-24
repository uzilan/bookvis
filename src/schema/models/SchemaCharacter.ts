/**
 * Character interface based on BookVis schema
 */
export interface SchemaCharacter {
  /** Unique identifier for the character */
  id: string;
  /** Name of the character */
  name: string;
  /** Description of the character */
  description: string;
  /** Chapter ID where character first appears */
  first_appearance_chapter: string;
  /** Alternative names for the character */
  aliases: string[];
  /** Faction IDs the character belongs to */
  factions: string[];
  /** Mapping of faction IDs to chapter when character joins */
  faction_join_chapters: Record<string, string>;
  /** Character attributes or traits */
  attributes: string[];
} 