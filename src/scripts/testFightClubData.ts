import { FirebaseService } from '../services/firebase.ts';

async function testFightClubData() {
  try {
    console.log('🔍 Fetching books from Firebase...');
    const books = await FirebaseService.getAllBooks();
    
    console.log(`📚 Found ${books.length} books:`);
    books.forEach(book => {
      console.log(`  - ${book.book.title} (${book.book.id})`);
    });
    
    const fightClub = books.find(b => b.book.id === 'fight-club');
    if (!fightClub) {
      console.log('❌ Fight Club not found in Firebase data');
      return;
    }
    
    console.log('\n🎯 Fight Club data:');
    console.log(`  Title: ${fightClub.book.title}`);
    console.log(`  Author: ${fightClub.book.author.name}`);
    console.log(`  Characters: ${fightClub.characters.length}`);
    console.log(`  Chapters: ${fightClub.chapters.length}`);
    console.log(`  Locations: ${fightClub.locations.length}`);
    console.log(`  Factions: ${fightClub.factions.length}`);
    console.log(`  Relationships: ${fightClub.relationships.length}`);
    
    console.log('\n👥 Characters:');
    fightClub.characters.forEach(char => {
      console.log(`  - ${char.name} (${char.id})`);
      console.log(`    First appearance: ${char.firstAppearanceChapter} (${typeof char.firstAppearanceChapter})`);
      console.log(`    Factions: ${char.factions.join(', ')}`);
    });
    
    console.log('\n📖 Chapters:');
    fightClub.chapters.forEach(chapter => {
      console.log(`  - ${chapter.title} (${chapter.id}) - Index: ${chapter.index}`);
      console.log(`    Type: ${chapter.type || 'undefined'}`);
    });
    
    // Test character filtering logic
    console.log('\n🔍 Testing character filtering:');
    const currentChapter = fightClub.chapters[0]; // First chapter
    console.log(`Current chapter: ${currentChapter.title} (${currentChapter.id}) - Index: ${currentChapter.index}`);
    
    const visibleCharacters = fightClub.characters.filter(c => {
      if (typeof c.firstAppearanceChapter === 'number') {
        return currentChapter && typeof currentChapter.index === 'number' && c.firstAppearanceChapter <= currentChapter.index;
      } else if (typeof c.firstAppearanceChapter === 'string') {
        const targetChapter = fightClub.chapters.find(ch => ch.id === c.firstAppearanceChapter);
        return targetChapter && currentChapter && targetChapter.index && currentChapter.index && 
               targetChapter.index <= currentChapter.index;
      }
      return false;
    });
    
    console.log(`Visible characters: ${visibleCharacters.length}/${fightClub.characters.length}`);
    visibleCharacters.forEach(char => {
      console.log(`  - ${char.name}`);
    });
    
  } catch (error) {
    console.error('❌ Error testing Fight Club data:', error);
  }
}

testFightClubData(); 