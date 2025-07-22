import type { BookData } from './models/BookData';
import type { Chapter } from './models/Chapter';
import type { Character } from './models/Character';
import type { Faction } from './models/Faction';
import type { RelationshipWithChapters } from './models/BookData';

const aliceBook = {
  author: { id: 'carroll', name: 'Lewis Carroll' },
  title: "Alice's Adventures in Wonderland",
};

const alice: Character = { name: 'Alice', id: 'alice', description: 'A curious girl who falls down a rabbit hole.', firstAppearanceChapter: 1, aliases: [], factions: ['wonderlanders'], attributes: ['Curious', 'Brave', 'Imaginative'] };
const whiteRabbit: Character = { name: 'White Rabbit', id: 'whiteRabbit', description: 'A rabbit in a hurry.', firstAppearanceChapter: 1, aliases: [], factions: ['wonderlanders'], attributes: ['Always late', 'Nervous', 'Polite'] };
const madHatter: Character = { name: 'Mad Hatter', id: 'madHatter', description: 'A mad tea party host.', firstAppearanceChapter: 7, aliases: [], factions: ['wonderlanders'], attributes: ['Mad', 'Tea lover', 'Eccentric'] };
const queenHearts: Character = { name: 'Queen of Hearts', id: 'queenHearts', description: 'A tyrannical ruler.', firstAppearanceChapter: 8, aliases: [], factions: ['royalty'], attributes: ['Short-tempered', 'Loud', 'Fond of tarts'] };
const cheshireCat: Character = { name: 'Cheshire Cat', id: 'cheshireCat', description: 'A grinning cat.', firstAppearanceChapter: 6, aliases: [], factions: ['wonderlanders'], attributes: ['Mischievous', 'Can disappear', 'Grinning'] };

const aliceCharacters: Character[] = [alice, whiteRabbit, madHatter, queenHearts, cheshireCat];

const aliceFactions: Faction[] = [
  { id: 'wonderlanders', title: 'Wonderlanders', description: 'Inhabitants of Wonderland.', color: '#E7C7A7' },
  { id: 'royalty', title: 'Royalty', description: 'The ruling class.', color: '#E7A7A7' },
];

const aliceChapters: Chapter[] = [
  { book: aliceBook, title: 'Down the Rabbit-Hole', index: 1 },
  { book: aliceBook, title: 'The Pool of Tears', index: 2 },
  { book: aliceBook, title: 'A Caucus-Race and a Long Tale', index: 3 },
  { book: aliceBook, title: 'The Rabbit Sends in a Little Bill', index: 4 },
  { book: aliceBook, title: 'Advice from a Caterpillar', index: 5 },
  { book: aliceBook, title: 'Pig and Pepper', index: 6 },
  { book: aliceBook, title: 'A Mad Tea-Party', index: 7 },
  { book: aliceBook, title: 'The Queen’s Croquet-Ground', index: 8 },
  { book: aliceBook, title: 'The Mock Turtle’s Story', index: 9 },
  { book: aliceBook, title: 'The Lobster Quadrille', index: 10 },
  { book: aliceBook, title: 'Who Stole the Tarts?', index: 11 },
  { book: aliceBook, title: 'Alice’s Evidence', index: 12 },
];

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
      { chapter: 7, description: 'Alice attends the Mad Tea-Party' },
    ],
  },
  {
    character1: alice,
    character2: queenHearts,
    descriptions: [
      { chapter: 8, description: 'Alice meets the Queen of Hearts' },
    ],
  },
  {
    character1: alice,
    character2: cheshireCat,
    descriptions: [
      { chapter: 6, description: 'Alice meets the Cheshire Cat' },
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