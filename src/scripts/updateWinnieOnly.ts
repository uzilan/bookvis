import FirebaseService from '../services/firebase';
import { winnieBookData } from '../books/winnieData';

async function updateWinnieOnly() {
  try {
    console.log('Updating Winnie the Pooh only...');
    await FirebaseService.saveBook(winnieBookData);
    console.log('Successfully updated Winnie in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateWinnieOnly(); 