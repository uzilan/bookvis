import type { BookData } from '../models/BookData';
import type { Chapter } from '../models/Chapter';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';

const aliceBook = {
  id: 'alice',
  author: { id: 'carroll', name: 'Lewis Carroll' },
  title: "Alice's Adventures in Wonderland",
};

// Chapter definitions - just basic data
const aliceChapterData = {
  'chapter-1': { id: 'chapter-1', title: 'Down the Rabbit-Hole' },
  'chapter-2': { id: 'chapter-2', title: 'The Pool of Tears' },
  'chapter-3': { id: 'chapter-3', title: 'A Caucus-Race and a Long Tale' },
  'chapter-4': { id: 'chapter-4', title: 'The Rabbit Sends in a Little Bill' },
  'chapter-5': { id: 'chapter-5', title: 'Advice from a Caterpillar' },
  'chapter-6': { id: 'chapter-6', title: 'Pig and Pepper' },
  'chapter-7': { id: 'chapter-7', title: 'A Mad Tea-Party' },
  'chapter-8': { id: 'chapter-8', title: 'The Queen\'s Croquet-Ground' },
  'chapter-9': { id: 'chapter-9', title: 'The Mock Turtle\'s Story' },
  'chapter-10': { id: 'chapter-10', title: 'The Lobster Quadrille' },
  'chapter-11': { id: 'chapter-11', title: 'Who Stole the Tarts?' },
  'chapter-12': { id: 'chapter-12', title: 'Alice\'s Evidence' },
};

// Hierarchy definition - order determines chapter sequence
const aliceHierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }> = [
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
  { chapterId: 'chapter-11', level: 0, type: 'chapter' },
  { chapterId: 'chapter-12', level: 0, type: 'chapter' },
];

// Function to build chapters from data and hierarchy
function buildChapters(chapterData: Record<string, { id: string; title: string }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => ({
    book: aliceBook,
    ...chapterData[item.chapterId],
    
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

const alice: Character = {
  id: 'alice',
  name: 'Alice',
  description: 'A curious young girl who falls down a rabbit hole into Wonderland',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Alice Liddell'],
  factions: ['humans'],
  factionJoinChapters: {
    'humans': 'chapter-1', // Appears as a human in chapter 1
  },
  attributes: ['Curious', 'Brave', 'Imaginative', 'Young'],
};

const whiteRabbit: Character = {
  id: 'white-rabbit',
  name: 'White Rabbit',
  description: 'A nervous rabbit in a waistcoat who is always late',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['The Rabbit'],
  factions: ['wonderland-creatures'],
  factionJoinChapters: {
    'wonderland-creatures': 'chapter-1', // Appears as a wonderland creature in chapter 1
  },
  attributes: ['Nervous', 'Punctual', 'Fashionable', 'Hare'],
};

const caterpillar: Character = {
  id: 'caterpillar',
  name: 'Caterpillar',
  description: 'A wise but rude caterpillar who smokes a hookah',
  firstAppearanceChapter: 'chapter-7',
  aliases: ['Absolem'],
  factions: ['wonderland-creatures'],
  factionJoinChapters: {
    'wonderland-creatures': 'chapter-7', // Appears as a wonderland creature in chapter 7
  },
  attributes: ['Wise', 'Rude', 'Philosophical', 'Insect'],
};

const cheshireCat: Character = {
  id: 'cheshire-cat',
  name: 'Cheshire Cat',
  description: 'A mysterious cat with a disappearing grin',
  firstAppearanceChapter: 'chapter-8',
  aliases: ['The Cat'],
  factions: ['wonderland-creatures'],
  factionJoinChapters: {
    'wonderland-creatures': 'chapter-8', // Appears as a wonderland creature in chapter 8
  },
  attributes: ['Mysterious', 'Playful', 'Disappearing', 'Feline'],
};

const madHatter: Character = {
  id: 'mad-hatter',
  name: 'Mad Hatter',
  description: 'A mad tea party host with a large hat',
  firstAppearanceChapter: 'chapter-6',
  aliases: ['The Hatter'],
  factions: ['wonderland-creatures'],
  factionJoinChapters: {
    'wonderland-creatures': 'chapter-6', // Appears as a wonderland creature in chapter 6
  },
  attributes: ['Mad', 'Host', 'Tea-loving', 'Eccentric'],
};

const aliceCharacters: Character[] = [alice, whiteRabbit, madHatter, caterpillar, cheshireCat];

const aliceFactions: Faction[] = [
  { id: 'wonderlanders', title: 'Wonderlanders', description: 'Inhabitants of Wonderland.', color: '#E7C7A7' },
  { id: 'royalty', title: 'Royalty', description: 'The ruling class.', color: '#E7A7A7' },
];

// Build chapters from data and hierarchy
const aliceChapters = buildChapters(aliceChapterData, aliceHierarchy);

const aliceRelationships: RelationshipWithChapters[] = [
  {
    character1: alice,
    character2: whiteRabbit,
    descriptions: [
      { chapter: 1, description: 'Alice follows the White Rabbit' },
    ],
  },
  {
    character1: alice,
    character2: madHatter,
    descriptions: [
      { chapter: 7, description: 'Alice attends the mad tea party' },
    ],
  },
  {
    character1: alice,
    character2: caterpillar,
    descriptions: [
      { chapter: 7, description: 'Alice meets the Caterpillar' },
    ],
  },
  {
    character1: alice,
    character2: cheshireCat,
    descriptions: [
      { chapter: 8, description: 'Alice meets the Cheshire Cat' },
    ],
  },
];

export const aliceBookData: BookData = {
  book: aliceBook,
  characters: aliceCharacters,
  chapters: aliceChapters,
  factions: aliceFactions,
  relationships: aliceRelationships,
}; 