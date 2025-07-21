import React from 'react';
import type { Chapter } from '../models/Chapter';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

interface ChapterSliderProps {
  chapters: Chapter[];
  value: number;
  onChange: (index: number) => void;
}

export const ChapterSlider: React.FC<ChapterSliderProps> = ({ chapters, value, onChange }) => {
  // Invert the value for the slider so that top = 0 (first chapter)
  const invertedValue = chapters.length - 1 - value;
  const handleChange = (_: Event, v: number | number[]) => {
    const val = Array.isArray(v) ? v[0] : v;
    onChange(chapters.length - 1 - val);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 200,
        height: '100vh',
        background: 'rgba(255,255,255,0.98)',
        borderRight: '3px solid #ccc',
        zIndex: 1000,
        p: '24px 0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Slider
        orientation="vertical"
        min={0}
        max={chapters.length - 1}
        value={invertedValue}
        onChange={handleChange}
        sx={{
          height: '70vh',
          mr: 2,
        }}
        marks={chapters.map((chapter, idx) => ({
          value: chapters.length - 1 - idx,
          label: '' // We'll show labels separately
        }))}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '70vh', justifyContent: 'space-between' }}>
        {chapters.map((chapter, idx) => (
          <div
            key={chapter.index}
            style={{
              fontSize: 12,
              color: idx === value ? '#111' : '#888',
              fontWeight: idx === value ? 'bold' : 'normal',
              textAlign: 'left',
              minHeight: 0,
              cursor: 'pointer',
              textDecoration: idx === value ? 'underline' : 'none',
            }}
            onClick={() => onChange(idx)}
          >
            {chapter.title}
          </div>
        ))}
      </Box>
    </Box>
  );
}; 