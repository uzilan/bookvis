import { parseYamlToBookData } from '../utils/yamlParser';
import fs from 'fs';

function testYamlParser() {
  try {
    console.log('🧪 Testing YAML parser with new character mentions structure...');
    
    // Read the Fight Club YAML file
    const yamlContent = fs.readFileSync('fight-club-bookvis.yaml', 'utf8');
    
    // Parse the YAML
    const bookData = parseYamlToBookData(yamlContent);
    
    console.log('✅ YAML parsing successful!');
    console.log('Book:', bookData.book.title);
    console.log('Author:', bookData.book.author.name);
    console.log('Characters count:', bookData.characters.length);
    console.log('Chapters count:', bookData.chapters.length);
    console.log('Locations count:', bookData.locations.length);
    console.log('Factions count:', bookData.factions.length);
    console.log('Relationships count:', bookData.relationships.length);
    
    console.log('\n📖 Character mentions per chapter:');
    bookData.chapters.forEach(chapter => {
      if (chapter.characters && chapter.characters.length > 0) {
        const characterNames = chapter.characters.map(charId => {
          const char = bookData.characters.find(c => c.id === charId);
          return char ? char.name : charId;
        });
        console.log(`  ${chapter.title}: ${characterNames.join(', ')}`);
      } else {
        console.log(`  ${chapter.title}: No characters mentioned`);
      }
    });
    
    console.log('\n✅ YAML parser test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing YAML parser:', error);
  }
}

testYamlParser(); 