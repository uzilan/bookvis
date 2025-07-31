import React, { useState, useMemo } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import type { Location } from '../models/Location';
import type { BookData } from '../models/BookData';
import { WorldMap } from './WorldMap';
import { fuzzySearch } from '../utils/fuzzySearch';
import { classes } from '../styles';

interface LocationListProps {
  locations: Location[];
  chapterTitle: string;
  chapterId: string;
  bookData: BookData;
  isPreview?: boolean;
}

export const LocationList: React.FC<LocationListProps> = ({ locations, chapterId, bookData, isPreview = false }) => {
  const [expandedLocations, setExpandedLocations] = useState<Set<string>>(new Set());
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [filterText, setFilterText] = useState('');



  // Get all locations from the book data
  const allLocations = useMemo(() => bookData.locations || [], [bookData.locations]);
  
  // Use fuzzy search utility
  const displayLocations = useMemo(() => {
    const results = fuzzySearch(
      allLocations,
      locations,
      filterText,
      showAllLocations,
      { keys: ['name'] }
    );
    // Filter out empty locations and sort
    return results
      .filter(location => location.name && location.name.trim() !== '')
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allLocations, locations, filterText, showAllLocations]);

  // Only return null if there are no locations at all (not just no filtered results)
  // But show empty state in preview mode
  if ((!locations || locations.length === 0) && (!isPreview || allLocations.length === 0)) {
    if (!isPreview) {
      return null;
    }
    // Show empty state for preview mode
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>
            Locations:
          </div>
          <FormControl size="small">
            <RadioGroup
              row
              value={showAllLocations ? 'all' : 'chapter'}
              onChange={(e) => setShowAllLocations(e.target.value === 'all')}
            >
              <FormControlLabel
                value="chapter"
                control={<Radio size="small" sx={{
                  color: 'var(--color-textSecondary)',
                  '&.Mui-checked': {
                    color: 'var(--color-primary)',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '16px',
                  },
                }} />}
                label="Chapter"
                sx={{ 
                  fontSize: '10px', 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '10px',
                    color: 'var(--color-text)',
                    textAlign: 'left'
                  } 
                }}
              />
              <FormControlLabel
                value="all"
                control={<Radio size="small" sx={{
                  color: 'var(--color-textSecondary)',
                  '&.Mui-checked': {
                    color: 'var(--color-primary)',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '16px',
                  },
                }} />}
                label="All"
                sx={{ 
                  fontSize: '10px', 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '10px',
                    color: 'var(--color-text)',
                    textAlign: 'left'
                  } 
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        
        {/* Filter Input */}
        <div className={classes.filterContainer}>
          <input
            type="text"
            placeholder="Filter locations..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={classes.filterInput}
          />
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--color-textSecondary)',
          fontSize: '12px'
        }}>
          No locations available
        </div>
      </div>
    );
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
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>
            Locations:
          </div>
          <FormControl size="small">
            <RadioGroup
              row
              value={showAllLocations ? 'all' : 'chapter'}
              onChange={(e) => setShowAllLocations(e.target.value === 'all')}
            >
              <FormControlLabel
                value="chapter"
                control={<Radio size="small" sx={{
                  color: 'var(--color-textSecondary)',
                  '&.Mui-checked': {
                    color: 'var(--color-primary)',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '16px',
                  },
                }} />}
                label="Chapter"
                sx={{ 
                  fontSize: '10px', 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '10px',
                    color: 'var(--color-text)',
                    textAlign: 'left'
                  } 
                }}
              />
              <FormControlLabel
                value="all"
                control={<Radio size="small" sx={{
                  color: 'var(--color-textSecondary)',
                  '&.Mui-checked': {
                    color: 'var(--color-primary)',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '16px',
                  },
                }} />}
                label="All"
                sx={{ 
                  fontSize: '10px', 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '10px',
                    color: 'var(--color-text)',
                    textAlign: 'left'
                  } 
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        
        {/* Filter Input */}
        <div className={classes.filterContainer}>
          <input
            type="text"
            placeholder="Filter locations..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={classes.filterInput}
          />
        </div>
        <div className={classes.scrollableList}>
          {displayLocations.length === 0 ? (
            <div className={classes.emptyState}>
              No locations match your filter
            </div>
          ) : (
            displayLocations.map((location) => (
            <div key={location.id}>
              <div 
                onClick={() => toggleLocation(location.id)}
                className={classes.listItem}
              >
                <span className={classes.locationName}>📍 {location.name}</span>
                <span className={expandedLocations.has(location.id) ? classes.iconExpanded : classes.iconCollapsed}>
                  ▶
                </span>
              </div>
              {expandedLocations.has(location.id) && location.description && (
                <div className={classes.expandedContent}>
                  {location.description}
                </div>
              )}
            </div>
          ))
          )}
        </div>
        
        {/* Map Section */}
        <div className={classes.sectionHeader}>
          <div 
            onClick={() => setIsMapModalOpen(true)}
            className={classes.button}
          >
            <WorldMap chapterId={chapterId} bookData={bookData} />
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <div style={{
          position: 'fixed',
          top: '50px',
          left: '10px',
          background: 'orange',
          color: 'white',
          padding: '10px',
          border: '1px solid black',
          zIndex: 10002,
          fontSize: '12px'
        }}>
          Map Modal Open: {isMapModalOpen.toString()}
        </div>
      )}
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
              src={bookData.mapUrl}
              alt="World Map"
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