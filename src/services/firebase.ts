import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  type User 
} from 'firebase/auth';
import type { BookData } from '../models/BookData';
import type { Author } from '../models/Author';
import { firebaseConfig } from '../credentials.ts';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export class FirebaseService {
  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Successfully signed in with Google:', result.user.displayName);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw new Error(`Failed to sign in with Google: ${error}`);
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error(`Failed to sign out: ${error}`);
    }
  }

  /**
   * Get the current user
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Listen to authentication state changes
   */
  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Save a book to Firebase
   */
  static async saveBook(bookData: BookData, isPublic: boolean = false): Promise<void> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to save books');
      }

      const bookRef = doc(db, 'bookvis', bookData.book.id);
      const firebaseBookData = {
        ...bookData,
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email,
        isPublic: isPublic,
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
      const currentUser = this.getCurrentUser();
      const booksRef = collection(db, 'bookvis');
      const q = query(booksRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const books: BookData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const bookData = {
          book: data.book,
          characters: data.characters,
          chapters: data.chapters,
          factions: data.factions,
          relationships: data.relationships,
          locations: data.locations || [], // Include locations with fallback to empty array
          mapUrl: data.mapUrl, // Include mapUrl field
          ownerId: data.ownerId,
          ownerEmail: data.ownerEmail,
          isPublic: data.isPublic || false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };

        // If user is authenticated, show their books + public books
        // If user is not authenticated, show only public books
        if (currentUser) {
          if (data.ownerId === currentUser.uid || data.isPublic) {
            books.push(bookData);
          }
        } else {
          if (data.isPublic) {
            books.push(bookData);
          }
        }
      });
      
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error(`Failed to fetch books: ${error}`);
    }
  }

  /**
   * Fetch all unique authors from existing books
   */
  static async getAllAuthors(): Promise<Author[]> {
    try {
      const books = await this.getAllBooks();
      const authorMap = new Map<string, Author>();
      
      books.forEach(book => {
        if (book.book.author) {
          authorMap.set(book.book.author.id, book.book.author);
        }
      });
      
      // Convert to array and sort by name
      const authors = Array.from(authorMap.values()).sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      return authors;
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw new Error(`Failed to fetch authors: ${error}`);
    }
  }

  /**
   * Delete a book from Firebase
   */
  static async deleteBook(bookId: string): Promise<void> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to delete books');
      }

      // First, get the book to check ownership
      const bookRef = doc(db, 'bookvis', bookId);
      const bookDoc = await getDocs(collection(db, 'bookvis'));
      let bookData: BookData | null = null;
      
      bookDoc.forEach((doc) => {
        if (doc.id === bookId) {
          const data = doc.data();
          bookData = {
            book: data.book,
            characters: data.characters,
            chapters: data.chapters,
            factions: data.factions,
            relationships: data.relationships,
            locations: data.locations || [],
            mapUrl: data.mapUrl,
            ownerId: data.ownerId,
            ownerEmail: data.ownerEmail,
            isPublic: data.isPublic || false,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          } as BookData;
        }
      });

      if (!bookData) {
        throw new Error('Book not found');
      }

      if (bookData.ownerId && bookData.ownerId !== currentUser.uid) {
        throw new Error('You can only delete your own books');
      }

      await setDoc(bookRef, { deleted: true, deletedAt: new Date() });
      console.log(`Book "${bookData.book.title}" marked as deleted`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error(`Failed to delete book: ${error}`);
    }
  }

  /**
   * Update book visibility (public/private)
   */
  static async updateBookVisibility(bookId: string, isPublic: boolean): Promise<void> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to update book visibility');
      }

      // First, get the book to check ownership
      const bookRef = doc(db, 'bookvis', bookId);
      const bookDoc = await getDocs(collection(db, 'bookvis'));
      let bookData: BookData | null = null;
      
      bookDoc.forEach((doc) => {
        if (doc.id === bookId) {
          const data = doc.data();
          bookData = {
            book: data.book,
            characters: data.characters,
            chapters: data.chapters,
            factions: data.factions,
            relationships: data.relationships,
            locations: data.locations || [],
            mapUrl: data.mapUrl,
            ownerId: data.ownerId,
            ownerEmail: data.ownerEmail,
            isPublic: data.isPublic || false,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          } as BookData;
        }
      });

      if (!bookData) {
        throw new Error('Book not found');
      }

      if (bookData.ownerId && bookData.ownerId !== currentUser.uid) {
        throw new Error('You can only update your own books');
      }

      await setDoc(bookRef, { 
        ...bookData, 
        isPublic: isPublic, 
        updatedAt: new Date() 
      });
      console.log(`Book "${bookData.book.title}" visibility updated to ${isPublic ? 'public' : 'private'}`);
    } catch (error) {
      console.error('Error updating book visibility:', error);
      throw new Error(`Failed to update book visibility: ${error}`);
    }
  }
}

export default FirebaseService; 