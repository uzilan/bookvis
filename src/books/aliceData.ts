import type { BookData } from '../models/BookData';
import type { Chapter } from '../models/Chapter';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';
import type { Location } from '../models/Location';

const aliceBook = {
  id: 'alice',
  author: { id: 'carroll', name: 'Lewis Carroll' },
  title: "Alice's Adventures in Wonderland",
};

// All locations in Alice in Wonderland
const aliceLocations: Location[] = [
  { id: 'rabbit-hole', name: 'Rabbit Hole', description: 'A deep, dark hole that Alice falls down to enter Wonderland. It seems to go on forever and is filled with strange objects.' },
  { id: 'wonderland-entrance', name: 'Wonderland Entrance', description: 'The magical gateway between the real world and Wonderland, where Alice first arrives after her fall.' },
  { id: 'pool-of-tears', name: 'Pool of Tears', description: 'A large pool created from Alice\'s own tears when she was very small. It becomes a lake where various creatures gather.' },
  { id: 'wonderland-garden', name: 'Wonderland Garden', description: 'A beautiful garden filled with talking flowers and other strange plants that can communicate with Alice.' },
  { id: 'shore', name: 'Shore', description: 'The edge of the Pool of Tears where Alice and other creatures gather after swimming across the pool.' },
  { id: 'caucus-race-ground', name: 'Caucus Race Ground', description: 'A circular race track where the Dodo organizes a race to dry off the wet creatures from the pool.' },
  { id: 'white-rabbit-house', name: 'White Rabbit\'s House', description: 'The home of the White Rabbit, where Alice grows too large and gets stuck, causing chaos.' },
  { id: 'wonderland-street', name: 'Wonderland Street', description: 'A street in Wonderland where Alice encounters various strange characters and follows the White Rabbit.' },
  { id: 'mushroom', name: 'Mushroom', description: 'A large mushroom where the Caterpillar sits smoking a hookah. It has magical properties that can change Alice\'s size.' },
  { id: 'forest-clearing', name: 'Forest Clearing', description: 'An open area in the forest where Alice meets the Caterpillar and learns about the mushroom\'s properties.' },
  { id: 'duchess-house', name: 'Duchess\'s House', description: 'The home of the Duchess, filled with pepper and chaos. The Duchess holds a baby that turns into a pig.' },
  { id: 'kitchen', name: 'Kitchen', description: 'The chaotic kitchen in the Duchess\'s house where there\'s too much pepper and everything is in disorder.' },
  { id: 'mad-tea-party', name: 'Mad Tea Party', description: 'An endless tea party hosted by the Mad Hatter, March Hare, and Dormouse. Time is stuck at 6 o\'clock.' },
  { id: 'tea-table', name: 'Tea Table', description: 'A long table set for tea where the Mad Tea Party takes place, with endless cups of tea and riddles.' },
  { id: 'queens-garden', name: 'Queen\'s Garden', description: 'The beautiful garden belonging to the Queen of Hearts, filled with roses and other flowers.' },
  { id: 'croquet-ground', name: 'Croquet Ground', description: 'A croquet court where Alice plays a chaotic game with flamingos as mallets and hedgehogs as balls.' },
  { id: 'mock-turtle-beach', name: 'Mock Turtle\'s Beach', description: 'A beach where Alice meets the Mock Turtle, who tells her stories about his education and the Lobster Quadrille.' },
  { id: 'shore-line', name: 'Shore Line', description: 'The shoreline where the Mock Turtle and Gryphon tell Alice about their underwater adventures and dances.' },
  { id: 'dance-floor', name: 'Dance Floor', description: 'An underwater dance floor where the Lobster Quadrille takes place, with sea creatures dancing in formation.' },
  { id: 'underwater-scene', name: 'Underwater Scene', description: 'A magical underwater world where Alice imagines the Lobster Quadrille dance taking place.' },
  { id: 'courtroom', name: 'Courtroom', description: 'The court where the trial for the stolen tarts takes place, with Alice as a witness and the King and Queen as judges.' },
  { id: 'witness-stand', name: 'Witness Stand', description: 'Where Alice stands to give her testimony during the trial of the Knave of Hearts.' },
  { id: 'witness-box', name: 'Witness Box', description: 'The witness box where Alice gives evidence during the trial, growing larger and causing chaos in the court.' },
];

// Chapter definitions with location IDs
const aliceChapterData = {
  'chapter-1': { 
    id: 'chapter-1', 
    title: 'Down the Rabbit-Hole',
    locationIds: ['rabbit-hole', 'wonderland-entrance']
  },
  'chapter-2': { 
    id: 'chapter-2', 
    title: 'The Pool of Tears',
    locationIds: ['pool-of-tears', 'wonderland-garden']
  },
  'chapter-3': { 
    id: 'chapter-3', 
    title: 'A Caucus-Race and a Long Tale',
    locationIds: ['shore', 'caucus-race-ground']
  },
  'chapter-4': { 
    id: 'chapter-4', 
    title: 'The Rabbit Sends in a Little Bill',
    locationIds: ['white-rabbit-house', 'wonderland-street']
  },
  'chapter-5': { 
    id: 'chapter-5', 
    title: 'Advice from a Caterpillar',
    locationIds: ['mushroom', 'forest-clearing']
  },
  'chapter-6': { 
    id: 'chapter-6', 
    title: 'Pig and Pepper',
    locationIds: ['duchess-house', 'kitchen']
  },
  'chapter-7': { 
    id: 'chapter-7', 
    title: 'A Mad Tea-Party',
    locationIds: ['mad-tea-party', 'tea-table']
  },
  'chapter-8': { 
    id: 'chapter-8', 
    title: 'The Queen\'s Croquet-Ground',
    locationIds: ['queens-garden', 'croquet-ground']
  },
  'chapter-9': { 
    id: 'chapter-9', 
    title: 'The Mock Turtle\'s Story',
    locationIds: ['mock-turtle-beach', 'shore-line']
  },
  'chapter-10': { 
    id: 'chapter-10', 
    title: 'The Lobster Quadrille',
    locationIds: ['dance-floor', 'underwater-scene']
  },
  'chapter-11': { 
    id: 'chapter-11', 
    title: 'Who Stole the Tarts?',
    locationIds: ['courtroom', 'witness-stand']
  },
  'chapter-12': { 
    id: 'chapter-12', 
    title: 'Alice\'s Evidence',
    locationIds: ['courtroom', 'witness-box']
  },
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
function buildChapters(chapterData: Record<string, { id: string; title: string; locationIds: string[] }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => {
    const chapterDataItem = chapterData[item.chapterId];
    return {
      book: aliceBook,
      id: chapterDataItem.id,
      title: chapterDataItem.title,
      
      level: item.level,
      type: item.type,
      index: index + 1, // For backward compatibility
      
      // Resolve location IDs to actual location objects
      locations: chapterDataItem.locationIds.map(locationId => 
        aliceLocations.find(loc => loc.id === locationId)
      ).filter(Boolean) as Location[],
    };
  });
}

const alice: Character = {
  id: 'alice',
  name: 'Alice',
  description: 'A curious young girl who falls down a rabbit hole into Wonderland',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Alice Liddell'],
  factions: ['wonderlanders'],
  factionJoinChapters: {
    'wonderlanders': 'chapter-1', // Appears as a wonderlander in chapter 1
  },
  attributes: ['Curious', 'Brave', 'Imaginative', 'Young'],
};

const whiteRabbit: Character = {
  id: 'white-rabbit',
  name: 'White Rabbit',
  description: 'A nervous rabbit in a waistcoat who is always late',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['The Rabbit'],
  factions: ['wonderlanders'],
  factionJoinChapters: {
    'wonderlanders': 'chapter-1', // Appears as a wonderlander in chapter 1
  },
  attributes: ['Nervous', 'Punctual', 'Fashionable', 'Hare'],
};

const caterpillar: Character = {
  id: 'caterpillar',
  name: 'Caterpillar',
  description: 'A wise but rude caterpillar who smokes a hookah',
  firstAppearanceChapter: 'chapter-7',
  aliases: ['Absolem'],
  factions: ['wonderlanders'],
  factionJoinChapters: {
    'wonderlanders': 'chapter-7', // Appears as a wonderlander in chapter 7
  },
  attributes: ['Wise', 'Rude', 'Philosophical', 'Insect'],
};

const cheshireCat: Character = {
  id: 'cheshire-cat',
  name: 'Cheshire Cat',
  description: 'A mysterious cat with a disappearing grin',
  firstAppearanceChapter: 'chapter-8',
  aliases: ['The Cat'],
  factions: ['wonderlanders'],
  factionJoinChapters: {
    'wonderlanders': 'chapter-8', // Appears as a wonderlander in chapter 8
  },
  attributes: ['Mysterious', 'Playful', 'Disappearing', 'Feline'],
};

const madHatter: Character = {
  id: 'mad-hatter',
  name: 'Mad Hatter',
  description: 'A mad tea party host with a large hat',
  firstAppearanceChapter: 'chapter-6',
  aliases: ['The Hatter'],
  factions: ['wonderlanders'],
  factionJoinChapters: {
    'wonderlanders': 'chapter-6', // Appears as a wonderlander in chapter 6
  },
  attributes: ['Mad', 'Host', 'Tea-loving', 'Eccentric'],
};

// Add more characters for royalty faction
const queenOfHearts: Character = {
  id: 'queen-of-hearts',
  name: 'Queen of Hearts',
  description: 'The tyrannical queen of Wonderland who constantly threatens to behead people',
  firstAppearanceChapter: 'chapter-8',
  aliases: ['The Queen'],
  factions: ['royalty'],
  factionJoinChapters: {
    'royalty': 'chapter-8', // Appears as royalty in chapter 8
  },
  attributes: ['Tyrannical', 'Violent', 'Royal', 'Threatening'],
};

const kingOfHearts: Character = {
  id: 'king-of-hearts',
  name: 'King of Hearts',
  description: 'The timid king who is often overshadowed by his wife, the Queen of Hearts',
  firstAppearanceChapter: 'chapter-11',
  aliases: ['The King'],
  factions: ['royalty'],
  factionJoinChapters: {
    'royalty': 'chapter-11', // Appears as royalty in chapter 11
  },
  attributes: ['Timid', 'Submissive', 'Royal', 'Quiet'],
};

const aliceCharacters: Character[] = [alice, whiteRabbit, madHatter, caterpillar, cheshireCat, queenOfHearts, kingOfHearts];

const aliceFactions: Faction[] = [
  { 
    id: 'wonderlanders', 
    title: 'Wonderlanders', 
    description: 'The diverse inhabitants of Wonderland, including talking animals, magical creatures, and other strange beings. They represent the chaotic and whimsical nature of Wonderland, each with their own peculiar personalities and behaviors.', 
    color: '#E7C7A7' 
  },
  { 
    id: 'royalty', 
    title: 'Royalty', 
    description: 'The ruling class of Wonderland, including the Queen of Hearts and her court. They represent authority and power, though often portrayed as irrational and tyrannical, especially the Queen who is known for her famous phrase "Off with their heads!"', 
    color: '#E7A7A7' 
  },
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
  {
    character1: alice,
    character2: queenOfHearts,
    descriptions: [
      { chapter: 8, description: 'Alice meets the Queen of Hearts at the croquet game' },
      { chapter: 11, description: 'Alice witnesses the Queen\'s trial' },
    ],
  },
  {
    character1: alice,
    character2: kingOfHearts,
    descriptions: [
      { chapter: 11, description: 'Alice meets the King of Hearts at the trial' },
    ],
  },
  {
    character1: queenOfHearts,
    character2: kingOfHearts,
    descriptions: [
      { chapter: 11, description: 'The Queen and King preside over the trial together' },
    ],
  },
  {
    character1: queenOfHearts,
    character2: cheshireCat,
    descriptions: [
      { chapter: 8, description: 'The Queen is frustrated by the Cheshire Cat\'s disappearing act' },
    ],
  },
  {
    character1: whiteRabbit,
    character2: queenOfHearts,
    descriptions: [
      { chapter: 8, description: 'The White Rabbit serves as the Queen\'s herald' },
    ],
  },
];

export const aliceBookData: BookData = {
  book: aliceBook,
  characters: aliceCharacters,
  chapters: aliceChapters,
  factions: aliceFactions,
  relationships: aliceRelationships,
  locations: aliceLocations,
  mapUrl: 'https://home-underground.nyc3.cdn.digitaloceanspaces.com/disney-pins/lg/82324_x23o.jpg',
}; 