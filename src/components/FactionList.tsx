import React, { useState, useMemo } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import Fuse from 'fuse.js';
import type { Faction } from '../models/Faction';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';

interface FactionListProps {
  factions: Faction[];
  bookData: BookData;
  onCharacterClick?: (character: Character) => void;
}

export const FactionList: React.FC<FactionListProps> = ({ factions, bookData, onCharacterClick }) => {
  const [expandedFactions, setExpandedFactions] = useState<Set<string>>(new Set());
  const [showAllFactions, setShowAllFactions] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Get all factions from the book data
  const allFactions = useMemo(() => bookData.factions || [], [bookData.factions]);
  
  // Create fuzzy search instance for factions
  const fuseOptions = useMemo(() => ({
    keys: ['title'],
    threshold: 0.6,
    includeScore: true,
    minMatchCharLength: 1
  }), []);
  
  const fuse = useMemo(() => new Fuse(allFactions, fuseOptions), [allFactions, fuseOptions]);
  
  // Use fuzzy search for filtering
  const displayFactions = useMemo(() => {
    const factionsToSearch = showAllFactions ? allFactions : factions;
    
    if (!filterText.trim()) {
      return factionsToSearch.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    const results = fuse.search(filterText);
    return results
      .filter(result => result.score && result.score < 0.7)
      .map(result => result.item)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [showAllFactions, factions, allFactions, filterText, fuse]);

  // Only return null if there are no factions at all (not just no filtered results)
  if (!factions || factions.length === 0) {
    return null;
  }

  const toggleFaction = (factionId: string) => {
    const newExpanded = new Set(expandedFactions);
    if (newExpanded.has(factionId)) {
      newExpanded.delete(factionId);
    } else {
      newExpanded.add(factionId);
    }
    setExpandedFactions(newExpanded);
  };

  return (
    <div style={{
      background: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '2px solid #333',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      width: '100%',
      height: '30vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px' 
        }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>
            Factions:
          </div>
          <FormControl size="small">
            <RadioGroup
              row
              value={showAllFactions ? 'all' : 'chapter'}
              onChange={(e) => setShowAllFactions(e.target.value === 'all')}
            >
              <FormControlLabel
                value="chapter"
                control={<Radio size="small" />}
                label="Chapter"
                sx={{ 
                  fontSize: '10px', 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '10px',
                    color: '#000'
                  } 
                }}
              />
              <FormControlLabel
                value="all"
                control={<Radio size="small" />}
                label="All"
                sx={{ 
                  fontSize: '10px', 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '10px',
                    color: '#000'
                  } 
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        
        {/* Filter Input */}
        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="Filter factions..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
                          style={{
                width: '90%',
                padding: '4px 8px',
                fontSize: '11px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#000'
              }}
          />
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#c1c1c1 #f1f1f1'
        }}>
          {displayFactions.length === 0 ? (
            <div style={{
              fontSize: '11px',
              color: '#666',
              padding: '8px',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              No factions match your filter
            </div>
          ) : (
            displayFactions.map((faction) => (
          <div key={faction.id}>
            <div 
              onClick={() => toggleFaction(faction.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: faction.color,
                border: '2px solid #333',
                borderRadius: '3px',
              }} />
              <span style={{ 
                fontSize: '13px', 
                color: '#000', 
                fontWeight: '500',
                flex: 1
              }}>
                {faction.title}
              </span>
              <span style={{ 
                fontSize: '12px', 
                color: '#666',
                transition: 'transform 0.2s ease',
                transform: expandedFactions.has(faction.id) ? 'rotate(90deg)' : 'rotate(0deg)'
              }}>
                ▶
              </span>
            </div>
            {expandedFactions.has(faction.id) && (
              <div style={{
                fontSize: '12px',
                color: '#666',
                padding: '8px 12px',
                marginTop: '4px',
                marginLeft: '24px',
                backgroundColor: '#f1f3f4',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                lineHeight: '1.4',
                position: 'relative',
                zIndex: 1005
              }}>
                {faction.description && (
                  <div style={{ marginBottom: '8px' }}>
                    {faction.description}
                  </div>
                )}
                
                {/* Characters in this faction */}
                {(() => {
                  const factionCharacters = bookData.characters.filter(character => 
                    character.factions.includes(faction.id)
                  );
                  
                  if (factionCharacters.length > 0) {
                    return (
                      <div>
                        <div style={{ 
                          fontSize: '11px', 
                          fontWeight: 'bold', 
                          color: '#333',
                          marginBottom: '4px',
                          borderTop: '1px solid #e0e0e0',
                          paddingTop: '6px'
                        }}>
                          Characters ({factionCharacters.length}):
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '2px' 
                        }}>
                          {factionCharacters.map(character => (
                            <div key={character.id} style={{
                              fontSize: '11px',
                              color: '#555',
                              padding: '2px 0',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: onCharacterClick ? 'pointer' : 'default'
                            }}
                            onClick={() => onCharacterClick?.(character)}
                            onMouseEnter={(e) => {
                              if (onCharacterClick) {
                                e.currentTarget.style.color = '#007bff';
                                e.currentTarget.style.textDecoration = 'underline';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (onCharacterClick) {
                                e.currentTarget.style.color = '#555';
                                e.currentTarget.style.textDecoration = 'none';
                              }
                            }}
                            >
                              <span style={{ fontSize: '8px' }}>👤</span>
                              <span>{character.name}</span>
                              {character.aliases.length > 0 && (
                                <span style={{ 
                                  fontSize: '10px', 
                                  color: '#888',
                                  fontStyle: 'italic'
                                }}>
                                  ({character.aliases[0]})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}
          </div>
        ))
        )}
      </div>
    </div>
  );
}; 