import React from 'react';
import type { Chapter } from '../models/Chapter';

interface ChapterTimelineProps {
  chapters: Chapter[];
}

export const ChapterTimeline: React.FC<ChapterTimelineProps> = ({ chapters }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 220,
      height: '100vh',
      background: 'rgba(255,255,255,0.95)',
      borderLeft: '2px solid #eee',
      overflowY: 'auto',
      zIndex: 10,
      padding: '24px 12px',
      boxSizing: 'border-box',
    }}>
      <h2 style={{ fontSize: 18, margin: '0 0 16px 0', textAlign: 'center' }}>Chapters</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {chapters.map((chapter) => (
          <li key={chapter.index} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>Chapter {chapter.index}</div>
            <div style={{ fontSize: 14, color: '#555' }}>{chapter.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 