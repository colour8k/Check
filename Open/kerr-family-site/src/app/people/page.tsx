'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for people - in a real implementation, this would come from a database or API
const peopleMockData = [
  {
    id: 'jeff-kerr',
    firstName: 'Jeff',
    lastName: 'Kerr',
    birthDate: 'August 6, 1977',
    branch: 'core',
    generation: 3,
    photo: null
  },
  {
    id: 'don-kerr',
    firstName: 'Don',
    lastName: 'Kerr',
    birthDate: 'December 8, circa 1950',
    branch: 'paternal',
    generation: 2,
    photo: null
  },
  {
    id: 'debby-kerr',
    firstName: 'Debby',
    lastName: 'Kerr',
    maidenName: 'Mowry',
    birthDate: 'February 3, circa 1948',
    branch: 'maternal',
    generation: 2,
    photo: null
  },
  {
    id: 'linsey-kerr',
    firstName: 'Linsey',
    lastName: 'Kerr',
    birthDate: 'December 13',
    branch: 'core',
    generation: 3,
    photo: null
  },
  {
    id: 'donald-kerr',
    firstName: 'Donald',
    lastName: 'Kerr',
    branch: 'paternal',
    generation: 1,
    photo: null
  },
  {
    id: 'loraine-kerr',
    firstName: 'Loraine',
    lastName: 'Kerr',
    branch: 'paternal',
    generation: 1,
    photo: null
  },
  {
    id: 'donna-mowry',
    firstName: 'Donna',
    lastName: 'Mowry',
    birthDate: null,
    deathDate: 'circa 1984',
    branch: 'maternal',
    generation: 1,
    photo: null
  },
  {
    id: 'george-richard-mowry',
    firstName: 'George Richard',
    lastName: 'Mowry',
    birthDate: 'January 25, 1927',
    deathDate: 'October 8, 1955',
    branch: 'maternal',
    generation: 1,
    photo: null
  },
  {
    id: 'norman-bud-lowe',
    firstName: 'Norman William "Bud"',
    lastName: 'Lowe',
    deathDate: 'October 3, 1989',
    branch: 'maternal',
    generation: 1,
    photo: null
  },
  {
    id: 'steve-kerr',
    firstName: 'Steve',
    lastName: 'Kerr',
    branch: 'paternal',
    generation: 2,
    photo: null
  },
  {
    id: 'vanessa-kerr-otsuka',
    firstName: 'Vanessa',
    lastName: 'Kerr Otsuka',
    branch: 'california',
    generation: 2,
    photo: null
  },
  {
    id: 'sharron-kerr',
    firstName: 'Sharron',
    lastName: 'Kerr',
    branch: 'paternal',
    generation: 2,
    photo: null
  },
  {
    id: 'jeremy-kerr',
    firstName: 'Jeremy',
    lastName: 'Kerr',
    branch: 'louisiana',
    generation: 3,
    photo: null
  }
];

type Branch = 'all' | 'core' | 'paternal' | 'maternal' | 'california' | 'louisiana';
type Generation = 'all' | 1 | 2 | 3 | 4;

const PersonCard = ({ person }: { person: typeof peopleMockData[0] }) => {
  return (
    <Link href={`/people/${person.id}`} className="person-card block hover:border-l-primary-light">
      <h3 className="text-lg font-heading">
        {person.firstName} {person.lastName}
        {person.maidenName && <span className="text-text-light text-sm"> (née {person.maidenName})</span>}
      </h3>
      
      <div className="mt-2 text-text-light text-sm">
        {person.birthDate && <span>{person.birthDate}</span>}
        {person.birthDate && person.deathDate && <span> - </span>}
        {person.deathDate && <span>{person.deathDate}</span>}
        {!person.birthDate && !person.deathDate && <span>Dates unknown</span>}
      </div>
      
      <div className="mt-2">
        <span className={`inline-block px-2 py-0.5 text-xs rounded-full mr-2 
          ${person.branch === 'paternal' ? 'bg-primary/10 text-primary' : 
          person.branch === 'maternal' ? 'bg-secondary/10 text-secondary' :
          person.branch === 'california' ? 'bg-green-100 text-green-800' :
          person.branch === 'louisiana' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'}`}>
          {person.branch.charAt(0).toUpperCase() + person.branch.slice(1)}
        </span>
        <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
          Generation {person.generation}
        </span>
      </div>
    </Link>
  );
};

export default function People() {
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState<Branch>('all');
  const [generationFilter, setGenerationFilter] = useState<Generation>('all');
  
  // Filter people based on search and filters
  const filteredPeople = peopleMockData.filter(person => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      person.firstName.toLowerCase().includes(searchLower) ||
      person.lastName.toLowerCase().includes(searchLower) ||
      (person.maidenName && person.maidenName.toLowerCase().includes(searchLower));
    
    // Branch filter
    const matchesBranch = branchFilter === 'all' || person.branch === branchFilter;
    
    // Generation filter
    const matchesGeneration = generationFilter === 'all' || person.generation === generationFilter;
    
    return matchesSearch && matchesBranch && matchesGeneration;
  });

  return (
    <PageLayout>
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading">People</h1>
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
                  <span className="text-white">People</span>
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
                <h2 className="text-xl font-heading mb-2">Family Members</h2>
                <p className="text-text-light">Browse profiles of Kerr family members across generations</p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search by name..."
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
                <label className="block text-sm text-text-light mb-1">Branch:</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value as Branch)}
                >
                  <option value="all">All Branches</option>
                  <option value="core">Core Family</option>
                  <option value="paternal">Paternal Line</option>
                  <option value="maternal">Maternal Line</option>
                  <option value="california">California Branch</option>
                  <option value="louisiana">Louisiana Connection</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-text-light mb-1">Generation:</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={generationFilter}
                  onChange={(e) => setGenerationFilter(Number(e.target.value) as Generation || 'all')}
                >
                  <option value="all">All Generations</option>
                  <option value="1">Generation 1</option>
                  <option value="2">Generation 2</option>
                  <option value="3">Generation 3</option>
                  <option value="4">Generation 4</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredPeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map(person => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-background-alt rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-text-light mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <h3 className="text-xl font-heading mb-2">No people match your filters</h3>
              <p className="text-text-light">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-8 bg-background-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading mb-6">Family Branches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paternal Line */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Paternal Line</h3>
              <p className="text-text-light mb-4">
                The paternal Kerr line includes Donald and Loraine Kerr, their children (Don, Steve, Vanessa, and Sharron),
                and their descendants. The family has deep roots in the Three Rivers/Sturgis area of Michigan, including the 
                significant Kerr Creek Road location.
              </p>
              <div className="flex justify-between items-center">
                <Link 
                  href="/people/category/paternal" 
                  className="text-primary font-medium hover:text-primary-light"
                >
                  View Paternal Line →
                </Link>
                <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {peopleMockData.filter(p => p.branch === 'paternal').length} people
                </span>
              </div>
            </div>
            
            {/* Maternal Line */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Maternal Line</h3>
              <p className="text-text-light mb-4">
                The maternal line includes Donna Mowry, George Richard Mowry, and Norman "Bud" Lowe, representing
                a complex family structure centered in the Otsego/Plainwell area. This line includes the significant
                Jefferson Road home that served as a multi-generational anchor.
              </p>
              <div className="flex justify-between items-center">
                <Link 
                  href="/people/category/maternal" 
                  className="text-primary font-medium hover:text-primary-light"
                >
                  View Maternal Line →
                </Link>
                <span className="text-sm bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                  {peopleMockData.filter(p => p.branch === 'maternal').length} people
                </span>
              </div>
            </div>
            
            {/* California Branch */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">California Branch</h3>
              <p className="text-text-light mb-4">
                The California branch centers around Vanessa Kerr Otsuka and her family, representing
                the family's westward expansion. This branch includes the intercultural Kerr-Otsuka family
                and their children Evan and Bobby.
              </p>
              <div className="flex justify-between items-center">
                <Link 
                  href="/people/category/california" 
                  className="text-primary font-medium hover:text-primary-light"
                >
                  View California Branch →
                </Link>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  {peopleMockData.filter(p => p.branch === 'california').length} people
                </span>
              </div>
            </div>
            
            {/* Louisiana Connection */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Louisiana Connection</h3>
              <p className="text-text-light mb-4">
                The Louisiana connection focuses on Jeremy Kerr, son of Steve Kerr from his first marriage,
                who moved from Michigan to Louisiana, representing the family's southern expansion.
              </p>
              <div className="flex justify-between items-center">
                <Link 
                  href="/people/category/louisiana" 
                  className="text-primary font-medium hover:text-primary-light"
                >
                  View Louisiana Connection →
                </Link>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  {peopleMockData.filter(p => p.branch === 'louisiana').length} people
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}