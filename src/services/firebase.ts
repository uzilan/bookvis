import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { BookData } from '../models/BookData';
import { firebaseConfig } from '../credentials.ts';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

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
   * Upload an image file to Firebase Storage
   */
  static async uploadImage(file: File, bookId: string, imageName: string): Promise<string> {
    try {
      const storageRef = ref(storage, `bookvis/${bookId}/${imageName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(`Image uploaded successfully: ${downloadURL}`);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error}`);
    }
  }

  /**
   * Get download URL for an image
   */
  static async getImageURL(bookId: string, imageName: string): Promise<string> {
    try {
      const storageRef = ref(storage, `bookvis/${bookId}/${imageName}`);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error getting image URL:', error);
      throw new Error(`Failed to get image URL: ${error}`);
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
          locations: data.locations || [], // Include locations with fallback to empty array
          mapUrl: data.mapUrl // Include mapUrl field
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