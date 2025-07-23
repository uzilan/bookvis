import FirebaseService from '../services/firebase';
import { lotrData } from '../books/lotrData';

async function updateLotrOnly() {
  try {
    console.log('Updating Lord of the Rings only...');
    await FirebaseService.saveBook(lotrData);
    console.log('Successfully updated LOTR in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateLotrOnly(); 