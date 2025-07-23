import FirebaseService from '../services/firebase';
import { duneData } from '../books/duneData';

async function updateDuneOnly() {
  try {
    console.log('Updating Dune only...');
    await FirebaseService.saveBook(duneData);
    console.log('Successfully updated Dune in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateDuneOnly(); 