import React, { useEffect, type ReactNode } from 'react';
import { ThemeContext, type ThemeContextType, type Theme } from './ThemeContext';

const darkTheme: Theme = {
  colors: {
    primary: '#90caf9',
    secondary: '#f48fb1',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(18, 18, 18, 0.9)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always use dark mode - no more light mode!
  const isDarkMode = true;
  const theme = darkTheme;

  // Remove toggle functionality since we're dark mode only
  const toggleTheme = () => {
    // No-op since we're dark mode only
  };

  // Update CSS custom properties when component mounts
  useEffect(() => {
    // Always set dark mode in localStorage
    localStorage.setItem('darkMode', 'true');
    
    // Update CSS custom properties
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Always set dark mode class
    document.body.classList.add('dark-mode');
  }, [theme]);

  const value: ThemeContextType = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 