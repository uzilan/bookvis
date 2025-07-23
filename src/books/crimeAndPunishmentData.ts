import type { BookData } from '../models/BookData';
import type { Author } from '../models/Author';
import type { Book } from '../models/Book';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { Chapter } from '../models/Chapter';
import type { RelationshipWithChapters } from '../models/BookData';

// Author
const fyodorDostoevsky: Author = {
  id: 'fyodor-dostoevsky',
  name: 'Fyodor Dostoevsky',
};

// Book
const crimeAndPunishmentBook: Book = {
  id: 'crime-and-punishment',
  author: fyodorDostoevsky,
  title: 'Crime and Punishment',
};

// Chapter and part definitions - just basic data
const crimeAndPunishmentChapterData = {
  // Parts
  'part-1': { id: 'part-1', title: 'Part I' },
  'part-2': { id: 'part-2', title: 'Part II' },
  'part-3': { id: 'part-3', title: 'Part III' },
  'part-4': { id: 'part-4', title: 'Part IV' },
  'part-5': { id: 'part-5', title: 'Part V' },
  'part-6': { id: 'part-6', title: 'Part VI' },
  'epilogue': { id: 'epilogue', title: 'Epilogue' },
  // Chapters
  'chapter-1': { id: 'chapter-1', title: 'Chapter 1' },
  'chapter-2': { id: 'chapter-2', title: 'Chapter 2' },
  'chapter-3': { id: 'chapter-3', title: 'Chapter 3' },
  'chapter-4': { id: 'chapter-4', title: 'Chapter 4' },
  'chapter-5': { id: 'chapter-5', title: 'Chapter 5' },
  'chapter-6': { id: 'chapter-6', title: 'Chapter 6' },
  'chapter-7': { id: 'chapter-7', title: 'Chapter 7' },
  'chapter-8': { id: 'chapter-8', title: 'Chapter 8' },
  'chapter-9': { id: 'chapter-9', title: 'Chapter 9' },
  'chapter-10': { id: 'chapter-10', title: 'Chapter 10' },
  'chapter-11': { id: 'chapter-11', title: 'Chapter 11' },
  'chapter-12': { id: 'chapter-12', title: 'Chapter 12' },
  'chapter-13': { id: 'chapter-13', title: 'Chapter 13' },
  'chapter-14': { id: 'chapter-14', title: 'Chapter 14' },
  'chapter-15': { id: 'chapter-15', title: 'Chapter 15' },
  'chapter-16': { id: 'chapter-16', title: 'Chapter 16' },
  'chapter-17': { id: 'chapter-17', title: 'Chapter 17' },
  'chapter-18': { id: 'chapter-18', title: 'Chapter 18' },
  'chapter-19': { id: 'chapter-19', title: 'Chapter 19' },
  'chapter-20': { id: 'chapter-20', title: 'Chapter 20' },
  'chapter-21': { id: 'chapter-21', title: 'Chapter 21' },
  'chapter-22': { id: 'chapter-22', title: 'Chapter 22' },
  'chapter-23': { id: 'chapter-23', title: 'Chapter 23' },
  'chapter-24': { id: 'chapter-24', title: 'Chapter 24' },
  'chapter-25': { id: 'chapter-25', title: 'Chapter 25' },
  'chapter-26': { id: 'chapter-26', title: 'Chapter 26' },
  'chapter-27': { id: 'chapter-27', title: 'Chapter 27' },
  'chapter-28': { id: 'chapter-28', title: 'Chapter 28' },
  'chapter-29': { id: 'chapter-29', title: 'Chapter 29' },
  'chapter-30': { id: 'chapter-30', title: 'Chapter 30' },
  'chapter-31': { id: 'chapter-31', title: 'Chapter 31' },
  'chapter-32': { id: 'chapter-32', title: 'Chapter 32' },
  'chapter-33': { id: 'chapter-33', title: 'Chapter 33' },
  'chapter-34': { id: 'chapter-34', title: 'Chapter 34' },
  'chapter-35': { id: 'chapter-35', title: 'Chapter 35' },
  'chapter-36': { id: 'chapter-36', title: 'Chapter 36' },
  'chapter-37': { id: 'chapter-37', title: 'Chapter 37' },
  'chapter-38': { id: 'chapter-38', title: 'Chapter 38' },
  'chapter-39': { id: 'chapter-39', title: 'Chapter 39' },
  'chapter-40': { id: 'chapter-40', title: 'Chapter 40' },
  'chapter-41': { id: 'chapter-41', title: 'Chapter 41' },
};

// Hierarchy definition - order determines chapter sequence
const crimeAndPunishmentHierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }> = [
  // Part I
  { chapterId: 'part-1', level: 0, type: 'part' },
  { chapterId: 'chapter-1', level: 1, type: 'chapter' },
  { chapterId: 'chapter-2', level: 1, type: 'chapter' },
  { chapterId: 'chapter-3', level: 1, type: 'chapter' },
  { chapterId: 'chapter-4', level: 1, type: 'chapter' },
  { chapterId: 'chapter-5', level: 1, type: 'chapter' },
  { chapterId: 'chapter-6', level: 1, type: 'chapter' },
  { chapterId: 'chapter-7', level: 1, type: 'chapter' },
  // Part II
  { chapterId: 'part-2', level: 0, type: 'part' },
  { chapterId: 'chapter-8', level: 1, type: 'chapter' },
  { chapterId: 'chapter-9', level: 1, type: 'chapter' },
  { chapterId: 'chapter-10', level: 1, type: 'chapter' },
  { chapterId: 'chapter-11', level: 1, type: 'chapter' },
  { chapterId: 'chapter-12', level: 1, type: 'chapter' },
  { chapterId: 'chapter-13', level: 1, type: 'chapter' },
  { chapterId: 'chapter-14', level: 1, type: 'chapter' },
  // Part III
  { chapterId: 'part-3', level: 0, type: 'part' },
  { chapterId: 'chapter-15', level: 1, type: 'chapter' },
  { chapterId: 'chapter-16', level: 1, type: 'chapter' },
  { chapterId: 'chapter-17', level: 1, type: 'chapter' },
  { chapterId: 'chapter-18', level: 1, type: 'chapter' },
  { chapterId: 'chapter-19', level: 1, type: 'chapter' },
  { chapterId: 'chapter-20', level: 1, type: 'chapter' },
  // Part IV
  { chapterId: 'part-4', level: 0, type: 'part' },
  { chapterId: 'chapter-21', level: 1, type: 'chapter' },
  { chapterId: 'chapter-22', level: 1, type: 'chapter' },
  { chapterId: 'chapter-23', level: 1, type: 'chapter' },
  { chapterId: 'chapter-24', level: 1, type: 'chapter' },
  { chapterId: 'chapter-25', level: 1, type: 'chapter' },
  { chapterId: 'chapter-26', level: 1, type: 'chapter' },
  // Part V
  { chapterId: 'part-5', level: 0, type: 'part' },
  { chapterId: 'chapter-27', level: 1, type: 'chapter' },
  { chapterId: 'chapter-28', level: 1, type: 'chapter' },
  { chapterId: 'chapter-29', level: 1, type: 'chapter' },
  { chapterId: 'chapter-30', level: 1, type: 'chapter' },
  { chapterId: 'chapter-31', level: 1, type: 'chapter' },
  // Part VI
  { chapterId: 'part-6', level: 0, type: 'part' },
  { chapterId: 'chapter-32', level: 1, type: 'chapter' },
  { chapterId: 'chapter-33', level: 1, type: 'chapter' },
  { chapterId: 'chapter-34', level: 1, type: 'chapter' },
  { chapterId: 'chapter-35', level: 1, type: 'chapter' },
  { chapterId: 'chapter-36', level: 1, type: 'chapter' },
  { chapterId: 'chapter-37', level: 1, type: 'chapter' },
  { chapterId: 'chapter-38', level: 1, type: 'chapter' },
  { chapterId: 'chapter-39', level: 1, type: 'chapter' },
  // Epilogue
  { chapterId: 'epilogue', level: 0, type: 'part' },
  { chapterId: 'chapter-40', level: 1, type: 'chapter' },
  { chapterId: 'chapter-41', level: 1, type: 'chapter' },
];

// Function to build chapters from data and hierarchy
function buildChapters(chapterData: Record<string, { id: string; title: string }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => ({
    book: crimeAndPunishmentBook,
    ...chapterData[item.chapterId],
    
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

// Characters with Russian names and multiple aliases
const raskolnikov: Character = {
  id: 'rodion-raskolnikov',
  name: 'Rodion Raskolnikov',
  description: 'A poor former student who commits murder',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Rodya', 'Rodka'],
  factions: ['students', 'criminals'],
  factionJoinChapters: {
    'students': 'chapter-1', // Appears as a former student in chapter 1
    'criminals': 'chapter-2', // Becomes a criminal after the murder
  },
  attributes: ['Student', 'Murderer', 'Tortured', 'Intellectual'],
};

const sonya: Character = {
  id: 'sonya-marmeladov',
  name: 'Sonya Marmeladov',
  description: 'A young prostitute who becomes Raskolnikov\'s confidante',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Sonya'],
  factions: ['prostitutes', 'religious'],
  factionJoinChapters: {
    'prostitutes': 'chapter-2', // Appears as a prostitute in chapter 2
    'religious': 'chapter-2', // Deeply religious despite her profession
  },
  attributes: ['Prostitute', 'Religious', 'Kind', 'Sacrificial'],
};

const porfiry: Character = {
  id: 'porfiry-petrovich',
  name: 'Porfiry Petrovich',
  description: 'The investigating magistrate who suspects Raskolnikov',
  firstAppearanceChapter: 'chapter-3',
  aliases: ['Porfiry'],
  factions: ['police'],
  factionJoinChapters: {
    'police': 'chapter-3', // Appears as police investigator in chapter 3
  },
  attributes: ['Investigator', 'Clever', 'Psychological', 'Just'],
};

const razumikhin: Character = {
  id: 'dmitri-razumikhin',
  name: 'Dmitri Razumikhin',
  description: 'Raskolnikov\'s loyal friend and fellow student',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Razumikhin'],
  factions: ['students', 'friends'],
  factionJoinChapters: {
    'students': 'chapter-2', // Appears as a student in chapter 2
    'friends': 'chapter-2', // Becomes Raskolnikov\'s friend
  },
  attributes: ['Student', 'Loyal', 'Generous', 'Optimistic'],
};

const dunya: Character = {
  id: 'avdotya-raskolnikov',
  name: 'Avdotya Raskolnikov',
  description: 'Raskolnikov\'s sister who comes to St. Petersburg',
  firstAppearanceChapter: 'chapter-4',
  aliases: ['Dunya'],
  factions: ['family'],
  factionJoinChapters: {
    'family': 'chapter-4', // Appears as Raskolnikov\'s sister in chapter 4
  },
  attributes: ['Sister', 'Beautiful', 'Intelligent', 'Loving'],
};

const luzhin: Character = {
  id: 'pyotr-luzhin',
  name: 'Pyotr Luzhin',
  description: 'Dunya\'s fiancé, a wealthy lawyer',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Luzhin'],
  factions: ['lawyers', 'bourgeois'],
  factionJoinChapters: {
    'lawyers': 'chapter-2', // Appears as a lawyer in chapter 2
    'bourgeois': 'chapter-2', // Represents the bourgeois class
  },
  attributes: ['Lawyer', 'Wealthy', 'Proud', 'Calculating'],
};

const svidrigailov: Character = {
  id: 'arkady-svidrigailov',
  name: 'Arkady Svidrigailov',
  description: 'A wealthy landowner with a dark past',
  firstAppearanceChapter: 'chapter-2',
  aliases: ['Svidrigailov'],
  factions: ['landowners', 'criminals'],
  factionJoinChapters: {
    'landowners': 'chapter-2', // Appears as a landowner in chapter 2
    'criminals': 'chapter-2', // Has a criminal past
  },
  attributes: ['Landowner', 'Wealthy', 'Corrupt', 'Suicidal'],
};

const marmeladov: Character = {
  id: 'semyon-marmeladov',
  name: 'Semyon Marmeladov',
  description: 'Sonya\'s alcoholic father',
  firstAppearanceChapter: 'chapter-4',
  aliases: ['Marmeladov'],
  factions: ['alcoholics', 'family'],
  factionJoinChapters: {
    'alcoholics': 'chapter-4', // Appears as an alcoholic in chapter 4
    'family': 'chapter-4', // Sonya\'s father
  },
  attributes: ['Alcoholic', 'Father', 'Pitiful', 'Tragic'],
};

const katerina: Character = {
  id: 'katerina-marmeladov',
  name: 'Katerina Marmeladov',
  description: 'Sonya\'s stepmother, a proud but poor woman',
  firstAppearanceChapter: 'chapter-5',
  aliases: ['Katerina'],
  factions: ['family', 'poor'],
  factionJoinChapters: {
    'family': 'chapter-5', // Appears as family in chapter 5
    'poor': 'chapter-5', // Represents the poor class
  },
  attributes: ['Proud', 'Poor', 'Step-mother', 'Tragic'],
};

const pulcheria: Character = {
  id: 'pulcheria-raskolnikov',
  name: 'Pulcheria Raskolnikov',
  description: 'Raskolnikov\'s mother who loves him deeply',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Mother'],
  factions: ['family'],
  factionJoinChapters: {
    'family': 'chapter-1', // Appears as Raskolnikov\'s mother in chapter 1
  },
  attributes: ['Mother', 'Loving', 'Worried', 'Devoted'],
};

const nastasya: Character = {
  id: 'nastasya-petrovna',
  name: 'Nastasya Petrovna',
  description: 'The landlady\'s servant who helps Raskolnikov',
  firstAppearanceChapter: 'chapter-1',
  aliases: ['Nastasya'],
  factions: ['servants'],
  factionJoinChapters: {
    'servants': 'chapter-1', // Appears as a servant in chapter 1
  },
  attributes: ['Servant', 'Kind', 'Helpful', 'Simple'],
};

// Factions
const studentsFaction: Faction = {
  id: 'students',
  title: 'Students',
  description: 'Former and current students, intellectuals',
  color: '#3498DB',
};

const criminalsFaction: Faction = {
  id: 'criminals',
  title: 'Criminals',
  description: 'Those who have committed crimes or are suspected of crimes',
  color: '#E74C3C',
};

const prostitutesFaction: Faction = {
  id: 'prostitutes',
  title: 'Prostitutes',
  description: 'Women forced into prostitution to survive',
  color: '#9B59B6',
};

const marmeladovFamilyFaction: Faction = {
  id: 'marmeladov-family',
  title: 'Marmeladov Family',
  description: 'Sonya\'s family, struggling to survive',
  color: '#F39C12',
};

const policeFaction: Faction = {
  id: 'police',
  title: 'Police',
  description: 'Law enforcement and investigators',
  color: '#5DADE2',
};

const authorityFaction: Faction = {
  id: 'authority',
  title: 'Authority',
  description: 'Government officials and authority figures',
  color: '#85C1E9',
};

const friendsFaction: Faction = {
  id: 'friends',
  title: 'Friends',
  description: 'Loyal friends and supporters',
  color: '#27AE60',
};

const familyFaction: Faction = {
  id: 'family',
  title: 'Family',
  description: 'Family members and relatives',
  color: '#E67E22',
};

const nobilityFaction: Faction = {
  id: 'nobility',
  title: 'Nobility',
  description: 'Members of the noble class',
  color: '#8E44AD',
};

const alcoholicsFaction: Faction = {
  id: 'alcoholics',
  title: 'Alcoholics',
  description: 'People struggling with alcoholism',
  color: '#D35400',
};

const lawyersFaction: Faction = {
  id: 'lawyers',
  title: 'Lawyers',
  description: 'Legal professionals and advocates',
  color: '#16A085',
};

const landownersFaction: Faction = {
  id: 'landowners',
  title: 'Landowners',
  description: 'Wealthy landowners and estate owners',
  color: '#D35400',
};

const pawnbrokersFaction: Faction = {
  id: 'pawnbrokers',
  title: 'Pawnbrokers',
  description: 'People who work in pawn shops',
  color: '#95A5A6',
};

// Build chapters from data and hierarchy
const chapters = buildChapters(crimeAndPunishmentChapterData, crimeAndPunishmentHierarchy);

// Relationships
const relationships: RelationshipWithChapters[] = [
  {
    character1: raskolnikov,
    character2: sonya,
    descriptions: [
      { chapter: 'chapter-4', description: 'Raskolnikov meets Sonya and begins to confide in her' },
      { chapter: 'chapter-15', description: 'Raskolnikov confesses his crime to Sonya' },
      { chapter: 'chapter-41', description: 'Sonya follows Raskolnikov to Siberia and supports his redemption' },
    ],
  },
  {
    character1: raskolnikov,
    character2: porfiry,
    descriptions: [
      { chapter: 'chapter-5', description: 'Porfiry begins investigating Raskolnikov' },
      { chapter: 'chapter-16', description: 'Porfiry uses psychological tactics to pressure Raskolnikov' },
      { chapter: 'chapter-33', description: 'Porfiry confronts Raskolnikov with evidence' },
    ],
  },
  {
    character1: raskolnikov,
    character2: razumikhin,
    descriptions: [
      { chapter: 'chapter-2', description: 'Razumikhin helps Raskolnikov when he is ill' },
      { chapter: 'chapter-8', description: 'Razumikhin defends Raskolnikov to others' },
      { chapter: 'chapter-17', description: 'Razumikhin continues to support his friend despite suspicions' },
    ],
  },
  {
    character1: raskolnikov,
    character2: dunya,
    descriptions: [
      { chapter: 'chapter-4', description: 'Dunya arrives in St. Petersburg to see her brother' },
      { chapter: 'chapter-9', description: 'Raskolnikov tries to prevent Dunya\'s engagement to Luzhin' },
      { chapter: 'chapter-18', description: 'Dunya learns about her brother\'s crime' },
    ],
  },
  {
    character1: sonya,
    character2: marmeladov,
    descriptions: [
      { chapter: 'chapter-2', description: 'Sonya supports her alcoholic father' },
      { chapter: 'chapter-3', description: 'Marmeladov dies, leaving Sonya to support the family' },
    ],
  },
  {
    character1: sonya,
    character2: katerina,
    descriptions: [
      { chapter: 'chapter-2', description: 'Sonya supports her stepmother and siblings' },
      { chapter: 'chapter-25', description: 'Katerina becomes increasingly ill and desperate' },
      { chapter: 'chapter-26', description: 'Katerina dies, leaving Sonya alone' },
    ],
  },
  {
    character1: dunya,
    character2: luzhin,
    descriptions: [
      { chapter: 'chapter-4', description: 'Dunya becomes engaged to Luzhin' },
      { chapter: 'chapter-9', description: 'Luzhin reveals his true manipulative nature' },
      { chapter: 'chapter-19', description: 'Dunya breaks off the engagement' },
    ],
  },
  {
    character1: dunya,
    character2: svidrigailov,
    descriptions: [
      { chapter: 'chapter-5', description: 'Svidrigailov becomes obsessed with Dunya' },
      { chapter: 'chapter-20', description: 'Svidrigailov tries to blackmail Dunya' },
      { chapter: 'chapter-35', description: 'Svidrigailov commits suicide after being rejected' },
    ],
  },
  {
    character1: raskolnikov,
    character2: pulcheria,
    descriptions: [
      { chapter: 'chapter-1', description: 'Raskolnikov murders the old pawnbroker' },
    ],
  },
  {
    character1: raskolnikov,
    character2: nastasya,
    descriptions: [
      { chapter: 'chapter-1', description: 'Raskolnikov also murders Lizaveta who witnesses the crime' },
    ],
  },
  {
    character1: porfiry,
    character2: razumikhin,
    descriptions: [
      { chapter: 'chapter-10', description: 'Porfiry questions Razumikhin about Raskolnikov' },
      { chapter: 'chapter-17', description: 'Razumikhin defends Raskolnikov to Porfiry' },
    ],
  },
];

// Export the complete Crime and Punishment dataset
export const crimeAndPunishmentData: BookData = {
  book: crimeAndPunishmentBook,
  characters: [
    raskolnikov,
    sonya,
    porfiry,
    razumikhin,
    dunya,
    marmeladov,
    katerina,
    luzhin,
    svidrigailov,
    pulcheria,
    nastasya,
  ],
  chapters,
  factions: [
    studentsFaction,
    criminalsFaction,
    prostitutesFaction,
    marmeladovFamilyFaction,
    policeFaction,
    authorityFaction,
    friendsFaction,
    familyFaction,
    nobilityFaction,
    alcoholicsFaction,
    lawyersFaction,
    landownersFaction,
    pawnbrokersFaction,
  ],
  relationships,
}; 