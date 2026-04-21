'use client';

import { useState } from 'react';
import { useIssues } from '@/context/IssueContext';
import { useRouter } from 'next/navigation';
import type { Issue } from '@/lib/mockData';

export default function ReportIssue() {
  const { addIssue } = useIssues();
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: 'Food' as Issue['type'],
    severity: 'Medium' as Issue['severity'],
    peopleAffected: 0,
    description: '',
    location: ''
  });

  const handleLocation = () => {
    // Generate slight random offsets to simulate different locations near base coordinate
    const lat = 17.3850 + (Math.random() - 0.5) * 0.1;
    const lng = 78.4867 + (Math.random() - 0.5) * 0.1;
    setFormData(prev => ({ ...prev, location: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}` }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
      alert("Please get location first.");
      return;
    }

    const newIssue: Issue = {
      id: Date.now().toString(),
      title: `${formData.type} issue reported`,
      type: formData.type,
      severity: formData.severity,
      peopleAffected: formData.peopleAffected,
      description: formData.description,
      location: { lat: 17.3850, lng: 78.4867, name: formData.location },
      status: 'Pending',
      priorityScore: formData.severity === 'High' ? 100 : formData.severity === 'Medium' ? 50 : 10,
      reportedAt: new Date().toISOString()
    };

    addIssue(newIssue);
    alert('Issue reported successfully!');
    router.push('/map'); // Navigate to map to see new issue
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>📥</span> Report an Issue
      </h1>

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Location */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>📍 Location</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              type="text" 
              value={formData.location} 
              readOnly 
              placeholder="Location not set"
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
            />
            <button type="button" onClick={handleLocation} className="btn-primary" style={{ padding: '0.75rem 1rem' }}>
              Use My Location
            </button>
          </div>
        </div>

        {/* Issue Type */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🏷️ Issue Type</label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Issue['type'] }))}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
          >
            <option value="Food">Food Shortage</option>
            <option value="Water">Water Crisis</option>
            <option value="Health">Medical / Health</option>
            <option value="Shelter">Shelter Needed</option>
            <option value="Disaster">Natural Disaster</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
            ⚠️ Severity: {formData.severity}
          </label>
          <input 
            type="range" 
            min="1" max="3" 
            value={formData.severity === 'Low' ? 1 : formData.severity === 'Medium' ? 2 : 3}
            onChange={(e) => {
              const val = e.target.value;
              setFormData(prev => ({ ...prev, severity: val === '1' ? 'Low' : val === '2' ? 'Medium' : 'High' }));
            }}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b' }}>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* People Affected */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>👥 People Affected</label>
          <input 
            type="number" 
            min="0"
            value={formData.peopleAffected}
            onChange={(e) => setFormData(prev => ({ ...prev, peopleAffected: parseInt(e.target.value) || 0 }))}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>📝 Description</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the situation..."
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}>
          Submit Issue
        </button>
      </form>
    </div>
  );
}
