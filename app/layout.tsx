import { Metadata } from 'next';
import { ReactNode } from 'react';
import QueryProvider from "./providers/QueryProvider";
import './shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'DSP Service',
  description: 'Document Signing Platform (DSP-service)',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}