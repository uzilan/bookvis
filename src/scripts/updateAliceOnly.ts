import FirebaseService from '../services/firebase';
import { aliceBookData } from '../books/aliceData';

async function updateAliceOnly() {
  try {
    console.log('Updating Alice in Wonderland only...');
    await FirebaseService.saveBook(aliceBookData);
    console.log('Successfully updated Alice in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateAliceOnly(); 