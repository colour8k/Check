'use client';

import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">Kerr Family Genealogy</h3>
            <p className="text-white/80">
              Exploring family connections across generations and geographies, preserving our shared history for future generations.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/family-tree" className="text-white/80 hover:text-white transition-colors">Family Tree</Link>
              </li>
              <li>
                <Link href="/people" className="text-white/80 hover:text-white transition-colors">People</Link>
              </li>
              <li>
                <Link href="/places" className="text-white/80 hover:text-white transition-colors">Places</Link>
              </li>
              <li>
                <Link href="/stories" className="text-white/80 hover:text-white transition-colors">Stories</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-medium mb-4">Family Branches</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/people/category/paternal" className="text-white/80 hover:text-white transition-colors">Paternal Line</Link>
              </li>
              <li>
                <Link href="/people/category/maternal" className="text-white/80 hover:text-white transition-colors">Maternal Line</Link>
              </li>
              <li>
                <Link href="/places/category/california" className="text-white/80 hover:text-white transition-colors">California Branch</Link>
              </li>
              <li>
                <Link href="/places/category/louisiana" className="text-white/80 hover:text-white transition-colors">Louisiana Connection</Link>
              </li>
              <li>
                <Link href="/places/category/michigan" className="text-white/80 hover:text-white transition-colors">Michigan Roots</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-white/60">
          <p>© {currentYear} Kerr Family Genealogy Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};