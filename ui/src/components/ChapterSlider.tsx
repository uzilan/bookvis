import React from 'react';
import type { Chapter } from '../models/Chapter';

interface ChapterSliderProps {
  chapters: Chapter[];
  value: number;
  onChange: (index: number) => void;
}

export const ChapterSlider: React.FC<ChapterSliderProps> = ({ chapters, value, onChange }) => {
  // Invert the value for the slider so that top = 0 (first chapter)
  const invertedValue = chapters.length - 1 - value;
  const handleChange = (v: number) => onChange(chapters.length - 1 - v);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 220, // Place next to the timeline (timeline is 220px wide)
      width: 180,
      height: '100vh',
      background: 'rgba(255,255,255,0.95)',
      borderLeft: '2px solid #eee',
      zIndex: 20,
      padding: '24px 0',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <input
        id="chapter-slider"
        type="range"
        min={0}
        max={chapters.length - 1}
        value={invertedValue}
        onChange={e => handleChange(Number(e.target.value))}
        style={{
          WebkitAppearance: 'slider-vertical',
          width: 40,
          height: '70vh',
          margin: '0 8px 0 0',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '70vh', justifyContent: 'space-between' }}>
        {chapters.map((chapter, idx) => (
          <div key={chapter.index} style={{ fontSize: 12, color: idx === value ? '#111' : '#888', fontWeight: idx === value ? 'bold' : 'normal', textAlign: 'left', minHeight: 0 }}>
            {chapter.title}
          </div>
        ))}
      </div>
    </div>
  );
}; 