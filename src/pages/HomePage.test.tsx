import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage';

// Mock the hooks and services at the top level
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: null,
    loading: false,
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    isAuthenticated: false,
  })),
}));

vi.mock('../services/firebase', () => ({
  FirebaseService: {
    getAllAuthors: vi.fn().mockResolvedValue([]),
    getAllBooks: vi.fn().mockResolvedValue([]),
    getDraftBook: vi.fn().mockResolvedValue(null),
    uploadYamlFile: vi.fn().mockResolvedValue({ id: 'test-book-id' }),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main title', async () => {
    render(<HomePage />);
    expect(screen.getByText('BookVis')).toBeInTheDocument();
  });

  it('renders the subtitle', async () => {
    render(<HomePage />);
    expect(screen.getByText('Visualize Character Relationships in Your Books')).toBeInTheDocument();
  });

  it('shows sign in button when user is not authenticated', async () => {
    render(<HomePage />);
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('renders the hero image', async () => {
    render(<HomePage />);
    const heroImage = screen.getByAltText('Character Relationships');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', '/relationships.png');
  });

  it('renders the info button', async () => {
    render(<HomePage />);
    expect(screen.getByText('INFO')).toBeInTheDocument();
  });

  it('opens info drawer when info button is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    
    const infoButton = screen.getByText('INFO');
    await user.click(infoButton);
    
    expect(screen.getByText('CLOSE')).toBeInTheDocument();
  });

  it('shows loading state when auth is loading', async () => {
    // Create a new mock for this specific test
    const mockUseAuth = vi.fn(() => ({
      user: null,
      loading: true,
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      isAuthenticated: false,
    }));

    // Temporarily replace the mock
    const { useAuth } = await import('../hooks/useAuth');
    vi.mocked(useAuth).mockImplementation(mockUseAuth);

    render(<HomePage />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders loading state initially', async () => {
    render(<HomePage />);
    
    // Initially shows loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
}); 