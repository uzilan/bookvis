import { FirebaseService } from '../services/firebase.ts';
import { crimeAndPunishmentData } from '../books/crimeAndPunishmentData.ts';

async function updateCrimeAndPunishmentOnly() {
  try {
    console.log('Uploading Crime and Punishment data to Firebase...');
    await FirebaseService.saveBook(crimeAndPunishmentData);
    console.log('Crime and Punishment data uploaded successfully!');
  } catch (error) {
    console.error('Failed to upload Crime and Punishment data:', error);
  }
}

updateCrimeAndPunishmentOnly(); 