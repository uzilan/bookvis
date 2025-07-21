import type { Character, Chapter } from './Character';

export interface Relationship {
  character1: Character;
  character2: Character;
  description: string;
  chapter: Chapter;
}
