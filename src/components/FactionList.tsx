import React, { useState, useMemo } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import type { Faction } from '../models/Faction';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import { fuzzySearch } from '../utils/fuzzySearch';
import { classes } from '../styles';

interface FactionListProps {
  factions: Faction[];
  bookData: BookData;
  isPreview?: boolean;
  onCharacterClick?: (character: Character) => void;
}

export const FactionList: React.FC<FactionListProps> = ({ factions, bookData, isPreview = false, onCharacterClick }) => {
  const [expandedFactions, setExpandedFactions] = useState<Set<string>>(new Set());
  const [showAllFactions, setShowAllFactions] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Get all factions from the book data
  const allFactions = useMemo(() => bookData.factions || [], [bookData.factions]);
  
  // Use fuzzy search utility
  const displayFactions = useMemo(() => {
    const results = fuzzySearch(
      allFactions,
      factions,
      filterText,
      showAllFactions,
      { keys: ['title'] }
    );
    return results.sort((a, b) => a.title.localeCompare(b.title));
  }, [allFactions, factions, filterText, showAllFactions]);

  // Only return null if there are no factions at all (not just no filtered results)
  // But show empty state in preview mode
  if (!factions || factions.length === 0) {
    if (!isPreview) {
      return null;
    }
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
    <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>
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
            placeholder="Filter factions..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={classes.filterInput}
          />
        </div>
        <div className={classes.scrollableList}>
          {displayFactions.length === 0 ? (
            <div className={classes.emptyState}>
              {filterText ? 'No factions match your filter' : 'No factions available'}
            </div>
          ) : (
            displayFactions.map((faction) => (
          <div key={faction.id}>
            <div 
              onClick={() => toggleFaction(faction.id)}
              className={classes.listItem}
            >
              <div 
                className={classes.factionColor}
                style={{ backgroundColor: faction.color }}
              />
              <span className={classes.factionTitle}>
                {faction.title}
              </span>
              <span className={expandedFactions.has(faction.id) ? classes.iconExpanded : classes.iconCollapsed}>
                ▶
              </span>
            </div>
            {expandedFactions.has(faction.id) && (
              <div className={classes.expandedContent}>
                {faction.description && (
                  <div className={classes.description}>
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
                        <div className={classes.sectionTitle}>
                          Characters ({factionCharacters.length}):
                        </div>
                        <div className={classes.sectionList}>
                          {factionCharacters.map(character => (
                            <div key={character.id} 
                              className={classes.sectionItem}
                              onClick={() => onCharacterClick?.(character)}
                            >
                              <span className={classes.sectionIcon}>👤</span>
                              <span>{character.name}</span>
                              {character.aliases.length > 0 && (
                                <span className={classes.sectionAlias}>
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