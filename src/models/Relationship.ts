import type { Character } from './Character';
import type { Chapter } from './Chapter';

export interface Relationship {
  character1: Character;
  character2: Character;
  description: string;
  chapter: Chapter;
}
