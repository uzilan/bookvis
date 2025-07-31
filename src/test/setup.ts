import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Firebase to avoid actual Firebase calls in tests
vi.mock('../services/firebase', () => ({
  FirebaseService: {
    getBooks: vi.fn(),
    getBook: vi.fn(),
    createBook: vi.fn(),
    updateBook: vi.fn(),
    deleteBook: vi.fn(),
    bookExists: vi.fn(),
    uploadYamlFile: vi.fn(),
    getAuthors: vi.fn(),
    createAuthor: vi.fn(),
    updateAuthor: vi.fn(),
    deleteAuthor: vi.fn(),
  },
}));

// Mock React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

// Mock window.matchMedia for Material-UI components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}); 