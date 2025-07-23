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
  id: 'lotr',
  title: 'The Lord of the Rings',
  author: tolkien,
};

// Chapter definitions - just basic data
const lotrChapterData = {
  // Fellowship of the Ring
  'book-1': { id: 'book-1', title: 'The Fellowship of the Ring' },
  
  // Part 1: The Ring Sets Out
  'part-1': { id: 'part-1', title: 'The Ring Sets Out' },
  'chapter-1': { id: 'chapter-1', title: 'A Long-expected Party' },
  'chapter-2': { id: 'chapter-2', title: 'The Shadow of the Past' },
  'chapter-3': { id: 'chapter-3', title: 'Three is Company' },
  'chapter-4': { id: 'chapter-4', title: 'A Short Cut to Mushrooms' },
  'chapter-5': { id: 'chapter-5', title: 'A Conspiracy Unmasked' },
  'chapter-6': { id: 'chapter-6', title: 'The Old Forest' },
  'chapter-7': { id: 'chapter-7', title: 'In the House of Tom Bombadil' },
  'chapter-8': { id: 'chapter-8', title: 'Fog on the Barrow-downs' },
  'chapter-9': { id: 'chapter-9', title: 'At the Sign of the Prancing Pony' },
  'chapter-10': { id: 'chapter-10', title: 'Strider' },
  'chapter-11': { id: 'chapter-11', title: 'A Knife in the Dark' },
  'chapter-12': { id: 'chapter-12', title: 'Flight to the Ford' },
  
  // Part 2: The Ring Goes South
  'part-2': { id: 'part-2', title: 'The Ring Goes South' },
  'chapter-13': { id: 'chapter-13', title: 'Many Meetings' },
  'chapter-14': { id: 'chapter-14', title: 'The Council of Elrond' },
  'chapter-15': { id: 'chapter-15', title: 'The Ring Goes South' },
  'chapter-16': { id: 'chapter-16', title: 'A Journey in the Dark' },
  'chapter-17': { id: 'chapter-17', title: 'The Bridge of Khazad-dûm' },
  'chapter-18': { id: 'chapter-18', title: 'Lothlórien' },
  'chapter-19': { id: 'chapter-19', title: 'The Mirror of Galadriel' },
  'chapter-20': { id: 'chapter-20', title: 'Farewell to Lórien' },
  'chapter-21': { id: 'chapter-21', title: 'The Great River' },
  'chapter-22': { id: 'chapter-22', title: 'The Breaking of the Fellowship' },
  
  // The Two Towers
  'book-2': { id: 'book-2', title: 'The Two Towers' },
  
  // Part 1: The Treason of Isengard
  'part-3': { id: 'part-3', title: 'The Treason of Isengard' },
  'chapter-23': { id: 'chapter-23', title: 'The Departure of Boromir' },
  'chapter-24': { id: 'chapter-24', title: 'The Riders of Rohan' },
  'chapter-25': { id: 'chapter-25', title: 'The Uruk-hai' },
  'chapter-26': { id: 'chapter-26', title: 'Treebeard' },
  'chapter-27': { id: 'chapter-27', title: 'The White Rider' },
  'chapter-28': { id: 'chapter-28', title: 'The King of the Golden Hall' },
  'chapter-29': { id: 'chapter-29', title: 'Helm\'s Deep' },
  'chapter-30': { id: 'chapter-30', title: 'The Road to Isengard' },
  'chapter-31': { id: 'chapter-31', title: 'Flotsam and Jetsam' },
  'chapter-32': { id: 'chapter-32', title: 'The Voice of Saruman' },
  'chapter-33': { id: 'chapter-33', title: 'The Palantír' },
  
  // Part 2: The Ring Goes East
  'part-4': { id: 'part-4', title: 'The Ring Goes East' },
  'chapter-34': { id: 'chapter-34', title: 'The Taming of Sméagol' },
  'chapter-35': { id: 'chapter-35', title: 'The Passage of the Marshes' },
  'chapter-36': { id: 'chapter-36', title: 'The Black Gate is Closed' },
  'chapter-37': { id: 'chapter-37', title: 'Of Herbs and Stewed Rabbit' },
  'chapter-38': { id: 'chapter-38', title: 'The Window on the West' },
  'chapter-39': { id: 'chapter-39', title: 'The Forbidden Pool' },
  'chapter-40': { id: 'chapter-40', title: 'Journey to the Cross-roads' },
  'chapter-41': { id: 'chapter-41', title: 'The Stairs of Cirith Ungol' },
  'chapter-42': { id: 'chapter-42', title: 'Shelob\'s Lair' },
  'chapter-43': { id: 'chapter-43', title: 'The Choices of Master Samwise' },
  
  // The Return of the King
  'book-3': { id: 'book-3', title: 'The Return of the King' },
  
  // Part 1: The War of the Ring
  'part-5': { id: 'part-5', title: 'The War of the Ring' },
  'chapter-44': { id: 'chapter-44', title: 'Minas Tirith' },
  'chapter-45': { id: 'chapter-45', title: 'The Passing of the Grey Company' },
  'chapter-46': { id: 'chapter-46', title: 'The Muster of Rohan' },
  'chapter-47': { id: 'chapter-47', title: 'The Siege of Gondor' },
  'chapter-48': { id: 'chapter-48', title: 'The Ride of the Rohirrim' },
  'chapter-49': { id: 'chapter-49', title: 'The Battle of the Pelennor Fields' },
  'chapter-50': { id: 'chapter-50', title: 'The Pyre of Denethor' },
  'chapter-51': { id: 'chapter-51', title: 'The Houses of Healing' },
  'chapter-52': { id: 'chapter-52', title: 'The Last Debate' },
  'chapter-53': { id: 'chapter-53', title: 'The Black Gate Opens' },
  
  // Part 2: The End of the Third Age
  'part-6': { id: 'part-6', title: 'The End of the Third Age' },
  'chapter-54': { id: 'chapter-54', title: 'Mount Doom' },
  'chapter-55': { id: 'chapter-55', title: 'The Field of Cormallen' },
  'chapter-56': { id: 'chapter-56', title: 'The Steward and the King' },
  'chapter-57': { id: 'chapter-57', title: 'Many Partings' },
  'chapter-58': { id: 'chapter-58', title: 'Homeward Bound' },
  'chapter-59': { id: 'chapter-59', title: 'The Scouring of the Shire' },
  'chapter-60': { id: 'chapter-60', title: 'The Grey Havens' },
};

// Hierarchy definition - 3-level structure: Book → Part → Chapter
const lotrHierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }> = [
  // Book 1: The Fellowship of the Ring
  { chapterId: 'book-1', level: 0, type: 'book' },
  
  // Part 1: The Ring Sets Out
  { chapterId: 'part-1', level: 1, type: 'part' },
  { chapterId: 'chapter-1', level: 2, type: 'chapter' },
  { chapterId: 'chapter-2', level: 2, type: 'chapter' },
  { chapterId: 'chapter-3', level: 2, type: 'chapter' },
  { chapterId: 'chapter-4', level: 2, type: 'chapter' },
  { chapterId: 'chapter-5', level: 2, type: 'chapter' },
  { chapterId: 'chapter-6', level: 2, type: 'chapter' },
  { chapterId: 'chapter-7', level: 2, type: 'chapter' },
  { chapterId: 'chapter-8', level: 2, type: 'chapter' },
  { chapterId: 'chapter-9', level: 2, type: 'chapter' },
  { chapterId: 'chapter-10', level: 2, type: 'chapter' },
  { chapterId: 'chapter-11', level: 2, type: 'chapter' },
  { chapterId: 'chapter-12', level: 2, type: 'chapter' },
  
  // Part 2: The Ring Goes South
  { chapterId: 'part-2', level: 1, type: 'part' },
  { chapterId: 'chapter-13', level: 2, type: 'chapter' },
  { chapterId: 'chapter-14', level: 2, type: 'chapter' },
  { chapterId: 'chapter-15', level: 2, type: 'chapter' },
  { chapterId: 'chapter-16', level: 2, type: 'chapter' },
  { chapterId: 'chapter-17', level: 2, type: 'chapter' },
  { chapterId: 'chapter-18', level: 2, type: 'chapter' },
  { chapterId: 'chapter-19', level: 2, type: 'chapter' },
  { chapterId: 'chapter-20', level: 2, type: 'chapter' },
  { chapterId: 'chapter-21', level: 2, type: 'chapter' },
  { chapterId: 'chapter-22', level: 2, type: 'chapter' },
  
  // Book 2: The Two Towers
  { chapterId: 'book-2', level: 0, type: 'book' },
  
  // Part 3: The Treason of Isengard
  { chapterId: 'part-3', level: 1, type: 'part' },
  { chapterId: 'chapter-23', level: 2, type: 'chapter' },
  { chapterId: 'chapter-24', level: 2, type: 'chapter' },
  { chapterId: 'chapter-25', level: 2, type: 'chapter' },
  { chapterId: 'chapter-26', level: 2, type: 'chapter' },
  { chapterId: 'chapter-27', level: 2, type: 'chapter' },
  { chapterId: 'chapter-28', level: 2, type: 'chapter' },
  { chapterId: 'chapter-29', level: 2, type: 'chapter' },
  { chapterId: 'chapter-30', level: 2, type: 'chapter' },
  { chapterId: 'chapter-31', level: 2, type: 'chapter' },
  { chapterId: 'chapter-32', level: 2, type: 'chapter' },
  { chapterId: 'chapter-33', level: 2, type: 'chapter' },
  
  // Part 4: The Ring Goes East
  { chapterId: 'part-4', level: 1, type: 'part' },
  { chapterId: 'chapter-34', level: 2, type: 'chapter' },
  { chapterId: 'chapter-35', level: 2, type: 'chapter' },
  { chapterId: 'chapter-36', level: 2, type: 'chapter' },
  { chapterId: 'chapter-37', level: 2, type: 'chapter' },
  { chapterId: 'chapter-38', level: 2, type: 'chapter' },
  { chapterId: 'chapter-39', level: 2, type: 'chapter' },
  { chapterId: 'chapter-40', level: 2, type: 'chapter' },
  { chapterId: 'chapter-41', level: 2, type: 'chapter' },
  { chapterId: 'chapter-42', level: 2, type: 'chapter' },
  { chapterId: 'chapter-43', level: 2, type: 'chapter' },
  
  // Book 3: The Return of the King
  { chapterId: 'book-3', level: 0, type: 'book' },
  
  // Part 5: The War of the Ring
  { chapterId: 'part-5', level: 1, type: 'part' },
  { chapterId: 'chapter-44', level: 2, type: 'chapter' },
  { chapterId: 'chapter-45', level: 2, type: 'chapter' },
  { chapterId: 'chapter-46', level: 2, type: 'chapter' },
  { chapterId: 'chapter-47', level: 2, type: 'chapter' },
  { chapterId: 'chapter-48', level: 2, type: 'chapter' },
  { chapterId: 'chapter-49', level: 2, type: 'chapter' },
  { chapterId: 'chapter-50', level: 2, type: 'chapter' },
  { chapterId: 'chapter-51', level: 2, type: 'chapter' },
  { chapterId: 'chapter-52', level: 2, type: 'chapter' },
  { chapterId: 'chapter-53', level: 2, type: 'chapter' },
  
  // Part 6: The End of the Third Age
  { chapterId: 'part-6', level: 1, type: 'part' },
  { chapterId: 'chapter-54', level: 2, type: 'chapter' },
  { chapterId: 'chapter-55', level: 2, type: 'chapter' },
  { chapterId: 'chapter-56', level: 2, type: 'chapter' },
  { chapterId: 'chapter-57', level: 2, type: 'chapter' },
  { chapterId: 'chapter-58', level: 2, type: 'chapter' },
  { chapterId: 'chapter-59', level: 2, type: 'chapter' },
  { chapterId: 'chapter-60', level: 2, type: 'chapter' },
];

// Function to build chapters from data and hierarchy
function buildChapters(chapterData: Record<string, { id: string; title: string }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => ({
    book: lotrBook,
    ...chapterData[item.chapterId],
    
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

// Characters
const frodo: Character = {
  id: 'frodo-baggins',
  name: 'Frodo Baggins',
  description: 'The Ring-bearer, a hobbit who carries the One Ring to Mount Doom',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Mr. Baggins', 'Ring-bearer', 'Master of the Ring'],
  factions: ['hobbits', 'fellowship'],
  factionJoinChapters: {
    'hobbits': 'chapter-1', // Appears as a hobbit in chapter 1
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Brave', 'Resilient', 'Hobbit', 'Ring-bearer'],
};

const sam: Character = {
  id: 'samwise-gamgee',
  name: 'Samwise Gamgee',
  description: 'Frodo\'s loyal gardener and companion on the quest',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Sam', 'Mr. Gamgee'],
  factions: ['hobbits', 'fellowship'],
  factionJoinChapters: {
    'hobbits': 'chapter-1', // Appears as a hobbit in chapter 1
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Loyal', 'Practical', 'Gardener', 'Brave'],
};

const gandalf: Character = {
  id: 'gandalf',
  name: 'Gandalf',
  description: 'A wizard and member of the Istari, guides the fellowship',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Gandalf the Grey', 'Gandalf the White', 'Mithrandir', 'Olorin'],
  factions: ['wizards', 'fellowship'],
  factionJoinChapters: {
    'wizards': 'chapter-1', // Appears as a wizard in chapter 1
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Wizard', 'Wise', 'Powerful', 'Guide'],
};

const aragorn: Character = {
  id: 'aragorn',
  name: 'Aragorn',
  description: 'Ranger of the North, heir to the throne of Gondor',
  firstAppearanceChapter: 'chapter-10',
  aliases: ['Strider', 'Elessar', 'King Elessar', 'Thorongil'],
  factions: ['rangers', 'fellowship', 'gondor'],
  factionJoinChapters: {
    'rangers': 'chapter-10', // Appears as Strider in chapter 10
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
    'gondor': 'chapter-10', // Appears as heir to Gondor in chapter 10
  },
  attributes: ['Ranger', 'King', 'Warrior', 'Healer'],
};

const legolas: Character = {
  id: 'legolas',
  name: 'Legolas',
  description: 'Elf from Mirkwood, member of the fellowship',
  firstAppearanceChapter: 'chapter-14',
  aliases: ['Prince of Mirkwood'],
  factions: ['elves', 'fellowship'],
  factionJoinChapters: {
    'elves': 'chapter-15', // Appears as an elf in chapter 15
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Elf', 'Archer', 'Agile', 'Immortal'],
};

const gimli: Character = {
  id: 'gimli',
  name: 'Gimli',
  description: 'Dwarf from the Lonely Mountain, member of the fellowship',
  firstAppearanceChapter: 'chapter-14',
  aliases: ['Son of Glóin'],
  factions: ['dwarves', 'fellowship'],
  factionJoinChapters: {
    'dwarves': 'chapter-15', // Appears as a dwarf in chapter 15
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Dwarf', 'Warrior', 'Loyal', 'Proud'],
};

const boromir: Character = {
  id: 'boromir',
  name: 'Boromir',
  description: 'Captain of Gondor, member of the fellowship',
  firstAppearanceChapter: 'chapter-14',
  aliases: ['Captain of Gondor'],
  factions: ['gondor', 'fellowship'],
  factionJoinChapters: {
    'gondor': 'chapter-15', // Appears from Gondor in chapter 15
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Warrior', 'Proud', 'Tempted by Ring', 'Noble'],
};

const merry: Character = {
  id: 'meriadoc-brandybuck',
  name: 'Meriadoc Brandybuck',
  description: 'Hobbit of the Shire, friend of Frodo',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Merry', 'Master Brandybuck'],
  factions: ['hobbits', 'fellowship'],
  factionJoinChapters: {
    'hobbits': 'chapter-1', // Appears as a hobbit in chapter 1
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Hobbit', 'Brave', 'Loyal', 'Noble'],
};

const pippin: Character = {
  id: 'peregrin-took',
  name: 'Peregrin Took',
  description: 'Hobbit of the Shire, friend of Frodo',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Pippin', 'Master Took'],
  factions: ['hobbits', 'fellowship'],
  factionJoinChapters: {
    'hobbits': 'chapter-1', // Appears as a hobbit in chapter 1
    'fellowship': 'chapter-15', // Joins the Fellowship in "The Council of Elrond"
  },
  attributes: ['Hobbit', 'Curious', 'Loyal', 'Young'],
};

const gollum: Character = {
  id: 'gollum',
  name: 'Gollum',
  description: 'Former hobbit corrupted by the Ring, guides Frodo to Mount Doom',
  firstAppearanceChapter: 'chapter-34',
  aliases: ['Sméagol', 'Stinker', 'Slinker'],
  factions: ['corrupted'],
  factionJoinChapters: {
    'corrupted': 'chapter-34', // Appears as corrupted by the Ring
  },
  attributes: ['Corrupted', 'Split Personality', 'Ring-obsessed', 'Tragic'],
};

const sauron: Character = {
  id: 'sauron',
  name: 'Sauron',
  description: 'The Dark Lord, creator of the One Ring',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Dark Lord', 'Lord of Mordor', 'The Eye'],
  factions: ['dark-forces'],
  factionJoinChapters: {
    'dark-forces': 'chapter-2', // Always been a dark force
  },
  attributes: ['Dark Lord', 'Powerful', 'Corrupted', 'Evil'],
};

const saruman: Character = {
  id: 'saruman',
  name: 'Saruman',
  description: 'The White Wizard, corrupted by power',
  firstAppearanceChapter: 'chapter-27', // First appears in "The White Rider"
  aliases: ['Saruman the White', 'Curunír'],
  factions: ['wizards', 'dark-forces'],
  factionJoinChapters: {
    'wizards': 'chapter-27', // Always been a wizard, appears in "The White Rider"
    'dark-forces': 'chapter-32', // Corrupted and joins dark forces in "The Voice of Saruman"
  },
  attributes: ['Wizard', 'Corrupted', 'Power-hungry', 'Traitor'],
};

const theoden: Character = {
  id: 'theoden',
  name: 'Théoden',
  description: 'King of Rohan',
  firstAppearanceChapter: 'chapter-28',
  aliases: ['King of Rohan'],
  factions: ['rohan'],
  factionJoinChapters: {
    'rohan': 'chapter-28', // King of Rohan
  },
  attributes: ['King', 'Noble', 'Warrior', 'Leader'],
};

const eowyn: Character = {
  id: 'eowyn',
  name: 'Éowyn',
  description: 'Princess of Rohan, shieldmaiden',
  firstAppearanceChapter: 'chapter-28',
  aliases: ['Shieldmaiden of Rohan'],
  factions: ['rohan'],
  factionJoinChapters: {
    'rohan': 'chapter-28', // Princess of Rohan
  },
  attributes: ['Princess', 'Shieldmaiden', 'Brave', 'Warrior'],
};

const faramir: Character = {
  id: 'faramir',
  name: 'Faramir',
  description: 'Captain of Gondor, son of Denethor',
  firstAppearanceChapter: 'chapter-38',
  aliases: ['Captain of Gondor'],
  factions: ['gondor'],
  factionJoinChapters: {
    'gondor': 'chapter-38', // Captain of Gondor
  },
  attributes: ['Captain', 'Noble', 'Wise', 'Warrior'],
};

const denethor: Character = {
  id: 'denethor',
  name: 'Denethor',
  description: 'Steward of Gondor, father of Faramir',
  firstAppearanceChapter: 'chapter-44',
  aliases: ['Steward of Gondor'],
  factions: ['gondor'],
  factionJoinChapters: {
    'gondor': 'chapter-44', // Steward of Gondor
  },
  attributes: ['Steward', 'Proud', 'Despairing', 'Noble'],
};

const characters: Character[] = [
  frodo, sam, gandalf, aragorn, legolas, gimli, boromir, merry, pippin, 
  gollum, sauron, saruman, theoden, eowyn, faramir, denethor,
];

const factions: Faction[] = [
  { id: 'hobbits', title: 'Hobbits', description: 'Small, peaceful folk of the Shire.', color: '#D2B48C' },
  { id: 'fellowship', title: 'The Fellowship', description: 'The nine companions chosen to destroy the Ring.', color: '#4169E1' },
  { id: 'wizards', title: 'Wizards', description: 'The Istari, powerful beings sent to guide Middle-earth.', color: '#9932CC' },
  { id: 'rangers', title: 'Rangers', description: 'Protectors of the North, descendants of Númenor.', color: '#228B22' },
  { id: 'elves', title: 'Elves', description: 'Immortal beings of great wisdom and beauty.', color: '#32CD32' },
  { id: 'dwarves', title: 'Dwarves', description: 'Stout warriors and craftsmen of the mountains.', color: '#CD853F' },
  { id: 'gondor', title: 'Gondor', description: 'The greatest kingdom of Men in Middle-earth.', color: '#DC143C' },
  { id: 'rohan', title: 'Rohan', description: 'The kingdom of the horse-lords.', color: '#DAA520' },
  { id: 'corrupted', title: 'Corrupted', description: 'Those corrupted by the power of the Ring.', color: '#696969' },
  { id: 'dark-forces', title: 'Dark Forces', description: 'Servants of Sauron and evil.', color: '#4A5D5D' },
];

// Build chapters from data and hierarchy
const chapters = buildChapters(lotrChapterData, lotrHierarchy);

const relationships: RelationshipWithChapters[] = [
  {
    character1: frodo,
    character2: sam,
    descriptions: [
      { chapter: 1, description: 'Master and servant, become close friends' },
      { chapter: 34, description: 'Sam becomes Frodo\'s protector' },
      { chapter: 54, description: 'Sam carries Frodo to Mount Doom' },
    ],
  },
  {
    character1: frodo,
    character2: gandalf,
    descriptions: [
      { chapter: 1, description: 'Gandalf guides Frodo on his quest' },
      { chapter: 14, description: 'Gandalf helps form the Fellowship' },
    ],
  },
  {
    character1: frodo,
    character2: aragorn,
    descriptions: [
      { chapter: 10, description: 'Aragorn protects Frodo as Strider' },
      { chapter: 14, description: 'Aragorn joins the Fellowship' },
    ],
  },
  {
    character1: frodo,
    character2: gollum,
    descriptions: [
      { chapter: 34, description: 'Frodo pities and spares Gollum' },
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

export const lotrData: BookData = {
  book: lotrBook,
  characters,
  chapters,
  factions,
  relationships,
}; 