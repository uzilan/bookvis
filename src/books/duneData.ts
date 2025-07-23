import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import type { Author } from '../models/Author';
import type { Chapter } from '../models/Chapter';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';

// Author definition
const frankHerbert: Author = {
  id: 'frank-herbert',
  name: 'Frank Herbert',
};

// Book definition
const duneBook: Book = {
  id: 'dune',
  title: 'Dune',
  author: frankHerbert,
};

// Chapter definitions - just basic data
const duneChapterData = {
  'chapter-1': { id: 'chapter-1', title: 'The Duke and the Lady' },
  'chapter-2': { id: 'chapter-2', title: 'The Missionaria Protectiva' },
  'chapter-3': { id: 'chapter-3', title: 'The Reverend Mother' },
  'chapter-4': { id: 'chapter-4', title: 'The Spice' },
  'chapter-5': { id: 'chapter-5', title: 'The Harkonnens' },
  'chapter-6': { id: 'chapter-6', title: 'The Atreides Arrive' },
  'chapter-7': { id: 'chapter-7', title: 'The Betrayal' },
  'chapter-8': { id: 'chapter-8', title: 'The Desert' },
  'chapter-9': { id: 'chapter-9', title: 'The Fremen' },
  'chapter-10': { id: 'chapter-10', title: 'The Spice Melange' },
  'chapter-11': { id: 'chapter-11', title: 'The Water of Life' },
  'chapter-12': { id: 'chapter-12', title: 'The Prophet' },
  'chapter-13': { id: 'chapter-13', title: 'The Jihad' },
  'chapter-14': { id: 'chapter-14', title: 'The Emperor' },
  'chapter-15': { id: 'chapter-15', title: 'The Final Battle' },
};

// Hierarchy definition - order determines chapter sequence
const duneHierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }> = [
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
  { chapterId: 'chapter-13', level: 0, type: 'chapter' },
  { chapterId: 'chapter-14', level: 0, type: 'chapter' },
  { chapterId: 'chapter-15', level: 0, type: 'chapter' },
];

// Function to build chapters from data and hierarchy
function buildChapters(chapterData: Record<string, { id: string; title: string }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => ({
    book: duneBook,
    ...chapterData[item.chapterId],
    
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

// Characters
const paul: Character = {
  id: 'paul-atreides',
  name: 'Paul Atreides',
  description: 'The son of Duke Leto Atreides, becomes the Kwisatz Haderach',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Muad\'Dib', 'Usul', 'Kwisatz Haderach'],
  factions: ['atreides', 'fremen', 'bene-gesserit'],
  factionJoinChapters: {
    'atreides': 'chapter-1', // Born into House Atreides
    'fremen': 'chapter-8', // Joins the Fremen
    'bene-gesserit': 'chapter-1', // Trained by Bene Gesserit
  },
  attributes: ['Noble', 'Prophet', 'Warrior', 'Leader'],
};

const jessica: Character = {
  id: 'lady-jessica',
  name: 'Lady Jessica',
  description: 'Paul\'s mother, a Bene Gesserit acolyte',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Lady Jessica'],
  factions: ['bene-gesserit', 'atreides'],
  factionJoinChapters: {
    'bene-gesserit': 'chapter-1', // Always been Bene Gesserit
    'atreides': 'chapter-1', // Consort to Duke Leto
  },
  attributes: ['Bene Gesserit', 'Mother', 'Wise', 'Powerful'],
};

const leto: Character = {
  id: 'duke-leto',
  name: 'Duke Leto Atreides',
  description: 'The ruler of House Atreides, Paul\'s father',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Duke Leto', 'The Red Duke'],
  factions: ['atreides'],
  factionJoinChapters: {
    'atreides': 'chapter-1', // Always been House Atreides
  },
  attributes: ['Noble', 'Leader', 'Father', 'Just'],
};

const gurney: Character = {
  id: 'gurney-halleck',
  name: 'Gurney Halleck',
  description: 'Weapons master of House Atreides',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Gurney'],
  factions: ['atreides'],
  factionJoinChapters: {
    'atreides': 'chapter-1', // Always been House Atreides
  },
  attributes: ['Warrior', 'Loyal', 'Musician', 'Weapons Master'],
};

const thufir: Character = {
  id: 'thufir-hawat',
  name: 'Thufir Hawat',
  description: 'Mentat and security chief of House Atreides',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Thufir'],
  factions: ['atreides'],
  factionJoinChapters: {
    'atreides': 'chapter-1', // Always been House Atreides
  },
  attributes: ['Mentat', 'Analyst', 'Loyal', 'Wise'],
};

const duncan: Character = {
  id: 'duncan-idaho',
  name: 'Duncan Idaho',
  description: 'Swordmaster of House Atreides',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Duncan'],
  factions: ['atreides'],
  factionJoinChapters: {
    'atreides': 'chapter-1', // Always been House Atreides
  },
  attributes: ['Swordmaster', 'Loyal', 'Warrior', 'Friend'],
};

const stilgar: Character = {
  id: 'stilgar',
  name: 'Stilgar',
  description: 'Naib of Sietch Tabr, Fremen leader',
  firstAppearanceChapter: 'chapter-8',
  aliases: ['Naib Stilgar'],
  factions: ['fremen'],
  factionJoinChapters: {
    'fremen': 'chapter-8', // Appears as Fremen leader in chapter 8
  },
  attributes: ['Fremen', 'Leader', 'Warrior', 'Wise'],
};

const chani: Character = {
  id: 'chani',
  name: 'Chani',
  description: 'Fremen woman, Paul\'s lover and mother of his children',
  firstAppearanceChapter: 'chapter-8',
  aliases: ['Sihaya'],
  factions: ['fremen'],
  factionJoinChapters: {
    'fremen': 'chapter-8', // Appears as Fremen in chapter 8
  },
  attributes: ['Fremen', 'Warrior', 'Lover', 'Mother'],
};

const lietKynes: Character = {
  id: 'liet-kynes',
  name: 'Liet-Kynes',
  description: 'Imperial Planetologist and father of Chani',
  firstAppearanceChapter: 3,
  aliases: ['Planetologist'],
  factions: ['fremen'],
  factionJoinChapters: {
    'fremen': 'chapter-3', // Joins Fremen when introduced
  },
  attributes: ['Planetologist', 'Father of Chani', 'Fremen ally'],
};

const baronHarkonnen: Character = {
  id: 'baron-harkonnen',
  name: 'Baron Vladimir Harkonnen',
  description: 'The ruler of House Harkonnen, enemy of House Atreides',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Baron Harkonnen', 'The Baron'],
  factions: ['harkonnen'],
  factionJoinChapters: {
    'harkonnen': 'chapter-1', // Always Harkonnen leader
  },
  attributes: ['Baron', 'Evil', 'Scheming', 'Powerful'],
};

const feydRautha: Character = {
  id: 'feyd-rautha',
  name: 'Feyd-Rautha',
  description: 'The nephew and heir of Baron Harkonnen',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Feyd'],
  factions: ['harkonnen'],
  factionJoinChapters: {
    'harkonnen': 'chapter-2', // Always Harkonnen heir
  },
  attributes: ['Heir', 'Skilled', 'Ambitious', 'Dangerous'],
};

const piterDeVries: Character = {
  id: 'piter-de-vries',
  name: 'Piter de Vries',
  description: 'Mentat and twisted advisor to Baron Harkonnen',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Piter'],
  factions: ['harkonnen'],
  factionJoinChapters: {
    'harkonnen': 'chapter-2', // Always Harkonnen mentat
  },
  attributes: ['Mentat', 'Twisted', 'Advisor', 'Evil'],
};

const emperorShaddam: Character = {
  id: 'emperor-shaddam',
  name: 'Emperor Shaddam IV',
  description: 'The Padishah Emperor of the Known Universe',
  firstAppearanceChapter: 'chapter-4',
  aliases: ['Emperor', 'Padishah Emperor'],
  factions: ['corrino'],
  factionJoinChapters: {
    'corrino': 'chapter-4', // Always Emperor
  },
  attributes: ['Emperor', 'Powerful', 'Scheming', 'Noble'],
};

const princessIrulan: Character = {
  id: 'princess-irulan',
  name: 'Princess Irulan',
  description: 'Daughter of Emperor Shaddam IV',
  firstAppearanceChapter: 'chapter-4',
  aliases: ['Princess Irulan'],
  factions: ['corrino'],
  factionJoinChapters: {
    'corrino': 'chapter-4', // Always Corrino princess
  },
  attributes: ['Princess', 'Scholar', 'Daughter', 'Noble'],
};

const hasimirFenring: Character = {
  id: 'hasimir-fenring',
  name: 'Hasimir Fenring',
  description: 'Count and close advisor to Emperor Shaddam',
  firstAppearanceChapter: 'chapter-4',
  aliases: ['Count Fenring'],
  factions: ['corrino'],
  factionJoinChapters: {
    'corrino': 'chapter-4', // Always Corrino advisor
  },
  attributes: ['Count', 'Advisor', 'Skilled', 'Loyal'],
};

const margotFenring: Character = {
  id: 'margot-fenring',
  name: 'Lady Margot Fenring',
  description: 'Bene Gesserit acolyte and wife of Count Fenring',
  firstAppearanceChapter: 'chapter-4',
  aliases: ['Lady Margot'],
  factions: ['bene-gesserit', 'corrino'],
  factionJoinChapters: {
    'bene-gesserit': 'chapter-4', // Always Bene Gesserit
    'corrino': 'chapter-4', // Always Corrino through marriage
  },
  attributes: ['Bene Gesserit', 'Lady', 'Wife', 'Skilled'],
};

const gaiusHelenMohiam: Character = {
  id: 'reverend-mother-mohiam',
  name: 'Reverend Mother Gaius Helen Mohiam',
  description: 'Bene Gesserit Reverend Mother and Truthsayer',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Reverend Mother', 'Truthsayer'],
  factions: ['bene-gesserit'],
  factionJoinChapters: {
    'bene-gesserit': 'chapter-1', // Always Bene Gesserit
  },
  attributes: ['Reverend Mother', 'Truthsayer', 'Wise', 'Powerful'],
};

const yueh: Character = {
  id: 'wellington-yueh',
  name: 'Dr. Wellington Yueh',
  description: 'Suk doctor of House Atreides, traitor',
  firstAppearanceChapter: 'chapter-3',
  aliases: ['Dr. Yueh'],
  factions: ['atreides'],
  factionJoinChapters: {
    'atreides': 'chapter-3', // Appears as Atreides doctor in chapter 3
  },
  attributes: ['Doctor', 'Traitor', 'Suk-trained', 'Tragic'],
};

// Factions
const atreidesFaction: Faction = {
  id: 'atreides',
  title: 'House Atreides',
  description: 'Noble house from Caladan, rulers of Arrakis',
  color: '#4A90E2',
};

const harkonnenFaction: Faction = {
  id: 'harkonnen',
  title: 'House Harkonnen',
  description: 'Noble house from Giedi Prime, enemies of Atreides',
  color: '#D0021B',
};

const fremenFaction: Faction = {
  id: 'fremen',
  title: 'Fremen',
  description: 'Desert people of Arrakis, native to the planet',
  color: '#7ED321',
};

const corrinoFaction: Faction = {
  id: 'corrino',
  title: 'House Corrino',
  description: 'Imperial house, rulers of the Known Universe',
  color: '#F5A623',
};

const beneGesseritFaction: Faction = {
  id: 'bene-gesserit',
  title: 'Bene Gesserit',
  description: 'Ancient order of women with special abilities',
  color: '#9013FE',
};

// Build chapters from data and hierarchy
const chapters = buildChapters(duneChapterData, duneHierarchy);

// Relationships
const duneRelationships: RelationshipWithChapters[] = [
  // Paul and Jessica (Mother-Son)
  {
    character1: paul,
    character2: jessica,
    descriptions: [
      { chapter: 1, description: 'Jessica trains Paul in Bene Gesserit ways' },
      { chapter: 3, description: 'Jessica reveals her Bene Gesserit training to Paul' },
      { chapter: 11, description: 'Jessica becomes a Reverend Mother' },
    ],
  },
  // Paul and Leto (Father-Son)
  {
    character1: paul,
    character2: leto,
    descriptions: [
      { chapter: 1, description: 'Leto prepares Paul for leadership' },
      { chapter: 6, description: 'Leto gives Paul the Atreides signet ring' },
      { chapter: 7, description: 'Leto dies in the Harkonnen attack' },
    ],
  },
  // Paul and Chani (Love)
  {
    character1: paul,
    character2: chani,
    descriptions: [
      { chapter: 8, description: 'Paul meets Chani in the desert' },
      { chapter: 9, description: 'Paul and Chani fall in love' },
      { chapter: 12, description: 'Paul and Chani become partners' },
    ],
  },
  // Paul and Stilgar (Mentor)
  {
    character1: paul,
    character2: stilgar,
    descriptions: [
      { chapter: 8, description: 'Stilgar becomes Paul\'s Fremen mentor' },
      { chapter: 9, description: 'Stilgar teaches Paul desert ways' },
      { chapter: 12, description: 'Stilgar accepts Paul as Muad\'Dib' },
    ],
  },
  // Jessica and Leto (Lovers)
  {
    character1: jessica,
    character2: leto,
    descriptions: [
      { chapter: 1, description: 'Jessica serves as Leto\'s concubine' },
      { chapter: 6, description: 'Jessica supports Leto\'s rule on Arrakis' },
      { chapter: 7, description: 'Jessica escapes with Paul after Leto\'s death' },
    ],
  },
  // Baron and Feyd-Rautha (Uncle-Nephew)
  {
    character1: baronHarkonnen,
    character2: feydRautha,
    descriptions: [
      { chapter: 2, description: 'Baron grooms Feyd-Rautha as heir' },
      { chapter: 5, description: 'Baron plots with Feyd-Rautha against Atreides' },
      { chapter: 15, description: 'Feyd-Rautha fights Paul in final battle' },
    ],
  },
  // Baron and Piter (Master-Servant)
  {
    character1: baronHarkonnen,
    character2: piterDeVries,
    descriptions: [
      { chapter: 2, description: 'Piter serves as Baron\'s twisted mentat' },
      { chapter: 5, description: 'Piter plots the Atreides betrayal' },
      { chapter: 7, description: 'Piter orchestrates the Harkonnen attack' },
    ],
  },
  // Emperor and Irulan (Father-Daughter)
  {
    character1: emperorShaddam,
    character2: princessIrulan,
    descriptions: [
      { chapter: 4, description: 'Emperor discusses politics with Irulan' },
      { chapter: 14, description: 'Emperor faces Paul\'s challenge' },
      { chapter: 15, description: 'Emperor is defeated by Paul' },
    ],
  },
  // Emperor and Fenring (Advisor)
  {
    character1: emperorShaddam,
    character2: hasimirFenring,
    descriptions: [
      { chapter: 4, description: 'Fenring advises Emperor on spice politics' },
      { chapter: 14, description: 'Fenring warns Emperor about Paul' },
      { chapter: 15, description: 'Fenring witnesses the final battle' },
    ],
  },
  // Mohiam and Jessica (Bene Gesserit)
  {
    character1: gaiusHelenMohiam,
    character2: jessica,
    descriptions: [
      { chapter: 1, description: 'Mohiam tests Paul with the gom jabbar' },
      { chapter: 3, description: 'Mohiam confronts Jessica about her choices' },
      { chapter: 11, description: 'Mohiam faces Jessica as Reverend Mother' },
    ],
  },
  // Gurney and Paul (Mentor)
  {
    character1: gurney,
    character2: paul,
    descriptions: [
      { chapter: 1, description: 'Gurney trains Paul in weapons and strategy' },
      { chapter: 6, description: 'Gurney protects Paul during Atreides arrival' },
      { chapter: 9, description: 'Gurney reunites with Paul among Fremen' },
    ],
  },
  // Duncan and Paul (Protector)
  {
    character1: duncan,
    character2: paul,
    descriptions: [
      { chapter: 1, description: 'Duncan serves as Paul\'s swordmaster' },
      { chapter: 6, description: 'Duncan protects Paul during Atreides arrival' },
      { chapter: 7, description: 'Duncan dies defending Paul in the attack' },
    ],
  },
  // Thufir and Leto (Advisor)
  {
    character1: thufir,
    character2: leto,
    descriptions: [
      { chapter: 1, description: 'Thufir serves as Leto\'s mentat and security chief' },
      { chapter: 6, description: 'Thufir advises Leto on Arrakis security' },
      { chapter: 7, description: 'Thufir is captured by Harkonnens' },
    ],
  },
  // Liet-Kynes and Chani (Father-Daughter)
  {
    character1: lietKynes,
    character2: chani,
    descriptions: [
      { chapter: 3, description: 'Liet-Kynes is Chani\'s father' },
      { chapter: 8, description: 'Liet-Kynes introduces Chani to Paul' },
      { chapter: 10, description: 'Liet-Kynes dies in the desert' },
    ],
  },
  // Yueh and Leto (Traitor)
  {
    character1: yueh,
    character2: leto,
    descriptions: [
      { chapter: 1, description: 'Yueh serves as Atreides doctor' },
      { chapter: 6, description: 'Yueh is compromised by Harkonnens' },
      { chapter: 7, description: 'Yueh betrays Leto to Harkonnens' },
    ],
  },
  // Margot and Irulan (Bene Gesserit)
  {
    character1: margotFenring,
    character2: princessIrulan,
    descriptions: [
      { chapter: 4, description: 'Margot advises Irulan on Bene Gesserit ways' },
      { chapter: 14, description: 'Margot discusses Paul with Irulan' },
      { chapter: 15, description: 'Margot witnesses the final confrontation' },
    ],
  },
];

// Export the complete Dune dataset
export const duneData: BookData = {
  book: duneBook,
  characters: [
    paul,
    jessica,
    leto,
    gurney,
    thufir,
    duncan,
    stilgar,
    chani,
    lietKynes,
    baronHarkonnen,
    feydRautha,
    piterDeVries,
    emperorShaddam,
    princessIrulan,
    hasimirFenring,
    margotFenring,
    gaiusHelenMohiam,
    yueh,
  ],
  chapters,
  factions: [
    atreidesFaction,
    harkonnenFaction,
    fremenFaction,
    corrinoFaction,
    beneGesseritFaction,
  ],
  relationships: duneRelationships,
}; 