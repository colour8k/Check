'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for stories - in a real implementation, this would come from a database or API
const storiesMockData = [
  {
    id: 'michigan-to-coasts',
    title: 'From Michigan to the Coasts: The Geographic Expansion of the Kerr Family',
    excerpt: 'The story of how the Kerr family spread from their Michigan roots to California and Louisiana, representing a fascinating geographic expansion that parallels many American families' stories of mobility and adaptation.',
    category: 'migration',
    relatedBranches: ['paternal', 'california', 'louisiana'],
    featuredImage: null,
    date: 'January 15, 2025'
  },
  {
    id: 'kerr-otsuka-family',
    title: 'Blending Cultures: The Kerr-Otsuka Family Story',
    excerpt: 'Exploring the intercultural marriage of Vanessa Kerr and Richard Otsuka, how different cultural traditions merged in their family, and the experiences of Evan and Bobby Otsuka as multiethnic Americans.',
    category: 'family-formation',
    relatedBranches: ['california'],
    featuredImage: null,
    date: 'February 3, 2025'
  },
  {
    id: 'norman-bud-lowe',
    title: 'Chosen Family: The Norman "Bud" Lowe Story',
    excerpt: 'A deep dive into the role of Norman "Bud" Lowe as a father figure to Debby despite no biological connection, exploring how non-biological relationships shape family identity and create lasting legacies.',
    category: 'biography',
    relatedBranches: ['maternal'],
    featuredImage: null,
    date: 'December 20, 2024'
  },
  {
    id: 'kerr-creek-road',
    title: 'Kerr Creek Road: A Family Legacy in Name',
    excerpt: 'The history behind Kerr Creek Road in the Three Rivers/Sturgis area, exploring how the family's significance led to this geographical naming and what it reveals about their historical presence in the region.',
    category: 'place-history',
    relatedBranches: ['paternal'],
    featuredImage: null,
    date: 'November 5, 2024'
  },
  {
    id: 'jefferson-road-home',
    title: 'The Jefferson Road Home: A Maternal Anchor',
    excerpt: 'The story of the Jefferson Road home in the Otsego/Plainwell area, passed down from Donna Mowry and serving as a multi-generational anchor for the maternal side of the family.',
    category: 'place-history',
    relatedBranches: ['maternal'],
    featuredImage: null,
    date: 'October 12, 2024'
  },
  {
    id: 'steve-kerr-family',
    title: 'Brothers Across America: The Dispersed Children of Steve Kerr',
    excerpt: 'Telling the story of how Steve Kerr's family branched into multiple geographic locations, exploring the relationships between half-siblings across distances, and examining how family connections are maintained despite geographic separation.',
    category: 'family-formation',
    relatedBranches: ['paternal', 'louisiana'],
    featuredImage: null,
    date: 'March 8, 2025'
  },
  {
    id: 'military-service-heritage',
    title: 'Military Service Across Generations',
    excerpt: 'Exploring the military service of Donald Kerr as a paratrooper and Norman "Bud" Lowe during the Korean War, and how military service influenced family migrations, opportunities, and values.',
    category: 'military',
    relatedBranches: ['paternal', 'maternal'],
    featuredImage: null,
    date: 'November 11, 2024'
  },
  {
    id: 'scottish-origins',
    title: 'Scottish Origins: Tracing the Kerr Name',
    excerpt: 'Research into the Scottish origins of the Kerr family name, its history and meaning, and the family's ancestral connections to Scotland.',
    category: 'ancestry',
    relatedBranches: ['paternal'],
    featuredImage: null,
    date: 'April 23, 2025'
  }
];

type Category = 'all' | 'migration' | 'family-formation' | 'biography' | 'place-history' | 'military' | 'ancestry';
type Branch = 'all' | 'paternal' | 'maternal' | 'california' | 'louisiana';

export default function Stories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');
  const [branchFilter, setBranchFilter] = useState<Branch>('all');
  
  // Filter stories based on search and filters
  const filteredStories = storiesMockData.filter(story => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      story.title.toLowerCase().includes(searchLower) ||
      story.excerpt.toLowerCase().includes(searchLower);
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || story.category === categoryFilter;
    
    // Branch filter
    const matchesBranch = branchFilter === 'all' || story.relatedBranches.includes(branchFilter);
    
    return matchesSearch && matchesCategory && matchesBranch;
  });
  
  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    switch(category) {
      case 'migration': return 'Migration Story';
      case 'family-formation': return 'Family Formation';
      case 'biography': return 'Biography';
      case 'place-history': return 'Place History';
      case 'military': return 'Military Service';
      case 'ancestry': return 'Ancestry Research';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };
  
  // Render a story card
  const StoryCard = ({ story }: { story: typeof storiesMockData[0] }) => {
    return (
      <Link href={`/stories/${story.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        {story.featuredImage ? (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img 
              src={story.featuredImage} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-primary/40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-text-light">{story.date}</span>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {getCategoryDisplayName(story.category)}
            </span>
          </div>
          
          <h3 className="text-xl font-heading mb-3">{story.title}</h3>
          <p className="text-text-light mb-3 line-clamp-3">{story.excerpt}</p>
          
          <div className="flex flex-wrap gap-1 mt-4">
            {story.relatedBranches.map((branch, index) => (
              <span 
                key={index}
                className={`text-xs px-2 py-0.5 rounded-full 
                  ${branch === 'paternal' ? 'bg-primary/10 text-primary' : 
                  branch === 'maternal' ? 'bg-secondary/10 text-secondary' :
                  branch === 'california' ? 'bg-green-100 text-green-800' :
                  branch === 'louisiana' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'}`}
              >
                {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  };
  
  return (
    <PageLayout>
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading">Family Stories</h1>
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
                  <span className="text-white">Stories</span>
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
                <h2 className="text-xl font-heading mb-2">Family Narratives</h2>
                <p className="text-text-light">Explore stories that bring the Kerr family history to life</p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search stories..."
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
                <label className="block text-sm text-text-light mb-1">Category:</label>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as Category)}
                >
                  <option value="all">All Categories</option>
                  <option value="migration">Migration</option>
                  <option value="family-formation">Family Formation</option>
                  <option value="biography">Biography</option>
                  <option value="place-history">Place History</option>
                  <option value="military">Military Service</option>
                  <option value="ancestry">Ancestry Research</option>
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
                </select>
              </div>
            </div>
          </div>
          
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-background-alt rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-text-light mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="text-xl font-heading mb-2">No stories match your filters</h3>
              <p className="text-text-light">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-8 bg-background-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading mb-6">Story Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Migration Stories */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Geographic Expansion</h3>
              <p className="text-text-light mb-4">
                Stories tracing the Kerr family's geographic expansion from Michigan roots to branches in California, 
                Louisiana, and international connections. These narratives explore motivations for migration, 
                maintenance of family connections across distance, and regional cultural adaptations.
              </p>
              <Link 
                href="/stories/category/migration" 
                className="text-primary font-medium hover:text-primary-light"
              >
                Explore Migration Stories →
              </Link>
            </div>
            
            {/* Relationship Stories */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Family Relationships</h3>
              <p className="text-text-light mb-4">
                Stories exploring the complex and unique relationships within the Kerr family, from Norman "Bud" Lowe's 
                role as a chosen father figure to the blended family dynamics of Steve Kerr's children, and the 
                intercultural marriage of Vanessa Kerr and Richard Otsuka.
              </p>
              <Link 
                href="/stories/category/family-formation" 
                className="text-primary font-medium hover:text-primary-light"
              >
                Explore Relationship Stories →
              </Link>
            </div>
            
            {/* Place Stories */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Significant Places</h3>
              <p className="text-text-light mb-4">
                Stories about locations that played important roles in the family history, including the 
                Jefferson Road home, Kerr Creek Road, and the family centers in the Three Rivers/Sturgis and 
                Otsego/Plainwell areas of Michigan.
              </p>
              <Link 
                href="/stories/category/place-history" 
                className="text-primary font-medium hover:text-primary-light"
              >
                Explore Place Stories →
              </Link>
            </div>
            
            {/* Ancestral Stories */}
            <div className="card">
              <h3 className="text-xl font-heading mb-3">Ancestry Research</h3>
              <p className="text-text-light mb-4">
                Stories exploring the deeper roots of the Kerr family, including research into the Scottish 
                origins of the Kerr name and explorations of ancestral connections beyond the most recent generations.
              </p>
              <Link 
                href="/stories/category/ancestry" 
                className="text-primary font-medium hover:text-primary-light"
              >
                Explore Ancestry Stories →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}