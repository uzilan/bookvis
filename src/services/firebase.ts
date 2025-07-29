import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, query, orderBy, getDoc } from 'firebase/firestore';
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
  static async saveBook(bookData: BookData, isPublic: boolean = false, status: 'draft' | 'published' = 'published'): Promise<void> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to save books');
      }

      // Clean the data to remove undefined values
      const cleanBookData = this.cleanBookDataForFirebase(bookData);

      const bookRef = doc(db, 'bookvis', bookData.book.id);
      const firebaseBookData = {
        ...cleanBookData,
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email,
        isPublic: isPublic,
        status: status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('🔥 Firebase data to save:', JSON.stringify(firebaseBookData, null, 2));
      
      // Check for empty fields
      this.checkForEmptyFields(firebaseBookData);
      
      await setDoc(bookRef, firebaseBookData);
      console.log(`Book "${bookData.book.title}" saved successfully`);
    } catch (error) {
      console.error('Error saving book:', error);
      throw new Error(`Failed to save book: ${error}`);
    }
  }

  /**
   * Clean BookData object to remove undefined values for Firebase
   */
  private static cleanBookDataForFirebase(bookData: BookData): Record<string, unknown> {
    const cleanData: Record<string, unknown> = {};
    
    // Clean book object (required field)
    cleanData.book = {
      id: bookData.book.id,
      title: bookData.book.title,
      author: bookData.book.author
    };

    // Clean characters array (only include if not empty)
    if (bookData.characters.length > 0) {
      cleanData.characters = bookData.characters.map(char => ({
        id: char.id,
        name: char.name,
        description: char.description,
        aliases: char.aliases && char.aliases.length > 0 ? char.aliases : undefined,
        factions: char.factions && char.factions.length > 0 ? char.factions : undefined,
        factionJoinChapters: char.factionJoinChapters && Object.keys(char.factionJoinChapters).length > 0 ? 
          Object.fromEntries(
            Object.entries(char.factionJoinChapters).filter(([key, value]) => 
              value !== undefined && value !== null && value !== ''
            )
          ) : undefined,
        attributes: char.attributes && char.attributes.length > 0 ? char.attributes : undefined
      })).map(char => {
        // Remove undefined and empty string values from character object
        const cleanChar: Record<string, unknown> = {};
        Object.entries(char).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            cleanChar[key] = value;
          }
        });
        return cleanChar;
      });
    }

    // Clean chapters array (only include if not empty)
    if (bookData.chapters.length > 0) {
      cleanData.chapters = bookData.chapters.map(chapter => ({
        book: chapter.book,
        id: chapter.id,
        title: chapter.title,
        index: chapter.index,
        type: chapter.type,
        level: chapter.level || 0, // Provide default value for level
        locations: chapter.locations && chapter.locations.length > 0 ? chapter.locations.map(location => ({
          id: location.id,
          name: location.name,
          description: location.description || undefined
        })).filter(location => location.description !== undefined) : undefined,
        characters: chapter.characters && chapter.characters.length > 0 ? chapter.characters : undefined
      })).map(chapter => {
        // Remove undefined and empty string values from chapter object
        const cleanChapter: Record<string, unknown> = {};
        Object.entries(chapter).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            cleanChapter[key] = value;
          }
        });
        return cleanChapter;
      });
    }

    // Clean factions array (only include if not empty)
    if (bookData.factions.length > 0) {
      cleanData.factions = bookData.factions.map(faction => ({
        id: faction.id,
        title: faction.title,
        description: faction.description || undefined,
        color: faction.color
      })).map(faction => {
        // Remove undefined and empty string values from faction object
        const cleanFaction: Record<string, unknown> = {};
        Object.entries(faction).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            cleanFaction[key] = value;
          }
        });
        return cleanFaction;
      });
    }

    // Clean relationships array (only include if not empty)
    if (bookData.relationships.length > 0) {
      cleanData.relationships = bookData.relationships.map(rel => ({
        character1: {
          id: rel.character1.id,
          name: rel.character1.name
        },
        character2: {
          id: rel.character2.id,
          name: rel.character2.name
        },
        descriptions: rel.descriptions.map(desc => ({
          chapter: desc.chapter,
          description: desc.description
        }))
      }));
    }

    // Clean locations array (only include if not empty)
    if (bookData.locations.length > 0) {
      cleanData.locations = bookData.locations.map(location => ({
        id: location.id,
        name: location.name,
        description: location.description || undefined
      })).map(location => {
        // Remove undefined and empty string values from location object
        const cleanLocation: Record<string, unknown> = {};
        Object.entries(location).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            cleanLocation[key] = value;
          }
        });
        return cleanLocation;
      });
    }

    // Clean hierarchy array (only include if not empty)
    if (bookData.hierarchy.length > 0) {
      cleanData.hierarchy = bookData.hierarchy.map((item: { chapter_id: string; type: string }) => ({
        chapter_id: item.chapter_id,
        type: item.type
      }));
    }

    // Add mapUrl if it exists
    if (bookData.mapUrl) {
      cleanData.mapUrl = bookData.mapUrl;
    }

    // Log any undefined values
    console.log('🔍 Checking for undefined values in cleaned data:');
    this.logUndefinedValues(cleanData as Record<string, unknown>);
    
    return cleanData;
  }

  /**
   * Log undefined values in an object
   */
  private static logUndefinedValues(obj: Record<string, unknown>, path: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (value === undefined) {
        console.error(`❌ Undefined value found at: ${currentPath}`);
      } else if (value === null) {
        console.error(`❌ Null value found at: ${currentPath}`);
      } else if (value === '') {
        console.error(`❌ Empty string found at: ${currentPath}`);
      } else if (typeof value === 'object' && value !== null) {
        this.logUndefinedValues(value as Record<string, unknown>, currentPath);
      }
    }
  }

  /**
   * Check for empty fields in Firebase data
   */
  private static checkForEmptyFields(obj: Record<string, unknown>, path: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (value === undefined) {
        console.error(`❌ EMPTY FIELD: ${currentPath} is undefined`);
      } else if (value === null) {
        console.error(`❌ EMPTY FIELD: ${currentPath} is null`);
      } else if (value === '') {
        console.error(`❌ EMPTY FIELD: ${currentPath} is empty string`);
      } else if (Array.isArray(value) && value.length === 0) {
        console.error(`❌ EMPTY FIELD: ${currentPath} is empty array`);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.checkForEmptyFields(value as Record<string, unknown>, currentPath);
      }
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
        
        // Reconstruct path property for chapters if hierarchy exists
        let chapters = data.chapters;
        if (data.hierarchy && Array.isArray(data.hierarchy)) {
          chapters = data.chapters.map((chapter: Record<string, unknown>) => {
            // Build path from hierarchy
            const path = this.buildPathFromHierarchy(chapter.id as string, data.hierarchy, data.chapters);
            return {
              ...chapter,
              path: path
            };
          });
        }
        
        const bookData = {
          book: data.book,
          characters: data.characters,
          chapters: chapters,
          factions: data.factions,
          relationships: data.relationships,
          locations: data.locations || [], // Include locations with fallback to empty array
          hierarchy: data.hierarchy || [], // Include hierarchy
          mapUrl: data.mapUrl, // Include mapUrl field
          ownerId: data.ownerId,
          ownerEmail: data.ownerEmail,
          isPublic: data.isPublic || false,
          status: data.status || 'published',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };

        // If user is authenticated, show their books + public books
        // If user is not authenticated, show only public books
        // For backward compatibility, treat books without isPublic field as public
        const isPublic = data.isPublic !== undefined ? data.isPublic : true;
        
        if (currentUser) {
          if (data.ownerId === currentUser.uid || isPublic) {
            books.push(bookData);
          }
        } else {
          if (isPublic) {
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
   * Build path from hierarchy for a chapter
   */
  private static buildPathFromHierarchy(chapterId: string, hierarchy: Record<string, unknown>[], chapters: Record<string, unknown>[]): string[] {
    const path: string[] = [];
    let currentLevel = -1;
    
    // Find the current chapter's level in the hierarchy
    for (let i = 0; i < hierarchy.length; i++) {
      if (hierarchy[i].chapter_id === chapterId) {
        currentLevel = i;
        break;
      }
    }
    
    if (currentLevel === -1) {
      return path; // Chapter not found in hierarchy
    }
    
    // Walk up the hierarchy to find parent parts
    for (let i = currentLevel - 1; i >= 0; i--) {
      const item = hierarchy[i];
      const chapter = chapters.find((ch: Record<string, unknown>) => ch.id === item.chapter_id);
      if (chapter && item.type === 'part') {
        // Found the immediate parent part, add it to path
        path.unshift(chapter.title as string);
        break; // Stop after finding the first (immediate) parent part
      }
    }
    
    return path;
  }

  /**
   * Fetch user's draft books from Firebase
   */
  static async getUserDrafts(): Promise<BookData[]> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to fetch drafts');
      }

      const booksRef = collection(db, 'bookvis');
      const q = query(booksRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const drafts: BookData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        
        // Only include drafts owned by the current user
        if (data.ownerId === currentUser.uid && data.status === 'draft') {
          // Reconstruct path property for chapters if hierarchy exists
          let chapters = data.chapters;
          if (data.hierarchy && Array.isArray(data.hierarchy)) {
            chapters = data.chapters.map((chapter: Record<string, unknown>) => {
              const path = this.buildPathFromHierarchy(chapter.id as string, data.hierarchy, data.chapters);
              return {
                ...chapter,
                path: path
              };
            });
          }
          
          const bookData: BookData = {
            book: data.book,
            characters: data.characters,
            chapters: chapters,
            factions: data.factions,
            relationships: data.relationships,
            locations: data.locations || [],
            hierarchy: data.hierarchy || [],
            mapUrl: data.mapUrl,
            ownerId: data.ownerId,
            ownerEmail: data.ownerEmail,
            isPublic: data.isPublic || false,
            status: data.status || 'draft',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          };

          drafts.push(bookData);
        }
      });
      
      return drafts;
    } catch (error) {
      console.error('Error fetching drafts:', error);
      throw new Error(`Failed to fetch drafts: ${error}`);
    }
  }

  /**
   * Check if a draft exists for a given book ID
   */
  static async getDraftByBookId(bookId: string): Promise<BookData | null> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to fetch drafts');
      }

      const bookRef = doc(db, 'bookvis', bookId);
      const bookDoc = await getDoc(bookRef);
      
      if (bookDoc.exists()) {
        const data = bookDoc.data() as any;
        
        // Only return if it's a draft owned by the current user
        if (data.ownerId === currentUser.uid && data.status === 'draft') {
          // Reconstruct path property for chapters if hierarchy exists
          let chapters = data.chapters;
          if (data.hierarchy && Array.isArray(data.hierarchy)) {
            chapters = data.chapters.map((chapter: Record<string, unknown>) => {
              const path = this.buildPathFromHierarchy(chapter.id as string, data.hierarchy, data.chapters);
              return {
                ...chapter,
                path: path
              };
            });
          }
          
          const bookData: BookData = {
            book: data.book,
            characters: data.characters,
            chapters: chapters,
            factions: data.factions,
            relationships: data.relationships,
            locations: data.locations || [],
            hierarchy: data.hierarchy || [],
            mapUrl: data.mapUrl,
            ownerId: data.ownerId,
            ownerEmail: data.ownerEmail,
            isPublic: data.isPublic || false,
            status: data.status || 'draft',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          };

          return bookData;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching draft by book ID:', error);
      throw new Error(`Failed to fetch draft: ${error}`);
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

      const bookRef = doc(db, 'bookvis', bookId);
      const bookDoc = await getDocs(collection(db, 'bookvis'));
      let bookData: BookData | null = null;
      
      for (const docSnapshot of bookDoc.docs) {
        if (docSnapshot.id === bookId) {
          const data = docSnapshot.data() as any;
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
          break;
        }
      }

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
      
      for (const docSnapshot of bookDoc.docs) {
        if (docSnapshot.id === bookId) {
          const data = docSnapshot.data() as any;
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
          break;
        }
      }

      if (!bookData) {
        throw new Error('Book not found');
      }

      if (bookData.ownerId && bookData.ownerId !== currentUser.uid) {
        throw new Error('You can only update your own books');
      }

      await setDoc(bookRef, { 
        book: bookData.book,
        characters: bookData.characters,
        chapters: bookData.chapters,
        factions: bookData.factions,
        relationships: bookData.relationships,
        locations: bookData.locations,
        mapUrl: bookData.mapUrl,
        ownerId: bookData.ownerId,
        ownerEmail: bookData.ownerEmail,
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