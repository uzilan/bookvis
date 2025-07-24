import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import type { Character } from '../models/Character';
import type { BookData } from '../models/BookData';
import type { Faction } from '../models/Faction';

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
  const allCharacters = bookData.characters || [];
  
  // Use either chapter characters or all characters based on toggle, sorted alphabetically
  const displayCharacters = (showAllCharacters ? allCharacters : characters)
    .filter(character =>
      character.name.toLowerCase().includes(filterText.toLowerCase()) ||
      character.aliases.some(alias => alias.toLowerCase().includes(filterText.toLowerCase()))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

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
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#000'
      }}>
        <span>Characters:</span>
        <FormControl size="small">
          <RadioGroup
            row
            value={showAllCharacters ? 'all' : 'chapter'}
            onChange={(e) => setShowAllCharacters(e.target.value === 'all')}
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
            placeholder="Filter characters..."
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
          <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
            {displayCharacters.length}/{showAllCharacters ? allCharacters.length : characters.length}
          </div>
        </div>

      {/* Characters List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginBottom: '8px',
        flex: 1,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1'
      }}>
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
                style={{
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e9e9e9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                }}
              >
                {/* Character Icon */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: factionColors.length > 0 ? factionColors[0] : '#999',
                  border: '1px solid #333'
                }}>
                  {character.name.charAt(0).toUpperCase()}
                </div>

                {/* Character Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: '11px',
                    marginBottom: '2px'
                  }}>
                    {character.name}
                  </div>
                  {character.aliases.length > 0 && (
                    <div style={{
                      fontSize: '9px',
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      {character.aliases.join(', ')}
                    </div>
                  )}
                  {currentFactions.length > 0 && (
                    <div style={{
                      fontSize: '9px',
                      color: '#666',
                      marginTop: '2px'
                    }}>
                      {currentFactions.map((f: Faction) => f.title).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{
            padding: '12px',
            textAlign: 'center',
            color: '#666',
            fontSize: '11px',
            fontStyle: 'italic'
          }}>
            {filterText ? 'No characters match your filter' : 'No characters available'}
          </div>
        )}
      </div>
    </div>
  );
}; 