import FirebaseService from '../services/firebase';
import { lotrData } from '../books/lotrData';

async function updateFirebaseData() {
  try {
    console.log('Updating LOTR data with complete faction evolution...');
    await FirebaseService.saveBook(lotrData);
    console.log('Successfully updated complete LOTR data in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateFirebaseData(); 