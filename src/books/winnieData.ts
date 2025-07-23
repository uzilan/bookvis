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

// Hierarchy definition - order determines chapter sequence
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
    
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

const winnie: Character = {
  id: 'winnie-the-pooh',
  name: 'Winnie the Pooh',
  description: 'A honey-loving bear who lives in the Hundred Acre Wood',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Pooh', 'Pooh Bear'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-1', // Appears in the Hundred Acre Wood in chapter 1
  },
  attributes: ['Bear', 'Honey-loving', 'Friendly', 'Simple'],
};

const piglet: Character = {
  id: 'piglet',
  name: 'Piglet',
  description: 'A small, timid pig who is Pooh\'s best friend',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Piglet'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-1', // Appears in the Hundred Acre Wood in chapter 1
  },
  attributes: ['Pig', 'Timid', 'Brave', 'Loyal'],
};

const tigger: Character = {
  id: 'tigger',
  name: 'Tigger',
  description: 'A bouncy tiger who loves to bounce',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Tigger'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-1', // Appears in the Hundred Acre Wood in chapter 1
  },
  attributes: ['Tiger', 'Bouncy', 'Energetic', 'Friendly'],
};

const eeyore: Character = {
  id: 'eeyore',
  name: 'Eeyore',
  description: 'A gloomy donkey who is always losing his tail',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Eeyore'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-1', // Appears in the Hundred Acre Wood in chapter 1
  },
  attributes: ['Donkey', 'Gloomy', 'Loyal', 'Patient'],
};

const rabbit: Character = {
  id: 'rabbit',
  name: 'Rabbit',
  description: 'A practical rabbit who likes to organize things',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Rabbit'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-2', // Appears in the Hundred Acre Wood in chapter 2
  },
  attributes: ['Rabbit', 'Practical', 'Organized', 'Worried'],
};

const owl: Character = {
  id: 'owl',
  name: 'Owl',
  description: 'A wise owl who lives in a tree',
  firstAppearanceChapter: 'chapter-3',
  aliases: ['Owl'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-3', // Appears in the Hundred Acre Wood in chapter 3
  },
  attributes: ['Owl', 'Wise', 'Talkative', 'Friendly'],
};

const kanga: Character = {
  id: 'kanga',
  name: 'Kanga',
  description: 'A mother kangaroo who carries Roo in her pouch',
  firstAppearanceChapter: 'chapter-7',
  aliases: ['Kanga'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-7', // Appears in the Hundred Acre Wood in chapter 7
  },
  attributes: ['Kangaroo', 'Mother', 'Kind', 'Protective'],
};

const roo: Character = {
  id: 'roo',
  name: 'Roo',
  description: 'A young kangaroo who lives in his mother\'s pouch',
  firstAppearanceChapter: 'chapter-7',
  aliases: ['Roo'],
  factions: ['hundred-acre-wood'],
  factionJoinChapters: {
    'hundred-acre-wood': 'chapter-7', // Appears in the Hundred Acre Wood in chapter 7
  },
  attributes: ['Kangaroo', 'Young', 'Playful', 'Curious'],
};

const christopherRobin: Character = {
  id: 'christopher-robin',
  name: 'Christopher Robin',
  description: 'A young boy who is friends with all the animals',
  firstAppearanceChapter: 'chapter-5',
  aliases: ['Christopher Robin'],
  factions: ['humans'],
  factionJoinChapters: {
    'humans': 'chapter-5', // Appears as a human in chapter 5
  },
  attributes: ['Human', 'Young', 'Imaginative', 'Friend'],
};

const winnieCharacters: Character[] = [
  winnie, piglet, tigger, eeyore, rabbit, owl, kanga, roo, christopherRobin
];

const winnieFactions: Faction[] = [
  { id: 'hundred-acre-wood', title: 'Hundred Acre Wood', description: 'The main forest where all the animals live.', color: '#A7C7E7' }, // soft blue
  { id: 'humans', title: 'Humans', description: 'The people who live outside the forest.', color: '#C7A7E7' }, // muted mauve
];

// Build chapters from data and hierarchy
const winnieChapters: Chapter[] = buildChapters(winnieChapterData, winnieHierarchy);

const winnieRelationships: RelationshipWithChapters[] = [
  {
    character1: winnie,
    character2: piglet,
    descriptions: [
      { chapter: 'chapter-1', description: 'Best friends' },
      { chapter: 'chapter-3', description: 'Hunting partners' },
    ],
  },
  {
    character1: winnie,
    character2: eeyore,
    descriptions: [
      { chapter: 'chapter-1', description: 'Friends' },
      { chapter: 'chapter-4', description: 'Pooh finds Eeyore\'s tail' },
    ],
  },
  {
    character1: christopherRobin,
    character2: winnie,
    descriptions: [
      { chapter: 'chapter-5', description: 'Christopher Robin\'s favorite bear' },
      { chapter: 'chapter-8', description: 'Expotition leader' },
    ],
  },
  {
    character1: rabbit,
    character2: owl,
    descriptions: [
      { chapter: 'chapter-3', description: 'Forest neighbors' },
    ],
  },
  {
    character1: kanga,
    character2: roo,
    descriptions: [
      { chapter: 'chapter-7', description: 'Mother and child' },
    ],
  },
  {
    character1: piglet,
    character2: christopherRobin,
    descriptions: [
      { chapter: 'chapter-5', description: 'Piglet meets a Heffalump' },
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