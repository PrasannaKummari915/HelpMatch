'use client';

import { useState } from 'react';
import { useIssues } from '@/context/IssueContext';
import type { Issue } from '@/lib/mockData';

export default function AdminDashboard() {
  const { issues, volunteers, updateIssueStatus, assignVolunteer, resetData } = useIssues();
  const [assigningTo, setAssigningTo] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('issueId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, status: Issue['status']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('issueId');
    if (id) {
      updateIssueStatus(id, status);
    }
  };

  const Column = ({ title, status }: { title: string, status: Issue['status'] }) => {
    const items = issues.filter(i => i.status === status);
    
    return (
      <div 
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
        style={{ flex: 1, background: '#f1f5f9', padding: '1rem', borderRadius: '12px', minHeight: '500px' }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title} ({items.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map(issue => (
            <div 
              key={issue.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, issue.id)}
              className="card" 
              style={{ cursor: 'grab', background: '#fff', borderLeft: `4px solid ${issue.severity === 'High' ? 'var(--color-urgent)' : issue.severity === 'Medium' ? 'var(--color-medium)' : 'var(--color-safe)'}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>{issue.type}</span>
                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: issue.severity === 'High' ? '#fee2e2' : '#fef9c3', color: issue.severity === 'High' ? '#b91c1c' : '#a16207' }}>
                  {issue.severity}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>📍 {issue.location.name}</p>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{issue.description.substring(0, 40)}...</p>
              
              {issue.status === 'In Progress' && issue.assignedVolunteerId && (
                <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  👤 Assigned: {volunteers.find(v => v.id === issue.assignedVolunteerId)?.name || 'Unknown'}
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {status === 'Pending' && (
                  <>
                    {assigningTo === issue.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                         <select 
                          className="card"
                          style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%' }}
                          onChange={(e) => {
                            if (e.target.value) {
                              assignVolunteer(issue.id, e.target.value);
                              setAssigningTo(null);
                            }
                          }}
                        >
                          <option value="">Select Volunteer</option>
                          {volunteers.map(v => (
                            <option key={v.id} value={v.id}>{v.name} ({v.skills.join(', ')})</option>
                          ))}
                        </select>
                        <button onClick={() => setAssigningTo(null)} style={{ fontSize: '0.7rem', color: 'var(--color-urgent)', border: 'none', background: 'none' }}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setAssigningTo(issue.id)} className="btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}>Assign Volunteer</button>
                    )}
                  </>
                )}
                {status === 'In Progress' && <button onClick={() => updateIssueStatus(issue.id, 'Resolved')} className="btn-primary" style={{ background: 'var(--color-safe)', width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}>Mark Resolved</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>📊 Admin Dashboard</h1>
          <p style={{ color: '#64748b' }}>Task management and real-time operations board. Drag and drop cards to change status.</p>
        </div>
        <button onClick={resetData} className="btn-primary" style={{ background: '#ef4444', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
          Reset Demo Data
        </button>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        <Column title="Pending" status="Pending" />
        <Column title="In Progress" status="In Progress" />
        <Column title="Resolved" status="Resolved" />
      </div>
    </div>
  );
}
