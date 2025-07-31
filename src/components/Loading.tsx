import React from 'react';
import { classes } from '../styles';

export interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  centered?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'medium',
  centered = true,
  className = ''
}) => {
  const containerClasses = [
    classes.loadingContainer,
    classes[`loadingContainer${size.charAt(0).toUpperCase() + size.slice(1)}`],
    centered ? classes.loadingContainerCenter : classes.loadingContainerLeft,
    className
  ].filter(Boolean).join(' ');

  const spinnerClasses = [
    classes.loadingSpinner,
    classes[`loadingSpinner${size.charAt(0).toUpperCase() + size.slice(1)}`]
  ].join(' ');

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses} />
      {message && <div className={classes.loadingMessage}>{message}</div>}
    </div>
  );
};

// Firebase-specific loading components for common use cases
export const FirebaseLoading: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => (
  <Loading 
    message="Loading books from Firebase..." 
    size={size}
  />
);

export const FirebaseNoData: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => (
  <Loading 
    message="No books available from Firebase." 
    size={size}
  />
); 