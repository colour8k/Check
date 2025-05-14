'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import Link from 'next/link';
import { PersonCard } from '@/components/ui/PersonCard';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Mock data for the person profile - in a real implementation, this would come from a database or API
const personData = {
  id: 'jeff-kerr',
  firstName: 'Jeff',
  lastName: 'Kerr',
  birthDate: 'August 6, 1977',
  birthPlace: 'Michigan',
  branch: 'core' as const,
  generation: 3,
  photo: null,
  biography: `
    Jeff Kerr was born on August 6, 1977, to Don and Debby Kerr. He grew up in the Jefferson Road home 
    in the Otsego/Plainwell area of Michigan, a property with deep family significance that had been 
    passed down from his maternal grandmother, Donna Mowry.
    
    Jeff has two children, Jude and Lincon Kerr. He currently resides in Grand Rapids, Michigan, 
    approximately 50 miles north of his childhood home.
    
    As the primary family member documenting the Kerr family history, Jeff has taken a keen interest in 
    tracing both his paternal and maternal lineages, with particular focus on the family's geographic 
    expansion to California and Louisiana, as well as exploring the Scottish origins of the Kerr name.
  `,
  timelineEvents: [
    {
      date: 'August 6, 1977',
      title: 'Birth',
      description: 'Born to Don and Debby Kerr in Michigan',
      type: 'birth'
    },
    {
      date: 'circa 1984',
      title: 'Death of Grandmother',
      description: 'Jeff\'s maternal grandmother, Donna Mowry, passed away',
      type: 'family'
    }
    // Additional events would be listed here
  ],
  relationships: [
    {
      type: 'parent',
      person: {
        id: 'don-kerr',
        firstName: 'Don',
        lastName: 'Kerr',
        birthDate: 'December 8, circa 1950',
        branch: 'paternal' as const,
        generation: 2,
        photo: null
      }
    },
    {
      type: 'parent',
      person: {
        id: 'debby-kerr',
        firstName: 'Debby',
        lastName: 'Kerr',
        maidenName: 'Mowry',
        birthDate: 'February 3, circa 1948',
        branch: 'maternal' as const,
        generation: 2,
        photo: null
      }
    },
    {
      type: 'sibling',
      person: {
        id: 'linsey-kerr',
        firstName: 'Linsey',
        lastName: 'Kerr',
        birthDate: 'December 13',
        branch: 'core' as const,
        generation: 3,
        photo: null
      }
    },
    {
      type: 'child',
      person: {
        id: 'jude-kerr',
        firstName: 'Jude',
        lastName: 'Kerr',
        branch: 'core' as const,
        generation: 4,
        photo: null
      }
    },
    {
      type: 'child',
      person: {
        id: 'lincon-kerr',
        firstName: 'Lincon',
        lastName: 'Kerr',
        branch: 'core' as const,
        generation: 4,
        photo: null
      }
    }
  ],
  places: [
    {
      id: 'jefferson-road',
      name: 'Jefferson Road Home',
      description: 'Childhood home in Otsego/Plainwell area',
      significance: 'Multi-generational family home passed down from Donna Mowry'
    },
    {
      id: 'grand-rapids',
      name: 'Grand Rapids, Michigan',
      description: 'Current residence',
      significance: 'Located approximately 50 miles north of childhood home'
    }
  ],
  coolFacts: [
    'Documentation lead for the Kerr Family Genealogy Project',
    'Maintains connections with extended family across Michigan, California, and Louisiana',
    'Continuing the exploration of the family\'s Scottish ancestry'
  ],
  sources: [
    'Family records and recollections',
    'Birth certificate',
    'Family photographs'
  ]
};

// This would normally come from an API or database lookup based on the ID
const getPersonById = (id: string) => {
  // For demo purposes, we're just returning the mock data
  return personData;
};

export default function PersonProfile() {
  const params = useParams();
  const id = params.id as string;
  
  // In a real implementation, this would fetch data based on the ID
  const person = getPersonById(id);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'relationships' | 'places'>('overview');
  
  if (!person) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">Person not found. The requested profile does not exist.</p>
          </div>
          <Link href="/people" className="btn btn-primary">
            Back to People
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <nav className="flex mb-2" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-white/90 hover:text-white">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-white/70 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link href="/people" className="text-white/90 hover:text-white">People</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-white/70 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="text-white">{person.firstName} {person.lastName}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="text-4xl font-heading">
            {person.firstName} {person.lastName}
            {person.maidenName && <span className="text-white/90 text-3xl ml-2">(née {person.maidenName})</span>}
          </h1>
          
          <p className="text-white/90 text-lg">
            {person.birthDate && <span>{person.birthDate}</span>}
            {person.birthDate && person.birthPlace && <span> • </span>}
            {person.birthPlace && <span>{person.birthPlace}</span>}
          </p>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap mb-8 -mx-2">
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                {person.photo ? (
                  <div className="mb-4">
                    <img 
                      src={person.photo} 
                      alt={`${person.firstName} ${person.lastName}`} 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="mb-4 bg-primary/10 rounded-lg p-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-24 h-24 text-primary/40">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
                
                <div className="mb-4">
                  <h2 className="text-xl font-heading mb-3">Quick Facts</h2>
                  <div className="space-y-2">
                    {person.branch && (
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <div>
                          <span className="text-text-light">Branch:</span>
                          <span className={`ml-1 font-medium ${
                            person.branch === 'paternal' ? 'text-primary' : 
                            person.branch === 'maternal' ? 'text-secondary' :
                            person.branch === 'california' ? 'text-green-700' :
                            person.branch === 'louisiana' ? 'text-yellow-700' :
                            'text-gray-700'
                          }`}>
                            {person.branch.charAt(0).toUpperCase() + person.branch.slice(1)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {person.generation && (
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                        <div>
                          <span className="text-text-light">Generation:</span>
                          <span className="ml-1 font-medium">{person.generation}</span>
                        </div>
                      </div>
                    )}
                    
                    {person.birthPlace && (
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-primary shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <div>
                          <span className="text-text-light">Birthplace:</span>
                          <span className="ml-1 font-medium">{person.birthPlace}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {person.coolFacts && person.coolFacts.length > 0 && (
                  <div>
                    <h2 className="text-xl font-heading mb-3">Cool Facts</h2>
                    <ul className="list-disc pl-5 space-y-1 text-text-light">
                      {person.coolFacts.map((fact, index) => (
                        <li key={index}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3 px-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex border-b">
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-text-light hover:text-primary'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'timeline' ? 'text-primary border-b-2 border-primary' : 'text-text-light hover:text-primary'}`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    Timeline
                  </button>
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'relationships' ? 'text-primary border-b-2 border-primary' : 'text-text-light hover:text-primary'}`}
                    onClick={() => setActiveTab('relationships')}
                  >
                    Relationships
                  </button>
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'places' ? 'text-primary border-b-2 border-primary' : 'text-text-light hover:text-primary'}`}
                    onClick={() => setActiveTab('places')}
                  >
                    Places
                  </button>
                </div>
                
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-2xl font-heading mb-4">Biography</h2>
                      <div className="text-text-light space-y-4">
                        {person.biography.split("\n\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      
                      {person.sources && person.sources.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-lg font-heading mb-2">Sources</h3>
                          <ul className="list-disc pl-5 text-text-light">
                            {person.sources.map((source, index) => (
                              <li key={index}>{source}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'timeline' && (
                    <div>
                      <h2 className="text-2xl font-heading mb-4">Life Timeline</h2>
                      <div className="space-y-4">
                        {person.timelineEvents.map((event, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 flex-shrink-0">
                              <div className="flex flex-col items-center">
                                <div className={`w-4 h-4 rounded-full 
                                  ${event.type === 'birth' ? 'bg-green-500' : 
                                  event.type === 'death' ? 'bg-gray-500' : 
                                  event.type === 'marriage' ? 'bg-red-500' : 
                                  'bg-primary'}`}>
                                </div>
                                {index < person.timelineEvents.length - 1 && (
                                  <div className="w-px h-full bg-gray-300 my-1"></div>
                                )}
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-2 flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium">{event.title}</h3>
                                <span className="text-sm text-text-light">{event.date}</span>
                              </div>
                              <p className="text-text-light mt-1">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                        <p className="text-sm">
                          This is a simplified timeline. In the full implementation, this would include a 
                          comprehensive, interactive timeline with more events and historical context.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'relationships' && (
                    <div>
                      <h2 className="text-2xl font-heading mb-4">Family Relationships</h2>
                      
                      {person.relationships.some(r => r.type === 'parent') && (
                        <div className="mb-6">
                          <h3 className="text-lg font-heading mb-3">Parents</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {person.relationships
                              .filter(r => r.type === 'parent')
                              .map((relationship, index) => (
                                <PersonCard 
                                  key={index} 
                                  person={relationship.person} 
                                  size="medium"
                                />
                              ))
                            }
                          </div>
                        </div>
                      )}
                      
                      {person.relationships.some(r => r.type === 'sibling') && (
                        <div className="mb-6">
                          <h3 className="text-lg font-heading mb-3">Siblings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {person.relationships
                              .filter(r => r.type === 'sibling')
                              .map((relationship, index) => (
                                <PersonCard 
                                  key={index} 
                                  person={relationship.person} 
                                  size="medium"
                                />
                              ))
                            }
                          </div>
                        </div>
                      )}
                      
                      {person.relationships.some(r => r.type === 'spouse') && (
                        <div className="mb-6">
                          <h3 className="text-lg font-heading mb-3">Spouse</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {person.relationships
                              .filter(r => r.type === 'spouse')
                              .map((relationship, index) => (
                                <PersonCard 
                                  key={index} 
                                  person={relationship.person} 
                                  size="medium"
                                />
                              ))
                            }
                          </div>
                        </div>
                      )}
                      
                      {person.relationships.some(r => r.type === 'child') && (
                        <div className="mb-6">
                          <h3 className="text-lg font-heading mb-3">Children</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {person.relationships
                              .filter(r => r.type === 'child')
                              .map((relationship, index) => (
                                <PersonCard 
                                  key={index} 
                                  person={relationship.person} 
                                  size="medium"
                                />
                              ))
                            }
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-8 text-center">
                        <Link href={`/family-tree?focus=${person.id}`} className="btn btn-primary">
                          View in Family Tree
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'places' && (
                    <div>
                      <h2 className="text-2xl font-heading mb-4">Significant Places</h2>
                      
                      {person.places && person.places.length > 0 ? (
                        <div className="space-y-6">
                          {person.places.map((place, index) => (
                            <div key={index} className="bg-gray-50 p-5 rounded-lg">
                              <h3 className="text-lg font-medium mb-2">{place.name}</h3>
                              <p className="text-text-light mb-3">{place.description}</p>
                              <div className="bg-white p-3 border border-gray-200 rounded">
                                <h4 className="text-sm font-medium text-text-light mb-1">Significance:</h4>
                                <p>{place.significance}</p>
                              </div>
                              <div className="mt-3">
                                <Link 
                                  href={`/places/${place.id}`} 
                                  className="text-primary font-medium hover:text-primary-light"
                                >
                                  Learn more about this location →
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-text-light">No specific places are documented for this person.</p>
                      )}
                      
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-text-light">
                          In the full implementation, this tab would include an interactive map showing all 
                          locations associated with this person, including birth place, residences, and other 
                          significant locations.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}