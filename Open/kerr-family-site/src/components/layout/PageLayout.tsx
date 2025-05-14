'use client';

import { Header } from './Header';
import { Footer } from './Footer';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const PageLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};