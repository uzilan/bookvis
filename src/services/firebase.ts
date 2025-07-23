import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import type { BookData } from '../models/BookData';
import { firebaseConfig } from '../credentials';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export class FirebaseService {
  /**
   * Save a book to Firebase
   */
  static async saveBook(bookData: BookData): Promise<void> {
    try {
      const bookRef = doc(db, 'bookvis', bookData.book.id);
      const firebaseBookData = {
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(bookRef, firebaseBookData);
      console.log(`Book "${bookData.book.title}" saved successfully`);
    } catch (error) {
      console.error('Error saving book:', error);
      throw new Error(`Failed to save book: ${error}`);
    }
  }

  /**
   * Fetch all books from Firebase
   */
  static async getAllBooks(): Promise<BookData[]> {
    try {
      const booksRef = collection(db, 'bookvis');
      const q = query(booksRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const books: BookData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        books.push({
          book: data.book,
          characters: data.characters,
          chapters: data.chapters,
          factions: data.factions,
          relationships: data.relationships,
          locations: data.locations || [] // Include locations with fallback to empty array
        });
      });
      
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error(`Failed to fetch books: ${error}`);
    }
  }
}

export default FirebaseService; 