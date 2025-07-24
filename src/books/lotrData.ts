import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import type { Author } from '../models/Author';
import type { Chapter } from '../models/Chapter';
import type { Faction } from '../models/Faction';
import type { RelationshipWithChapters } from '../models/BookData';
import type { Location } from '../models/Location';

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

// All locations in Middle-earth
const lotrLocations: Location[] = [
  { id: 'middle-earth', name: 'Middle-earth', description: 'The main continent where the story takes place.' },
  { id: 'shire', name: 'The Shire', description: 'The homeland of the hobbits, a peaceful region of rolling hills.' },
  { id: 'bag-end', name: 'Bag End', description: 'Frodo\'s home in Hobbiton, a comfortable hobbit-hole.' },
  { id: 'hobbiton', name: 'Hobbiton', description: 'A village in the Shire where Bag End is located.' },
  { id: 'green-dragon-inn', name: 'The Green Dragon Inn', description: 'A popular tavern in Bywater, frequented by hobbits.' },
  { id: 'bywater', name: 'Bywater', description: 'A village in the Shire near Hobbiton.' },
  { id: 'buckland', name: 'Buckland', description: 'A region of the Shire east of the Brandywine River.' },
  { id: 'brandy-hall', name: 'Brandy Hall', description: 'The ancestral home of the Brandybuck family in Buckland.' },
  { id: 'crickhollow', name: 'Crickhollow', description: 'A house in Buckland where Frodo pretends to live.' },
  { id: 'brandywine-river', name: 'Brandywine River', description: 'A major river that forms the eastern border of the Shire.' },
  { id: 'old-forest', name: 'The Old Forest', description: 'A mysterious and dangerous forest east of the Shire.' },
  { id: 'withywindle', name: 'Withywindle', description: 'A river that flows through the Old Forest.' },
  { id: 'tom-bombadil-house', name: 'Tom Bombadil\'s House', description: 'The home of Tom Bombadil and Goldberry in the Old Forest.' },
  { id: 'barrow-downs', name: 'Barrow-downs', description: 'Ancient burial mounds haunted by barrow-wights.' },
  { id: 'bree', name: 'Bree', description: 'A town at the crossroads of major roads, home to both men and hobbits.' },
  { id: 'prancing-pony', name: 'The Prancing Pony', description: 'An inn in Bree where travelers gather.' },
  { id: 'weathertop', name: 'Weathertop', description: 'A hill with ancient ruins, site of a battle with the Nazgûl.' },
  { id: 'ford-of-bruinen', name: 'Ford of Bruinen', description: 'A river crossing where the Nazgûl are swept away.' },
  { id: 'rivendell', name: 'Rivendell', description: 'The hidden refuge of Elrond, a valley of the elves.' },
  { id: 'last-homely-house', name: 'The Last Homely House', description: 'Elrond\'s house in Rivendell.' },
  { id: 'misty-mountains', name: 'Misty Mountains', description: 'A great mountain range that must be crossed.' },
  { id: 'moria', name: 'Moria', description: 'The ancient dwarf kingdom, now a dark and dangerous place.' },
  { id: 'west-gate', name: 'West Gate of Moria', description: 'The entrance to Moria, sealed by magic.' },
  { id: 'chamber-of-mazarbul', name: 'Chamber of Mazarbul', description: 'A chamber in Moria where Balin\'s tomb is found.' },
  { id: 'bridge-of-khazad-dum', name: 'Bridge of Khazad-dûm', description: 'A narrow bridge over a chasm in Moria.' },
  { id: 'lothlorien', name: 'Lothlórien', description: 'The realm of the Galadhrim elves, protected by Galadriel.' },
  { id: 'caras-galadhon', name: 'Caras Galadhon', description: 'The capital city of Lothlórien, built in the trees.' },
  { id: 'mirror-of-galadriel', name: 'Mirror of Galadriel', description: 'A magical basin that shows visions of the past and future.' },
  { id: 'anduin-river', name: 'Anduin River', description: 'The Great River that flows through Middle-earth.' },
  { id: 'amon-hen', name: 'Amon Hen', description: 'The Hill of Sight, where the Fellowship breaks up.' },
  { id: 'rohan', name: 'Rohan', description: 'The kingdom of the horse-lords, allies of Gondor.' },
  { id: 'edoras', name: 'Edoras', description: 'The capital city of Rohan, built on a hill.' },
  { id: 'golden-hall', name: 'The Golden Hall', description: 'Meduseld, the great hall of the kings of Rohan.' },
  { id: 'helms-deep', name: 'Helm\'s Deep', description: 'A fortress in a valley, site of a great battle.' },
  { id: 'hornburg', name: 'The Hornburg', description: 'The fortress at Helm\'s Deep.' },
  { id: 'isengard', name: 'Isengard', description: 'The fortress of Saruman, surrounded by a ring of stone.' },
  { id: 'orthanc', name: 'Orthanc', description: 'The black tower at the center of Isengard.' },
  { id: 'fangorn-forest', name: 'Fangorn Forest', description: 'An ancient forest inhabited by the Ents.' },
  { id: 'entmoot', name: 'Entmoot', description: 'A gathering place of the Ents in Fangorn.' },
  { id: 'dead-marshes', name: 'Dead Marshes', description: 'A treacherous wetland filled with the bodies of ancient battles.' },
  { id: 'emyn-muil', name: 'Emyn Muil', description: 'Rocky hills on the border of Gondor.' },
  { id: 'black-gate', name: 'The Black Gate', description: 'The main entrance to Mordor, heavily guarded.' },
  { id: 'mordor', name: 'Mordor', description: 'The dark land ruled by Sauron.' },
  { id: 'mount-doom', name: 'Mount Doom', description: 'The volcano where the One Ring was forged and must be destroyed.' },
  { id: 'barad-dur', name: 'Barad-dûr', description: 'Sauron\'s dark tower in Mordor.' },
  { id: 'eye-of-sauron', name: 'The Eye of Sauron', description: 'Sauron\'s all-seeing eye atop Barad-dûr.' },
  { id: 'minas-tirith', name: 'Minas Tirith', description: 'The capital city of Gondor, the White City.' },
  { id: 'white-tower', name: 'The White Tower', description: 'The great tower in Minas Tirith.' },
  { id: 'pelennor-fields', name: 'Pelennor Fields', description: 'The plains outside Minas Tirith, site of a great battle.' },
  { id: 'osgiliath', name: 'Osgiliath', description: 'The ruined former capital of Gondor.' },
  { id: 'minas-morgul', name: 'Minas Morgul', description: 'The city of the Nazgûl, once Minas Ithil.' },
  { id: 'cirith-ungol', name: 'Cirith Ungol', description: 'A pass and tower on the border of Mordor.' },
  { id: 'shelob-lair', name: 'Shelob\'s Lair', description: 'The cave of the giant spider Shelob.' },
  { id: 'ithilien', name: 'Ithilien', description: 'A region of Gondor, once fair but now under threat.' },
  { id: 'henneth-annun', name: 'Henneth Annûn', description: 'A hidden refuge in Ithilien.' },
  { id: 'cross-roads', name: 'The Cross-roads', description: 'A junction of roads near Minas Morgul.' },
  { id: 'stairs-of-cirith-ungol', name: 'Stairs of Cirith Ungol', description: 'A steep stairway leading to the tower.' },
  { id: 'tower-of-cirith-ungol', name: 'Tower of Cirith Ungol', description: 'A tower guarding the pass into Mordor.' },
  { id: 'sammath-naur', name: 'Sammath Naur', description: 'The Cracks of Doom, the chamber inside Mount Doom.' },
  { id: 'field-of-cormallen', name: 'Field of Cormallen', description: 'A field where the heroes are honored after victory.' },
  { id: 'houses-of-healing', name: 'Houses of Healing', description: 'The hospital in Minas Tirith.' },
  { id: 'grey-havens', name: 'The Grey Havens', description: 'The port where elves depart for the Undying Lands.' },
  { id: 'mirkwood', name: 'Mirkwood', description: 'A dark forest, home to the Wood-elves.' },
  { id: 'lonely-mountain', name: 'The Lonely Mountain', description: 'The home of the dwarves, Erebor.' },
  { id: 'dol-guldur', name: 'Dol Guldur', description: 'A fortress in Mirkwood, once occupied by Sauron.' },
  { id: 'dol-amroth', name: 'Dol Amroth', description: 'A coastal city of Gondor.' },
  { id: 'lossarnach', name: 'Lossarnach', description: 'A region of Gondor.' },
  { id: 'pinnath-gelin', name: 'Pinnath Gelin', description: 'A region of Gondor.' },
  { id: 'anfalas', name: 'Anfalas', description: 'A coastal region of Gondor.' },
  { id: 'lamedon', name: 'Lamedon', description: 'A region of Gondor.' },
  { id: 'ringlo-vale', name: 'Ringló Vale', description: 'A valley in Gondor.' },
  { id: 'morthond-vale', name: 'Morthond Vale', description: 'A valley in Gondor.' },
  { id: 'calenardhon', name: 'Calenardhon', description: 'The old name for Rohan.' },
  { id: 'westfold', name: 'Westfold', description: 'A region of Rohan.' },
  { id: 'eastfold', name: 'Eastfold', description: 'A region of Rohan.' },
  { id: 'westemnet', name: 'Westemnet', description: 'A region of Rohan.' },
  { id: 'eastemnet', name: 'Eastemnet', description: 'A region of Rohan.' },
  { id: 'folde', name: 'Folde', description: 'A region of Rohan.' },
  { id: 'wold', name: 'Wold', description: 'A region of Rohan.' },
  { id: 'entwash', name: 'Entwash', description: 'A river in Rohan.' },
  { id: 'snowbourn', name: 'Snowbourn', description: 'A river in Rohan.' },
  { id: 'mearas', name: 'Mearas', description: 'The legendary horses of Rohan.' },
  { id: 'rohirrim', name: 'Rohirrim', description: 'The horse-lords of Rohan.' },
  { id: 'eored', name: 'Éored', description: 'A company of Rohan cavalry.' },
  { id: 'dunharrow', name: 'Dunharrow', description: 'A refuge in the mountains of Rohan.' },
  { id: 'harrowdale', name: 'Harrowdale', description: 'A valley in Rohan.' },
  { id: 'starkhorn', name: 'Starkhorn', description: 'A mountain in Rohan.' },
  { id: 'dwimorberg', name: 'Dwimorberg', description: 'The Haunted Mountain in Rohan.' },
  { id: 'dimholt', name: 'Dimholt', description: 'A dark wood in Rohan.' },
  { id: 'paths-of-dead', name: 'Paths of the Dead', description: 'A haunted passage through the mountains.' },
  { id: 'stone-city', name: 'Stone City', description: 'The city of the Dead in the mountain.' },
  { id: 'pelargir', name: 'Pelargir', description: 'A port city in Gondor.' },
  { id: 'linhir', name: 'Linhir', description: 'A city in Gondor.' },
  { id: 'ethring', name: 'Ethring', description: 'A city in Gondor.' },
  { id: 'calembel', name: 'Calembel', description: 'A city in Gondor.' },
  { id: 'tarnost', name: 'Tarnost', description: 'A city in Gondor.' },
  { id: 'erech', name: 'Erech', description: 'A city in Gondor.' },
  { id: 'stone-of-erech', name: 'Stone of Erech', description: 'A black stone where the Dead gather.' },
  { id: 'black-root-vale', name: 'Black Root Vale', description: 'A valley in Gondor.' },
  { id: 'morthond', name: 'Morthond', description: 'A river in Gondor.' },
  { id: 'ringlo', name: 'Ringló', description: 'A river in Gondor.' },
  { id: 'gilrain', name: 'Gilrain', description: 'A river in Gondor.' },
  { id: 'serni', name: 'Serni', description: 'A river in Gondor.' },
  { id: 'celos', name: 'Celos', description: 'A river in Gondor.' },
  { id: 'erui', name: 'Erui', description: 'A river in Gondor.' },
  { id: 'poros', name: 'Poros', description: 'A river in Gondor.' },
  { id: 'anduin', name: 'Anduin', description: 'The Great River of Middle-earth.' },
  { id: 'entwash', name: 'Entwash', description: 'A river in Rohan.' },
  { id: 'snowbourn', name: 'Snowbourn', description: 'A river in Rohan.' },
  { id: 'limlight', name: 'Limlight', description: 'A river in Rohan.' },
  { id: 'onodlo', name: 'Onodló', description: 'A river in Rohan.' },
  { id: 'adorn', name: 'Adorn', description: 'A river in Rohan.' },
  { id: 'isengard', name: 'Isengard', description: 'The fortress of Saruman.' },
  { id: 'nan-curunir', name: 'Nan Curunír', description: 'The Wizard\'s Vale around Isengard.' },
  { id: 'angrenost', name: 'Angrenost', description: 'The old name for Isengard.' },
  { id: 'isengrim', name: 'Isengrim', description: 'A name for Isengard.' },
];

// Chapter definitions with location IDs
const lotrChapterData = {
  // Fellowship of the Ring
  'book-1': { id: 'book-1', title: 'The Fellowship of the Ring', locationIds: [] },
  
  // Part 1: The Ring Sets Out
  'part-1': { id: 'part-1', title: 'The Ring Sets Out', locationIds: [] },
  'chapter-1': { id: 'chapter-1', title: 'A Long-expected Party', locationIds: ['bag-end', 'hobbiton', 'shire'] },
  'chapter-2': { id: 'chapter-2', title: 'The Shadow of the Past', locationIds: ['bag-end', 'hobbiton', 'shire'] },
  'chapter-3': { id: 'chapter-3', title: 'Three is Company', locationIds: ['shire', 'hobbiton', 'bywater', 'green-dragon-inn'] },
  'chapter-4': { id: 'chapter-4', title: 'A Short Cut to Mushrooms', locationIds: ['shire', 'buckland', 'brandy-hall'] },
  'chapter-5': { id: 'chapter-5', title: 'A Conspiracy Unmasked', locationIds: ['buckland', 'brandy-hall', 'crickhollow'] },
  'chapter-6': { id: 'chapter-6', title: 'The Old Forest', locationIds: ['old-forest', 'withywindle'] },
  'chapter-7': { id: 'chapter-7', title: 'In the House of Tom Bombadil', locationIds: ['tom-bombadil-house', 'old-forest'] },
  'chapter-8': { id: 'chapter-8', title: 'Fog on the Barrow-downs', locationIds: ['barrow-downs'] },
  'chapter-9': { id: 'chapter-9', title: 'At the Sign of the Prancing Pony', locationIds: ['bree', 'prancing-pony'] },
  'chapter-10': { id: 'chapter-10', title: 'Strider', locationIds: ['bree', 'prancing-pony'] },
  'chapter-11': { id: 'chapter-11', title: 'A Knife in the Dark', locationIds: ['weathertop'] },
  'chapter-12': { id: 'chapter-12', title: 'Flight to the Ford', locationIds: ['ford-of-bruinen'] },
  
  // Part 2: The Ring Goes South
  'part-2': { id: 'part-2', title: 'The Ring Goes South', locationIds: [] },
  'chapter-13': { id: 'chapter-13', title: 'Many Meetings', locationIds: ['rivendell', 'last-homely-house'] },
  'chapter-14': { id: 'chapter-14', title: 'The Council of Elrond', locationIds: ['rivendell', 'last-homely-house'] },
  'chapter-15': { id: 'chapter-15', title: 'The Ring Goes South', locationIds: ['misty-mountains'] },
  'chapter-16': { id: 'chapter-16', title: 'A Journey in the Dark', locationIds: ['moria', 'west-gate', 'chamber-of-mazarbul'] },
  'chapter-17': { id: 'chapter-17', title: 'The Bridge of Khazad-dûm', locationIds: ['moria', 'bridge-of-khazad-dum'] },
  'chapter-18': { id: 'chapter-18', title: 'Lothlórien', locationIds: ['lothlorien', 'caras-galadhon'] },
  'chapter-19': { id: 'chapter-19', title: 'The Mirror of Galadriel', locationIds: ['lothlorien', 'mirror-of-galadriel'] },
  'chapter-20': { id: 'chapter-20', title: 'Farewell to Lórien', locationIds: ['lothlorien'] },
  'chapter-21': { id: 'chapter-21', title: 'The Great River', locationIds: ['anduin-river'] },
  'chapter-22': { id: 'chapter-22', title: 'The Breaking of the Fellowship', locationIds: ['amon-hen', 'anduin-river'] },
  
  // The Two Towers
  'book-2': { id: 'book-2', title: 'The Two Towers', locationIds: [] },
  
  // Part 1: The Treason of Isengard
  'part-3': { id: 'part-3', title: 'The Treason of Isengard', locationIds: [] },
  'chapter-23': { id: 'chapter-23', title: 'The Departure of Boromir', locationIds: ['amon-hen'] },
  'chapter-24': { id: 'chapter-24', title: 'The Riders of Rohan', locationIds: ['rohan', 'edoras'] },
  'chapter-25': { id: 'chapter-25', title: 'The Uruk-hai', locationIds: ['rohan'] },
  'chapter-26': { id: 'chapter-26', title: 'Treebeard', locationIds: ['fangorn-forest', 'entmoot'] },
  'chapter-27': { id: 'chapter-27', title: 'The White Rider', locationIds: ['fangorn-forest'] },
  'chapter-28': { id: 'chapter-28', title: 'The King of the Golden Hall', locationIds: ['edoras', 'golden-hall'] },
  'chapter-29': { id: 'chapter-29', title: 'Helm\'s Deep', locationIds: ['helms-deep', 'hornburg'] },
  'chapter-30': { id: 'chapter-30', title: 'The Road to Isengard', locationIds: ['isengard', 'orthanc'] },
  'chapter-31': { id: 'chapter-31', title: 'Flotsam and Jetsam', locationIds: ['isengard', 'orthanc'] },
  'chapter-32': { id: 'chapter-32', title: 'The Voice of Saruman', locationIds: ['isengard', 'orthanc'] },
  'chapter-33': { id: 'chapter-33', title: 'The Palantír', locationIds: ['isengard', 'orthanc'] },
  
  // Part 2: The Ring Goes East
  'part-4': { id: 'part-4', title: 'The Ring Goes East', locationIds: [] },
  'chapter-34': { id: 'chapter-34', title: 'The Taming of Sméagol', locationIds: ['emyn-muil'] },
  'chapter-35': { id: 'chapter-35', title: 'The Passage of the Marshes', locationIds: ['dead-marshes'] },
  'chapter-36': { id: 'chapter-36', title: 'The Black Gate is Closed', locationIds: ['black-gate', 'mordor'] },
  'chapter-37': { id: 'chapter-37', title: 'Of Herbs and Stewed Rabbit', locationIds: ['ithilien'] },
  'chapter-38': { id: 'chapter-38', title: 'The Window on the West', locationIds: ['henneth-annun', 'ithilien'] },
  'chapter-39': { id: 'chapter-39', title: 'The Forbidden Pool', locationIds: ['henneth-annun'] },
  'chapter-40': { id: 'chapter-40', title: 'Journey to the Cross-roads', locationIds: ['cross-roads', 'minas-morgul'] },
  'chapter-41': { id: 'chapter-41', title: 'The Stairs of Cirith Ungol', locationIds: ['stairs-of-cirith-ungol'] },
  'chapter-42': { id: 'chapter-42', title: 'Shelob\'s Lair', locationIds: ['shelob-lair', 'cirith-ungol'] },
  'chapter-43': { id: 'chapter-43', title: 'The Choices of Master Samwise', locationIds: ['tower-of-cirith-ungol'] },
  
  // The Return of the King
  'book-3': { id: 'book-3', title: 'The Return of the King', locationIds: [] },
  
  // Part 1: The War of the Ring
  'part-5': { id: 'part-5', title: 'The War of the Ring', locationIds: [] },
  'chapter-44': { id: 'chapter-44', title: 'Minas Tirith', locationIds: ['minas-tirith', 'white-tower'] },
  'chapter-45': { id: 'chapter-45', title: 'The Passing of the Grey Company', locationIds: ['minas-tirith', 'dunharrow', 'paths-of-dead'] },
  'chapter-46': { id: 'chapter-46', title: 'The Muster of Rohan', locationIds: ['edoras', 'rohan'] },
  'chapter-47': { id: 'chapter-47', title: 'The Siege of Gondor', locationIds: ['minas-tirith', 'pelennor-fields', 'osgiliath'] },
  'chapter-48': { id: 'chapter-48', title: 'The Ride of the Rohirrim', locationIds: ['pelennor-fields', 'minas-tirith'] },
  'chapter-49': { id: 'chapter-49', title: 'The Battle of the Pelennor Fields', locationIds: ['pelennor-fields', 'minas-tirith'] },
  'chapter-50': { id: 'chapter-50', title: 'The Pyre of Denethor', locationIds: ['minas-tirith'] },
  'chapter-51': { id: 'chapter-51', title: 'The Houses of Healing', locationIds: ['minas-tirith', 'houses-of-healing'] },
  'chapter-52': { id: 'chapter-52', title: 'The Last Debate', locationIds: ['minas-tirith'] },
  'chapter-53': { id: 'chapter-53', title: 'The Black Gate Opens', locationIds: ['black-gate', 'mordor'] },
  
  // Part 2: The End of the Third Age
  'part-6': { id: 'part-6', title: 'The End of the Third Age', locationIds: [] },
  'chapter-54': { id: 'chapter-54', title: 'Mount Doom', locationIds: ['mount-doom', 'sammath-naur'] },
  'chapter-55': { id: 'chapter-55', title: 'The Field of Cormallen', locationIds: ['field-of-cormallen'] },
  'chapter-56': { id: 'chapter-56', title: 'The Steward and the King', locationIds: ['minas-tirith'] },
  'chapter-57': { id: 'chapter-57', title: 'Many Partings', locationIds: ['minas-tirith', 'rivendell'] },
  'chapter-58': { id: 'chapter-58', title: 'Homeward Bound', locationIds: ['shire', 'bag-end'] },
  'chapter-59': { id: 'chapter-59', title: 'The Scouring of the Shire', locationIds: ['shire', 'hobbiton', 'bywater'] },
  'chapter-60': { id: 'chapter-60', title: 'The Grey Havens', locationIds: ['grey-havens'] },
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
function buildChapters(chapterData: Record<string, { id: string; title: string; locationIds?: string[] }>, hierarchy: Array<{ chapterId: string; level: number; type: 'chapter' | 'part' | 'book' }>): Chapter[] {
  return hierarchy.map((item, index) => {
    const chapterInfo = chapterData[item.chapterId];
    const locationIds = chapterInfo.locationIds || [];
    
    // Resolve location IDs to Location objects
    const locations = locationIds.map(id => lotrLocations.find(loc => loc.id === id)).filter(Boolean) as Location[];
    
    return {
      book: lotrBook,
      ...chapterInfo,
      locations,
      level: item.level,
      type: item.type,
      index: index + 1, // For backward compatibility
    };
  });
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
  locations: lotrLocations,
}; 