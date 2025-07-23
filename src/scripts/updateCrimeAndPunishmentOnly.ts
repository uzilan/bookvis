import FirebaseService from '../services/firebase';
import { crimeAndPunishmentData } from '../books/crimeAndPunishmentData';

async function updateCrimeAndPunishmentOnly() {
  try {
    console.log('Updating Crime and Punishment only...');
    await FirebaseService.saveBook(crimeAndPunishmentData);
    console.log('Successfully updated Crime and Punishment in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateCrimeAndPunishmentOnly(); 