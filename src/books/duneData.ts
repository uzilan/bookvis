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

// Characters
const paulAtreides: Character = {
  id: 'paul-atreides',
  name: 'Paul Atreides',
  description: 'Son of Duke Leto Atreides, becomes Muad\'Dib and the Kwisatz Haderach',
  firstAppearanceChapter: 1,
  aliases: ['Muad\'Dib', 'Usul', 'Kwisatz Haderach'],
  factions: ['atreides', 'fremen'],
  attributes: ['Prescient', 'Bene Gesserit trained', 'Duke\'s son'],
};

const jessica: Character = {
  id: 'jessica',
  name: 'Lady Jessica',
  description: 'Bene Gesserit acolyte and concubine to Duke Leto, mother of Paul',
  firstAppearanceChapter: 1,
  aliases: ['Reverend Mother'],
  factions: ['bene-gesserit', 'atreides'],
  attributes: ['Bene Gesserit trained', 'Concubine', 'Mother of Paul'],
};

const letoAtreides: Character = {
  id: 'leto-atreides',
  name: 'Duke Leto Atreides',
  description: 'Head of House Atreides, ruler of Caladan, father of Paul',
  firstAppearanceChapter: 1,
  aliases: ['Duke'],
  factions: ['atreides'],
  attributes: ['Duke', 'Father', 'Ruler of Caladan'],
};

const gurneyHalleck: Character = {
  id: 'gurney-halleck',
  name: 'Gurney Halleck',
  description: 'Weapons master and loyal retainer of House Atreides',
  firstAppearanceChapter: 1,
  aliases: ['Weapons Master'],
  factions: ['atreides'],
  attributes: ['Weapons master', 'Loyal retainer', 'Poet warrior'],
};

const thufirHawat: Character = {
  id: 'thufir-hawat',
  name: 'Thufir Hawat',
  description: 'Mentat and security chief of House Atreides',
  firstAppearanceChapter: 1,
  aliases: ['Mentat'],
  factions: ['atreides'],
  attributes: ['Mentat', 'Security chief', 'Human computer'],
};

const duncanIdaho: Character = {
  id: 'duncan-idaho',
  name: 'Duncan Idaho',
  description: 'Swordmaster and loyal retainer of House Atreides',
  firstAppearanceChapter: 1,
  aliases: ['Swordmaster'],
  factions: ['atreides'],
  attributes: ['Swordmaster', 'Loyal retainer', 'Expert fighter'],
};

const stilgar: Character = {
  id: 'stilgar',
  name: 'Stilgar',
  description: 'Naib (leader) of Sietch Tabr, Fremen leader',
  firstAppearanceChapter: 8,
  aliases: ['Naib'],
  factions: ['fremen'],
  attributes: ['Naib', 'Fremen leader', 'Desert warrior'],
};

const chani: Character = {
  id: 'chani',
  name: 'Chani',
  description: 'Daughter of Imperial Planetologist Liet-Kynes, Paul\'s Fremen love',
  firstAppearanceChapter: 8,
  aliases: ['Sihaya'],
  factions: ['fremen'],
  attributes: ['Fremen', 'Daughter of Liet-Kynes', 'Paul\'s love'],
};

const lietKynes: Character = {
  id: 'liet-kynes',
  name: 'Liet-Kynes',
  description: 'Imperial Planetologist and secret leader of the Fremen',
  firstAppearanceChapter: 3,
  aliases: ['Planetologist'],
  factions: ['fremen', 'imperial'],
  attributes: ['Planetologist', 'Fremen leader', 'Ecologist'],
};

const baronHarkonnen: Character = {
  id: 'baron-harkonnen',
  name: 'Baron Vladimir Harkonnen',
  description: 'Head of House Harkonnen, ruler of Arrakis, enemy of Atreides',
  firstAppearanceChapter: 2,
  aliases: ['Baron'],
  factions: ['harkonnen'],
  attributes: ['Baron', 'Ruler of Arrakis', 'Enemy of Atreides'],
};

const feydRautha: Character = {
  id: 'feyd-rautha',
  name: 'Feyd-Rautha Harkonnen',
  description: 'Nephew of Baron Harkonnen, potential heir',
  firstAppearanceChapter: 2,
  aliases: ['Harkonnen heir'],
  factions: ['harkonnen'],
  attributes: ['Nephew of Baron', 'Potential heir', 'Gladiator'],
};

const piterDeVries: Character = {
  id: 'piter-de-vries',
  name: 'Piter De Vries',
  description: 'Mentat and twisted advisor to Baron Harkonnen',
  firstAppearanceChapter: 2,
  aliases: ['Twisted Mentat'],
  factions: ['harkonnen'],
  attributes: ['Mentat', 'Twisted', 'Harkonnen advisor'],
};

const emperorShaddam: Character = {
  id: 'emperor-shaddam',
  name: 'Emperor Shaddam IV',
  description: 'Padishah Emperor of the Known Universe',
  firstAppearanceChapter: 4,
  aliases: ['Padishah Emperor'],
  factions: ['corrino'],
  attributes: ['Emperor', 'Ruler of Known Universe', 'Corrino'],
};

const princessIrulan: Character = {
  id: 'princess-irulan',
  name: 'Princess Irulan',
  description: 'Daughter of Emperor Shaddam IV, historian',
  firstAppearanceChapter: 4,
  aliases: ['Princess'],
  factions: ['corrino'],
  attributes: ['Princess', 'Daughter of Emperor', 'Historian'],
};

const hasimirFenring: Character = {
  id: 'hasimir-fenring',
  name: 'Count Hasimir Fenring',
  description: 'Imperial Spice Minister and close advisor to Emperor',
  firstAppearanceChapter: 4,
  aliases: ['Count'],
  factions: ['corrino'],
  attributes: ['Spice Minister', 'Imperial advisor', 'Eunuch'],
};

const margotFenring: Character = {
  id: 'margot-fenring',
  name: 'Lady Margot Fenring',
  description: 'Bene Gesserit acolyte and wife of Count Fenring',
  firstAppearanceChapter: 4,
  aliases: ['Lady'],
  factions: ['bene-gesserit', 'corrino'],
  attributes: ['Bene Gesserit', 'Wife of Count', 'Imperial agent'],
};

const gaiusHelenMohiam: Character = {
  id: 'gaius-helen-mohiam',
  name: 'Reverend Mother Gaius Helen Mohiam',
  description: 'Bene Gesserit Truthsayer and advisor to Emperor',
  firstAppearanceChapter: 1,
  aliases: ['Truthsayer'],
  factions: ['bene-gesserit'],
  attributes: ['Truthsayer', 'Bene Gesserit', 'Imperial advisor'],
};

const yueh: Character = {
  id: 'yueh',
  name: 'Dr. Wellington Yueh',
  description: 'Suk doctor and traitor to House Atreides',
  firstAppearanceChapter: 1,
  aliases: ['Suk Doctor'],
  factions: ['atreides'],
  attributes: ['Suk doctor', 'Traitor', 'Conditioned'],
};

// Factions
const atreidesFaction: Faction = {
  id: 'atreides',
  title: 'House Atreides',
  color: '#4A90E2',
  description: 'Noble house from Caladan, rulers of Arrakis',
};

const harkonnenFaction: Faction = {
  id: 'harkonnen',
  title: 'House Harkonnen',
  color: '#D0021B',
  description: 'Noble house from Giedi Prime, former rulers of Arrakis',
};

const fremenFaction: Faction = {
  id: 'fremen',
  title: 'Fremen',
  color: '#7ED321',
  description: 'Desert people of Arrakis, native inhabitants',
};

const corrinoFaction: Faction = {
  id: 'corrino',
  title: 'House Corrino',
  color: '#F5A623',
  description: 'Imperial house, rulers of the Known Universe',
};

const beneGesseritFaction: Faction = {
  id: 'bene-gesserit',
  title: 'Bene Gesserit',
  color: '#9013FE',
  description: 'Ancient sisterhood with mental and physical powers',
};

// Chapters
const chapters: Chapter[] = [
  { book: duneBook, title: 'The Duke and the Lady', index: 1, globalIndex: 1, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Missionaria Protectiva', index: 2, globalIndex: 2, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Reverend Mother', index: 3, globalIndex: 3, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Spice', index: 4, globalIndex: 4, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Harkonnens', index: 5, globalIndex: 5, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Atreides Arrive', index: 6, globalIndex: 6, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Betrayal', index: 7, globalIndex: 7, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Desert', index: 8, globalIndex: 8, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Fremen', index: 9, globalIndex: 9, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Spice Melange', index: 10, globalIndex: 10, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Water of Life', index: 11, globalIndex: 11, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Prophet', index: 12, globalIndex: 12, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Jihad', index: 13, globalIndex: 13, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Emperor', index: 14, globalIndex: 14, level: 0, type: 'chapter' },
  { book: duneBook, title: 'The Final Battle', index: 15, globalIndex: 15, level: 0, type: 'chapter' },
];

// Relationships
const duneRelationships: RelationshipWithChapters[] = [
  // Paul and Jessica (Mother-Son)
  {
    character1: paulAtreides,
    character2: jessica,
    descriptions: [
      { chapter: 1, description: 'Jessica trains Paul in Bene Gesserit ways' },
      { chapter: 3, description: 'Jessica reveals her Bene Gesserit training to Paul' },
      { chapter: 11, description: 'Jessica becomes a Reverend Mother' },
    ],
  },
  // Paul and Leto (Father-Son)
  {
    character1: paulAtreides,
    character2: letoAtreides,
    descriptions: [
      { chapter: 1, description: 'Leto prepares Paul for leadership' },
      { chapter: 6, description: 'Leto gives Paul the Atreides signet ring' },
      { chapter: 7, description: 'Leto dies in the Harkonnen attack' },
    ],
  },
  // Paul and Chani (Love)
  {
    character1: paulAtreides,
    character2: chani,
    descriptions: [
      { chapter: 8, description: 'Paul meets Chani in the desert' },
      { chapter: 9, description: 'Paul and Chani fall in love' },
      { chapter: 12, description: 'Paul and Chani become partners' },
    ],
  },
  // Paul and Stilgar (Mentor)
  {
    character1: paulAtreides,
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
    character2: letoAtreides,
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
    character1: gurneyHalleck,
    character2: paulAtreides,
    descriptions: [
      { chapter: 1, description: 'Gurney trains Paul in weapons and strategy' },
      { chapter: 6, description: 'Gurney protects Paul during Atreides arrival' },
      { chapter: 9, description: 'Gurney reunites with Paul among Fremen' },
    ],
  },
  // Duncan and Paul (Protector)
  {
    character1: duncanIdaho,
    character2: paulAtreides,
    descriptions: [
      { chapter: 1, description: 'Duncan serves as Paul\'s swordmaster' },
      { chapter: 6, description: 'Duncan protects Paul during Atreides arrival' },
      { chapter: 7, description: 'Duncan dies defending Paul in the attack' },
    ],
  },
  // Thufir and Leto (Advisor)
  {
    character1: thufirHawat,
    character2: letoAtreides,
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
    character2: letoAtreides,
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
    paulAtreides,
    jessica,
    letoAtreides,
    gurneyHalleck,
    thufirHawat,
    duncanIdaho,
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