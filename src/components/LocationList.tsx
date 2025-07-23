import React, { useState } from 'react';
import type { Location } from '../models/Location';
import { WonderlandMap } from './WonderlandMap';

interface LocationListProps {
  locations: Location[];
  chapterTitle: string;
  chapterId: string;
}

export const LocationList: React.FC<LocationListProps> = ({ locations, chapterId }) => {
  const [expandedLocations, setExpandedLocations] = useState<Set<string>>(new Set());
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

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
    <>
      <div style={{
        background: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '2px solid #333',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        width: '100%',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#000' }}>
          Locations:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
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
        
        {/* Map Section */}
        <div style={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '12px',
          marginTop: '8px'
        }}>
          <div 
            onClick={() => setIsMapModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <WonderlandMap chapterId={chapterId} />
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={() => setIsMapModalOpen(false)}
        >
          <div style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMapModalOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                zIndex: 10001
              }}
            >
              ×
            </button>
            <img 
              src="/Underland_Map.webp" 
              alt="Wonderland Map"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}; 