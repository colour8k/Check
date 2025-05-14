'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import { useState } from 'react';
import Link from 'next/link';

export default function FamilyTree() {
  const [viewMode, setViewMode] = useState<'vertical' | 'horizontal' | 'fan' | 'network'>('vertical');
  const [focusPerson, setFocusPerson] = useState('jeff-kerr');
  
  return (
    <PageLayout>
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading">Family Tree</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-white/90 hover:text-white">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-white/70 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="text-white">Family Tree</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Tree View Controls */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading mb-2">Interactive Family Tree</h2>
                <p className="text-text-light">Explore the Kerr family connections across generations</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center rounded-md overflow-hidden border border-gray-300">
                  <button 
                    className={`px-3 py-1.5 text-sm ${viewMode === 'vertical' ? 'bg-primary text-white' : 'bg-white text-text-light hover:bg-gray-100'}`}
                    onClick={() => setViewMode('vertical')}
                  >
                    Vertical
                  </button>
                  <button 
                    className={`px-3 py-1.5 text-sm ${viewMode === 'horizontal' ? 'bg-primary text-white' : 'bg-white text-text-light hover:bg-gray-100'}`}
                    onClick={() => setViewMode('horizontal')}
                  >
                    Horizontal
                  </button>
                  <button 
                    className={`px-3 py-1.5 text-sm ${viewMode === 'fan' ? 'bg-primary text-white' : 'bg-white text-text-light hover:bg-gray-100'}`}
                    onClick={() => setViewMode('fan')}
                  >
                    Fan Chart
                  </button>
                  <button 
                    className={`px-3 py-1.5 text-sm ${viewMode === 'network' ? 'bg-primary text-white' : 'bg-white text-text-light hover:bg-gray-100'}`}
                    onClick={() => setViewMode('network')}
                  >
                    Network
                  </button>
                </div>
                
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={focusPerson}
                  onChange={(e) => setFocusPerson(e.target.value)}
                >
                  <option value="jeff-kerr">Jeff Kerr</option>
                  <option value="don-kerr">Don Kerr</option>
                  <option value="debby-kerr">Debby Kerr</option>
                  <option value="donald-kerr">Donald Kerr (Paternal Grandfather)</option>
                  <option value="donna-mowry">Donna Mowry (Maternal Grandmother)</option>
                </select>
                
                <button className="px-3 py-1.5 text-sm bg-secondary text-white rounded-md hover:bg-secondary-light">
                  Reset View
                </button>
              </div>
            </div>
          </div>
          
          {/* Family Tree Visualization */}
          <div className="family-tree-container flex items-center justify-center mb-8">
            <div className="text-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-primary mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <h3 className="text-xl font-heading mb-2">Family Tree Visualization</h3>
              <p className="text-text-light mb-4">
                This is where the interactive family tree visualization will appear. The implementation
                requires D3.js and will be developed as part of the project.
              </p>
              <p className="text-text-light">
                The visualization will support multiple view types (vertical, horizontal, fan chart, and 
                network), zooming, panning, and focusing on different family members.
              </p>
            </div>
          </div>
          
          {/* Legend and Help */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-heading mb-2">Legend</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  <span>Male</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-pink-500 rounded-full mr-2"></span>
                  <span>Female</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                  <span>Other/Unknown</span>
                </li>
                <li className="flex items-center">
                  <span className="w-12 h-1 bg-gray-400 mr-2"></span>
                  <span>Marriage</span>
                </li>
                <li className="flex items-center">
                  <span className="w-12 h-1 border-t-2 border-dashed border-gray-400 mr-2"></span>
                  <span>Non-traditional relationship</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-heading mb-2">Family Branches</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-primary rounded-full mr-2"></span>
                  <span>Paternal Line (Kerr)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
                  <span>Maternal Line (Mowry/Lowe)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  <span>California Branch</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                  <span>Louisiana Connection</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-heading mb-2">How to Use</h3>
              <ul className="list-disc pl-5 space-y-1 text-text-light">
                <li>Click on any person to view their details</li>
                <li>Use mouse wheel or pinch to zoom in/out</li>
                <li>Click and drag to pan around the tree</li>
                <li>Use the view selector to change visualization type</li>
                <li>Select a different focus person to center the tree</li>
                <li>Click Reset View to return to the default view</li>
              </ul>
            </div>
          </div>
          
          {/* Key Families Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading mb-4">Key Family Groups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-xl font-heading mb-3">Paternal Line</h3>
                <p className="text-text-light mb-4">
                  Centered in the Three Rivers/Sturgis area of Michigan, the paternal Kerr line includes Donald and Loraine Kerr, 
                  their children Don, Steve, Vanessa, and Sharron, and their descendants.
                </p>
                <Link href="/people/category/paternal" className="text-primary font-medium hover:text-primary-light">
                  Explore Paternal Line →
                </Link>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-heading mb-3">Maternal Line</h3>
                <p className="text-text-light mb-4">
                  Centered in the Otsego/Plainwell area, the maternal line includes the complex relationships between Donna Mowry, 
                  George Richard Mowry, and Norman "Bud" Lowe.
                </p>
                <Link href="/people/category/maternal" className="text-primary font-medium hover:text-primary-light">
                  Explore Maternal Line →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Notable Relationships */}
          <div>
            <h2 className="text-2xl font-heading mb-4">Notable Relationships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-lg font-heading mb-2">Norman "Bud" Lowe as Chosen Father</h3>
                <p className="text-text-light mb-3">
                  A significant non-traditional relationship in the family history is Norman "Bud" Lowe's role as a father figure 
                  to Debby despite no biological connection.
                </p>
                <Link href="/stories/norman-bud-lowe" className="text-primary font-medium hover:text-primary-light">
                  Read Story →
                </Link>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-heading mb-2">The Kerr-Otsuka Connection</h3>
                <p className="text-text-light mb-3">
                  The intercultural marriage of Vanessa Kerr and Richard Otsuka represents an important 
                  expansion of the family's cultural diversity.
                </p>
                <Link href="/stories/kerr-otsuka-family" className="text-primary font-medium hover:text-primary-light">
                  Read Story →
                </Link>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-heading mb-2">Steve Kerr's Family Branches</h3>
                <p className="text-text-light mb-3">
                  Steve Kerr's children from two marriages have created multiple family branches spanning Michigan and Louisiana.
                </p>
                <Link href="/stories/steve-kerr-family" className="text-primary font-medium hover:text-primary-light">
                  Read Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}