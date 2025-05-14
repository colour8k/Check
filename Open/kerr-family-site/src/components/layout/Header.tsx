'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href || 
                  (href !== '/' && pathname?.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
    >
      {label}
    </Link>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-primary">Kerr Family Genealogy</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/family-tree" label="Family Tree" />
            <NavLink href="/people" label="People" />
            <NavLink href="/places" label="Places" />
            <NavLink href="/stories" label="Stories" />
            <NavLink href="/about" label="About" />
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <NavLink href="/" label="Home" />
              <NavLink href="/family-tree" label="Family Tree" />
              <NavLink href="/people" label="People" />
              <NavLink href="/places" label="Places" />
              <NavLink href="/stories" label="Stories" />
              <NavLink href="/about" label="About" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};