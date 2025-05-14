# Kerr Family Website: Development Implementation Plan

## Overview

This document outlines the technical implementation strategy for developing the Kerr Family Genealogy Website. Based on the architectural design and component structure previously defined, this plan provides a detailed roadmap for efficiently building a robust, interactive website that showcases the rich history and connections of the Kerr family.

The development approach emphasizes:

1. **Modern Development Practices**: Using industry-standard tools and frameworks
2. **Scalable Architecture**: Building a system that can grow with additional family information
3. **Performance Optimization**: Ensuring fast load times and smooth interactions
4. **Progressive Enhancement**: Providing core functionality for all users with enhanced experiences for modern browsers
5. **Accessibility Compliance**: Making content available to all users regardless of abilities
6. **Maintainability**: Creating clean, well-documented code that can be extended in the future

## Technology Stack

### Core Technologies

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 14 | Server-side rendering, file-based routing, API routes |
| **Language** | TypeScript | Type safety, improved developer experience |
| **Styling** | Tailwind CSS | Utility-first CSS framework for consistent design |
| **State Management** | React Context + SWR | Global state and efficient data fetching |
| **Data Storage** | JSON + Local APIs | Structured data with efficient access patterns |
| **Deployment** | Vercel | Optimized hosting for Next.js applications |

### Key Libraries

| Category | Libraries | Purpose |
|----------|-----------|---------|
| **Visualization** | D3.js, react-force-graph | Interactive family tree and relationship visualizations |
| **Mapping** | Leaflet, react-leaflet | Geographic visualizations of family migrations |
| **Charts/Timeline** | react-chrono, recharts | Timeline and data visualizations |
| **UI Components** | Headless UI, Radix UI | Accessible UI primitives |
| **Forms/Input** | React Hook Form, Zod | Form handling and validation |
| **Animation** | Framer Motion | Smooth transitions and interactions |
| **Media Handling** | Next.js Image, react-photo-gallery | Optimized image loading and galleries |
| **Markdown** | MDX | Rich content with component embedding |

## Project Structure

```
kerr-family-website/
├── public/
│   ├── data/                  # JSON data files
│   ├── images/                # Static images
│   ├── documents/             # PDFs and other documents
│   └── favicon.ico            # Site favicon
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   ├── navigation/        # Navigation components
│   │   ├── people/            # Person-related components
│   │   ├── places/            # Location-related components
│   │   ├── visualizations/    # Data visualization components
│   │   ├── media/             # Media display components
│   │   └── ui/                # General UI components
│   ├── contexts/              # React context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and services
│   │   ├── api/               # API utility functions
│   │   ├── data/              # Data processing utilities
│   │   ├── helpers/           # General helper functions
│   │   └── types/             # TypeScript type definitions
│   ├── pages/                 # Next.js pages
│   │   ├── api/               # API routes
│   │   ├── people/            # Person profiles
│   │   ├── places/            # Location pages
│   │   ├── stories/           # Narrative content
│   │   ├── explore/           # Interactive exploration tools
│   │   └── about/             # About the project
│   ├── styles/                # Global styles and Tailwind config
│   └── app/                   # App-wide configuration files
├── scripts/                   # Build and data processing scripts
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                # Prettier configuration
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Data Architecture

The application will use a combination of statically generated data (for core content) and dynamic loading (for interactive exploration) to optimize performance.

### Data Processing Pipeline

1. **Raw Data Sources**
   - JSON files containing structured family data
   - Markdown files for narrative content
   - Image metadata and organization information

2. **Build-Time Processing**
   - Data validation and normalization
   - Relationship indexing and cross-referencing
   - Precomputation of commonly accessed data views

3. **Runtime Data Access**
   - Static data loaded at build time for core pages
   - Dynamic data loading for interactive visualizations
   - Caching strategy for optimized performance

### Data Models Implementation

The application will implement the data models defined in the data structure design:

```typescript
// Example implementation of Person interface
export interface Person {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  maidenName?: string;
  nicknames?: string[];
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birth?: {
    date?: DateInfo;
    place?: PlaceReference;
    notes?: string;
    sources?: SourceCitation[];
  };
  // Additional properties as defined in data structure
}

// Implementation of other data models following the same pattern
```

### Data Access Layers

The application will implement multi-tiered data access:

1. **Static Data Layer**
   - JSON files loaded at build time
   - Pre-processed and optimized for performance
   - Used for core content and navigation

2. **API Layer**
   - Next.js API routes for dynamic data access
   - Filtering, searching, and specialized queries
   - Optimized for interactive visualizations

3. **Client Cache Layer**
   - SWR for efficient data fetching and caching
   - Revalidation strategies for data freshness
   - Optimistic updates for responsive UI

## Core Application Components

### 1. Family Tree Visualization

The interactive family tree will be implemented as a modular, extensible component:

```typescript
// src/components/visualizations/FamilyTree/index.tsx
import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { TreeNode } from './TreeNode';
import { TreeControls } from './TreeControls';
import { TreeLinks } from './TreeLinks';
import { useTreeLayout } from '@/hooks/useTreeLayout';
import type { FamilyTreeData, TreeViewState, TreeViewOptions } from '@/lib/types';

interface FamilyTreeProps {
  data: FamilyTreeData;
  rootPersonId: string;
  options?: Partial<TreeViewOptions>;
  onPersonSelect?: (personId: string) => void;
  className?: string;
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({
  data,
  rootPersonId,
  options = {},
  onPersonSelect,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const [viewState, setViewState] = useState<TreeViewState>({
    zoom: 1,
    pan: { x: 0, y: 0 },
    focusedPerson: rootPersonId,
    generations: {
      ancestors: options.ancestorGenerations || 3,
      descendants: options.descendantGenerations || 3,
    },
    showSiblings: options.showSiblings ?? true,
    viewType: options.viewType || 'vertical',
  });
  
  // Process data for visualization
  const processedData = useMemo(() => {
    if (!data) return null;
    return processTreeData(data, rootPersonId, viewState);
  }, [data, rootPersonId, viewState.generations, viewState.showSiblings]);
  
  // Get layout using custom hook
  const { nodes, links } = useTreeLayout(
    processedData,
    dimensions,
    viewState.viewType
  );
  
  // Handle zoom and pan
  useEffect(() => {
    if (!containerRef.current || !nodes) return;
    
    // D3 zoom behavior implementation
    const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
      setViewState(prev => ({
        ...prev,
        zoom: event.transform.k,
        pan: { x: event.transform.x, y: event.transform.y },
      }));
    };
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', handleZoom);
    
    const svg = d3.select(containerRef.current.querySelector('svg'));
    svg.call(zoom);
    
    // Reset zoom if needed
    if (options.resetZoom) {
      svg.call(zoom.transform, d3.zoomIdentity);
    }
  }, [dimensions, nodes, options.resetZoom]);
  
  // Handle node click
  const handleNodeClick = (personId: string) => {
    if (onPersonSelect) {
      onPersonSelect(personId);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`family-tree-container relative overflow-hidden ${className}`}
    >
      <TreeControls 
        viewState={viewState}
        setViewState={setViewState}
        options={options}
      />
      
      {dimensions && nodes && (
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="family-tree-svg"
        >
          <g
            transform={`translate(${viewState.pan.x},${viewState.pan.y}) scale(${viewState.zoom})`}
          >
            <TreeLinks links={links} viewType={viewState.viewType} />
            {nodes.map(node => (
              <TreeNode
                key={node.id}
                node={node}
                onClick={handleNodeClick}
                isSelected={node.id === viewState.focusedPerson}
              />
            ))}
          </g>
        </svg>
      )}
    </div>
  );
};
```

### 2. Geographic Visualization

The interactive geographic visualization will use Leaflet with custom overlays:

```typescript
// src/components/visualizations/GeographicMap/index.tsx
import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationMarkers } from './LocationMarkers';
import { MigrationPaths } from './MigrationPaths';
import { MapControls } from './MapControls';
import { TimeSlider } from './TimeSlider';
import { MapLegend } from './MapLegend';
import { useGeographicData } from '@/hooks/useGeographicData';
import type { DateRange, PersonFilter, MapViewOptions } from '@/lib/types';

interface GeographicMapProps {
  timeRange: DateRange;
  focusPeople?: string[];
  options?: Partial<MapViewOptions>;
  onLocationSelect?: (locationId: string) => void;
  className?: string;
}

export const GeographicMap: React.FC<GeographicMapProps> = ({
  timeRange,
  focusPeople,
  options = {},
  onLocationSelect,
  className = '',
}) => {
  const [currentTimeRange, setCurrentTimeRange] = useState<DateRange>(timeRange);
  const [activeFilters, setActiveFilters] = useState<PersonFilter>({
    people: focusPeople || 'all',
    eventTypes: options.eventTypes || 'all',
  });
  
  // Get processed geographic data
  const { locations, paths, events } = useGeographicData(
    currentTimeRange,
    activeFilters
  );
  
  // Handle time range change
  const handleTimeRangeChange = (range: DateRange) => {
    setCurrentTimeRange(range);
  };
  
  // Handle filter change
  const handleFilterChange = (filters: PersonFilter) => {
    setActiveFilters(filters);
  };
  
  // Handle location selection
  const handleLocationClick = (locationId: string) => {
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
  };
  
  return (
    <div className={`geographic-map-container relative ${className}`}>
      <MapControls
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        options={options}
      />
      
      <MapContainer
        center={options.initialCenter || [39.8283, -98.5795]} // US center
        zoom={options.initialZoom || 4}
        style={{ height: '600px', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarkers
          locations={locations}
          onLocationClick={handleLocationClick}
        />
        
        <MigrationPaths
          paths={paths}
          animate={options.animatePaths}
        />
        
        {options.showLegend && <MapLegend />}
      </MapContainer>
      
      {options.showTimeSlider && (
        <TimeSlider
          timeRange={timeRange}
          currentTimeRange={currentTimeRange}
          onTimeRangeChange={handleTimeRangeChange}
          events={events}
        />
      )}
    </div>
  );
};
```

### 3. Profile System

The person profile system will handle displaying information about individuals:

```typescript
// src/components/people/PersonProfile/index.tsx
import React from 'react';
import Image from 'next/image';
import { usePerson } from '@/hooks/usePerson';
import { useRelationships } from '@/hooks/useRelationships';
import { ProfileHeader } from './ProfileHeader';
import { ProfileVitals } from './ProfileVitals';
import { ProfileBiography } from './ProfileBiography';
import { ProfileTimeline } from './ProfileTimeline';
import { ProfileMedia } from './ProfileMedia';
import { ProfileRelationships } from './ProfileRelationships';
import { ProfileSources } from './ProfileSources';
import { CoolFacts } from '@/components/people/CoolFacts';
import { LoadingProfile } from './LoadingProfile';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import type { ProfileViewOptions } from '@/lib/types';

interface PersonProfileProps {
  personId: string;
  options?: Partial<ProfileViewOptions>;
  className?: string;
}

export const PersonProfile: React.FC<PersonProfileProps> = ({
  personId,
  options = {},
  className = '',
}) => {
  // Fetch person data
  const { person, isLoading, error } = usePerson(personId);
  
  // Fetch relationship data
  const { relationships, isLoading: relLoading } = useRelationships(personId);
  
  if (isLoading || relLoading) {
    return <LoadingProfile className={className} />;
  }
  
  if (error || !person) {
    return <ErrorMessage message="Unable to load person profile" className={className} />;
  }
  
  return (
    <div className={`person-profile ${className}`}>
      <ProfileHeader
        person={person}
        options={options}
      />
      
      <div className="profile-content grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="main-content md:col-span-2">
          <ProfileVitals person={person} />
          
          {options.showBiography !== false && (
            <ProfileBiography person={person} />
          )}
          
          {options.showTimeline !== false && (
            <ProfileTimeline
              person={person}
              showHistoricalContext={options.showHistoricalContext}
            />
          )}
          
          {options.showMedia !== false && person.media && person.media.length > 0 && (
            <ProfileMedia media={person.media} />
          )}
          
          {options.showSources !== false && person.sources && person.sources.length > 0 && (
            <ProfileSources sources={person.sources} />
          )}
        </div>
        
        <div className="sidebar md:col-span-1">
          {options.showRelationships !== false && (
            <ProfileRelationships
              personId={personId}
              relationships={relationships}
              highlightRelationships={options.highlightRelationships}
            />
          )}
          
          {options.showCoolFacts !== false && person.coolFacts && person.coolFacts.length > 0 && (
            <CoolFacts facts={person.coolFacts} />
          )}
        </div>
      </div>
    </div>
  );
};
```

### 4. Navigation System

The navigation system will provide intuitive site exploration:

```typescript
// src/components/navigation/MainNavigation/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MenuIcon, XIcon, SearchIcon } from '@/components/ui/Icons';
import { NavItem } from './NavItem';
import { Dropdown } from './Dropdown';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from '../SearchBar';
import type { NavigationItem } from '@/lib/types';

interface MainNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  items,
  className = '',
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };
  
  return (
    <nav className={`main-navigation bg-primary-900 text-white ${className}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="logo text-xl font-heading font-bold"
          >
            Kerr Family History
          </Link>
          
          {!isMobile ? (
            <div className="desktop-nav flex items-center space-x-6">
              {items.map(item => (
                item.children ? (
                  <Dropdown
                    key={item.key}
                    item={item}
                    isActive={router.pathname.startsWith(item.href)}
                  />
                ) : (
                  <NavItem
                    key={item.key}
                    item={item}
                    isActive={router.pathname === item.href}
                  />
                )
              ))}
              
              <button
                onClick={toggleSearch}
                className="search-button p-2 rounded-full hover:bg-primary-800 transition-colors"
                aria-label="Open search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="mobile-controls flex items-center space-x-2">
              <button
                onClick={toggleSearch}
                className="search-button p-2 rounded-full hover:bg-primary-800 transition-colors"
                aria-label="Open search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleMenu}
                className="menu-button p-2 rounded-full hover:bg-primary-800 transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <XIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isMobile && isMenuOpen && (
        <MobileMenu 
          items={items} 
          currentPath={router.pathname}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
      
      {isSearchOpen && (
        <SearchBar
          onClose={() => setIsSearchOpen(false)}
          fullWidth={true}
        />
      )}
    </nav>
  );
};
```

### 5. Story Presentation System

The story system will present narrative content with rich media integration:

```typescript
// src/components/stories/StoryArticle/index.tsx
import React from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { useStory } from '@/hooks/useStory';
import { StoryHeader } from './StoryHeader';
import { StoryMeta } from './StoryMeta';
import { TableOfContents } from './TableOfContents';
import { RelatedStories } from './RelatedStories';
import { StoryMedia } from './StoryMedia';
import { PersonCard } from '@/components/people/PersonCard';
import { PlaceCard } from '@/components/places/PlaceCard';
import { Timeline } from '@/components/visualizations/Timeline';
import { LoadingStory } from './LoadingStory';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import type { StoryViewOptions } from '@/lib/types';

// Custom components for MDX
const components = {
  PersonCard,
  PlaceCard,
  Timeline,
  StoryMedia,
};

interface StoryArticleProps {
  storyId: string;
  options?: Partial<StoryViewOptions>;
  className?: string;
}

export const StoryArticle: React.FC<StoryArticleProps> = ({
  storyId,
  options = {},
  className = '',
}) => {
  // Fetch story data
  const { story, mdxSource, isLoading, error } = useStory(storyId);
  
  if (isLoading) {
    return <LoadingStory className={className} />;
  }
  
  if (error || !story || !mdxSource) {
    return <ErrorMessage message="Unable to load story" className={className} />;
  }
  
  return (
    <article className={`story-article ${className}`}>
      <StoryHeader
        title={story.title}
        subtitle={story.subtitle}
        featuredImage={story.featuredImage}
      />
      
      <div className="story-content grid grid-cols-1 lg:grid-cols-4 gap-8">
        {options.showTableOfContents !== false && (
          <aside className="table-of-contents lg:col-span-1 order-2 lg:order-1">
            <TableOfContents headings={story.headings} />
            
            <StoryMeta
              author={story.author}
              date={story.createdDate}
              category={story.category}
              topics={story.topics}
            />
          </aside>
        )}
        
        <div className={`story-body prose prose-primary max-w-none ${
          options.showTableOfContents !== false ? 'lg:col-span-3' : 'lg:col-span-4'
        } order-1 lg:order-2`}>
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
      
      {options.showRelated !== false && story.relatedStories && story.relatedStories.length > 0 && (
        <RelatedStories storyIds={story.relatedStories} />
      )}
    </article>
  );
};
```

## Page Structure and Routing

### Major Page Types

1. **Home Page**
   - Entry point with featured content
   - Quick access to main sections
   - Family highlights and "fact of the day"

2. **People Directory**
   - Searchable list of all family members
   - Filtering by family branch, generation, location
   - Visual browsing options (grid, tree preview)

3. **Individual Profile Pages**
   - Detailed information about a person
   - Biography, timeline, relationships
   - Media gallery and cool facts
   - Dynamic routing with `/people/[id]` pattern

4. **Family Branch Pages**
   - Overview of specific family lines
   - Branch-specific tree visualization
   - Key figures and migration patterns
   - Branch statistics and highlights

5. **Place Pages**
   - Information about significant locations
   - Family members associated with location
   - Historical context and images
   - Dynamic routing with `/places/[id]` pattern

6. **Story Pages**
   - Long-form narrative content
   - Rich media integration
   - Related content suggestions
   - Dynamic routing with `/stories/[slug]` pattern

7. **Interactive Exploration Pages**
   - Family tree explorer
   - Geographic exploration tool
   - Timeline explorer
   - Relationship network visualization

### Dynamic Routing Implementation

```typescript
// src/pages/people/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PageLayout } from '@/components/layout/PageLayout';
import { PersonProfile } from '@/components/people/PersonProfile';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorScreen } from '@/components/ui/ErrorScreen';
import { getAllPeopleIds, getPersonData } from '@/lib/data/people';
import type { Person } from '@/lib/types';

interface PersonPageProps {
  personData: Person | null;
}

export default function PersonPage({ personData }: PersonPageProps) {
  const router = useRouter();
  
  // Handle fallback pages
  if (router.isFallback) {
    return <LoadingScreen />;
  }
  
  // Handle missing data
  if (!personData) {
    return <ErrorScreen message="Person not found" />;
  }
  
  return (
    <PageLayout
      title={`${personData.firstName} ${personData.lastName} | Kerr Family History`}
      description={`Learn about ${personData.firstName} ${personData.lastName}, ${personData.birth?.date?.date ? `born ${personData.birth.date.date}` : ''} - part of the Kerr family history.`}
    >
      <PersonProfile personId={personData.id} />
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPeopleIds();
  
  return {
    paths,
    // Enable on-demand generation for non-critical profiles
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PersonPageProps> = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return { notFound: true };
  }
  
  const personData = await getPersonData(params.id);
  
  if (!personData) {
    return { notFound: true };
  }
  
  return {
    props: {
      personData,
    },
    // Revalidate every day
    revalidate: 86400,
  };
};
```

## API Routes

The website will use Next.js API routes for dynamic data access:

```typescript
// src/pages/api/relationships/[personId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPersonRelationships } from '@/lib/data/relationships';
import type { Relationship, ApiError } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Relationship[] | ApiError>
) {
  const { personId } = req.query;
  
  if (!personId || typeof personId !== 'string') {
    return res.status(400).json({ error: 'Invalid person ID' });
  }
  
  try {
    const relationships = await getPersonRelationships(personId);
    return res.status(200).json(relationships);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Failed to load relationships' });
  }
}
```

## Custom Hooks

The application will use custom hooks for data fetching and shared logic:

```typescript
// src/hooks/usePerson.ts
import useSWR from 'swr';
import { getPersonById } from '@/lib/api/people';
import type { Person } from '@/lib/types';

interface UsePersonResult {
  person: Person | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePerson(personId: string): UsePersonResult {
  const { data, error } = useSWR(
    personId ? `/api/people/${personId}` : null,
    () => getPersonById(personId)
  );
  
  return {
    person: data || null,
    isLoading: !error && !data,
    error: error || null,
  };
}
```

## Performance Optimizations

### Image Handling

Using Next.js Image component for optimized image loading:

```typescript
// src/components/media/PersonPhoto.tsx
import Image from 'next/image';
import { useImageLoader } from '@/hooks/useImageLoader';
import { Skeleton } from '@/components/ui/Skeleton';
import type { MediaItem } from '@/lib/types';

interface PersonPhotoProps {
  media?: MediaItem;
  fallbackText?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const PersonPhoto: React.FC<PersonPhotoProps> = ({
  media,
  fallbackText,
  size = 'medium',
  className = '',
}) => {
  const { isLoading, imageSrc, error } = useImageLoader(
    media?.file?.path
  );
  
  // Get dimensions based on size
  const dimensions = {
    small: { width: 48, height: 48 },
    medium: { width: 96, height: 96 },
    large: { width: 192, height: 192 },
  }[size];
  
  // Handle loading state
  if (isLoading) {
    return (
      <Skeleton 
        className={`person-photo-skeleton ${className}`}
        width={dimensions.width}
        height={dimensions.height}
      />
    );
  }
  
  // Handle missing image or error
  if (!imageSrc || error) {
    return (
      <div 
        className={`person-photo-fallback bg-gray-200 flex items-center justify-center rounded-full overflow-hidden ${className}`}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <span className="text-gray-500 font-medium">
          {fallbackText || 'No Image'}
        </span>
      </div>
    );
  }
  
  // Render image
  return (
    <div 
      className={`person-photo rounded-full overflow-hidden ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <Image
        src={imageSrc}
        alt={media?.title || 'Person photo'}
        width={dimensions.width}
        height={dimensions.height}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />
    </div>
  );
};
```

### Code Splitting

Implementing dynamic imports for heavy components:

```typescript
// src/components/visualizations/index.tsx
import dynamic from 'next/dynamic';
import { LoadingVisualization } from './LoadingVisualization';

// Dynamically load heavy visualization components
export const FamilyTree = dynamic(
  () => import('./FamilyTree').then(mod => mod.FamilyTree),
  { loading: () => <LoadingVisualization type="tree" /> }
);

export const GeographicMap = dynamic(
  () => import('./GeographicMap').then(mod => mod.GeographicMap),
  { loading: () => <LoadingVisualization type="map" />, ssr: false }
);

export const TimelineVisualization = dynamic(
  () => import('./Timeline').then(mod => mod.TimelineVisualization),
  { loading: () => <LoadingVisualization type="timeline" /> }
);

export const RelationshipNetwork = dynamic(
  () => import('./RelationshipNetwork').then(mod => mod.RelationshipNetwork),
  { loading: () => <LoadingVisualization type="network" /> }
);
```

### Data Prefetching

Using SWR prefetching for improved user experience:

```typescript
// src/lib/prefetch.ts
import { cache } from 'swr';
import { getPersonById } from '@/lib/api/people';
import { getRelationshipsByPerson } from '@/lib/api/relationships';

export function prefetchPerson(personId: string): Promise<void> {
  // Prefetch person data
  const personKey = `/api/people/${personId}`;
  
  // Only prefetch if not already in cache
  if (!cache.get(personKey)) {
    return getPersonById(personId)
      .then(data => {
        cache.set(personKey, data);
        
        // Also prefetch related data
        return prefetchRelationships(personId);
      })
      .catch(error => {
        console.error('Prefetch error:', error);
      });
  }
  
  return Promise.resolve();
}

export function prefetchRelationships(personId: string): Promise<void> {
  const relationshipsKey = `/api/relationships/${personId}`;
  
  if (!cache.get(relationshipsKey)) {
    return getRelationshipsByPerson(personId)
      .then(data => {
        cache.set(relationshipsKey, data);
      })
      .catch(error => {
        console.error('Prefetch error:', error);
      });
  }
  
  return Promise.resolve();
}
```

## Responsiveness Strategy

The website will implement a mobile-first approach with progressive enhancement:

```typescript
// src/hooks/useResponsiveLayout.ts
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface ResponsiveLayout {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isMobileLandscape: boolean;
  layout: 'desktop' | 'tablet' | 'mobile';
}

export function useResponsiveLayout(): ResponsiveLayout {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isMobileLandscape = useMediaQuery('(max-width: 767px) and (orientation: landscape)');
  
  let layout: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  
  if (isMobile) {
    layout = 'mobile';
  } else if (isTablet) {
    layout = 'tablet';
  }
  
  return {
    isDesktop,
    isTablet,
    isMobile,
    isMobileLandscape,
    layout,
  };
}
```

## Accessibility Implementation

The website will prioritize accessibility through consistent practices:

```typescript
// src/components/ui/Button.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ariaLabel,
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    text: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
  }[variant];
  
  // Size styles
  const sizeStyles = {
    small: 'text-sm py-1 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6',
  }[size];
  
  // Disabled styles
  const disabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : '';
  
  // Icon styles
  const iconStyles = icon ? `gap-${iconPosition === 'left' ? '2' : '2'} ${iconPosition === 'right' ? 'flex-row-reverse' : ''}` : '';
  
  // Combined styles
  const styles = `${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${iconStyles} ${className}`;
  
  // If href is provided, render Link
  if (href && !isDisabled) {
    return (
      <Link
        href={href}
        className={styles}
        aria-label={ariaLabel}
      >
        {icon}
        {children}
      </Link>
    );
  }
  
  // Otherwise render button
  return (
    <button
      onClick={onClick}
      className={styles}
      disabled={isDisabled}
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
};
```

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- Project setup and configuration
- Core layouts and navigation
- Basic styling system
- Data layer implementation
- API routes setup

### Phase 2: Core Pages (Weeks 3-4)
- Home page implementation
- Person profile system
- Place pages
- Basic story display
- Search functionality

### Phase 3: Visualizations (Weeks 5-6)
- Family tree implementation
- Geographic visualization
- Timeline visualization
- Relationship network visualization
- Visualization controls and responsive adaptations

### Phase 4: Content Integration (Weeks 7-8)
- Full content integration
- Story system enhancements
- Media gallery implementation
- "Cool facts" system
- Cross-referencing implementation

### Phase 5: Optimization and Testing (Weeks 9-10)
- Performance optimization
- Accessibility testing and improvements
- Cross-browser testing
- Responsive design refinements
- Content polishing

### Phase 6: Deployment and Documentation (Weeks 11-12)
- Vercel deployment setup
- Analytics integration
- Documentation creation
- Content management documentation
- Final quality assurance

## Development Workflow

### Code Structure and Standards

All code will follow these standards:

1. **TypeScript Typing**
   - Comprehensive type definitions
   - Strict null checks
   - Interface-based design

2. **Component Structure**
   - Pure functional components
   - Props destructuring
   - Logical hook extraction
   - Explicit return types

3. **File Organization**
   - Feature-based component structure
   - Index exports for clean imports
   - Co-located test files
   - Logical hook separation

### Testing Strategy

The application will be tested at multiple levels:

1. **Unit Testing**
   - Component testing with React Testing Library
   - Hook testing with custom test helpers
   - Utility function testing with Jest

2. **Integration Testing**
   - Page-level testing with mocked data
   - Navigation flow testing
   - Form submission testing

3. **Accessibility Testing**
   - Automated testing with jest-axe
   - Keyboard navigation testing
   - Screen reader compatibility testing

4. **Performance Testing**
   - Lighthouse CI integration
   - Bundle size monitoring
   - Load time benchmarking

### Deployment Pipeline

The deployment process will include:

1. **CI/CD Pipeline**
   - GitHub Actions for automated testing
   - Vercel Preview Deployments for PRs
   - Automatic production deployment on merge

2. **Quality Gates**
   - Linting and type checking
   - Unit and integration test passing
   - Performance thresholds
   - Accessibility compliance

3. **Environment Management**
   - Development, staging, and production environments
   - Environment-specific configuration
   - Controlled feature flags

## Conclusion

This implementation plan provides a comprehensive roadmap for developing the Kerr Family Genealogy Website. By following this structured approach, we will create a powerful, engaging platform that effectively showcases the rich history and connections of the Kerr family.

The plan incorporates modern development practices, performance optimizations, and accessibility considerations to ensure the website delivers an exceptional user experience across all devices. The modular architecture and well-documented codebase will allow for future enhancements and extensions as new family information is discovered.

The combination of interactive visualizations, rich narrative content, and intuitive navigation will create an immersive experience that honors the Kerr family legacy while making it accessible and engaging for all users.