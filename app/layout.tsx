import './shared/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doc SP',
  description: 'Document Signing Platform (DSP-service)',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}