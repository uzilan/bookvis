import { FirebaseService } from '../services/firebase.ts';
import { duneData } from '../books/duneData.ts';

async function updateDuneOnly() {
  try {
    console.log('Uploading Dune data to Firebase...');
    await FirebaseService.saveBook(duneData);
    console.log('Dune data uploaded successfully!');
  } catch (error) {
    console.error('Failed to upload Dune data:', error);
  }
}

updateDuneOnly(); 