import type { SchemaBookData } from '../schema/models/SchemaBookData';
import type { BookData, RelationshipWithChapters } from '../models/BookData';
import type { Book } from '../models/Book';
import type { Character } from '../models/Character';
import type { Chapter } from '../models/Chapter';
import type { Faction } from '../models/Faction';
import type { Location } from '../models/Location';

export function convertSchemaToBookData(schemaData: SchemaBookData): BookData {
  // Validate that we have the required data
  if (!schemaData.hierarchy || schemaData.hierarchy.length === 0) {
    throw new Error('Book data is missing hierarchy. This indicates a bug in the chapter creation process.');
  }

  // Convert Book
  const book: Book = {
    id: schemaData.book.id || 'preview-book',
    title: schemaData.book.title,
    author: {
      id: schemaData.book.author.id,
      name: schemaData.book.author.name
    }
  };

  // Convert Characters
  const characters: Character[] = schemaData.characters.map(char => ({
    id: char.id,
    name: char.name,
    description: char.description,
    aliases: char.aliases || [],
    attributes: char.attributes || [],
    factions: char.factions || [],
    factionJoinChapters: char.faction_join_chapters || {}
  }));

  // Convert Locations first (needed for chapters)
  const locations: Location[] = schemaData.locations.map(location => ({
    id: location.id,
    name: location.name,
    description: location.description || ''
  }));

  // Convert Chapters
  const chapters: Chapter[] = schemaData.chapters.map(chapter => ({
    book: book,
    id: chapter.id,
    title: chapter.title,
    index: 0, // Will be set based on hierarchy
    type: 'chapter',
    locations: (chapter.locations || []).map(locationId => {
      const location = locations.find(loc => loc.id === locationId);
      return location || { id: locationId, name: 'Unknown Location', description: '' };
    }),
    characters: chapter.characters || []
  }));

  // Convert Factions
  const factions: Faction[] = schemaData.factions.map(faction => ({
    id: faction.id,
    title: faction.title,
    description: faction.description || '',
    color: faction.color
  }));

  // Convert Relationships
  const relationships: RelationshipWithChapters[] = schemaData.relationships.map(rel => {
    const char1 = characters.find(c => c.id === rel.character1);
    const char2 = characters.find(c => c.id === rel.character2);
    
    if (!char1 || !char2) {
      throw new Error(`Character not found for relationship: ${rel.character1} - ${rel.character2}`);
    }

    return {
      character1: char1,
      character2: char2,
      descriptions: rel.descriptions.map(desc => ({
        chapter: desc.chapter,
        description: desc.description
      }))
    };
  });

  // Build chapter hierarchy and set indices
  if (schemaData.hierarchy && schemaData.hierarchy.length > 0) {
    schemaData.hierarchy.forEach((item, index) => {
      const chapter = chapters.find(ch => ch.id === item.chapter_id);
      if (chapter) {
        chapter.index = index;
        chapter.type = item.type;
      }
    });
  } else {
    // If no hierarchy provided, create one from chapters
    chapters.forEach((chapter, index) => {
      chapter.index = index;
      chapter.type = 'chapter';
    });
  }

  return {
    book,
    characters,
    chapters,
    factions,
    relationships,
    locations,
    hierarchy: schemaData.hierarchy,
    mapUrl: schemaData.map_url
  };
}

export function convertBookDataToSchema(bookData: BookData): SchemaBookData {
  // Convert Book
  const book = {
    id: bookData.book.id,
    title: bookData.book.title,
    author: {
      id: bookData.book.author.id,
      name: bookData.book.author.name
    }
  };

  // Convert Characters
  const characters = bookData.characters.map(char => ({
    id: char.id,
    name: char.name,
    description: char.description,
    aliases: char.aliases,
    attributes: char.attributes,
    factions: char.factions,
    faction_join_chapters: char.factionJoinChapters
  }));

  // Convert Chapters
  const chapters = bookData.chapters.map(chapter => ({
    id: chapter.id,
    title: chapter.title,
    locations: chapter.locations.map(location => location.id),
    characters: chapter.characters || []
  }));

  // Convert Factions
  const factions = bookData.factions.map(faction => ({
    id: faction.id,
    title: faction.title,
    description: faction.description,
    color: faction.color
  }));

  // Convert Locations
  const locations = bookData.locations.map(location => ({
    id: location.id,
    name: location.name,
    description: location.description
  }));

  // Convert Relationships
  const relationships = bookData.relationships.map(rel => ({
    character1: rel.character1.id,
    character2: rel.character2.id,
    descriptions: rel.descriptions.map(desc => ({
      chapter: desc.chapter,
      description: desc.description
    }))
  }));

  // Use existing hierarchy or build from chapters
  const hierarchy = bookData.hierarchy && bookData.hierarchy.length > 0 
    ? bookData.hierarchy.map((item, index) => ({
        chapter_id: item.chapter_id,
        type: item.type,
        index
      }))
    : bookData.chapters.map((chapter, index) => ({
        chapter_id: chapter.id,
        type: chapter.type || 'chapter',
        index
      }));

  return {
    book,
    characters,
    chapters,
    factions,
    relationships,
    locations,
    hierarchy,
    map_url: bookData.mapUrl
  };
} 