import { aliceBookData } from '../books/aliceData';
import { convertBookDataToSchema } from '../utils/schemaToBookDataConverter';

function verifyAliceData() {
  try {
    console.log('🔍 Verifying Alice book data structure...');
    console.log('Book ID:', aliceBookData.book.id);
    console.log('Book Title:', aliceBookData.book.title);
    console.log('Author:', aliceBookData.book.author.name);
    
    console.log('\n📊 Data Summary:');
    console.log('Characters count:', aliceBookData.characters.length);
    console.log('Chapters count:', aliceBookData.chapters.length);
    console.log('Locations count:', aliceBookData.locations.length);
    console.log('Factions count:', aliceBookData.factions.length);
    console.log('Relationships count:', aliceBookData.relationships.length);
    
    console.log('\n👥 Characters:');
    aliceBookData.characters.forEach(char => {
      console.log(`  - ${char.name} (${char.id})`);
    });
    
    console.log('\n📖 Chapters with Character Mentions:');
    aliceBookData.chapters.forEach(chapter => {
      if (chapter.characters && chapter.characters.length > 0) {
        const characterNames = chapter.characters.map(charId => {
          const char = aliceBookData.characters.find(c => c.id === charId);
          return char ? char.name : charId;
        });
        console.log(`  ${chapter.title}: ${characterNames.join(', ')}`);
      } else {
        console.log(`  ${chapter.title}: No characters mentioned`);
      }
    });
    
    console.log('\n🏛️ Factions:');
    aliceBookData.factions.forEach(faction => {
      const members = aliceBookData.characters.filter(char => 
        char.factions.includes(faction.id)
      );
      console.log(`  ${faction.title}: ${members.map(m => m.name).join(', ')}`);
    });
    
    console.log('\n🔗 Relationships:');
    aliceBookData.relationships.forEach(rel => {
      console.log(`  ${rel.character1.name} ↔ ${rel.character2.name}`);
    });
    
    // Test schema conversion
    console.log('\n🔄 Testing schema conversion...');
    const schemaData = convertBookDataToSchema(aliceBookData);
    console.log('✅ Schema conversion successful');
    console.log('Schema characters count:', schemaData.characters.length);
    console.log('Schema chapters count:', schemaData.chapters.length);
    
    // Verify no undefined values in schema
    const hasUndefined = JSON.stringify(schemaData).includes('undefined');
    if (hasUndefined) {
      console.log('❌ Warning: Schema contains undefined values');
    } else {
      console.log('✅ Schema contains no undefined values');
    }
    
    console.log('\n✅ Alice book data verification complete!');
    
  } catch (error) {
    console.error('❌ Error verifying Alice book data:', error);
  }
}

verifyAliceData(); 