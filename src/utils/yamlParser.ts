import yaml from 'js-yaml';
import type { BookData } from '../models/BookData';
import type { Book } from '../models/Book';
import type { Author } from '../models/Author';
import type { Character } from '../models/Character';
import type { Chapter } from '../models/Chapter';
import type { Faction } from '../models/Faction';
import type { Location } from '../models/Location';
import type { RelationshipWithChapters } from '../models/BookData';

interface YamlBookData {
  book: {
    id: string;
    title: string;
    author: {
      id: string;
      name: string;
    };
  };
  map_url?: string;
  locations: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
  characters: Array<{
    id: string;
    name: string;
    description: string;
    aliases: string[];
    factions: string[];
    faction_join_chapters: Record<string, string>;
    attributes: string[];
  }>;
  factions: Array<{
    id: string;
    title: string;
    description: string;
    color: string;
  }>;
  relationships: Array<{
    character1: string;
    character2: string;
    descriptions: Array<{
      chapter: string;
      description: string;
    }>;
  }>;
  chapters: Array<{
    id: string;
    title: string;
    locations: string[];
    characters: string[];
  }>;
  hierarchy: Array<{
    chapter_id: string;
    type: string;
  }>;
}

export function parseYamlToBookData(yamlContent: string): BookData {
  const data = yaml.load(yamlContent) as YamlBookData;
  
  // Create the book object
  const book: Book = {
    id: data.book.id,
    title: data.book.title,
    author: {
      id: data.book.author.id,
      name: data.book.author.name,
    } as Author,
  };

  // Create locations map for easy lookup
  const locationsMap = new Map<string, Location>();
  data.locations.forEach((loc) => {
    locationsMap.set(loc.id, {
      id: loc.id,
      name: loc.name,
      description: loc.description,
    });
  });

  // Create factions map for easy lookup
  const factionsMap = new Map<string, Faction>();
  data.factions.forEach((faction) => {
    factionsMap.set(faction.id, {
      id: faction.id,
      title: faction.title,
      description: faction.description,
      color: faction.color,
    });
  });

  // Create characters map for easy lookup
  const charactersMap = new Map<string, Character>();
  data.characters.forEach((char) => {
    charactersMap.set(char.id, {
      id: char.id,
      name: char.name,
      description: char.description,
      aliases: char.aliases,
      factions: char.factions,
      factionJoinChapters: char.faction_join_chapters,
      attributes: char.attributes,
    });
  });

  // Create hierarchy map for easy lookup
  const hierarchyMap = new Map<string, string>();
  data.hierarchy.forEach((item) => {
    hierarchyMap.set(item.chapter_id, item.type);
  });

  // Build path from hierarchy
  const buildPathFromHierarchy = (chapterId: string): string[] => {
    const path: string[] = [];
    let currentLevel = -1;
    
    // Find the chapter in hierarchy and build path backwards
    for (let i = data.hierarchy.length - 1; i >= 0; i--) {
      const item = data.hierarchy[i];
      if (item.chapter_id === chapterId) {
        // Found our chapter, now build path backwards
        currentLevel = i;
        break;
      }
    }
    
    if (currentLevel === -1) {
      // Chapter not found in hierarchy, return just the title
      const chapter = data.chapters.find(ch => ch.id === chapterId);
      return chapter ? [chapter.title] : [];
    }
    
    // Find the immediate parent part by looking backwards from current position
    for (let i = currentLevel - 1; i >= 0; i--) {
      const item = data.hierarchy[i];
      const chapter = data.chapters.find(ch => ch.id === item.chapter_id);
      if (chapter && item.type === 'part') {
        // Found the immediate parent part, add it to path
        path.unshift(chapter.title);
        break; // Stop after finding the first (immediate) parent part
      }
    }
    
    return path;
  };

  // Create chapters with locations, characters, type, and path
  const chapters: Chapter[] = data.chapters.map((chapter, index) => {
    const chapterLocations = (chapter.locations || [])
      .map(locId => locationsMap.get(locId))
      .filter((loc): loc is Location => loc !== undefined);

    return {
      book,
      id: chapter.id,
      title: chapter.title,
      index: index + 1, // 1-based index
      type: hierarchyMap.get(chapter.id) as 'chapter' | 'part' | 'book' | 'volume' | undefined,
      path: buildPathFromHierarchy(chapter.id),
      locations: chapterLocations,
      characters: chapter.characters || [],
    };
  });

  // Create relationships
  const relationships: RelationshipWithChapters[] = data.relationships.map((rel) => {
    const character1 = charactersMap.get(rel.character1);
    const character2 = charactersMap.get(rel.character2);
    
    if (!character1 || !character2) {
      throw new Error(`Character not found: ${rel.character1} or ${rel.character2}`);
    }

    return {
      character1,
      character2,
      descriptions: rel.descriptions.map(desc => ({
        chapter: desc.chapter,
        description: desc.description,
      })),
    };
  });

  // Convert maps to arrays
  const locations: Location[] = Array.from(locationsMap.values());
  const factions: Faction[] = Array.from(factionsMap.values());
  const characters: Character[] = Array.from(charactersMap.values());

  return {
    book,
    characters,
    chapters,
    factions,
    relationships,
    locations,
    hierarchy: data.hierarchy,
    mapUrl: data.map_url,
  };
}

// Helper function to load YAML from file
export async function loadBookDataFromYamlFile(filePath: string): Promise<BookData> {
  try {
    const response = await fetch(filePath);
    const yamlContent = await response.text();
    return parseYamlToBookData(yamlContent);
  } catch (error) {
    throw new Error(`Failed to load YAML file: ${error}`);
  }
}

// Helper function to load YAML from string
export function loadBookDataFromYamlString(yamlString: string): BookData {
  return parseYamlToBookData(yamlString);
} 