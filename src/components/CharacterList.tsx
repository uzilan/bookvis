import React, { useState, useMemo } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import type { Character } from '../models/Character';
import type { BookData } from '../models/BookData';
import type { Faction } from '../models/Faction';
import { fuzzySearch } from '../utils/fuzzySearch';
import { classes } from '../styles';

interface CharacterListProps {
  characters: Character[];
  bookData: BookData;
  onCharacterClick: (character: Character) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ 
  characters, 
  bookData,
  onCharacterClick 
}) => {
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Get all characters from the book data
  const allCharacters = useMemo(() => bookData.characters || [], [bookData.characters]);
  
  // Use fuzzy search utility
  const displayCharacters = useMemo(() => {
    const results = fuzzySearch(
      allCharacters,
      characters,
      filterText,
      showAllCharacters,
      { keys: ['name', 'aliases'] }
    );
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }, [allCharacters, characters, filterText, showAllCharacters]);

  return (
    <div className={classes.container}>
      {/* Header */}
      <div className={classes.header}>
        <span>Characters:</span>
        <FormControl size="small">
          <RadioGroup
            row
            value={showAllCharacters ? 'all' : 'chapter'}
            onChange={(e) => setShowAllCharacters(e.target.value === 'all')}
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
            placeholder="Filter characters..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={classes.filterInput}
          />
        </div>

      {/* Characters List */}
      <div className={classes.scrollableList}>
        {displayCharacters.length > 0 ? (
          displayCharacters.map((character: Character) => {
            // Get character's current factions and their colors
            const currentFactions = character.factions.map((factionId: string) => {
              const faction = bookData.factions.find((f: Faction) => f.id === factionId);
              return faction;
            }).filter((f): f is Faction => f !== undefined);

            const factionColors = currentFactions.map((f: Faction) => f.color);

            return (
              <div
                key={character.id}
                onClick={() => onCharacterClick(character)}
                className={classes.listItem}
              >
                {/* Character Icon */}
                <div 
                  className={classes.characterIcon}
                  style={{
                    background: factionColors.length > 0 ? factionColors[0] : '#999',
                  }}
                >
                  {character.name.charAt(0).toUpperCase()}
                </div>

                {/* Character Info */}
                <div className={classes.characterInfo}>
                  <div className={classes.characterName}>
                    {character.name}
                  </div>
                  {character.aliases.length > 0 && (
                    <div className={classes.characterDescription}>
                      {character.aliases.join(', ')}
                    </div>
                  )}
                  {currentFactions.length > 0 && (
                    <div className={classes.characterDescription}>
                      {currentFactions.map((f: Faction) => f.title).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.emptyState}>
            {filterText ? 'No characters match your filter' : 'No characters available'}
          </div>
        )}
      </div>
    </div>
  );
}; 