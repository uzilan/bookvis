import type { BookData } from '../models/BookData';
import type { Chapter } from '../models/Chapter';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';
import type { Location } from '../models/Location';

const winnieBook = {
  id: 'winnie',
  author: { id: 'milne', name: 'A. A. Milne' },
  title: 'Winnie-the-Pooh',
};

// Chapter definitions with location IDs
const winnieChapterData = {
  'chapter-1': { 
    id: 'chapter-1', 
    title: 'In Which We Are Introduced to Winnie-the-Pooh and Some Bees, and the Stories Begin',
    locationIds: ['pooh-house', 'bee-tree', 'picnic-place']
  },
  'chapter-2': { 
    id: 'chapter-2', 
    title: 'In Which Pooh Goes Visiting and Gets into a Tight Place',
    locationIds: ['rabbit-house', 'friends-relations', 'pooh-house']
  },
  'chapter-3': { 
    id: 'chapter-3', 
    title: 'In Which Pooh and Piglet Go Hunting and Nearly Catch a Woozle',
    locationIds: ['woozle-place', 'piglet-house', 'six-pine-trees']
  },
  'chapter-4': { 
    id: 'chapter-4', 
    title: 'In Which Eeyore Loses a Tail and Pooh Finds One',
    locationIds: ['eeyore-place', 'owl-house', 'pooh-house']
  },
  'chapter-5': { 
    id: 'chapter-5', 
    title: 'In Which Piglet Meets a Heffalump',
    locationIds: ['pooh-trap', 'piglet-house', 'big-stones']
  },
  'chapter-6': { 
    id: 'chapter-6', 
    title: 'In Which Eeyore Has a Birthday and Gets Two Presents',
    locationIds: ['eeyore-place', 'picnic-place', 'christopher-house']
  },
  'chapter-7': { 
    id: 'chapter-7', 
    title: 'In Which Kanga and Baby Roo Come to the Forest, and Piglet Has a Bath',
    locationIds: ['kanga-house', 'sandy-pit', 'floody-place']
  },
  'chapter-8': { 
    id: 'chapter-8', 
    title: 'In Which Christopher Robin Leads an Expotition to the North Pole',
    locationIds: ['north-pole', 'galleons-lap', 'stepping-stones']
  },
  'chapter-9': { 
    id: 'chapter-9', 
    title: 'In Which Piglet Does a Very Grand Thing',
    locationIds: ['piglet-house', 'floody-place', 'thoughtful-spot']
  },
  'chapter-10': { 
    id: 'chapter-10', 
    title: 'In Which Christopher Robin Gives a Pooh Party, and We Say Good-bye',
    locationIds: ['pooh-corner', 'poohsticks-bridge', 'gravel-pit']
  },
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
function buildChapters(chapterData: Record<string, { id: string; title: string; locationIds: string[] }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => {
    const chapterDataItem = chapterData[item.chapterId];
    return {
      book: winnieBook,
      id: chapterDataItem.id,
      title: chapterDataItem.title,
      
      level: item.level,
      type: item.type,
      index: index + 1, // For backward compatibility
      
      // Resolve location IDs to actual location objects
      locations: chapterDataItem.locationIds.map(locationId => 
        winnieLocations.find(loc => loc.id === locationId)
      ).filter(Boolean) as Location[],
    };
  });
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

// All locations in the Hundred Acre Wood
const winnieLocations: Location[] = [
  { id: 'pooh-house', name: 'Pooh Bear\'s House', description: 'The home of Winnie-the-Pooh, located under the name "Sanders" in a tree.' },
  { id: 'kanga-house', name: 'Kanga\'s House', description: 'The home of Kanga and Baby Roo, where they live together.' },
  { id: 'sandy-pit', name: 'The Sandy Pit Where Roo Plays', description: 'A sandy area where Roo likes to play and dig.' },
  { id: 'picnic-place', name: 'A Nice Place for Picnics', description: 'A pleasant spot where the friends often gather for picnics.' },
  { id: 'bee-tree', name: 'The Bee Tree', description: 'A tree where bees live and Pooh tries to get honey.' },
  { id: 'north-pole', name: 'The Way to the North Pole', description: 'A path that leads to the North Pole, where Christopher Robin\'s expotition goes.' },
  { id: 'big-stones', name: 'Big Stones and Rocks', description: 'An area with large stones and rocks where the friends sometimes play.' },
  { id: 'rabbit-house', name: 'Rabbit\'s House', description: 'The home of Rabbit, filled with his friends and relations.' },
  { id: 'friends-relations', name: 'Rabbit\'s Friends-and-Relations', description: 'An area where Rabbit\'s many friends and relations live.' },
  { id: 'christopher-house', name: 'Christopher Robin\'s House', description: 'The house where Christopher Robin lives, outside the Hundred Acre Wood.' },
  { id: 'six-pine-trees', name: 'The Six Pine Trees', description: 'A group of six pine trees that are a landmark in the forest.' },
  { id: 'pooh-trap', name: 'The Pooh Trap for Heffalumps', description: 'A trap that Pooh sets to catch Heffalumps, though it never works.' },
  { id: 'piglet-house', name: 'Piglet\'s House', description: 'The home of Piglet, a small house in the forest.' },
  { id: 'woozle-place', name: 'Where the Woozle Wasn\'t', description: 'A place where Piglet and Pooh think they see a Woozle, but it turns out to be their own footprints.' },
  { id: 'floody-place', name: 'A Floody Place', description: 'An area that gets flooded, causing problems for the animals.' },
  { id: 'owl-house', name: 'Owl\'s House', description: 'The home of Owl, located in a tree and sometimes called "The Chestnuts."' },
  { id: 'eeyore-place', name: 'Eeyore\'s Gloomy Place', description: 'A gloomy spot where Eeyore lives, often in a thistly corner.' },
  { id: 'pooh-corner', name: 'The House at Pooh Corner', description: 'Another name for Pooh\'s house, mentioned in the second book.' },
  { id: 'poohsticks-bridge', name: 'The Poohsticks Bridge', description: 'A bridge where the friends play the game of Poohsticks.' },
  { id: 'stepping-stones', name: 'The Stepping Stones', description: 'Stones across a stream that the friends use to cross.' },
  { id: 'gravel-pit', name: 'A Gravel Pit', description: 'A pit filled with gravel where the animals sometimes play.' },
  { id: 'thoughtful-spot', name: 'Pooh\'s Thoughtful Spot', description: 'A special place where Pooh goes to think and compose his hums.' },
  { id: 'galleons-lap', name: 'Galleon\'s Lap', description: 'A magical place at the top of the forest where Christopher Robin has his enchanted spot.' },
];

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
  locations: winnieLocations,
  mapUrl: 'https://ichef.bbci.co.uk/news/1536/cpsprodpb/10E0B/production/_101813196_mediaitem101813195.jpg.webp',
}; 