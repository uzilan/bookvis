import React, { useState } from 'react';
import type { Character } from '../models/Character';
import type { BookData } from '../models/BookData';

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
  const [filterText, setFilterText] = useState('');

  // Filter characters based on search text
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(filterText.toLowerCase()) ||
    character.aliases.some(alias => alias.toLowerCase().includes(filterText.toLowerCase()))
  );

  // Sort characters alphabetically
  const sortedCharacters = filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{
      background: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '2px solid #333',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      width: '100%',
      maxHeight: '400px',
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
        <span style={{ fontSize: '12px', color: '#666' }}>
          {sortedCharacters.length}/{characters.length}
        </span>
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
      </div>

      {/* Characters List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginBottom: '8px',
        flex: 1,
        overflowY: 'auto',
        maxHeight: '300px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1'
      }}>
        {sortedCharacters.length > 0 ? (
          sortedCharacters.map((character) => {
            // Get character's current factions and their colors
            const currentFactions = character.factions.map(factionId => {
              const faction = bookData.factions.find(f => f.id === factionId);
              return faction;
            }).filter(Boolean);

            const factionColors = currentFactions.map(f => f!.color);

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
                      {currentFactions.map(f => f!.title).join(', ')}
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