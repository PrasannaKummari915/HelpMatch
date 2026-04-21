'use client';

import { useState } from 'react';
import { useIssues } from '@/context/IssueContext';

export default function VolunteerDashboard() {
  const { issues, volunteers, updateIssueStatus, assignVolunteer } = useIssues();
  const [currentVolunteerId, setCurrentVolunteerId] = useState('v3'); // Default to "You"

  const currentVolunteer = volunteers.find(v => v.id === currentVolunteerId);

  // Show issues that are:
  // 1. Pending (available for anyone)
  // 2. In Progress and assigned to THIS volunteer
  const relevantIssues = issues.filter(issue => 
    issue.status === 'Pending' || 
    (issue.status === 'In Progress' && issue.assignedVolunteerId === currentVolunteerId) ||
    (issue.status === 'Resolved' && issue.assignedVolunteerId === currentVolunteerId)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>🤝 Volunteer Dashboard</h1>
          <p style={{ color: '#64748b' }}>Manage your tasks and help your community.</p>
        </div>
        
        <div className="card" style={{ padding: '0.75rem', background: '#f8fafc' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Switch Profile (Mock Auth)</label>
          <select 
            value={currentVolunteerId} 
            onChange={(e) => setCurrentVolunteerId(e.target.value)}
            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--card-border)' }}
          >
            {volunteers.map(v => (
              <option key={v.id} value={v.id}>{v.name} ({v.points} pts)</option>
            ))}
          </select>
        </div>
      </header>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          {currentVolunteer?.name}'s Task Board
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {relevantIssues.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No tasks found for you right now.</p>
          ) : (
            relevantIssues.map(issue => (
              <div key={issue.id} className="card" style={{ 
                borderLeft: `6px solid ${issue.status === 'Resolved' ? 'var(--color-safe)' : issue.severity === 'High' ? 'var(--color-urgent)' : issue.severity === 'Medium' ? 'var(--color-medium)' : 'var(--color-safe)'}`,
                opacity: issue.status === 'Resolved' ? 0.7 : 1
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{issue.type} Issue</h3>
                      <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: '#f1f5f9' }}>
                        {issue.status}
                      </span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>📍 {issue.location.name} • 👥 {issue.peopleAffected} affected</p>
                    <p style={{ marginTop: '0.5rem' }}>{issue.description}</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {issue.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => assignVolunteer(issue.id, currentVolunteerId)} 
                          className="btn-primary" 
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          Accept Task
                        </button>
                      </>
                    )}
                    {issue.status === 'In Progress' && issue.assignedVolunteerId === currentVolunteerId && (
                      <>
                        <button className="btn-primary" style={{ background: '#0f172a', padding: '0.5rem 1rem' }}>Navigate</button>
                        <button 
                          onClick={() => updateIssueStatus(issue.id, 'Resolved')} 
                          className="btn-primary" 
                          style={{ background: 'var(--color-safe)', padding: '0.5rem 1rem' }}
                        >
                          Mark as Completed
                        </button>
                      </>
                    )}
                    {issue.status === 'Resolved' && (
                      <span style={{ color: 'var(--color-safe)', fontWeight: 'bold' }}>✓ Completed</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
