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

// Characters with Russian names and multiple aliases
const rodionRaskolnikov: Character = {
  id: 'rodion-raskolnikov',
  name: 'Rodion Romanovich Raskolnikov',
  description: 'A former law student who commits murder and struggles with guilt and redemption',
  firstAppearanceChapter: 1,
  aliases: ['Rodya', 'Rodka', 'Rodion Romanovich', 'The Student', 'The Murderer'],
  factions: ['students', 'criminals'],
  attributes: ['Intellectual', 'Guilt-ridden', 'Proud', 'Isolated', 'Philosophical'],
};

const sofyaSemyonovna: Character = {
  id: 'sofya-semyonovna',
  name: 'Sofya Semyonovna Marmeladova',
  description: 'A young woman forced into prostitution to support her family, becomes Raskolnikov\'s confidante',
  firstAppearanceChapter: 2,
  aliases: ['Sonya', 'Sofya Semyonovna', 'Sonechka', 'The Prostitute', 'The Saint'],
  factions: ['prostitutes', 'marmeladov-family'],
  attributes: ['Religious', 'Self-sacrificing', 'Pure-hearted', 'Loving', 'Resilient'],
};

const porfiryPetrovich: Character = {
  id: 'porfiry-petrovich',
  name: 'Porfiry Petrovich',
  description: 'The clever police investigator who suspects Raskolnikov and uses psychological tactics',
  firstAppearanceChapter: 3,
  aliases: ['Porfiry Petrovich', 'The Investigator', 'The Detective', 'The Magistrate'],
  factions: ['police', 'authority'],
  attributes: ['Intelligent', 'Patient', 'Psychological', 'Just', 'Observant'],
};

const dmitryProkofich: Character = {
  id: 'dmitry-prokofich',
  name: 'Dmitry Prokofich Razumikhin',
  description: 'Raskolnikov\'s loyal friend and former classmate who tries to help him',
  firstAppearanceChapter: 2,
  aliases: ['Razumikhin', 'Dmitry Prokofich', 'The Friend', 'The Loyal One'],
  factions: ['students', 'friends'],
  attributes: ['Loyal', 'Generous', 'Optimistic', 'Hardworking', 'Honest'],
};

const avdotyaRomanovna: Character = {
  id: 'avdotya-romanovna',
  name: 'Avdotya Romanovna Raskolnikova',
  description: 'Raskolnikov\'s sister who comes to St. Petersburg and becomes engaged to Luzhin',
  firstAppearanceChapter: 4,
  aliases: ['Dunya', 'Avdotya Romanovna', 'Dounia', 'The Sister'],
  factions: ['family', 'nobility'],
  attributes: ['Beautiful', 'Proud', 'Protective', 'Intelligent', 'Determined'],
};

 const semyonZakharovich: Character = {
  id: 'semyon-zakharovich',
  name: 'Semyon Zakharovich Marmeladov',
  description: 'Sonya\'s alcoholic father who dies early in the novel',
  firstAppearanceChapter: 2,
  aliases: ['Marmeladov', 'Semyon Zakharovich', 'The Drunkard', 'The Father'],
  factions: ['marmeladov-family', 'alcoholics'],
  attributes: ['Alcoholic', 'Remorseful', 'Pitiful', 'Self-destructive', 'Loving father'],
};

const katerinaIvanovna: Character = {
  id: 'katerina-ivanovna',
  name: 'Katerina Ivanovna Marmeladova',
  description: 'Sonya\'s stepmother, a proud woman who becomes increasingly ill and desperate',
  firstAppearanceChapter: 2,
  aliases: ['Katerina Ivanovna', 'The Stepmother', 'The Proud One', 'The Sick Woman'],
  factions: ['marmeladov-family', 'nobility'],
  attributes: ['Proud', 'Ill', 'Desperate', 'Noble background', 'Protective'],
};

const pyotrPetrovich: Character = {
  id: 'pyotr-petrovich',
  name: 'Pyotr Petrovich Luzhin',
  description: 'A wealthy lawyer who becomes engaged to Dunya but is revealed to be manipulative',
  firstAppearanceChapter: 4,
  aliases: ['Luzhin', 'Pyotr Petrovich', 'The Lawyer', 'The Fiancé', 'The Manipulator'],
  factions: ['lawyers', 'wealthy'],
  attributes: ['Wealthy', 'Manipulative', 'Selfish', 'Proud', 'Calculating'],
};

const arkadyIvanovich: Character = {
  id: 'arkady-ivanovich',
  name: 'Arkady Ivanovich Svidrigailov',
  description: 'A wealthy landowner with a dark past who becomes obsessed with Dunya',
  firstAppearanceChapter: 5,
  aliases: ['Svidrigailov', 'Arkady Ivanovich', 'The Landowner', 'The Obsessed One'],
  factions: ['landowners', 'wealthy'],
  attributes: ['Wealthy', 'Obsessive', 'Dark', 'Suicidal', 'Complex'],
};

const alyonaIvanovna: Character = {
  id: 'alyona-ivanovna',
  name: 'Alyona Ivanovna',
  description: 'The old pawnbroker whom Raskolnikov murders',
  firstAppearanceChapter: 1,
  aliases: ['The Pawnbroker', 'The Old Woman', 'The Victim'],
  factions: ['pawnbrokers'],
  attributes: ['Old', 'Greedy', 'Suspicious', 'Victim'],
};

const lizavetaIvanovna: Character = {
  id: 'lizaveta-ivanovna',
  name: 'Lizaveta Ivanovna',
  description: 'Alyona\'s half-sister who is also murdered by Raskolnikov',
  firstAppearanceChapter: 1,
  aliases: ['Lizaveta', 'The Half-sister', 'The Second Victim'],
  factions: ['pawnbrokers'],
  attributes: ['Simple', 'Innocent', 'Victim', 'Kind'],
};

// Factions
const studentsFaction: Faction = {
  id: 'students',
  title: 'Students',
  color: '#4A90E2',
  description: 'University students and intellectuals',
};

const criminalsFaction: Faction = {
  id: 'criminals',
  title: 'Criminals',
  color: '#E74C3C',
  description: 'Those involved in criminal activities',
};

const policeFaction: Faction = {
  id: 'police',
  title: 'Police & Authority',
  color: '#2C3E50',
  description: 'Law enforcement and government officials',
};

const wealthyFaction: Faction = {
  id: 'wealthy',
  title: 'Wealthy Class',
  color: '#F39C12',
  description: 'The wealthy and privileged class',
};

const familyFaction: Faction = {
  id: 'family',
  title: 'Family',
  color: '#27AE60',
  description: 'Family members and close relatives',
};

const prostitutesFaction: Faction = {
  id: 'prostitutes',
  title: 'Prostitutes',
  color: '#9B59B6',
  description: 'Women forced into prostitution',
};

const marmeladovFamilyFaction: Faction = {
  id: 'marmeladov-family',
  title: 'Marmeladov Family',
  color: '#E67E22',
  description: 'Sonya\'s impoverished family',
};

const nobilityFaction: Faction = {
  id: 'nobility',
  title: 'Nobility',
  color: '#8E44AD',
  description: 'Members of the noble class',
};

const alcoholicsFaction: Faction = {
  id: 'alcoholics',
  title: 'Alcoholics',
  color: '#95A5A6',
  description: 'Those struggling with alcoholism',
};

const pawnbrokersFaction: Faction = {
  id: 'pawnbrokers',
  title: 'Pawnbrokers',
  color: '#34495E',
  description: 'Those involved in pawnbroking',
};

const friendsFaction: Faction = {
  id: 'friends',
  title: 'Friends',
  color: '#3498DB',
  description: 'Close friends and allies',
};

const authorityFaction: Faction = {
  id: 'authority',
  title: 'Authority',
  color: '#2C3E50',
  description: 'Those in positions of authority',
};

const landownersFaction: Faction = {
  id: 'landowners',
  title: 'Landowners',
  color: '#D35400',
  description: 'Wealthy landowners and estate owners',
};

// Book node
const crimeAndPunishmentBookNode: Chapter = {
  book: crimeAndPunishmentBook,
  title: 'Crime and Punishment',
  index: 0,
  level: 1,
  type: 'book',
  path: ['Crime and Punishment'],
};

// Part nodes
const parts = [
  { title: 'Part I', start: 1, end: 7 },
  { title: 'Part II', start: 8, end: 14 },
  { title: 'Part III', start: 15, end: 20 },
  { title: 'Part IV', start: 21, end: 26 },
  { title: 'Part V', start: 27, end: 31 },
  { title: 'Part VI', start: 32, end: 39 },
  { title: 'Epilogue', start: 40, end: 41 },
];

const partNodes: Chapter[] = parts.map((part, idx) => ({
  book: crimeAndPunishmentBook,
  title: part.title,
  index: idx + 1,
  level: 2,
  type: 'part',
  parent: crimeAndPunishmentBookNode,
  path: ['Crime and Punishment', part.title],
}));

// Chapter nodes
const chapterNodes: Chapter[] = [];
let globalIndex = 1;
for (const [i, part] of parts.entries()) {
  for (let ch = part.start; ch <= part.end; ch++) {
    const chapterNumber = ch - part.start + 1;
    const chapterTitle = part.title === 'Epilogue'
      ? `Chapter ${chapterNumber}`
      : `Chapter ${chapterNumber}`;
    chapterNodes.push({
      book: crimeAndPunishmentBook,
      title: chapterTitle,
      index: chapterNumber,
      globalIndex: globalIndex++,
      level: 3,
      type: 'chapter',
      parent: partNodes[i],
      path: ['Crime and Punishment', part.title, chapterTitle],
    });
  }
}

const chapters: Chapter[] = [
  crimeAndPunishmentBookNode,
  ...partNodes,
  ...chapterNodes,
];

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
  {
    character1: sofyaSemyonovna,
    character2: katerinaIvanovna,
    descriptions: [
      { chapter: 2, description: 'Sonya and Katerina struggle together in poverty' },
      { chapter: 25, description: 'Katerina becomes increasingly ill and desperate' },
      { chapter: 26, description: 'Katerina dies, leaving Sonya alone' },
    ],
  },
  {
    character1: rodionRaskolnikov,
    character2: arkadyIvanovich,
    descriptions: [
      { chapter: 20, description: 'Svidrigailov confronts Raskolnikov about the crime' },
      { chapter: 34, description: 'Svidrigailov offers to help Raskolnikov escape' },
    ],
  },
  {
    character1: dmitryProkofich,
    character2: avdotyaRomanovna,
    descriptions: [
      { chapter: 9, description: 'Razumikhin falls in love with Dunya' },
      { chapter: 19, description: 'Razumikhin proposes to Dunya after her engagement ends' },
    ],
  },
];

// Export the complete book data
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
    policeFaction,
    wealthyFaction,
    familyFaction,
    prostitutesFaction,
    marmeladovFamilyFaction,
    nobilityFaction,
    alcoholicsFaction,
    pawnbrokersFaction,
    friendsFaction,
    authorityFaction,
    landownersFaction,
  ],
  relationships,
}; 