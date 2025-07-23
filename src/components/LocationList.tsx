import React, { useState } from 'react';
import type { Location } from '../models/Location';

interface LocationListProps {
  locations: Location[];
  chapterTitle: string;
}

export const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  const [expandedLocations, setExpandedLocations] = useState<Set<string>>(new Set());

  if (!locations || locations.length === 0) {
    return null;
  }

  const toggleLocation = (locationId: string) => {
    const newExpanded = new Set(expandedLocations);
    if (newExpanded.has(locationId)) {
      newExpanded.delete(locationId);
    } else {
      newExpanded.add(locationId);
    }
    setExpandedLocations(newExpanded);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '120px', // Position below factions
      right: '20px',
      zIndex: 1002,
      background: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '2px solid #333',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      width: '250px',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#000' }}>
        Locations:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {locations.map((location) => (
          <div key={location.id}>
            <div 
              onClick={() => toggleLocation(location.id)}
              style={{ 
                fontSize: '13px', 
                color: '#000', 
                fontWeight: '500',
                padding: '8px 12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                border: '1px solid #e9ecef',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e9ecef';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
            >
              <span>📍 {location.name}</span>
              <span style={{ 
                fontSize: '12px', 
                color: '#666',
                transition: 'transform 0.2s ease',
                transform: expandedLocations.has(location.id) ? 'rotate(90deg)' : 'rotate(0deg)'
              }}>
                ▶
              </span>
            </div>
            {expandedLocations.has(location.id) && location.description && (
              <div style={{
                fontSize: '12px',
                color: '#666',
                padding: '8px 12px',
                marginTop: '4px',
                backgroundColor: '#f1f3f4',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                lineHeight: '1.4'
              }}>
                {location.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 