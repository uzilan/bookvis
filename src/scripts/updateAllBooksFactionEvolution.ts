import FirebaseService from '../services/firebase';
import { lotrData } from '../books/lotrData';
import { aliceBookData } from '../books/aliceData';
import { winnieBookData } from '../books/winnieData';
import { duneData } from '../books/duneData';
import { crimeAndPunishmentData } from '../books/crimeAndPunishmentData';

async function updateAllBooks() {
  try {
    console.log('Updating all books with faction evolution...');
    
    // Update LOTR (already has faction evolution)
    console.log('Updating LOTR...');
    await FirebaseService.saveBook(lotrData);
    
    // Update Alice in Wonderland
    console.log('Updating Alice in Wonderland...');
    await FirebaseService.saveBook(aliceBookData);
    
    // Update Winnie the Pooh
    console.log('Updating Winnie the Pooh...');
    await FirebaseService.saveBook(winnieBookData);
    
    // Update Dune
    console.log('Updating Dune...');
    await FirebaseService.saveBook(duneData);
    
    // Update Crime and Punishment
    console.log('Updating Crime and Punishment...');
    await FirebaseService.saveBook(crimeAndPunishmentData);
    
    console.log('Successfully updated all books in Firebase!');
  } catch (error) {
    console.error('Failed to update Firebase data:', error);
  }
}

// Run the update
updateAllBooks(); 