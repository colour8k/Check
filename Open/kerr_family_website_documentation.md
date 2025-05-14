# Kerr Family Genealogy Website - Project Documentation

## Project Overview

The Kerr Family Genealogy Website is a comprehensive digital platform designed to showcase the rich history, connections, and stories of the Kerr family across generations. The project aims to create an interactive, visually appealing website that allows users to explore family relationships, geographic migrations, and historical narratives.

This document provides a comprehensive overview of the current state of the project, what has been completed so far, and what remains to be done to fully implement the website according to the design specifications.

## Current Development Status

### Development Environment

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Data Management**: JSON data files (local)
- **Visualization Libraries**: D3.js (planned for family tree)
- **Mapping**: Leaflet.js (planned for geographic visualization)
- **Deployment**: Currently running on development server (port 8002)

### Project Structure

The project follows a standard Next.js App Router structure:

```
kerr-family-site/
├── public/
│   ├── data/               # JSON data files
│   │   ├── family.json     # Core family data
│   │   └── extended_family.json # Extended family information
│   ├── images/             # Static images
│       ├── family-hero-bg.png  # Hero section background
│       └── vintage-paper-texture.png # Background texture
├── src/
│   ├── app/                # Pages using App Router
│   │   ├── about/
│   │   ├── family-tree/
│   │   ├── people/
│   │   │   └── [id]/
│   │   ├── places/
│   │   ├── stories/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLayout.tsx
│   │   └── ui/             # UI components
│   │       └── PersonCard.tsx
│   └── lib/                # Utilities and API helpers
│       └── api.ts          # Data fetching functions
└── package.json            # Dependencies
```

### Completed Components

1. **Layout Components**
   - PageLayout: Main layout wrapper with header and footer
   - Header: Navigation with responsive mobile menu
   - Footer: Site information and links

2. **UI Components**
   - PersonCard: Card displaying person information with variants

3. **Pages**
   - Home (/) - Basic structure with hero section and category navigation
   - Family Tree (/family-tree) - Placeholder with UI controls
   - People (/people) - Listing of family members (structure only)
   - Individual Person (/people/[id]) - Dynamic routes (structure only)
   - Places (/places) - Geographic information (structure only)
   - Stories (/stories) - Family narratives (structure only)
   - About (/about) - Project information (structure only)

4. **Data Structure**
   - Basic family data JSON structure created
   - Extended family information for Melissa (Welch) Smith and her family added
   - API utility functions for data fetching created (partial implementation)

5. **Assets**
   - Hero section background image
   - Vintage paper texture for background

## What Needs To Be Done

### 1. Data Implementation

- **Complete API Integration**
  - Finish implementation of API utility functions
  - Add error handling and data validation
  - Implement data fetching hooks for each component

- **Expand Family Data**
  - Add more detailed information to existing profiles
  - Create comprehensive relationship mapping
  - Add location and timeline data points
  - Implement "cool facts" collection

- **Media Integration**
  - Add photo gallery support
  - Create document viewer for family artifacts
  - Implement media timeline

### 2. Interactive Visualizations

- **Family Tree Visualization**
  - Implement D3.js based interactive tree
  - Support multiple view types (vertical, horizontal, fan, network)
  - Add zooming, panning, and focusing capabilities
  - Implement relationship highlighting
  - Create responsive adaptations for different screen sizes

- **Geographic Visualization**
  - Implement Leaflet.js based interactive map
  - Show family migration patterns
  - Create location markers for significant places
  - Implement time slider for temporal exploration
  - Add location filters and detail views

- **Timeline Visualization**
  - Create interactive family timeline
  - Show historical context alongside family events
  - Implement filtering by event type and person
  - Add horizontal scrolling on desktop and vertical scrolling on mobile

- **Relationship Network**
  - Create force-directed graph of family relationships
  - Implement highlighting of different relationship types
  - Add filtering capabilities
  - Create touch-optimized mobile version

### 3. People Directory Enhancements

- **Search Functionality**
  - Implement search across all family members
  - Add filtering by branch, generation, location
  - Create advanced search options

- **Person Profiles**
  - Complete individual profile pages
  - Add biography sections
  - Implement relationship diagram
  - Create media galleries for each person
  - Add "cool facts" display
  - Implement timeline of life events

- **Relationship Explorer**
  - Create relationship path finder
  - Implement family unit displays
  - Add relationship type explanation

### 4. Places and Geographic Information

- **Location Profiles**
  - Complete location detail pages
  - Add historical and current information
  - Create list of family members associated with each location
  - Implement timeline of family presence

- **Migration Stories**
  - Create narrative content about family migrations
  - Implement visual storytelling for geographic expansion
  - Add Michigan to California/Louisiana connection stories

### 5. Stories and Narrative Content

- **Story System**
  - Implement story display with rich media
  - Create table of contents for longer narratives
  - Add related content suggestions
  - Implement story collections by theme

- **Content Development**
  - Write family branch narratives
  - Create biographical content
  - Develop thematic stories across generations
  - Add historical context narratives

### 6. Technical Improvements

- **Performance Optimization**
  - Implement code splitting for heavy visualizations
  - Add image optimization
  - Create loading states for data fetching
  - Implement efficient caching

- **Responsive Enhancements**
  - Ensure full mobile compatibility
  - Create device-specific visualizations
  - Implement touch-friendly controls

- **Accessibility**
  - Ensure ARIA compliance
  - Implement keyboard navigation
  - Add screen reader support
  - Test and improve color contrast

### 7. Content Management

- **Editing System**
  - Create simple editing interface for family data
  - Implement content versioning
  - Add data validation

- **Media Management**
  - Create media library
  - Implement photo organization
  - Add document management

## Newly Added Information

The following information has been added to the family data, as requested:

- **Melissa (Welch) Smith**: Jeff Kerr's partner from 2008 to 2023. They lived in Central Florida for 20 years.
- **Dawn Welch**: Melissa's mother, currently living in Scottsdale, Arizona.
- **Larry Koepher**: Melissa's step-father, living in Scottsdale, Arizona with Dawn.
- **Robert (Welch) Hennessy**: Melissa's biological father from North Carolina.

This information has been structured into the family data JSON file and can be expanded with additional details when available.

## Implementation Priorities

For the next development phase, the following priorities are recommended:

1. **Complete Core Data Structure**
   - Finish implementation of data fetching and display functionality
   - Ensure all family connections are properly represented

2. **Basic Navigation and Exploration**
   - Complete implementation of people directory
   - Add basic search and filtering
   - Implement simple family tree view

3. **Individual Profiles**
   - Complete person profile pages with all relevant information
   - Implement relationship display

4. **Simple Visualizations**
   - Implement basic family tree visualization
   - Add simple map visualization
   - Create basic timeline view

5. **Content Integration**
   - Add narrative content to stories section
   - Create location descriptions
   - Implement "cool facts" display

6. **Advanced Interactions**
   - Enhance tree visualization with interactive features
   - Implement migration animations on map
   - Add relationship explorer

7. **Refinement and Optimization**
   - Improve performance
   - Enhance mobile experience
   - Add accessibility features

## Technical Guidance

### Family Tree Implementation

The family tree visualization should be implemented using D3.js with the following approach:

```typescript
// src/components/visualizations/FamilyTree/index.tsx
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Person } from '@/lib/api';

interface FamilyTreeProps {
  data: Person[];
  rootPersonId: string;
  viewType: 'vertical' | 'horizontal' | 'fan' | 'network';
  onPersonSelect?: (personId: string) => void;
}

export const FamilyTree = ({ data, rootPersonId, viewType, onPersonSelect }: FamilyTreeProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // State for zoom and pan
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  
  // Process the data into a hierarchical structure
  const hierarchyData = useMemo(() => {
    // Process data into hierarchy based on rootPersonId
    return processDataToHierarchy(data, rootPersonId);
  }, [data, rootPersonId]);
  
  // Apply different layouts based on viewType
  useEffect(() => {
    if (!svgRef.current || !hierarchyData) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Create layout based on viewType
    let layout;
    if (viewType === 'vertical') {
      layout = d3.tree().size([width - 100, height - 100]);
    } else if (viewType === 'horizontal') {
      layout = d3.tree().size([height - 100, width - 100]);
    } else if (viewType === 'fan') {
      layout = d3.cluster().size([2 * Math.PI, Math.min(width, height) / 2 - 100]);
    } else {
      // Network view using force simulation
      // ...
    }
    
    // Apply layout to hierarchyData
    const nodes = layout(hierarchyData);
    
    // Draw links
    // ...
    
    // Draw nodes
    // ...
    
    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        setTransform(event.transform);
        svg.select('g').attr('transform', event.transform.toString());
      });
    
    svg.call(zoom);
  }, [hierarchyData, viewType]);
  
  return (
    <div className="family-tree-container">
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
};
```

### Geographic Map Implementation

The geographic map should be implemented using Leaflet.js:

```typescript
// src/components/visualizations/GeographicMap/index.tsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  type: 'birth' | 'residence' | 'death' | 'significant';
  personIds: string[];
  years?: string;
}

interface MigrationPath {
  id: string;
  from: string; // location ID
  to: string; // location ID
  personIds: string[];
  year: number;
}

interface GeographicMapProps {
  locations: Location[];
  paths: MigrationPath[];
  onLocationSelect?: (locationId: string) => void;
}

export const GeographicMap = ({ locations, paths, onLocationSelect }: GeographicMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }
    
    const map = mapInstanceRef.current;
    
    // Clear existing markers and paths
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });
    
    // Add location markers
    locations.forEach(location => {
      const marker = L.marker(location.coordinates)
        .addTo(map)
        .bindPopup(`<strong>${location.name}</strong><br>${location.years || ''}`);
      
      marker.on('click', () => {
        if (onLocationSelect) {
          onLocationSelect(location.id);
        }
      });
    });
    
    // Add migration paths
    paths.forEach(path => {
      const fromLocation = locations.find(loc => loc.id === path.from);
      const toLocation = locations.find(loc => loc.id === path.to);
      
      if (fromLocation && toLocation) {
        L.polyline([fromLocation.coordinates, toLocation.coordinates], {
          color: '#1c3f5f',
          weight: 2,
          opacity: 0.7,
          dashArray: '5, 5'
        }).addTo(map);
      }
    });
    
    return () => {
      // No cleanup needed as we're reusing the map instance
    };
  }, [locations, paths, onLocationSelect]);
  
  return <div ref={mapRef} className="map-container"></div>;
};
```

## Conclusion

The Kerr Family Genealogy Website has a solid foundation with basic structure and components in place. The Next.js setup is working correctly, and the design system using Tailwind CSS has been established. 

The primary focus for continuing development should be:

1. Completing the data management system
2. Implementing the interactive visualizations
3. Enhancing the biographical content
4. Adding the narrative storytelling elements

By following the priorities outlined in this document, the website can be completed efficiently, delivering a rich, interactive experience for exploring the Kerr family history.

This documentation provides a comprehensive overview of the current status and remaining work to serve as a guide for continuing development.