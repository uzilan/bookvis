import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import type { Author } from '../models/Author';
import type { Chapter } from '../models/Chapter';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';

// Author definition
const tolkien: Author = {
  id: 'jrr-tolkien',
  name: 'J.R.R. Tolkien',
};

// Book definition
const lotrBook: Book = {
  title: 'The Lord of the Rings',
  author: tolkien,
};

// Characters
const frodo: Character = {
  id: 'frodo-baggins',
  name: 'Frodo Baggins',
  description: 'The Ring-bearer, a hobbit who carries the One Ring to Mount Doom',
  firstAppearanceChapter: 1,
  aliases: ['Mr. Baggins', 'Ring-bearer', 'Master of the Ring'],
  factions: ['hobbits', 'fellowship'],
  attributes: ['Brave', 'Resilient', 'Hobbit', 'Ring-bearer'],
};

const sam: Character = {
  id: 'samwise-gamgee',
  name: 'Samwise Gamgee',
  description: 'Frodo\'s loyal gardener and companion on the quest',
  firstAppearanceChapter: 1,
  aliases: ['Sam', 'Mr. Gamgee'],
  factions: ['hobbits', 'fellowship'],
  attributes: ['Loyal', 'Practical', 'Gardener', 'Brave'],
};

const gandalf: Character = {
  id: 'gandalf',
  name: 'Gandalf',
  description: 'A wizard and member of the Istari, guides the fellowship',
  firstAppearanceChapter: 1,
  aliases: ['Gandalf the Grey', 'Gandalf the White', 'Mithrandir', 'Olorin'],
  factions: ['wizards', 'fellowship'],
  attributes: ['Wizard', 'Wise', 'Powerful', 'Guide'],
};

const aragorn: Character = {
  id: 'aragorn',
  name: 'Aragorn',
  description: 'Ranger of the North, heir to the throne of Gondor',
  firstAppearanceChapter: 1,
  aliases: ['Strider', 'Elessar', 'King Elessar', 'Thorongil'],
  factions: ['rangers', 'fellowship', 'gondor'],
  attributes: ['Ranger', 'King', 'Warrior', 'Healer'],
};

const legolas: Character = {
  id: 'legolas',
  name: 'Legolas',
  description: 'Elf from Mirkwood, member of the fellowship',
  firstAppearanceChapter: 1,
  aliases: ['Prince of Mirkwood'],
  factions: ['elves', 'fellowship'],
  attributes: ['Elf', 'Archer', 'Agile', 'Immortal'],
};

const gimli: Character = {
  id: 'gimli',
  name: 'Gimli',
  description: 'Dwarf from the Lonely Mountain, member of the fellowship',
  firstAppearanceChapter: 1,
  aliases: ['Son of Glóin'],
  factions: ['dwarves', 'fellowship'],
  attributes: ['Dwarf', 'Warrior', 'Stout', 'Loyal'],
};

const boromir: Character = {
  id: 'boromir',
  name: 'Boromir',
  description: 'Captain of Gondor, member of the fellowship',
  firstAppearanceChapter: 1,
  aliases: ['Captain of Gondor'],
  factions: ['gondor', 'fellowship'],
  attributes: ['Warrior', 'Proud', 'Tempted by Ring', 'Noble'],
};

const merry: Character = {
  id: 'meriadoc-brandybuck',
  name: 'Meriadoc Brandybuck',
  description: 'Hobbit from Buckland, member of the fellowship',
  firstAppearanceChapter: 1,
  aliases: ['Merry'],
  factions: ['hobbits', 'fellowship'],
  attributes: ['Hobbit', 'Brave', 'Loyal', 'Knight of Rohan'],
};

const pippin: Character = {
  id: 'peregrin-took',
  name: 'Peregrin Took',
  description: 'Hobbit from Tookland, member of the fellowship',
  firstAppearanceChapter: 1,
  aliases: ['Pippin'],
  factions: ['hobbits', 'fellowship'],
  attributes: ['Hobbit', 'Young', 'Curious', 'Guard of the Citadel'],
};

const gollum: Character = {
  id: 'gollum',
  name: 'Gollum',
  description: 'Former hobbit corrupted by the One Ring',
  firstAppearanceChapter: 2,
  aliases: ['Sméagol', 'Stinker', 'Slinker'],
  factions: ['corrupted'],
  attributes: ['Corrupted', 'Split personality', 'Ring-obsessed', 'Agile'],
};

const sauron: Character = {
  id: 'sauron',
  name: 'Sauron',
  description: 'The Dark Lord, creator of the One Ring',
  firstAppearanceChapter: 1,
  aliases: ['The Dark Lord', 'The Eye', 'Lord of Mordor'],
  factions: ['evil'],
  attributes: ['Dark Lord', 'Powerful', 'Corrupting', 'Immortal'],
};

const saruman: Character = {
  id: 'saruman',
  name: 'Saruman',
  description: 'The White Wizard, corrupted by power',
  firstAppearanceChapter: 2,
  aliases: ['Saruman the White', 'Curunír', 'Sharkey'],
  factions: ['wizards', 'evil'],
  attributes: ['Wizard', 'Corrupted', 'Ambitious', 'Traitor'],
};

const theoden: Character = {
  id: 'theoden',
  name: 'Théoden',
  description: 'King of Rohan, freed from Saruman\'s influence',
  firstAppearanceChapter: 3,
  aliases: ['King of Rohan'],
  factions: ['rohan'],
  attributes: ['King', 'Warrior', 'Freed from corruption', 'Noble'],
};

const eowyn: Character = {
  id: 'eowyn',
  name: 'Éowyn',
  description: 'Princess of Rohan, slayer of the Witch-king',
  firstAppearanceChapter: 3,
  aliases: ['Lady of Rohan', 'Dernhelm'],
  factions: ['rohan'],
  attributes: ['Princess', 'Warrior', 'Brave', 'Slayer of Witch-king'],
};

const faramir: Character = {
  id: 'faramir',
  name: 'Faramir',
  description: 'Captain of Gondor, brother of Boromir',
  firstAppearanceChapter: 4,
  aliases: ['Captain of Gondor'],
  factions: ['gondor'],
  attributes: ['Captain', 'Wise', 'Resistant to Ring', 'Noble'],
};

const denethor: Character = {
  id: 'denethor',
  name: 'Denethor',
  description: 'Steward of Gondor, father of Boromir and Faramir',
  firstAppearanceChapter: 4,
  aliases: ['Steward of Gondor'],
  factions: ['gondor'],
  attributes: ['Steward', 'Proud', 'Despairing', 'Noble'],
};

// Factions
const factions: Faction[] = [
  { id: 'hobbits', title: 'Hobbits', description: 'Small, peaceful folk of the Shire', color: '#8BC34A' },
  { id: 'fellowship', title: 'Fellowship of the Ring', description: 'The nine companions who set out to destroy the Ring', color: '#2196F3' },
  { id: 'wizards', title: 'Wizards', description: 'The Istari, powerful beings sent to guide Middle-earth', color: '#9C27B0' },
  { id: 'elves', title: 'Elves', description: 'Immortal beings of great wisdom and beauty', color: '#4CAF50' },
  { id: 'dwarves', title: 'Dwarves', description: 'Stout warriors and craftsmen', color: '#FF9800' },
  { id: 'gondor', title: 'Gondor', description: 'The greatest kingdom of Men', color: '#795548' },
  { id: 'rohan', title: 'Rohan', description: 'Kingdom of the horse-lords', color: '#607D8B' },
  { id: 'rangers', title: 'Rangers', description: 'Protectors of the North', color: '#795548' },
  { id: 'evil', title: 'Evil', description: 'Forces of darkness and corruption', color: '#F44336' },
  { id: 'corrupted', title: 'Corrupted', description: 'Those corrupted by the Ring or other evil', color: '#9E9E9E' },
];

// Complex hierarchical chapters
const fellowshipPart1 = {
  book: lotrBook,
  title: 'The Ring Sets Out',
  index: 1,
  level: 2,
  type: 'part',
  parent: { book: lotrBook, title: 'The Fellowship of the Ring', index: 1, level: 1, type: 'book' },
  path: ['The Fellowship of the Ring', 'The Ring Sets Out'],
};
const fellowshipPart2 = {
  book: lotrBook,
  title: 'The Ring Goes South',
  index: 2,
  level: 2,
  type: 'part',
  parent: { book: lotrBook, title: 'The Fellowship of the Ring', index: 1, level: 1, type: 'book' },
  path: ['The Fellowship of the Ring', 'The Ring Goes South'],
};
const twoTowersPart1 = {
  book: lotrBook,
  title: 'The Treason of Isengard',
  index: 3,
  level: 2,
  type: 'part',
  parent: { book: lotrBook, title: 'The Two Towers', index: 2, level: 1, type: 'book' },
  path: ['The Two Towers', 'The Treason of Isengard'],
};
const twoTowersPart2 = {
  book: lotrBook,
  title: 'The Journey of the Ring-bearers',
  index: 4,
  level: 2,
  type: 'part',
  parent: { book: lotrBook, title: 'The Two Towers', index: 2, level: 1, type: 'book' },
  path: ['The Two Towers', 'The Journey of the Ring-bearers'],
};
const returnKingPart1 = {
  book: lotrBook,
  title: 'The War of the Ring',
  index: 5,
  level: 2,
  type: 'part',
  parent: { book: lotrBook, title: 'The Return of the King', index: 3, level: 1, type: 'book' },
  path: ['The Return of the King', 'The War of the Ring'],
};
const returnKingPart2 = {
  book: lotrBook,
  title: 'The End of the Third Age',
  index: 6,
  level: 2,
  type: 'part',
  parent: { book: lotrBook, title: 'The Return of the King', index: 3, level: 1, type: 'book' },
  path: ['The Return of the King', 'The End of the Third Age'],
};

// Fellowship of the Ring - Part 1 chapters
const chapters: Chapter[] = [
  // Fellowship of the Ring
  {
    book: lotrBook,
    title: 'The Fellowship of the Ring',
    index: 1,
    level: 1,
    type: 'book',
    partTitle: 'Book 1',
    globalIndex: 1,
    path: ['The Fellowship of the Ring'],
  },
  
  // Part 1
  {
    ...fellowshipPart1,
    type: 'part',
    level: 2,
    parent: { book: lotrBook, title: 'The Fellowship of the Ring', index: 1, level: 1, type: 'book' },
    path: ['The Fellowship of the Ring', 'The Ring Sets Out'],
  },
  
  // Part 1 chapters
  {
    book: lotrBook,
    title: 'A Long-expected Party',
    index: 1,
    level: 3,
    type: 'chapter',
    globalIndex: 2,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'A Long-expected Party'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Shadow of the Past',
    index: 2,
    level: 3,
    type: 'chapter',
    globalIndex: 3,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'The Shadow of the Past'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Three is Company',
    index: 3,
    level: 3,
    type: 'chapter',
    globalIndex: 4,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'Three is Company'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'A Short Cut to Mushrooms',
    index: 4,
    level: 3,
    type: 'chapter',
    globalIndex: 5,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'A Short Cut to Mushrooms'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'A Conspiracy Unmasked',
    index: 5,
    level: 3,
    type: 'chapter',
    globalIndex: 6,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'A Conspiracy Unmasked'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Old Forest',
    index: 6,
    level: 3,
    type: 'chapter',
    globalIndex: 7,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'The Old Forest'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'In the House of Tom Bombadil',
    index: 7,
    level: 3,
    type: 'chapter',
    globalIndex: 8,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'In the House of Tom Bombadil'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Fog on the Barrow-downs',
    index: 8,
    level: 3,
    type: 'chapter',
    globalIndex: 9,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'Fog on the Barrow-downs'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'At the Sign of the Prancing Pony',
    index: 9,
    level: 3,
    type: 'chapter',
    globalIndex: 10,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'At the Sign of the Prancing Pony'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Strider',
    index: 10,
    level: 3,
    type: 'chapter',
    globalIndex: 11,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'Strider'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'A Knife in the Dark',
    index: 11,
    level: 3,
    type: 'chapter',
    globalIndex: 12,
    path: ['The Fellowship of the Ring', 'The Ring Sets Out', 'A Knife in the Dark'],
    parent: { book: lotrBook, title: 'The Ring Sets Out', index: 1, level: 2, type: 'part' },
  },
  
  // Part 2
  {
    ...fellowshipPart2,
    type: 'part',
    level: 2,
    parent: { book: lotrBook, title: 'The Fellowship of the Ring', index: 1, level: 1, type: 'book' },
    path: ['The Fellowship of the Ring', 'The Ring Goes South'],
  },
  
  // Part 2 chapters
  {
    book: lotrBook,
    title: 'Many Meetings',
    index: 1,
    level: 3,
    type: 'chapter',
    globalIndex: 13,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'Many Meetings'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Council of Elrond',
    index: 2,
    level: 3,
    type: 'chapter',
    globalIndex: 14,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'The Council of Elrond'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Ring Goes South',
    index: 3,
    level: 3,
    type: 'chapter',
    globalIndex: 15,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'The Ring Goes South'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'A Journey in the Dark',
    index: 4,
    level: 3,
    type: 'chapter',
    globalIndex: 16,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'A Journey in the Dark'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Bridge of Khazad-dûm',
    index: 5,
    level: 3,
    type: 'chapter',
    globalIndex: 17,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'The Bridge of Khazad-dûm'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Lothlórien',
    index: 6,
    level: 3,
    type: 'chapter',
    globalIndex: 18,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'Lothlórien'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Mirror of Galadriel',
    index: 7,
    level: 3,
    type: 'chapter',
    globalIndex: 19,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'The Mirror of Galadriel'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Farewell to Lórien',
    index: 8,
    level: 3,
    type: 'chapter',
    globalIndex: 20,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'Farewell to Lórien'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Great River',
    index: 9,
    level: 3,
    type: 'chapter',
    globalIndex: 21,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'The Great River'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Breaking of the Fellowship',
    index: 10,
    level: 3,
    type: 'chapter',
    globalIndex: 22,
    path: ['The Fellowship of the Ring', 'The Ring Goes South', 'The Breaking of the Fellowship'],
    parent: { book: lotrBook, title: 'The Ring Goes South', index: 2, level: 2, type: 'part' },
  },
  
  // The Two Towers
  {
    book: lotrBook,
    title: 'The Two Towers',
    index: 2,
    level: 1,
    type: 'book',
    partTitle: 'Book 2',
    globalIndex: 23,
    path: ['The Two Towers'],
  },
  
  // Part 1
  {
    ...twoTowersPart1,
    type: 'part',
    level: 2,
    parent: { book: lotrBook, title: 'The Two Towers', index: 2, level: 1, type: 'book' },
    path: ['The Two Towers', 'The Treason of Isengard'],
  },
  
  // Part 1 chapters
  {
    book: lotrBook,
    title: 'The Departure of Boromir',
    index: 1,
    level: 3,
    type: 'chapter',
    globalIndex: 24,
    path: ['The Two Towers', 'The Treason of Isengard', 'The Departure of Boromir'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Riders of Rohan',
    index: 2,
    level: 3,
    type: 'chapter',
    globalIndex: 25,
    path: ['The Two Towers', 'The Treason of Isengard', 'The Riders of Rohan'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Uruk-hai',
    index: 3,
    level: 3,
    type: 'chapter',
    globalIndex: 26,
    path: ['The Two Towers', 'The Treason of Isengard', 'The Uruk-hai'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Treebeard',
    index: 4,
    level: 3,
    type: 'chapter',
    globalIndex: 27,
    path: ['The Two Towers', 'The Treason of Isengard', 'Treebeard'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The White Rider',
    index: 5,
    level: 3,
    type: 'chapter',
    globalIndex: 28,
    path: ['The Two Towers', 'The Treason of Isengard', 'The White Rider'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The King of the Golden Hall',
    index: 6,
    level: 3,
    type: 'chapter',
    globalIndex: 29,
    path: ['The Two Towers', 'The Treason of Isengard', 'The King of the Golden Hall'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Helm\'s Deep',
    index: 7,
    level: 3,
    type: 'chapter',
    globalIndex: 30,
    path: ['The Two Towers', 'The Treason of Isengard', 'Helm\'s Deep'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Road to Isengard',
    index: 8,
    level: 3,
    type: 'chapter',
    globalIndex: 31,
    path: ['The Two Towers', 'The Treason of Isengard', 'The Road to Isengard'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Flotsam and Jetsam',
    index: 9,
    level: 3,
    type: 'chapter',
    globalIndex: 32,
    path: ['The Two Towers', 'The Treason of Isengard', 'Flotsam and Jetsam'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Voice of Saruman',
    index: 10,
    level: 3,
    type: 'chapter',
    globalIndex: 33,
    path: ['The Two Towers', 'The Treason of Isengard', 'The Voice of Saruman'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Palantír',
    index: 11,
    level: 3,
    type: 'chapter',
    globalIndex: 34,
    path: ['The Two Towers', 'The Treason of Isengard', 'The Palantír'],
    parent: { book: lotrBook, title: 'The Treason of Isengard', index: 3, level: 2, type: 'part' },
  },
  
  // Part 2
  {
    ...twoTowersPart2,
    type: 'part',
    level: 2,
    parent: { book: lotrBook, title: 'The Two Towers', index: 2, level: 1, type: 'book' },
    path: ['The Two Towers', 'The Journey of the Ring-bearers'],
  },
  
  // Part 2 chapters
  {
    book: lotrBook,
    title: 'The Taming of Sméagol',
    index: 1,
    level: 3,
    type: 'chapter',
    globalIndex: 35,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Taming of Sméagol'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Passage of the Marshes',
    index: 2,
    level: 3,
    type: 'chapter',
    globalIndex: 36,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Passage of the Marshes'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Black Gate is Closed',
    index: 3,
    level: 3,
    type: 'chapter',
    globalIndex: 37,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Black Gate is Closed'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Of Herbs and Stewed Rabbit',
    index: 4,
    level: 3,
    type: 'chapter',
    globalIndex: 38,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'Of Herbs and Stewed Rabbit'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Window on the West',
    index: 5,
    level: 3,
    type: 'chapter',
    globalIndex: 39,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Window on the West'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Forbidden Pool',
    index: 6,
    level: 3,
    type: 'chapter',
    globalIndex: 40,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Forbidden Pool'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Journey to the Cross-roads',
    index: 7,
    level: 3,
    type: 'chapter',
    globalIndex: 41,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'Journey to the Cross-roads'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Stairs of Cirith Ungol',
    index: 8,
    level: 3,
    type: 'chapter',
    globalIndex: 42,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Stairs of Cirith Ungol'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Shelob\'s Lair',
    index: 9,
    level: 3,
    type: 'chapter',
    globalIndex: 43,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'Shelob\'s Lair'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Choices of Master Samwise',
    index: 10,
    level: 3,
    type: 'chapter',
    globalIndex: 44,
    path: ['The Two Towers', 'The Journey of the Ring-bearers', 'The Choices of Master Samwise'],
    parent: { book: lotrBook, title: 'The Journey of the Ring-bearers', index: 4, level: 2, type: 'part' },
  },
  
  // The Return of the King
  {
    book: lotrBook,
    title: 'The Return of the King',
    index: 3,
    level: 1,
    type: 'book',
    partTitle: 'Book 3',
    globalIndex: 45,
    path: ['The Return of the King'],
  },
  
  // Part 1
  {
    ...returnKingPart1,
    type: 'part',
    level: 2,
    parent: { book: lotrBook, title: 'The Return of the King', index: 3, level: 1, type: 'book' },
    path: ['The Return of the King', 'The War of the Ring'],
  },
  
  // Part 1 chapters
  {
    book: lotrBook,
    title: 'Minas Tirith',
    index: 1,
    level: 3,
    type: 'chapter',
    globalIndex: 46,
    path: ['The Return of the King', 'The War of the Ring', 'Minas Tirith'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Passing of the Grey Company',
    index: 2,
    level: 3,
    type: 'chapter',
    globalIndex: 47,
    path: ['The Return of the King', 'The War of the Ring', 'The Passing of the Grey Company'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Muster of Rohan',
    index: 3,
    level: 3,
    type: 'chapter',
    globalIndex: 48,
    path: ['The Return of the King', 'The War of the Ring', 'The Muster of Rohan'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Siege of Gondor',
    index: 4,
    level: 3,
    type: 'chapter',
    globalIndex: 49,
    path: ['The Return of the King', 'The War of the Ring', 'The Siege of Gondor'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Ride of the Rohirrim',
    index: 5,
    level: 3,
    type: 'chapter',
    globalIndex: 50,
    path: ['The Return of the King', 'The War of the Ring', 'The Ride of the Rohirrim'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Battle of the Pelennor Fields',
    index: 6,
    level: 3,
    type: 'chapter',
    globalIndex: 51,
    path: ['The Return of the King', 'The War of the Ring', 'The Battle of the Pelennor Fields'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Pyre of Denethor',
    index: 7,
    level: 3,
    type: 'chapter',
    globalIndex: 52,
    path: ['The Return of the King', 'The War of the Ring', 'The Pyre of Denethor'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Houses of Healing',
    index: 8,
    level: 3,
    type: 'chapter',
    globalIndex: 53,
    path: ['The Return of the King', 'The War of the Ring', 'The Houses of Healing'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Last Debate',
    index: 9,
    level: 3,
    type: 'chapter',
    globalIndex: 54,
    path: ['The Return of the King', 'The War of the Ring', 'The Last Debate'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Black Gate Opens',
    index: 10,
    level: 3,
    type: 'chapter',
    globalIndex: 55,
    path: ['The Return of the King', 'The War of the Ring', 'The Black Gate Opens'],
    parent: { book: lotrBook, title: 'The War of the Ring', index: 5, level: 2, type: 'part' },
  },
  
  // Part 2
  {
    ...returnKingPart2,
    type: 'part',
    level: 2,
    parent: { book: lotrBook, title: 'The Return of the King', index: 3, level: 1, type: 'book' },
    path: ['The Return of the King', 'The End of the Third Age'],
  },
  
  // Part 2 chapters
  {
    book: lotrBook,
    title: 'The Tower of Cirith Ungol',
    index: 1,
    level: 3,
    type: 'chapter',
    globalIndex: 56,
    path: ['The Return of the King', 'The End of the Third Age', 'The Tower of Cirith Ungol'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Land of Shadow',
    index: 2,
    level: 3,
    type: 'chapter',
    globalIndex: 57,
    path: ['The Return of the King', 'The End of the Third Age', 'The Land of Shadow'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Mount Doom',
    index: 3,
    level: 3,
    type: 'chapter',
    globalIndex: 58,
    path: ['The Return of the King', 'The End of the Third Age', 'Mount Doom'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Field of Cormallen',
    index: 4,
    level: 3,
    type: 'chapter',
    globalIndex: 59,
    path: ['The Return of the King', 'The End of the Third Age', 'The Field of Cormallen'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Steward and the King',
    index: 5,
    level: 3,
    type: 'chapter',
    globalIndex: 60,
    path: ['The Return of the King', 'The End of the Third Age', 'The Steward and the King'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Many Partings',
    index: 6,
    level: 3,
    type: 'chapter',
    globalIndex: 61,
    path: ['The Return of the King', 'The End of the Third Age', 'Many Partings'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'Homeward Bound',
    index: 7,
    level: 3,
    type: 'chapter',
    globalIndex: 62,
    path: ['The Return of the King', 'The End of the Third Age', 'Homeward Bound'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Scouring of the Shire',
    index: 8,
    level: 3,
    type: 'chapter',
    globalIndex: 63,
    path: ['The Return of the King', 'The End of the Third Age', 'The Scouring of the Shire'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
  {
    book: lotrBook,
    title: 'The Grey Havens',
    index: 9,
    level: 3,
    type: 'chapter',
    globalIndex: 64,
    path: ['The Return of the King', 'The End of the Third Age', 'The Grey Havens'],
    parent: { book: lotrBook, title: 'The End of the Third Age', index: 6, level: 2, type: 'part' },
  },
];

// Relationships
const relationships: RelationshipWithChapters[] = [
  {
    character1: frodo,
    character2: sam,
    descriptions: [
      { chapter: 1, description: 'Master and servant, become close friends' },
      { chapter: 22, description: 'Sam remains loyal when Frodo leaves the fellowship' },
      { chapter: 44, description: 'Sam rescues Frodo from Shelob' },
      { chapter: 58, description: 'Together at Mount Doom to destroy the Ring' },
    ],
  },
  {
    character1: frodo,
    character2: gandalf,
    descriptions: [
      { chapter: 1, description: 'Gandalf guides Frodo on his quest' },
      { chapter: 17, description: 'Gandalf falls in Moria protecting the fellowship' },
    ],
  },
  {
    character1: frodo,
    character2: aragorn,
    descriptions: [
      { chapter: 1, description: 'Aragorn protects Frodo as Strider' },
      { chapter: 22, description: 'Aragorn leads the fellowship after Gandalf falls' },
    ],
  },
  {
    character1: frodo,
    character2: gollum,
    descriptions: [
      { chapter: 35, description: 'Gollum becomes Frodo\'s guide to Mordor' },
      { chapter: 44, description: 'Gollum betrays Frodo to Shelob' },
      { chapter: 58, description: 'Gollum takes the Ring and falls into Mount Doom' },
    ],
  },
  {
    character1: aragorn,
    character2: legolas,
    descriptions: [
      { chapter: 1, description: 'Fellowship members and close friends' },
      { chapter: 24, description: 'Together track the Uruk-hai' },
    ],
  },
  {
    character1: aragorn,
    character2: gimli,
    descriptions: [
      { chapter: 1, description: 'Fellowship members, develop friendship' },
      { chapter: 24, description: 'Together track the Uruk-hai' },
    ],
  },
  {
    character1: legolas,
    character2: gimli,
    descriptions: [
      { chapter: 1, description: 'Elf and dwarf, overcome ancient enmity' },
      { chapter: 24, description: 'Develop deep friendship during the quest' },
    ],
  },
  {
    character1: merry,
    character2: pippin,
    descriptions: [
      { chapter: 1, description: 'Best friends and cousins' },
      { chapter: 24, description: 'Captured together by Uruk-hai' },
    ],
  },
  {
    character1: boromir,
    character2: frodo,
    descriptions: [
      { chapter: 1, description: 'Boromir is tempted by the Ring' },
      { chapter: 22, description: 'Boromir tries to take the Ring from Frodo' },
    ],
  },
  {
    character1: theoden,
    character2: eowyn,
    descriptions: [
      { chapter: 29, description: 'Uncle and niece, king and princess' },
      { chapter: 51, description: 'Éowyn fights to protect her uncle\'s kingdom' },
    ],
  },
  {
    character1: faramir,
    character2: denethor,
    descriptions: [
      { chapter: 39, description: 'Father and son, steward and captain' },
      { chapter: 52, description: 'Denethor despairs over Faramir\'s injury' },
    ],
  },
  {
    character1: saruman,
    character2: gandalf,
    descriptions: [
      { chapter: 1, description: 'Former allies, now enemies' },
      { chapter: 33, description: 'Saruman tries to corrupt Gandalf' },
    ],
  },
  {
    character1: sauron,
    character2: frodo,
    descriptions: [
      { chapter: 1, description: 'Sauron seeks the Ring that Frodo carries' },
      { chapter: 58, description: 'Final confrontation at Mount Doom' },
    ],
  },
  {
    character1: gollum,
    character2: sam,
    descriptions: [
      { chapter: 35, description: 'Sam distrusts Gollum as guide' },
      { chapter: 44, description: 'Sam fights Gollum to protect Frodo' },
    ],
  },
];

const characters: Character[] = [
  frodo, sam, gandalf, aragorn, legolas, gimli, boromir, merry, pippin, 
  gollum, sauron, saruman, theoden, eowyn, faramir, denethor,
];

// Utility to fix parent references in chapters array
function fixChapterParents(chapters: Chapter[]): void {
  for (const chapter of chapters) {
    if (chapter.parent) {
      const parent = chapters.find(
        ch => ch.title === chapter.parent!.title && ch.type === chapter.parent!.type && ch.level === chapter.parent!.level
      );
      if (parent) {
        chapter.parent = parent;
      }
    }
  }
}

fixChapterParents(chapters);

export const lotrData: BookData = {
  book: lotrBook,
  characters,
  chapters,
  factions,
  relationships,
}; 