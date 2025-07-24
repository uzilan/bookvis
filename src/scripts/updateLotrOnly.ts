import { FirebaseService } from '../services/firebase.ts';
import { lotrData } from '../books/lotrData.ts';

async function updateLotrOnly() {
  try {
    console.log('Uploading LOTR data to Firebase...');
    await FirebaseService.saveBook(lotrData);
    console.log('LOTR data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading LOTR data:', error);
  }
}

updateLotrOnly(); 