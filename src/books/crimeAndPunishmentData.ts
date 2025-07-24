import type { BookData } from '../models/BookData';
import type { Author } from '../models/Author';
import type { Book } from '../models/Book';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { Chapter } from '../models/Chapter';
import type { RelationshipWithChapters } from '../models/BookData';
import type { Location } from '../models/Location';

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

// All locations in 19th century St. Petersburg
const crimeAndPunishmentLocations: Location[] = [
  { id: 'st-petersburg', name: 'St. Petersburg', description: 'The imperial capital of Russia, setting for the entire novel.' },
  { id: 'rasskolnikov-room', name: 'Raskolnikov\'s Room', description: 'Raskolnikov\'s tiny, cramped room in a poor boarding house.' },
  { id: 'boarding-house', name: 'Boarding House', description: 'The poor boarding house where Raskolnikov lives.' },
  { id: 'landlady-apartment', name: 'Landlady\'s Apartment', description: 'The apartment of Raskolnikov\'s landlady, Praskovya Pavlovna.' },
  { id: 'pawnbroker-apartment', name: 'Pawnbroker\'s Apartment', description: 'The apartment of the old pawnbroker Alyona Ivanovna.' },
  { id: 'pawnbroker-room', name: 'Pawnbroker\'s Room', description: 'The room where the murder takes place.' },
  { id: 'lizaveta-room', name: 'Lizaveta\'s Room', description: 'The room of Lizaveta, the pawnbroker\'s sister.' },
  { id: 'sonya-room', name: 'Sonya\'s Room', description: 'Sonya\'s small room in a tenement building.' },
  { id: 'marmeladov-apartment', name: 'Marmeladov\'s Apartment', description: 'The apartment where the Marmeladov family lives.' },
  { id: 'katerina-room', name: 'Katerina\'s Room', description: 'The room where Katerina Marmeladov lives with her children.' },
  { id: 'razumikhin-room', name: 'Razumikhin\'s Room', description: 'Razumikhin\'s student room.' },
  { id: 'dunya-room', name: 'Dunya\'s Room', description: 'The room where Dunya stays during her visit.' },
  { id: 'luzhin-apartment', name: 'Luzhin\'s Apartment', description: 'Luzhin\'s luxurious apartment in a wealthy district.' },
  { id: 'svidrigailov-hotel', name: 'Svidrigailov\'s Hotel', description: 'The hotel where Svidrigailov stays during his visit.' },
  { id: 'police-station', name: 'Police Station', description: 'The police station where Porfiry Petrovich works.' },
  { id: 'porfiry-office', name: 'Porfiry\'s Office', description: 'Porfiry\'s office at the police station.' },
  { id: 'investigation-room', name: 'Investigation Room', description: 'The room where police investigations are conducted.' },
  { id: 'courtyard', name: 'Courtyard', description: 'The courtyard behind the pawnbroker\'s building.' },
  { id: 'staircase', name: 'Staircase', description: 'The staircase in the pawnbroker\'s building.' },
  { id: 'entrance-hall', name: 'Entrance Hall', description: 'The entrance hall of various buildings.' },
  { id: 'corridor', name: 'Corridor', description: 'The corridors in apartment buildings.' },
  { id: 'kitchen', name: 'Kitchen', description: 'Kitchens in various apartments.' },
  { id: 'dining-room', name: 'Dining Room', description: 'Dining rooms in wealthier apartments.' },
  { id: 'bedroom', name: 'Bedroom', description: 'Bedrooms in various apartments.' },
  { id: 'living-room', name: 'Living Room', description: 'Living rooms in apartments.' },
  { id: 'study', name: 'Study', description: 'Private studies and work rooms.' },
  { id: 'balcony', name: 'Balcony', description: 'Balconies overlooking the street.' },
  { id: 'street', name: 'Street', description: 'The streets of St. Petersburg.' },
  { id: 'main-street', name: 'Main Street', description: 'The main thoroughfares of the city.' },
  { id: 'side-street', name: 'Side Street', description: 'Narrow side streets and alleys.' },
  { id: 'bridge', name: 'Bridge', description: 'Bridges over the Neva River and canals.' },
  { id: 'neva-river', name: 'Neva River', description: 'The main river flowing through St. Petersburg.' },
  { id: 'canal', name: 'Canal', description: 'The canals that crisscross the city.' },
  { id: 'embankment', name: 'Embankment', description: 'The embankments along the river and canals.' },
  { id: 'square', name: 'Square', description: 'Public squares and plazas.' },
  { id: 'market', name: 'Market', description: 'Street markets and bazaars.' },
  { id: 'shop', name: 'Shop', description: 'Various shops and stores.' },
  { id: 'tavern', name: 'Tavern', description: 'Taverns and drinking establishments.' },
  { id: 'restaurant', name: 'Restaurant', description: 'Restaurants and dining establishments.' },
  { id: 'coffee-house', name: 'Coffee House', description: 'Coffee houses and cafes.' },
  { id: 'church', name: 'Church', description: 'Orthodox churches and cathedrals.' },
  { id: 'cathedral', name: 'Cathedral', description: 'Major cathedrals in the city.' },
  { id: 'cemetery', name: 'Cemetery', description: 'Cemeteries and burial grounds.' },
  { id: 'hospital', name: 'Hospital', description: 'Hospitals and medical facilities.' },
  { id: 'prison', name: 'Prison', description: 'Prisons and detention facilities.' },
  { id: 'court', name: 'Court', description: 'Courthouses and legal buildings.' },
  { id: 'government-building', name: 'Government Building', description: 'Government offices and administrative buildings.' },
  { id: 'university', name: 'University', description: 'University buildings and lecture halls.' },
  { id: 'library', name: 'Library', description: 'Libraries and reading rooms.' },
  { id: 'theater', name: 'Theater', description: 'Theaters and performance venues.' },
  { id: 'park', name: 'Park', description: 'Public parks and gardens.' },
  { id: 'garden', name: 'Garden', description: 'Private and public gardens.' },
  { id: 'fountain', name: 'Fountain', description: 'Fountains and water features.' },
  { id: 'monument', name: 'Monument', description: 'Statues and monuments.' },
  { id: 'palace', name: 'Palace', description: 'Imperial palaces and grand buildings.' },
  { id: 'mansion', name: 'Mansion', description: 'Wealthy mansions and townhouses.' },
  { id: 'tenement', name: 'Tenement', description: 'Poor tenement buildings.' },
  { id: 'warehouse', name: 'Warehouse', description: 'Warehouses and storage buildings.' },
  { id: 'factory', name: 'Factory', description: 'Industrial factories and workshops.' },
  { id: 'dock', name: 'Dock', description: 'Docks and port facilities.' },
  { id: 'railway-station', name: 'Railway Station', description: 'Train stations and terminals.' },
  { id: 'post-office', name: 'Post Office', description: 'Post offices and mail facilities.' },
  { id: 'bank', name: 'Bank', description: 'Banks and financial institutions.' },
  { id: 'pawn-shop', name: 'Pawn Shop', description: 'Pawn shops and money-lending establishments.' },
  { id: 'apothecary', name: 'Apothecary', description: 'Pharmacies and drug stores.' },
  { id: 'bakery', name: 'Bakery', description: 'Bakeries and bread shops.' },
  { id: 'butcher-shop', name: 'Butcher Shop', description: 'Butcher shops and meat markets.' },
  { id: 'fish-market', name: 'Fish Market', description: 'Fish markets and seafood vendors.' },
  { id: 'vegetable-market', name: 'Vegetable Market', description: 'Vegetable markets and produce vendors.' },
  { id: 'clothing-shop', name: 'Clothing Shop', description: 'Clothing stores and tailors.' },
  { id: 'shoe-shop', name: 'Shoe Shop', description: 'Shoe shops and cobblers.' },
  { id: 'bookshop', name: 'Bookshop', description: 'Bookstores and book vendors.' },
  { id: 'newspaper-office', name: 'Newspaper Office', description: 'Newspaper offices and printing houses.' },
  { id: 'telegraph-office', name: 'Telegraph Office', description: 'Telegraph offices and communication centers.' },
  { id: 'fire-station', name: 'Fire Station', description: 'Fire stations and emergency services.' },
  { id: 'barracks', name: 'Barracks', description: 'Military barracks and guard posts.' },
  { id: 'guard-house', name: 'Guard House', description: 'Guard houses and security posts.' },
  { id: 'stable', name: 'Stable', description: 'Stables and horse facilities.' },
  { id: 'carriage-house', name: 'Carriage House', description: 'Carriage houses and transportation facilities.' },
  { id: 'bath-house', name: 'Bath House', description: 'Public bath houses and saunas.' },
  { id: 'barber-shop', name: 'Barber Shop', description: 'Barber shops and hair salons.' },
  { id: 'watchmaker', name: 'Watchmaker', description: 'Watchmakers and clock repair shops.' },
  { id: 'jeweler', name: 'Jeweler', description: 'Jewelry shops and goldsmiths.' },
  { id: 'optician', name: 'Optician', description: 'Opticians and eyeglass shops.' },
  { id: 'photographer', name: 'Photographer', description: 'Photography studios and portrait shops.' },
  { id: 'music-shop', name: 'Music Shop', description: 'Music shops and instrument vendors.' },
  { id: 'art-gallery', name: 'Art Gallery', description: 'Art galleries and exhibition spaces.' },
  { id: 'museum', name: 'Museum', description: 'Museums and cultural institutions.' },
  { id: 'archive', name: 'Archive', description: 'Archives and record-keeping facilities.' },
  { id: 'school', name: 'School', description: 'Schools and educational institutions.' },
  { id: 'orphanage', name: 'Orphanage', description: 'Orphanages and children\'s homes.' },
  { id: 'workhouse', name: 'Workhouse', description: 'Workhouses and poor relief institutions.' },
  { id: 'asylum', name: 'Asylum', description: 'Mental asylums and sanatoriums.' },
  { id: 'convent', name: 'Convent', description: 'Convents and religious communities.' },
  { id: 'monastery', name: 'Monastery', description: 'Monasteries and religious retreats.' },
  { id: 'synagogue', name: 'Synagogue', description: 'Synagogues and Jewish religious buildings.' },
  { id: 'mosque', name: 'Mosque', description: 'Mosques and Islamic religious buildings.' },
  { id: 'chapel', name: 'Chapel', description: 'Small chapels and prayer rooms.' },
  { id: 'bell-tower', name: 'Bell Tower', description: 'Bell towers and clock towers.' },
  { id: 'gate', name: 'Gate', description: 'City gates and entrance portals.' },
  { id: 'wall', name: 'Wall', description: 'City walls and fortifications.' },
  { id: 'tower', name: 'Tower', description: 'Towers and observation points.' },
  { id: 'dungeon', name: 'Dungeon', description: 'Dungeons and underground cells.' },
  { id: 'secret-passage', name: 'Secret Passage', description: 'Secret passages and hidden routes.' },
  { id: 'underground', name: 'Underground', description: 'Underground tunnels and passages.' },
  { id: 'rooftop', name: 'Rooftop', description: 'Rooftops and elevated areas.' },
  { id: 'basement', name: 'Basement', description: 'Basements and cellar spaces.' },
  { id: 'attic', name: 'Attic', description: 'Attics and upper storage areas.' },
  { id: 'siberia', name: 'Siberia', description: 'Siberia, where Raskolnikov is sent for his crime.' },
  { id: 'prison-camp', name: 'Prison Camp', description: 'The prison camp in Siberia where Raskolnikov serves his sentence.' },
  { id: 'prison-yard', name: 'Prison Yard', description: 'The yard where prisoners exercise and work.' },
  { id: 'prison-cell', name: 'Prison Cell', description: 'The cell where Raskolnikov is confined.' },
  { id: 'prison-hospital', name: 'Prison Hospital', description: 'The hospital within the prison complex.' },
  { id: 'prison-chapel', name: 'Prison Chapel', description: 'The chapel where religious services are held.' },
  { id: 'prison-workshop', name: 'Prison Workshop', description: 'The workshop where prisoners work.' },
  { id: 'prison-kitchen', name: 'Prison Kitchen', description: 'The kitchen where prison meals are prepared.' },
  { id: 'prison-office', name: 'Prison Office', description: 'The administrative offices of the prison.' },
  { id: 'prison-gate', name: 'Prison Gate', description: 'The main gate of the prison complex.' },
  { id: 'prison-wall', name: 'Prison Wall', description: 'The high walls surrounding the prison.' },
  { id: 'prison-tower', name: 'Prison Tower', description: 'Watchtowers around the prison perimeter.' },
  { id: 'prison-courtyard', name: 'Prison Courtyard', description: 'The central courtyard of the prison.' },
  { id: 'prison-library', name: 'Prison Library', description: 'The library where prisoners can read.' },
  { id: 'prison-school', name: 'Prison School', description: 'The school where prisoners receive education.' },
  { id: 'prison-church', name: 'Prison Church', description: 'The church within the prison complex.' },
  { id: 'prison-cemetery', name: 'Prison Cemetery', description: 'The cemetery where deceased prisoners are buried.' },
];

// Chapter and part definitions with location IDs
const crimeAndPunishmentChapterData = {
  // Parts
  'part-1': { id: 'part-1', title: 'Part I', locationIds: [] },
  'part-2': { id: 'part-2', title: 'Part II', locationIds: [] },
  'part-3': { id: 'part-3', title: 'Part III', locationIds: [] },
  'part-4': { id: 'part-4', title: 'Part IV', locationIds: [] },
  'part-5': { id: 'part-5', title: 'Part V', locationIds: [] },
  'part-6': { id: 'part-6', title: 'Part VI', locationIds: [] },
  'epilogue': { id: 'epilogue', title: 'Epilogue', locationIds: [] },
  // Chapters
  'chapter-1': { id: 'chapter-1', title: 'Chapter 1', locationIds: ['rasskolnikov-room', 'pawnbroker-apartment', 'pawnbroker-room', 'lizaveta-room', 'courtyard', 'staircase'] },
  'chapter-2': { id: 'chapter-2', title: 'Chapter 2', locationIds: ['street', 'main-street', 'tavern', 'razumikhin-room'] },
  'chapter-3': { id: 'chapter-3', title: 'Chapter 3', locationIds: ['police-station', 'porfiry-office', 'investigation-room'] },
  'chapter-4': { id: 'chapter-4', title: 'Chapter 4', locationIds: ['marmeladov-apartment', 'katerina-room', 'sonya-room', 'dunya-room'] },
  'chapter-5': { id: 'chapter-5', title: 'Chapter 5', locationIds: ['church', 'cemetery', 'hospital'] },
  'chapter-6': { id: 'chapter-6', title: 'Chapter 6', locationIds: ['rasskolnikov-room', 'boarding-house', 'landlady-apartment'] },
  'chapter-7': { id: 'chapter-7', title: 'Chapter 7', locationIds: ['street', 'bridge', 'neva-river', 'embankment'] },
  'chapter-8': { id: 'chapter-8', title: 'Chapter 8', locationIds: ['razumikhin-room', 'university', 'library'] },
  'chapter-9': { id: 'chapter-9', title: 'Chapter 9', locationIds: ['luzhin-apartment', 'restaurant', 'coffee-house'] },
  'chapter-10': { id: 'chapter-10', title: 'Chapter 10', locationIds: ['police-station', 'porfiry-office', 'investigation-room'] },
  'chapter-11': { id: 'chapter-11', title: 'Chapter 11', locationIds: ['street', 'market', 'shop'] },
  'chapter-12': { id: 'chapter-12', title: 'Chapter 12', locationIds: ['rasskolnikov-room', 'corridor', 'entrance-hall'] },
  'chapter-13': { id: 'chapter-13', title: 'Chapter 13', locationIds: ['sonya-room', 'marmeladov-apartment', 'katerina-room'] },
  'chapter-14': { id: 'chapter-14', title: 'Chapter 14', locationIds: ['church', 'cathedral', 'square'] },
  'chapter-15': { id: 'chapter-15', title: 'Chapter 15', locationIds: ['sonya-room', 'church', 'cemetery'] },
  'chapter-16': { id: 'chapter-16', title: 'Chapter 16', locationIds: ['porfiry-office', 'police-station', 'investigation-room'] },
  'chapter-17': { id: 'chapter-17', title: 'Chapter 17', locationIds: ['razumikhin-room', 'university', 'library'] },
  'chapter-18': { id: 'chapter-18', title: 'Chapter 18', locationIds: ['dunya-room', 'luzhin-apartment', 'restaurant'] },
  'chapter-19': { id: 'chapter-19', title: 'Chapter 19', locationIds: ['dunya-room', 'luzhin-apartment', 'coffee-house'] },
  'chapter-20': { id: 'chapter-20', title: 'Chapter 20', locationIds: ['svidrigailov-hotel', 'restaurant', 'tavern'] },
  'chapter-21': { id: 'chapter-21', title: 'Chapter 21', locationIds: ['sonya-room', 'marmeladov-apartment', 'katerina-room'] },
  'chapter-22': { id: 'chapter-22', title: 'Chapter 22', locationIds: ['church', 'cemetery', 'hospital'] },
  'chapter-23': { id: 'chapter-23', title: 'Chapter 23', locationIds: ['street', 'market', 'shop'] },
  'chapter-24': { id: 'chapter-24', title: 'Chapter 24', locationIds: ['rasskolnikov-room', 'corridor', 'entrance-hall'] },
  'chapter-25': { id: 'chapter-25', title: 'Chapter 25', locationIds: ['marmeladov-apartment', 'katerina-room', 'hospital'] },
  'chapter-26': { id: 'chapter-26', title: 'Chapter 26', locationIds: ['katerina-room', 'cemetery', 'church'] },
  'chapter-27': { id: 'chapter-27', title: 'Chapter 27', locationIds: ['sonya-room', 'street', 'bridge'] },
  'chapter-28': { id: 'chapter-28', title: 'Chapter 28', locationIds: ['porfiry-office', 'police-station', 'investigation-room'] },
  'chapter-29': { id: 'chapter-29', title: 'Chapter 29', locationIds: ['street', 'market', 'shop'] },
  'chapter-30': { id: 'chapter-30', title: 'Chapter 30', locationIds: ['rasskolnikov-room', 'corridor', 'entrance-hall'] },
  'chapter-31': { id: 'chapter-31', title: 'Chapter 31', locationIds: ['sonya-room', 'church', 'cemetery'] },
  'chapter-32': { id: 'chapter-32', title: 'Chapter 32', locationIds: ['porfiry-office', 'police-station', 'investigation-room'] },
  'chapter-33': { id: 'chapter-33', title: 'Chapter 33', locationIds: ['porfiry-office', 'police-station', 'investigation-room'] },
  'chapter-34': { id: 'chapter-34', title: 'Chapter 34', locationIds: ['street', 'bridge', 'neva-river'] },
  'chapter-35': { id: 'chapter-35', title: 'Chapter 35', locationIds: ['svidrigailov-hotel', 'street', 'bridge'] },
  'chapter-36': { id: 'chapter-36', title: 'Chapter 36', locationIds: ['sonya-room', 'church', 'cemetery'] },
  'chapter-37': { id: 'chapter-37', title: 'Chapter 37', locationIds: ['porfiry-office', 'police-station', 'investigation-room'] },
  'chapter-38': { id: 'chapter-38', title: 'Chapter 38', locationIds: ['street', 'market', 'shop'] },
  'chapter-39': { id: 'chapter-39', title: 'Chapter 39', locationIds: ['rasskolnikov-room', 'corridor', 'entrance-hall'] },
  'chapter-40': { id: 'chapter-40', title: 'Chapter 40', locationIds: ['siberia', 'prison-camp', 'prison-cell'] },
  'chapter-41': { id: 'chapter-41', title: 'Chapter 41', locationIds: ['prison-camp', 'prison-yard', 'prison-chapel'] },
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
function buildChapters(chapterData: Record<string, { id: string; title: string; locationIds: string[] }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => {
    const chapterDataItem = chapterData[item.chapterId];
    return {
      book: crimeAndPunishmentBook,
      id: chapterDataItem.id,
      title: chapterDataItem.title,
      
      level: item.level,
      type: item.type,
      index: index + 1, // For backward compatibility
      
      // Resolve location IDs to actual location objects
      locations: chapterDataItem.locationIds.map(locationId =>
        crimeAndPunishmentLocations.find(loc => loc.id === locationId)
      ).filter(Boolean) as Location[],
    };
  });
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
  locations: crimeAndPunishmentLocations,
  mapUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/St_Petersburg_Map_1900.jpg/1200px-St_Petersburg_Map_1900.jpg',
}; 