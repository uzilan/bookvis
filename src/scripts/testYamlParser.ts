import { readFileSync } from 'fs';
import { loadBookDataFromYamlString } from '../utils/yamlParser.ts';

// Read the Fight Club YAML file
const yamlContent = readFileSync('fight-club-bookvis.yaml', 'utf8');

try {
  const bookData = loadBookDataFromYamlString(yamlContent);
  
  console.log('✅ YAML parsing successful!');
  console.log('\n📚 Book:', bookData.book.title, 'by', bookData.book.author.name);
  console.log('🗺️  Map URL:', bookData.mapUrl);
  
  console.log('\n📍 Locations:', bookData.locations.length);
  bookData.locations.forEach(loc => {
    console.log(`  - ${loc.name} (${loc.id})`);
  });
  
  console.log('\n👥 Characters:', bookData.characters.length);
  bookData.characters.forEach(char => {
    console.log(`  - ${char.name} (${char.id})`);
    console.log(`    Factions: ${char.factions.join(', ')}`);
  });
  
  console.log('\n🏛️  Factions:', bookData.factions.length);
  bookData.factions.forEach(faction => {
    console.log(`  - ${faction.title} (${faction.id}) - ${faction.color}`);
  });
  
  console.log('\n📖 Chapters:', bookData.chapters.length);
  bookData.chapters.forEach(chapter => {
    console.log(`  - ${chapter.title} (${chapter.id})`);
    console.log(`    Locations: ${chapter.locations?.map(l => l.name).join(', ') || 'None'}`);
  });
  
  console.log('\n🔗 Relationships:', bookData.relationships.length);
  bookData.relationships.forEach(rel => {
    console.log(`  - ${rel.character1.name} ↔ ${rel.character2.name}`);
    console.log(`    Descriptions: ${rel.descriptions.length}`);
  });
  
  console.log('\n🎉 All data parsed successfully!');
  
} catch (error) {
  console.error('❌ Error parsing YAML:', error);
  process.exit(1);
} 