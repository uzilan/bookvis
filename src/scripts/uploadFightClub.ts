import { readFileSync } from 'fs';
import { loadBookDataFromYamlString } from '../utils/yamlParser.ts';
import { FirebaseService } from '../services/firebase.ts';

async function uploadFightClub() {
  try {
    console.log('📖 Loading Fight Club YAML data...');
    
    // Read the YAML file
    const yamlContent = readFileSync('fight-club-bookvis.yaml', 'utf8');
    
    // Parse YAML to BookData
    const bookData = loadBookDataFromYamlString(yamlContent);
    
    console.log('✅ YAML parsed successfully!');
    console.log(`📚 Book: ${bookData.book.title} by ${bookData.book.author.name}`);
    console.log(`👥 Characters: ${bookData.characters.length}`);
    console.log(`📍 Locations: ${bookData.locations.length}`);
    console.log(`🏛️  Factions: ${bookData.factions.length}`);
    console.log(`📖 Chapters: ${bookData.chapters.length}`);
    console.log(`🔗 Relationships: ${bookData.relationships.length}`);
    
    // Upload to Firebase
    console.log('\n🚀 Uploading to Firebase...');
    await FirebaseService.saveBook(bookData);
    
    console.log('✅ Fight Club data uploaded successfully to Firebase!');
    
  } catch (error) {
    console.error('❌ Error uploading Fight Club data:', error);
    process.exit(1);
  }
}

uploadFightClub(); 