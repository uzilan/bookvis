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

// Hierarchy definition - order determines global index, no explicit globalIndex needed
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
    globalIndex: index + 1, // Order in array determines global index
    level: item.level,
    type: item.type,
    index: index + 1, // For backward compatibility
  }));
}

// Characters with Russian names and multiple aliases
const rodionRaskolnikov: Character = {
  id: 'rodion-raskolnikov',
  name: 'Rodion Romanovich Raskolnikov',
  description: 'A former law student who commits murder and struggles with guilt and redemption',
  firstAppearanceChapter: 1,
  aliases: ['Rodya', 'Rodka', 'Rodion Romanovich', 'The Student', 'The Murderer'],
  factions: ['students', 'criminals'],
  factionJoinChapters: {
    'students': 'chapter-1', // Former student
    'criminals': 'chapter-1', // Commits murder in chapter 1
  },
  attributes: ['Intellectual', 'Guilt-ridden', 'Proud', 'Isolated', 'Philosophical'],
};

const sofyaSemyonovna: Character = {
  id: 'sofya-semyonovna',
  name: 'Sofya Semyonovna Marmeladova',
  description: 'A young woman forced into prostitution to support her family, becomes Raskolnikov\'s confidante',
  firstAppearanceChapter: 2,
  aliases: ['Sonya', 'Sofya Semyonovna', 'Sonechka', 'The Prostitute', 'The Saint'],
  factions: ['prostitutes', 'marmeladov-family'],
  factionJoinChapters: {
    'prostitutes': 'chapter-2', // Joins when introduced
    'marmeladov-family': 'chapter-2', // Always part of the family
  },
  attributes: ['Religious', 'Self-sacrificing', 'Pure-hearted', 'Loving', 'Resilient'],
};

const porfiryPetrovich: Character = {
  id: 'porfiry-petrovich',
  name: 'Porfiry Petrovich',
  description: 'The clever police investigator who suspects Raskolnikov and uses psychological tactics',
  firstAppearanceChapter: 3,
  aliases: ['Porfiry Petrovich', 'The Investigator', 'The Detective', 'The Magistrate'],
  factions: ['police', 'authority'],
  factionJoinChapters: {
    'police': 'chapter-3', // Joins when introduced
    'authority': 'chapter-3', // Always authority figure
  },
  attributes: ['Intelligent', 'Patient', 'Psychological', 'Just', 'Observant'],
};

const dmitryProkofich: Character = {
  id: 'dmitry-prokofich',
  name: 'Dmitry Prokofich Razumikhin',
  description: 'Raskolnikov\'s loyal friend and former classmate who tries to help him',
  firstAppearanceChapter: 2,
  aliases: ['Razumikhin', 'Dmitry Prokofich', 'The Friend', 'The Loyal One'],
  factions: ['students', 'friends'],
  factionJoinChapters: {
    'students': 'chapter-2', // Former student
    'friends': 'chapter-2', // Joins when introduced
  },
  attributes: ['Loyal', 'Generous', 'Optimistic', 'Hardworking', 'Honest'],
};

const avdotyaRomanovna: Character = {
  id: 'avdotya-romanovna',
  name: 'Avdotya Romanovna Raskolnikova',
  description: 'Raskolnikov\'s sister who comes to St. Petersburg and becomes engaged to Luzhin',
  firstAppearanceChapter: 4,
  aliases: ['Dunya', 'Avdotya Romanovna', 'Dounia', 'The Sister'],
  factions: ['family', 'nobility'],
  factionJoinChapters: {
    'family': 'chapter-4', // Joins when introduced
    'nobility': 'chapter-4', // Always noble background
  },
  attributes: ['Beautiful', 'Proud', 'Protective', 'Intelligent', 'Determined'],
};

const semyonZakharovich: Character = {
  id: 'semyon-zakharovich',
  name: 'Semyon Zakharovich Marmeladov',
  description: 'Sonya\'s alcoholic father who dies early in the novel',
  firstAppearanceChapter: 2,
  aliases: ['Marmeladov', 'Semyon Zakharovich', 'The Drunkard', 'The Father'],
  factions: ['marmeladov-family', 'alcoholics'],
  factionJoinChapters: {
    'marmeladov-family': 'chapter-2', // Always part of the family
    'alcoholics': 'chapter-2', // Always alcoholic
  },
  attributes: ['Alcoholic', 'Father', 'Desperate', 'Pitiful', 'Dying'],
};

const katerinaIvanovna: Character = {
  id: 'katerina-ivanovna',
  name: 'Katerina Ivanovna Marmeladova',
  description: 'Sonya\'s stepmother, a proud woman who becomes increasingly desperate',
  firstAppearanceChapter: 2,
  aliases: ['Katerina Ivanovna', 'The Stepmother', 'The Proud One'],
  factions: ['marmeladov-family', 'nobility'],
  factionJoinChapters: {
    'marmeladov-family': 'chapter-2', // Always part of the family
    'nobility': 'chapter-2', // Always noble background
  },
  attributes: ['Proud', 'Desperate', 'Ill', 'Noble background', 'Suffering'],
};

const pyotrPetrovich: Character = {
  id: 'pyotr-petrovich',
  name: 'Pyotr Petrovich Luzhin',
  description: 'A wealthy lawyer who becomes engaged to Dunya but reveals his true nature',
  firstAppearanceChapter: 4,
  aliases: ['Luzhin', 'Pyotr Petrovich', 'The Lawyer', 'The Fiancé'],
  factions: ['lawyers', 'nobility'],
  factionJoinChapters: {
    'lawyers': 'chapter-4', // Joins when introduced
    'nobility': 'chapter-4', // Always noble background
  },
  attributes: ['Wealthy', 'Manipulative', 'Proud', 'Selfish', 'Hypocritical'],
};

const arkadyIvanovich: Character = {
  id: 'arkady-ivanovich',
  name: 'Arkady Ivanovich Svidrigailov',
  description: 'A wealthy landowner obsessed with Dunya who commits suicide',
  firstAppearanceChapter: 5,
  aliases: ['Svidrigailov', 'Arkady Ivanovich', 'The Landowner', 'The Obsessed'],
  factions: ['landowners', 'nobility'],
  factionJoinChapters: {
    'landowners': 'chapter-5', // Joins when introduced
    'nobility': 'chapter-5', // Always noble background
  },
  attributes: ['Wealthy', 'Obsessed', 'Desperate', 'Suicidal', 'Corrupt'],
};

const alyonaIvanovna: Character = {
  id: 'alyona-ivanovna',
  name: 'Alyona Ivanovna',
  description: 'The old pawnbroker murdered by Raskolnikov',
  firstAppearanceChapter: 1,
  aliases: ['The Pawnbroker', 'The Old Woman', 'The Victim'],
  factions: ['pawnbrokers'],
  factionJoinChapters: {
    'pawnbrokers': 'chapter-1', // Always pawnbroker
  },
  attributes: ['Old', 'Greedy', 'Victim', 'Pawnbroker', 'Murdered'],
};

const lizavetaIvanovna: Character = {
  id: 'lizaveta-ivanovna',
  name: 'Lizaveta Ivanovna',
  description: 'Alyona\'s half-sister who is also murdered by Raskolnikov',
  firstAppearanceChapter: 1,
  aliases: ['Lizaveta', 'The Half-sister', 'The Witness', 'The Victim'],
  factions: ['pawnbrokers'],
  factionJoinChapters: {
    'pawnbrokers': 'chapter-1', // Always pawnbroker
  },
  attributes: ['Simple', 'Innocent', 'Victim', 'Half-sister', 'Murdered'],
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
    character1: rodionRaskolnikov,
    character2: sofyaSemyonovna,
    descriptions: [
      { chapter: 4, description: 'Raskolnikov meets Sonya and begins to confide in her' },
      { chapter: 15, description: 'Raskolnikov confesses his crime to Sonya' },
      { chapter: 41, description: 'Sonya follows Raskolnikov to Siberia and supports his redemption' },
    ],
  },
  {
    character1: rodionRaskolnikov,
    character2: porfiryPetrovich,
    descriptions: [
      { chapter: 5, description: 'Porfiry begins investigating Raskolnikov' },
      { chapter: 16, description: 'Porfiry uses psychological tactics to pressure Raskolnikov' },
      { chapter: 33, description: 'Porfiry confronts Raskolnikov with evidence' },
    ],
  },
  {
    character1: rodionRaskolnikov,
    character2: dmitryProkofich,
    descriptions: [
      { chapter: 2, description: 'Razumikhin helps Raskolnikov when he is ill' },
      { chapter: 8, description: 'Razumikhin defends Raskolnikov to others' },
      { chapter: 17, description: 'Razumikhin continues to support his friend despite suspicions' },
    ],
  },
  {
    character1: rodionRaskolnikov,
    character2: avdotyaRomanovna,
    descriptions: [
      { chapter: 4, description: 'Dunya arrives in St. Petersburg to see her brother' },
      { chapter: 9, description: 'Raskolnikov tries to prevent Dunya\'s engagement to Luzhin' },
      { chapter: 18, description: 'Dunya learns about her brother\'s crime' },
    ],
  },
  {
    character1: sofyaSemyonovna,
    character2: semyonZakharovich,
    descriptions: [
      { chapter: 2, description: 'Sonya supports her alcoholic father' },
      { chapter: 3, description: 'Marmeladov dies, leaving Sonya to support the family' },
    ],
  },
  {
    character1: sofyaSemyonovna,
    character2: katerinaIvanovna,
    descriptions: [
      { chapter: 2, description: 'Sonya supports her stepmother and siblings' },
      { chapter: 25, description: 'Katerina becomes increasingly ill and desperate' },
      { chapter: 26, description: 'Katerina dies, leaving Sonya alone' },
    ],
  },
  {
    character1: avdotyaRomanovna,
    character2: pyotrPetrovich,
    descriptions: [
      { chapter: 4, description: 'Dunya becomes engaged to Luzhin' },
      { chapter: 9, description: 'Luzhin reveals his true manipulative nature' },
      { chapter: 19, description: 'Dunya breaks off the engagement' },
    ],
  },
  {
    character1: avdotyaRomanovna,
    character2: arkadyIvanovich,
    descriptions: [
      { chapter: 5, description: 'Svidrigailov becomes obsessed with Dunya' },
      { chapter: 20, description: 'Svidrigailov tries to blackmail Dunya' },
      { chapter: 35, description: 'Svidrigailov commits suicide after being rejected' },
    ],
  },
  {
    character1: rodionRaskolnikov,
    character2: alyonaIvanovna,
    descriptions: [
      { chapter: 1, description: 'Raskolnikov murders the old pawnbroker' },
    ],
  },
  {
    character1: rodionRaskolnikov,
    character2: lizavetaIvanovna,
    descriptions: [
      { chapter: 1, description: 'Raskolnikov also murders Lizaveta who witnesses the crime' },
    ],
  },
  {
    character1: porfiryPetrovich,
    character2: dmitryProkofich,
    descriptions: [
      { chapter: 10, description: 'Porfiry questions Razumikhin about Raskolnikov' },
      { chapter: 17, description: 'Razumikhin defends Raskolnikov to Porfiry' },
    ],
  },
];

// Export the complete Crime and Punishment dataset
export const crimeAndPunishmentData: BookData = {
  book: crimeAndPunishmentBook,
  characters: [
    rodionRaskolnikov,
    sofyaSemyonovna,
    porfiryPetrovich,
    dmitryProkofich,
    avdotyaRomanovna,
    semyonZakharovich,
    katerinaIvanovna,
    pyotrPetrovich,
    arkadyIvanovich,
    alyonaIvanovna,
    lizavetaIvanovna,
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