export interface Character {
  name: string;
  id: string;
  description: string;
  firstAppearanceChapter: number | string; // number for backward compatibility, string for chapter IDs
  aliases: string[];
  factions: string[];
  factionJoinChapters: Record<string, number | string>; // Maps faction ID to chapter when character joins (number for backward compatibility, string for chapter IDs)
  attributes: string[];
}
