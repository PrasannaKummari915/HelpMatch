import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HelpMatch AI',
  description: 'Real-Time Smart Resource Allocation System',
};

import { IssueProvider } from '@/context/IssueContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <IssueProvider>
          <Navbar />
          <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
            {children}
          </main>
          
          {/* Floating Emergency Button Wrapper */}
          <div id="emergency-button-portal"></div>
        </IssueProvider>
      </body>
    </html>
  );
}
