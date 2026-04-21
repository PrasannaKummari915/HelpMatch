'use client';

import { useIssues } from '@/context/IssueContext';
import Link from 'next/link';

export default function Home() {
  const { issues } = useIssues();
  
  const highPriority = issues.filter(i => i.severity === 'High').length;
  const medPriority = issues.filter(i => i.severity === 'Medium').length;
  const resolved = issues.filter(i => i.status === 'Resolved').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👋 Hello, User</h1>
        <p style={{ color: '#64748b' }}>Here is the real-time crisis overview.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderColor: 'var(--color-urgent)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-urgent)' }}>{highPriority}</span>
          <span>High Urgency</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderColor: 'var(--color-medium)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-medium)' }}>{medPriority}</span>
          <span>Medium priority</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderColor: 'var(--color-safe)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-safe)' }}>{resolved}</span>
          <span>Resolved</span>
        </div>
      </section>

      <section className="card" style={{ background: '#f8fafc' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>📊 Smart Insights</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Most affected:</strong> Area A (Flood)</li>
          <li><strong>Top issue:</strong> Water shortage</li>
        </ul>
      </section>

      <section style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/report" className="btn-primary" style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>+ Report Issue</Link>
        <Link href="/map" className="card" style={{ flex: 1, textAlign: 'center', padding: '1rem', background: '#e2e8f0', color: '#1e293b', fontWeight: 'bold' }}>📍 View Map</Link>
      </section>

      <Link href="/report" className="btn-emergency">
        🚨 Emergency
      </Link>
    </div>
  );
}
