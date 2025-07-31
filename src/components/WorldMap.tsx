import React, { useState, useEffect } from 'react';
import type { BookData } from '../models/BookData';
import { classes } from '../styles';

interface WorldMapProps {
  chapterId: string;
  bookData: BookData;
}

export const WorldMap: React.FC<WorldMapProps> = ({ bookData }) => {
  const mapUrl = bookData.mapUrl;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reset states when mapUrl changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [mapUrl]);
  
  if (!mapUrl) {
    return null;
  }
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };
  
  // Don't render anything if image failed to load
  if (imageError) {
    return null;
  }
  
  return (
    <div className={classes.worldMapContainer}>
      <img 
        src={mapUrl}
        alt="World Map"
        className={classes.worldMapImage}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}; 