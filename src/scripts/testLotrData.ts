import { FirebaseService } from '../services/firebase.ts';

async function testLotrData() {
  try {
    console.log('🔍 Fetching LOTR data from Firebase...');
    const books = await FirebaseService.getAllBooks();
    
    const lotr = books.find(b => b.book.id === 'lotr');
    if (!lotr) {
      console.log('❌ LOTR not found in Firebase data');
      return;
    }
    
    console.log('\n🎯 LOTR data:');
    console.log(`  Title: ${lotr.book.title}`);
    console.log(`  Author: ${lotr.book.author.name}`);
    console.log(`  Characters: ${lotr.characters.length}`);
    console.log(`  Chapters: ${lotr.chapters.length}`);
    console.log(`  Locations: ${lotr.locations.length}`);
    console.log(`  Factions: ${lotr.factions.length}`);
    console.log(`  Relationships: ${lotr.relationships.length}`);
    
    console.log('\n📖 Chapters:');
    lotr.chapters.forEach((chapter, index) => {
      console.log(`  ${index + 1}. ${chapter.title} (${chapter.id}) - Index: ${chapter.index}`);
    });
    
    console.log('\n👥 Characters:');
    lotr.characters.forEach(char => {
      console.log(`  - ${char.name} (${char.id})`);
      console.log(`    First appearance: ${char.firstAppearanceChapter}`);
    });
    
  } catch (error) {
    console.error('❌ Error testing LOTR data:', error);
  }
}

testLotrData(); 