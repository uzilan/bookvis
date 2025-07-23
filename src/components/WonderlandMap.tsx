import React from 'react';

interface WonderlandMapProps {
  chapterId: string;
}

export const WonderlandMap: React.FC<WonderlandMapProps> = () => {
  return (
    <div style={{
      width: '100%',
      height: '120px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      <img 
        src="/Underland_Map.webp" 
        alt="Wonderland Map"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  );
}; 