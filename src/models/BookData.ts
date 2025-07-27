import type { Book } from './Book';
import type { Character } from './Character';
import type { Chapter } from './Chapter';
import type { Faction } from './Faction';
import type { Location } from './Location';

export interface RelationshipWithChapters {
  character1: Character;
  character2: Character;
  descriptions: { chapter: number | string; description: string }[]; // number for backward compatibility, string for chapter IDs
}

export interface HierarchyItem {
  chapter_id: string;
  type: string;
}

export interface BookData {
  book: Book;
  characters: Character[];
  chapters: Chapter[];
  factions: Faction[];
  relationships: RelationshipWithChapters[];
  locations: Location[];
  hierarchy: HierarchyItem[];
  mapUrl?: string;
  ownerId?: string;
  ownerEmail?: string;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  deletedAt?: Date;
}
