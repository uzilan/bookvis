import type { Character } from './models/Character';
import type { Chapter } from './models/Chapter';
import type { Faction } from './models/Faction';
import type { Book } from './models/Book';

export const aliceBook: Book = {
  author: { id: 'carroll', name: 'Lewis Carroll' },
  title: 'Alice\'s Adventures in Wonderland',
};

// Alice in Wonderland characters
export const alice: Character = { name: 'Alice', id: 'alice', description: 'A curious young girl who falls down a rabbit hole.', firstAppearanceChapter: 1, aliases: [], factions: ['humans'], attributes: ['Very curious', 'Loves to explore', 'Grows and shrinks', 'Always polite'] };
export const whiteRabbit: Character = { name: 'White Rabbit', id: 'white-rabbit', description: 'A rabbit in a waistcoat who is always in a hurry.', firstAppearanceChapter: 1, aliases: [], factions: ['wonderland'], attributes: ['Always late', 'Wears a waistcoat', 'Carries a pocket watch', 'Very nervous'] };
export const cheshireCat: Character = { name: 'Cheshire Cat', id: 'cheshire-cat', description: 'A mysterious cat that can disappear and reappear.', firstAppearanceChapter: 6, aliases: [], factions: ['wonderland'], attributes: ['Can disappear', 'Very mysterious', 'Gives cryptic advice', 'Always smiling'] };
export const madHatter: Character = { name: 'Mad Hatter', id: 'mad-hatter', description: 'A crazy hatter who hosts a tea party.', firstAppearanceChapter: 7, aliases: [], factions: ['wonderland'], attributes: ['Very mad', 'Hosts tea parties', 'Asks riddles', 'Never finishes tea'] };
export const marchHare: Character = { name: 'March Hare', id: 'march-hare', description: 'A hare who is also mad and attends tea parties.', firstAppearanceChapter: 7, aliases: [], factions: ['wonderland'], attributes: ['Also mad', 'Attends tea parties', 'Very energetic', 'Loves tea'] };
export const queenOfHearts: Character = { name: 'Queen of Hearts', id: 'queen-of-hearts', description: 'A tyrannical queen who orders executions.', firstAppearanceChapter: 8, aliases: [], factions: ['royalty'], attributes: ['Very tyrannical', 'Orders executions', 'Loves croquet', 'Always angry'] };
export const kingOfHearts: Character = { name: 'King of Hearts', id: 'king-of-hearts', description: 'The king who is quieter than his queen.', firstAppearanceChapter: 8, aliases: [], factions: ['royalty'], attributes: ['Quieter than queen', 'More reasonable', 'Loves croquet', 'Tries to be fair'] };
export const caterpillar: Character = { name: 'Caterpillar', id: 'caterpillar', description: 'A wise caterpillar who smokes a hookah.', firstAppearanceChapter: 5, aliases: [], factions: ['wonderland'], attributes: ['Very wise', 'Smokes hookah', 'Gives advice', 'Lives on a mushroom'] };

export const aliceCharacters: Character[] = [
  alice, whiteRabbit, cheshireCat, madHatter, marchHare, queenOfHearts, kingOfHearts, caterpillar
];

export const aliceFactions: Faction[] = [
  { id: 'humans', title: 'Humans', description: 'Human characters in Wonderland.', color: '#E7C7A7' }, // warm beige
  { id: 'wonderland', title: 'Wonderland Creatures', description: 'Magical creatures of Wonderland.', color: '#A7E7C7' }, // soft green
  { id: 'royalty', title: 'Royalty', description: 'The royal court of Hearts.', color: '#E7A7C7' }, // soft pink
];

export const aliceChapters: Chapter[] = [
  { book: aliceBook, title: 'Down the Rabbit-Hole', index: 1 },
  { book: aliceBook, title: 'The Pool of Tears', index: 2 },
  { book: aliceBook, title: 'A Caucus-Race and a Long Tale', index: 3 },
  { book: aliceBook, title: 'The Rabbit Sends in a Little Bill', index: 4 },
  { book: aliceBook, title: 'Advice from a Caterpillar', index: 5 },
  { book: aliceBook, title: 'Pig and Pepper', index: 6 },
  { book: aliceBook, title: 'A Mad Tea-Party', index: 7 },
  { book: aliceBook, title: 'The Queen\'s Croquet-Ground', index: 8 },
  { book: aliceBook, title: 'The Mock Turtle\'s Story', index: 9 },
  { book: aliceBook, title: 'The Lobster Quadrille', index: 10 },
  { book: aliceBook, title: 'Who Stole the Tarts?', index: 11 },
  { book: aliceBook, title: 'Alice\'s Evidence', index: 12 },
];

export interface RelationshipWithChapters {
  character1: Character;
  character2: Character;
  descriptions: { chapter: number; description: string }[];
}

export const aliceRelationships: RelationshipWithChapters[] = [
  {
    character1: alice,
    character2: whiteRabbit,
    descriptions: [
      { chapter: 1, description: 'Alice follows the White Rabbit' },
      { chapter: 4, description: 'The Rabbit sends in a little bill' },
    ],
  },
  {
    character1: alice,
    character2: cheshireCat,
    descriptions: [
      { chapter: 6, description: 'The Cheshire Cat gives Alice advice' },
    ],
  },
  {
    character1: alice,
    character2: madHatter,
    descriptions: [
      { chapter: 7, description: 'Alice attends the Mad Tea-Party' },
    ],
  },
  {
    character1: madHatter,
    character2: marchHare,
    descriptions: [
      { chapter: 7, description: 'Host the tea party together' },
    ],
  },
  {
    character1: queenOfHearts,
    character2: kingOfHearts,
    descriptions: [
      { chapter: 8, description: 'Rule Wonderland together' },
    ],
  },
  {
    character1: alice,
    character2: caterpillar,
    descriptions: [
      { chapter: 5, description: 'The Caterpillar gives Alice advice' },
    ],
  },
]; 