import type { Chapter } from './models/Chapter';
import type { Character } from './models/Character';
import type { Faction } from './models/Faction';

export const winnieBook = {
  author: { id: 'milne', name: 'A. A. Milne' },
  title: 'Winnie-the-Pooh',
};

export const pooh: Character = { name: 'Winnie-the-Pooh', id: 'pooh', description: 'A bear of very little brain.', firstAppearanceChapter: 1, aliases: ['Pooh'], factions: ['friends'], attributes: [] };
export const piglet: Character = { name: 'Piglet', id: 'piglet', description: 'A small and timid pig.', firstAppearanceChapter: 1, aliases: [], factions: ['friends'], attributes: [] };
export const eeyore: Character = { name: 'Eeyore', id: 'eeyore', description: 'A gloomy donkey.', firstAppearanceChapter: 1, aliases: [], factions: ['friends'], attributes: [] };
export const cr: Character = { name: 'Christopher Robin', id: 'cr', description: 'A boy and Pooh’s best friend.', firstAppearanceChapter: 1, aliases: [], factions: ['friends'], attributes: [] };
export const rabbit: Character = { name: 'Rabbit', id: 'rabbit', description: 'A practical rabbit.', firstAppearanceChapter: 2, aliases: [], factions: ['friends'], attributes: [] };
export const owl: Character = { name: 'Owl', id: 'owl', description: 'A wise owl.', firstAppearanceChapter: 3, aliases: [], factions: ['friends'], attributes: [] };
export const kanga: Character = { name: 'Kanga', id: 'kanga', description: 'A mother kangaroo.', firstAppearanceChapter: 7, aliases: [], factions: ['friends'], attributes: [] };
export const roo: Character = { name: 'Roo', id: 'roo', description: 'Kanga’s child.', firstAppearanceChapter: 7, aliases: [], factions: ['friends'], attributes: [] };
export const heffalump: Character = { name: 'Heffalump', id: 'heffalump', description: 'A mysterious creature.', firstAppearanceChapter: 5, aliases: [], factions: ['heffalumps'], attributes: [] };

export const winnieChapters: Chapter[] = [
  { book: winnieBook, title: 'In Which We Are Introduced to Winnie-the-Pooh and Some Bees, and the Stories Begin', index: 1 },
  { book: winnieBook, title: 'In Which Pooh Goes Visiting and Gets into a Tight Place', index: 2 },
  { book: winnieBook, title: 'In Which Pooh and Piglet Go Hunting and Nearly Catch a Woozle', index: 3 },
  { book: winnieBook, title: 'In Which Eeyore Loses a Tail and Pooh Finds One', index: 4 },
  { book: winnieBook, title: 'In Which Piglet Meets a Heffalump', index: 5 },
  { book: winnieBook, title: 'In Which Eeyore Has a Birthday and Gets Two Presents', index: 6 },
  { book: winnieBook, title: 'In Which Kanga and Baby Roo Come to the Forest, and Piglet Has a Bath', index: 7 },
  { book: winnieBook, title: 'In Which Christopher Robin Leads an Expotition to the North Pole', index: 8 },
  { book: winnieBook, title: 'In Which Piglet Does a Very Grand Thing', index: 9 },
  { book: winnieBook, title: 'In Which Christopher Robin Gives a Pooh Party, and We Say Good-bye', index: 10 },
];

export const winnieCharacters: Character[] = [
  pooh, piglet, eeyore, cr, rabbit, owl, kanga, roo, heffalump
];

export const winnieFactions: Faction[] = [
  { id: 'friends', title: 'Pooh’s Friends', description: 'The main group of friends in the Hundred Acre Wood.' },
  { id: 'heffalumps', title: 'Heffalumps', description: 'Imaginary creatures.' },
];

export interface RelationshipWithChapters {
  character1: Character;
  character2: Character;
  descriptions: { chapter: number; description: string }[];
}

export const winnieRelationships: RelationshipWithChapters[] = [
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
      { chapter: 4, description: 'Pooh finds Eeyore’s tail' },
    ],
  },
  {
    character1: cr,
    character2: pooh,
    descriptions: [
      { chapter: 1, description: 'Christopher Robin’s favorite bear' },
      { chapter: 8, description: 'Expotition leader' },
    ],
  },
  {
    character1: pooh,
    character2: cr,
    descriptions: [
      { chapter: 1, description: 'Pooh’s best friend' },
      { chapter: 8, description: 'Follows Robin on expotition' },
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