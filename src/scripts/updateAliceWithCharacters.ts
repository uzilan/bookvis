import { aliceBookData } from '../books/aliceData';
import FirebaseService from '../services/firebase';

async function uploadAliceBook() {
  try {
    console.log('Uploading Alice book data to Firebase...');
    console.log('Book ID:', aliceBookData.book.id);
    console.log('Characters count:', aliceBookData.characters.length);
    console.log('Chapters count:', aliceBookData.chapters.length);
    console.log('Locations count:', aliceBookData.locations.length);
    console.log('Factions count:', aliceBookData.factions.length);
    console.log('Relationships count:', aliceBookData.relationships.length);
    
    // Upload to Firebase using the service
    await FirebaseService.saveBook(aliceBookData, true); // Make it public
    
    console.log('✅ Alice book data uploaded successfully!');
    console.log('Book ID:', aliceBookData.book.id);
    
    // Log some details about the character mentions
    console.log('\nCharacter mentions per chapter:');
    aliceBookData.chapters.forEach(chapter => {
      if (chapter.characters && chapter.characters.length > 0) {
        console.log(`  ${chapter.title}: ${chapter.characters.length} characters`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error uploading Alice book data:', error);
  }
}

// Run the upload with authentication
async function main() {
  try {
    console.log('Signing in to Firebase...');
    await FirebaseService.signInWithGoogle();
    console.log('✅ Successfully authenticated');
    
    await uploadAliceBook();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main(); 