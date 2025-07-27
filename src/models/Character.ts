export interface Character {
  name: string;
  id: string;
  description: string;
  aliases: string[];
  factions: string[];
  factionJoinChapters: Record<string, number | string>; // Maps faction ID to chapter when character joins (number for backward compatibility, string for chapter IDs)
  attributes: string[];
}
