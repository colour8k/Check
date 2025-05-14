'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for places - in a real implementation, this would come from a database or API
const placesMockData = [
  {
    id: 'kerr-creek-road',
    name: 'Kerr Creek Road',
    location: 'Three Rivers/Sturgis area, Michigan',
    type: 'geographic',
    significance: 'Named after the Kerr family, suggesting significant historical presence',
    branch: 'paternal',
    image: null
  },
  {
    id: 'jefferson-road',
    name: 'Jefferson Road Home',
    location: 'Otsego/Plainwell area, Michigan',
    type: 'residence',
    significance: 'Multi-generational family home passed down from Donna Mowry',
    branch: 'maternal',
    image: null
  },
  {
    id: 'three-rivers-sturgis',
    name: 'Three Rivers/Sturgis Area',
    location: 'St. Joseph County, Michigan',
    type: 'community',
    significance: 'Center of the paternal Kerr line',
    branch: 'paternal',
    image: null
  },
  {
    id: 'otsego-plainwell',
    name: 'Otsego/Plainwell Area',
    location: 'Allegan County, Michigan',
    type: 'community',
    significance: 'Center of the maternal line (Mowry/Lowe)',
    branch: 'maternal',
    image: null
  },
  {
    id: 'california-residence',
    name: 'Otsuka Family Residence',
    location: 'California',
    type: 'residence',
    significance: 'Home of Vanessa Kerr Otsuka and her family',
    branch: 'california',
    image: null
  },
  {
    id: 'louisiana-residence',
    name: 'Jeremy Kerr Residence',
    location: 'Louisiana',
    type: 'residence',
    significance: 'Home of Jeremy Kerr, representing the family\'s southern connection',
    branch: 'louisiana',
    image: null
  },
  {
    id: 'kalamazoo',
    name: 'Kalamazoo',
    location: 'Michigan',
    type: 'community',
    significance: 'Birthplace of George Richard Mowry (January 25, 1927) and current residence of Ryan Kerr',
    branch: 'mixed',
    image: null
  },
  {
    id: 'grand-rapids',
    name: 'Grand Rapids',
    location: 'Michigan',
    type: 'community',
    significance: 'Current residence of Jeff Kerr',
    branch: 'core',
    image: null
  }
];

type PlaceType = 'all' | 'residence' | 'community' | 'geographic';
type Branch = 'all' | 'paternal' | 'maternal' | 'california' | 'louisiana' | 'core' | 'mixed';

export default function Places() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PlaceType>('all');
  const [branchFilter, setBranchFilter] = useState<Branch>('all');
  
  // Filter places based on search and filters
  const filteredPlaces = placesMockData.filter(place => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      place.name.toLowerCase().includes(searchLower) ||
      place.location.toLowerCase().includes(searchLower) ||
      place.significance.toLowerCase().includes(searchLower);
    
    // Type filter
    const matchesType = typeFilter === 'all' || place.type === typeFilter;
    
    // Branch filter
    const matchesBranch = branchFilter === 'all' || place.branch === branchFilter;
    
    return matchesSearch && matchesType && matchesBranch;
  });
  
  // Render a place card
  const PlaceCard = ({ place }: { place: typeof placesMockData[0] }) => {
    // Branch color
    const branchColor = 
      place.branch === 'paternal' ? 'border-primary' : 
      place.branch === 'maternal' ? 'border-secondary' :
      place.branch === 'california' ? 'border-green-600' :
      place.branch === 'louisiana' ? 'border-yellow-600' :
      place.branch === 'core' ? 'border-purple-600' :
      'border-gray-400';
    
    return (
      <Link href={`/places/${place.id}`} className={`block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 ${branchColor} p-4`}>
        {place.image ? (
          <div className="h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
            <img 
              src={place.image} 
              alt={place.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
        )}
        
        <h3 className="text-lg font-medium mb-1">{place.name}</h3>
        <p className="text-text-light text-sm mb-2">{place.location}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full 
            ${place.type === 'residence' ? 'bg-blue-100 text-blue-800' : 
            place.type === 'community' ? 'bg-purple-100 text-purple-800' :
            place.type === 'geographic' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'}`}>
            {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
          </span>
          
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full 
            ${place.branch === 'paternal' ? 'bg-primary/10 text-primary' : 
            place.branch === 'maternal' ? 'bg-secondary/10 text-secondary' :
            place.branch === 'california' ? 'bg-green-100 text-green-800' :
            place.branch === 'louisiana' ? 'bg-yellow-100 text-yellow-800' :
            place.branch === 'core' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'}`}>
            {place.branch.charAt(0).toUpperCase() + place.branch.slice(1)} Branch
          </span>
        </div>
        
        <p className="text-sm text-text-light line-clamp-2">{place.significance}</p>
      </Link>
    );
  };
  
  return (
    <PageLayout>
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading">Places</h1>
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
                  <span className="text-white">Places</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="md:flex md:justify-between md:items-end space-y-4 md:space-y-0">
              <div className="flex-grow">
                <h2 className="text-xl font-heading mb-2">Significant Places</h2>
                <p className="text-text-light">Explore locations with significance to the Kerr family history</p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <div>
                <label className="block text-sm text-text-light mb-1">Place Type:</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as PlaceType)}
                >
                  <option value="all">All Types</option>
                  <option value="residence">Residences</option>
                  <option value="community">Communities</option>
                  <option value="geographic">Geographic Features</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-text-light mb-1">Family Branch:</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value as Branch)}
                >
                  <option value="all">All Branches</option>
                  <option value="paternal">Paternal</option>
                  <option value="maternal">Maternal</option>
                  <option value="california">California</option>
                  <option value="louisiana">Louisiana</option>
                  <option value="core">Core Family</option>
                  <option value="mixed">Mixed/Multiple</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="text-center p-6 bg-primary/5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-primary mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <h3 className="text-xl font-heading mb-3">Interactive Map Coming Soon</h3>
              <p className="text-text-light max-w-2xl mx-auto">
                The full implementation will include an interactive map showing all significant 
                locations in the Kerr family history, with filters for time periods and family branches. 
                Users will be able to visualize migration patterns and explore geographic connections.
              </p>
            </div>
          </div>
          
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-background-alt rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-text-light mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <h3 className="text-xl font-heading mb-2">No places match your filters</h3>
              <p className="text-text-light">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-8 bg-background-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading mb-6">Geographic Centers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Michigan */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Michigan Centers</h3>
              <p className="text-text-light mb-4">
                The Kerr family has deep roots in Michigan, with two primary centers: the Three Rivers/Sturgis area 
                for the paternal line and the Otsego/Plainwell area for the maternal line. Significant locations include 
                Kerr Creek Road and the Jefferson Road home.
              </p>
              <Link href="/places/category/michigan" className="text-primary font-medium hover:text-primary-light">
                Explore Michigan Locations →
              </Link>
            </div>
            
            {/* Out of State */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Beyond Michigan</h3>
              <p className="text-text-light mb-4">
                The family has expanded beyond Michigan, with branches in California through Vanessa Kerr Otsuka's family 
                and in Louisiana through Jeremy Kerr. There are also international connections related to Steve Kerr's 
                overseas activities.
              </p>
              <Link href="/places/category/beyond-michigan" className="text-primary font-medium hover:text-primary-light">
                Explore Beyond Michigan →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}