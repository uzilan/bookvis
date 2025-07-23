import type { BookData } from '../models/BookData';
import type { Chapter } from '../models/Chapter';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';

const winnieBook = {
  id: 'winnie',
  author: { id: 'milne', name: 'A. A. Milne' },
  title: 'Winnie-the-Pooh',
};

// Chapter definitions - just basic data
const winnieChapterData = {
  'chapter-1': { id: 'chapter-1', title: 'In Which We Are Introduced to Winnie-the-Pooh and Some Bees, and the Stories Begin' },
  'chapter-2': { id: 'chapter-2', title: 'In Which Pooh Goes Visiting and Gets into a Tight Place' },
  'chapter-3': { id: 'chapter-3', title: 'In Which Pooh and Piglet Go Hunting and Nearly Catch a Woozle' },
  'chapter-4': { id: 'chapter-4', title: 'In Which Eeyore Loses a Tail and Pooh Finds One' },
  'chapter-5': { id: 'chapter-5', title: 'In Which Piglet Meets a Heffalump' },
  'chapter-6': { id: 'chapter-6', title: 'In Which Eeyore Has a Birthday and Gets Two Presents' },
  'chapter-7': { id: 'chapter-7', title: 'In Which Kanga and Baby Roo Come to the Forest, and Piglet Has a Bath' },
  'chapter-8': { id: 'chapter-8', title: 'In Which Christopher Robin Leads an Expotition to the North Pole' },
  'chapter-9': { id: 'chapter-9', title: 'In Which Piglet Does a Very Grand Thing' },
  'chapter-10': { id: 'chapter-10', title: 'In Which Christopher Robin Gives a Pooh Party, and We Say Good-bye' },
};

// Hierarchy definition - order determines global index, no explicit globalIndex needed
const winnieHierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }> = [
  { chapterId: 'chapter-1', level: 0, type: 'chapter' },
  { chapterId: 'chapter-2', level: 0, type: 'chapter' },
  { chapterId: 'chapter-3', level: 0, type: 'chapter' },
  { chapterId: 'chapter-4', level: 0, type: 'chapter' },
  { chapterId: 'chapter-5', level: 0, type: 'chapter' },
  { chapterId: 'chapter-6', level: 0, type: 'chapter' },
  { chapterId: 'chapter-7', level: 0, type: 'chapter' },
  { chapterId: 'chapter-8', level: 0, type: 'chapter' },
  { chapterId: 'chapter-9', level: 0, type: 'chapter' },
  { chapterId: 'chapter-10', level: 0, type: 'chapter' },
];

// Function to build chapters from data and hierarchy
function buildChapters(chapterData: Record<string, { id: string; title: string }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => ({
    book: winnieBook,
    ...chapterData[item.chapterId],
    globalIndex: index + 1, // Order in array determines global index
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

const pooh: Character = { 
  name: 'Winnie-the-Pooh', 
  id: 'pooh', 
  description: 'A bear of very little brain.', 
  firstAppearanceChapter: 1, 
  aliases: ['Pooh'], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-1' }, // Always a friend
  attributes: ['Loves honey', 'Very friendly', 'Sometimes forgetful', 'Lives in a house under the name Sanders'] 
};
const piglet: Character = { 
  name: 'Piglet', 
  id: 'piglet', 
  description: 'A small and timid pig.', 
  firstAppearanceChapter: 1, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-1' }, // Always a friend
  attributes: ['Very brave despite being small', 'Best friends with Pooh', 'Lives in a beech tree', 'Always tries to be helpful'] 
};
const eeyore: Character = { 
  name: 'Eeyore', 
  id: 'eeyore', 
  description: 'A gloomy donkey.', 
  firstAppearanceChapter: 1, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-1' }, // Always a friend
  attributes: ['Gloomy personality', 'Lives in the thistly corner', 'Has a detachable tail', 'Very loyal friend'] 
};
const cr: Character = { 
  name: 'Christopher Robin', 
  id: 'cr', 
  description: 'A boy and Pooh\'s best friend.', 
  firstAppearanceChapter: 1, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-1' }, // Always a friend
  attributes: ['The only human in the forest', 'Very wise for his age', 'Leads expeditions', 'Knows all the animals'] 
};
const rabbit: Character = { 
  name: 'Rabbit', 
  id: 'rabbit', 
  description: 'A practical rabbit.', 
  firstAppearanceChapter: 2, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-2' }, // Joins when introduced
  attributes: ['Very organized', 'Likes to plan things', 'Has many friends and relations', 'Lives in a hole in the ground'] 
};
const owl: Character = { 
  name: 'Owl', 
  id: 'owl', 
  description: 'A wise owl.', 
  firstAppearanceChapter: 3, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-3' }, // Joins when introduced
  attributes: ['Very wise', 'Can spell his name', 'Lives in a tree', 'Likes to give advice'] 
};
const kanga: Character = { 
  name: 'Kanga', 
  id: 'kanga', 
  description: 'A mother kangaroo.', 
  firstAppearanceChapter: 7, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-7' }, // Joins when introduced
  attributes: ['Very motherly', 'Carries things in her pouch', 'Takes care of everyone', 'Very kind and gentle'] 
};
const roo: Character = { 
  name: 'Roo', 
  id: 'roo', 
  description: 'Kanga\'s child.', 
  firstAppearanceChapter: 7, 
  aliases: [], 
  factions: ['friends'], 
  factionJoinChapters: { 'friends': 'chapter-7' }, // Joins when introduced
  attributes: ['Very young and energetic', 'Loves to bounce', 'Kanga\'s only child', 'Friends with Tigger'] 
};
const heffalump: Character = { 
  name: 'Heffalump', 
  id: 'heffalump', 
  description: 'A mysterious creature.', 
  firstAppearanceChapter: 5, 
  aliases: [], 
  factions: ['heffalumps'], 
  factionJoinChapters: { 'heffalumps': 'chapter-5' }, // Joins when introduced
  attributes: ['Imaginary creature', 'Scares Piglet', 'Has a very large head', 'Lives in the forest'] 
};

const winnieCharacters: Character[] = [
  pooh, piglet, eeyore, cr, rabbit, owl, kanga, roo, heffalump
];

const winnieFactions: Faction[] = [
  { id: 'friends', title: 'Pooh\'s Friends', description: 'The main group of friends in the Hundred Acre Wood.', color: '#A7C7E7' }, // soft blue
  { id: 'heffalumps', title: 'Heffalumps', description: 'Imaginary creatures.', color: '#C7A7E7' }, // muted mauve
];

// Build chapters from data and hierarchy
const winnieChapters: Chapter[] = buildChapters(winnieChapterData, winnieHierarchy);

const winnieRelationships: RelationshipWithChapters[] = [
  {
    character1: pooh,
    character2: piglet,
    descriptions: [
      { chapter: 1, description: 'Best friends' },
      { chapter: 3, description: 'Hunting partners' },
    ],
  },
  {
    character1: pooh,
    character2: eeyore,
    descriptions: [
      { chapter: 1, description: 'Friends' },
      { chapter: 4, description: 'Pooh finds Eeyore\'s tail' },
    ],
  },
  {
    character1: cr,
    character2: pooh,
    descriptions: [
      { chapter: 1, description: 'Christopher Robin\'s favorite bear' },
      { chapter: 8, description: 'Expotition leader' },
    ],
  },
  {
    character1: rabbit,
    character2: owl,
    descriptions: [
      { chapter: 3, description: 'Forest neighbors' },
    ],
  },
  {
    character1: kanga,
    character2: roo,
    descriptions: [
      { chapter: 7, description: 'Mother and child' },
    ],
  },
  {
    character1: piglet,
    character2: heffalump,
    descriptions: [
      { chapter: 5, description: 'Piglet meets a Heffalump' },
    ],
  },
];

export const winnieBookData: BookData = {
  book: winnieBook,
  characters: winnieCharacters,
  chapters: winnieChapters,
  factions: winnieFactions,
  relationships: winnieRelationships,
}; 