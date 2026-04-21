'use client';

import { useIssues } from '@/context/IssueContext';
import { useState } from 'react';
import type { Issue } from '@/lib/mockData';

export default function MapView() {
  const { issues } = useIssues();
  const [filter, setFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const filteredIssues = filter === 'All' 
    ? issues 
    : issues.filter(i => i.severity === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100vh - 100px)' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📍 Live Map Tracking</h1>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['All', 'High', 'Medium', 'Low'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: filter === f ? 'var(--color-primary)' : 'var(--card-bg)',
              color: filter === f ? '#fff' : 'inherit',
              border: `1px solid ${filter === f ? 'transparent' : 'var(--card-border)'}`
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Mock Map Area */}
      <div className="card" style={{ flex: 1, position: 'relative', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <p style={{ color: '#64748b', zIndex: 1 }}>Google Map View rendering here...</p>
        
        {/* Render Mock Markers */}
        {filteredIssues.map((issue, idx) => {
          // Dummy placement logic based on ID index
          const numericId = parseInt(issue.id) || idx;
          const topStr = `${((numericId * 37) % 80) + 10}%`;
          const leftStr = `${((numericId * 53) % 80) + 10}%`;
          
          const color = issue.severity === 'High' ? 'var(--color-urgent)' : issue.severity === 'Medium' ? 'var(--color-medium)' : 'var(--color-safe)';

          return (
            <div 
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              title={`${issue.title} (${issue.peopleAffected} people)`}
              style={{
                position: 'absolute',
                top: topStr,
                left: leftStr,
                width: '24px',
                height: '24px',
                backgroundColor: color,
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                zIndex: 10
              }}
            ></div>
          );
        })}

        {/* Selected Issue Popup */}
        {selectedIssue && (
          <div style={{ position: 'absolute', bottom: '2rem', background: '#fff', padding: '1rem', borderRadius: '8px', zIndex: 100, boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontWeight: 'bold' }}>{selectedIssue.type} - {selectedIssue.severity}</h3>
            <p>{selectedIssue.description}</p>
            <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Location: {selectedIssue.location.name}</p>
            <button onClick={() => setSelectedIssue(null)} className="btn-primary" style={{ padding: '0.25rem 0.5rem', marginTop: '0.5rem' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
