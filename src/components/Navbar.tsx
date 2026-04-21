import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      background: 'var(--card-bg)', 
      borderBottom: '1px solid var(--card-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
        <Link href="/">HelpMatch AI</Link>
      </div>
      <nav style={{ display: 'flex', gap: '1.5rem', fontWeight: 500 }}>
        <Link href="/report" style={{ color: 'var(--color-urgent)', fontWeight: 'bold' }}>+ Report Issue</Link>
        <Link href="/map">Live Map</Link>
        <Link href="/volunteer">Volunteer</Link>
        <Link href="/admin">Admin</Link>
      </nav>
      <div>
        <span>User</span>
      </div>
    </header>
  );
}
