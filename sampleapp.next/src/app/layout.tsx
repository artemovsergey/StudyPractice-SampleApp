// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/services/useAuth';


export const metadata: Metadata = {
  title: 'SampleApp',
  description: 'Приложение мини-твиттера на Next.js',
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}