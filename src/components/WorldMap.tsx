import React, { useState, useEffect } from 'react';
import type { BookData } from '../models/BookData';

interface WorldMapProps {
  chapterId: string;
  bookData: BookData;
}

export const WorldMap: React.FC<WorldMapProps> = ({ bookData }) => {
  const mapUrl = bookData.mapUrl;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  if (!mapUrl) {
    return null;
  }
  
  // Reset states when mapUrl changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [mapUrl]);
  
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
    <div style={{
      width: '100%',
      height: '80px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
      position: 'relative'
    }}>

      <img 
        src={mapUrl}
        alt="World Map"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: imageLoaded ? 'block' : 'none'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}; 