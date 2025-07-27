import { aliceBookData } from '../books/aliceData';

function testAliceData() {
  try {
    console.log('🧪 Testing Alice book data structure...');
    
    console.log('Book:', aliceBookData.book.title);
    console.log('Author:', aliceBookData.book.author.name);
    console.log('Characters count:', aliceBookData.characters.length);
    console.log('Chapters count:', aliceBookData.chapters.length);
    
    console.log('\n📖 Chapters with character mentions:');
    aliceBookData.chapters.forEach(chapter => {
      console.log(`  ${chapter.title} (${chapter.id}):`);
      console.log(`    Characters: ${chapter.characters?.join(', ') || 'None'}`);
      console.log(`    Locations: ${chapter.locations?.map(l => l.name).join(', ') || 'None'}`);
    });
    
    // Test character visibility logic
    console.log('\n🔍 Testing character visibility logic:');
    const selectedChapter = 'chapter-1';
    const currentChapter = aliceBookData.chapters.find(ch => ch.id === selectedChapter);
    
    if (currentChapter) {
      console.log(`Current chapter: ${currentChapter.title}`);
      console.log(`Chapter characters: ${currentChapter.characters?.join(', ') || 'None'}`);
      
      // Test the visibility logic used in components
      const visibleCharacters = aliceBookData.characters.filter(c => {
        return currentChapter && currentChapter.characters && currentChapter.characters.includes(c.id);
      });
      
      console.log(`Visible characters: ${visibleCharacters.map(c => c.name).join(', ')}`);
      console.log(`Visible character count: ${visibleCharacters.length}`);
    }
    
    console.log('\n✅ Alice book data test completed!');
    
  } catch (error) {
    console.error('❌ Error testing Alice book data:', error);
  }
}

testAliceData(); 