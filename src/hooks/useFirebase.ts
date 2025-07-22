import { useState, useCallback } from 'react';
import FirebaseService from '../services/firebase';
import type { BookData } from '../models/BookData';

export interface UseFirebaseReturn {
  loading: boolean;
  error: string | null;
  saveBook: (bookData: BookData) => Promise<void>;
  getBook: (id: string) => Promise<BookData | null>;
  getAllBooks: () => Promise<BookData[]>;
  updateBook: (id: string, bookData: Partial<BookData>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  bookExists: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export function useFirebase(): UseFirebaseReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const saveBook = useCallback(async (bookData: BookData) => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseService.saveBook(bookData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save book';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBook = useCallback(async (id: string): Promise<BookData | null> => {
    setLoading(true);
    setError(null);
    try {
      return await FirebaseService.getBook(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch book';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllBooks = useCallback(async (): Promise<BookData[]> => {
    setLoading(true);
    setError(null);
    try {
      return await FirebaseService.getAllBooks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch books';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBook = useCallback(async (id: string, bookData: Partial<BookData>) => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseService.updateBook(id, bookData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update book';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBook = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseService.deleteBook(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete book';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bookExists = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      return await FirebaseService.bookExists(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check if book exists';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    saveBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook,
    bookExists,
    clearError
  };
} 