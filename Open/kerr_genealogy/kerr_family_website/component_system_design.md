# Kerr Family Website: Component System Design

## Overview

This document outlines the comprehensive component system for the Kerr Family Genealogy Website. The component architecture follows a modular approach, enabling efficient development, consistent design implementation, and scalable feature expansion. Each component is designed with reusability, accessibility, and performance in mind.

## Core Component Categories

### 1. Layout Components

Layout components provide the structural foundation for the entire website, ensuring consistent page organization and responsive behavior.

#### `PageLayout`
- **Purpose**: Primary container for all pages
- **Properties**:
  - `title`: Page title for SEO and browser tab
  - `description`: Meta description for SEO
  - `className`: Optional additional styling classes
- **Subcomponents**:
  - `Header`
  - `Navigation`
  - `MainContent`
  - `Footer`
- **Responsive Behavior**:
  - Maintains appropriate padding at all screen sizes
  - Controls content width constraints
  - Handles page-level transitions

#### `SectionLayout`
- **Purpose**: Container for major page sections
- **Properties**:
  - `title`: Section heading
  - `subtitle`: Optional secondary heading
  - `className`: Optional styling classes
  - `fullWidth`: Boolean to control width behavior
- **Responsive Behavior**:
  - Maintains consistent vertical spacing
  - Adapts heading size to screen width
  - Adjusts padding based on device size

#### `SplitLayout`
- **Purpose**: Two-column layout for content/sidebar patterns
- **Properties**:
  - `mainContent`: Primary content area
  - `sidebar`: Secondary content area
  - `ratio`: Content to sidebar width ratio (default: 2/1)
  - `reversed`: Boolean to flip column order
- **Responsive Behavior**:
  - Maintains columns on desktop and tablet landscape
  - Stacks vertically on tablet portrait and mobile
  - Controls spacing between stacked elements

#### `CardGrid`
- **Purpose**: Responsive grid for displaying card collections
- **Properties**:
  - `items`: Array of items to display
  - `renderItem`: Function to render each item
  - `columns`: Number of columns at desktop width
  - `gap`: Spacing between grid items
- **Responsive Behavior**:
  - Automatically reduces columns on smaller screens
  - Maintains consistent spacing regardless of screen size
  - Ensures card minimum width for readability

### 2. Navigation Components

Navigation components provide intuitive site exploration tools with consistent styling and behavior.

#### `MainNavigation`
- **Purpose**: Primary site navigation menu
- **Properties**:
  - `items`: Navigation structure data
  - `currentPath`: Current page path for highlighting
- **States**:
  - Default
  - Mobile menu open/closed
  - Dropdown open/closed
  - Current section highlighted
- **Subcomponents**:
  - `NavItem`
  - `Dropdown`
  - `MobileMenuToggle`
- **Accessibility Features**:
  - Keyboard navigation support
  - ARIA roles and attributes
  - Focus management

#### `BreadcrumbTrail`
- **Purpose**: Show navigation path and current location
- **Properties**:
  - `paths`: Array of path segments with labels and URLs
  - `separator`: Custom separator character/icon
- **Responsive Behavior**:
  - Shows full path on desktop
  - Truncates middle items on mobile with ellipsis
  - Maintains first and last items for context

#### `SideNavigation`
- **Purpose**: Section-specific navigation for deep content areas
- **Properties**:
  - `items`: Navigation structure for current section
  - `currentItem`: Currently active item
  - `depth`: Maximum depth to display
- **Responsive Behavior**:
  - Displayed as sidebar on desktop
  - Collapses to dropdown or tabs on mobile
  - Maintains consistent hierarchy visual cues

#### `SearchInterface`
- **Purpose**: Global search functionality
- **Properties**:
  - `placeholder`: Custom placeholder text
  - `searchHandler`: Function to process search queries
  - `recentSearches`: Optional array of recent searches
- **States**:
  - Default
  - Focus
  - Typing
  - Results display
  - No results
- **Responsive Behavior**:
  - Compact icon-only on mobile header
  - Expands to full search on interaction
  - Full-width results on mobile

### 3. Person & Relationship Components

These components display information about individuals and their relationships within the family.

#### `PersonCard`
- **Purpose**: Display summary information about a person
- **Properties**:
  - `person`: Person data object
  - `size`: Display size (small, medium, large)
  - `showDates`: Boolean to show/hide birth/death dates
  - `showLocation`: Boolean to show/hide primary location
  - `interactive`: Boolean for clickable behavior
- **Variations**:
  - Compact: Photo, name, years only
  - Standard: Photo, name, dates, location, brief relationship info
  - Detailed: All info plus key relationships
- **Responsive Behavior**:
  - Maintains aspect ratio for photos
  - Truncates text with ellipsis on overflow
  - Reduces information density on smaller screens

#### `PersonProfile`
- **Purpose**: Full detailed view of person information
- **Properties**:
  - `person`: Complete person data object
  - `showSidebar`: Boolean to control sidebar visibility
  - `highlightedRelationships`: Array of relationships to emphasize
- **Sections**:
  - Vital information (name, dates, locations)
  - Biography summary
  - Life timeline
  - Relationship diagram
  - Photo gallery
  - "Cool facts"
  - Sources and citations
- **Responsive Behavior**:
  - Multi-column layout on desktop
  - Stacked sections on mobile with collapse/expand
  - Prioritizes critical information at top

#### `RelationshipPath`
- **Purpose**: Visualize connection between two people
- **Properties**:
  - `person1`: First person object
  - `person2`: Second person object
  - `highlightType`: Type of relationship to emphasize
  - `showIntermediaries`: Boolean to show/hide connecting people
- **Visualization Options**:
  - Horizontal path
  - Vertical path
  - Compact view
  - Detailed view with relationship types
- **Responsive Behavior**:
  - Horizontal on desktop, vertical on mobile
  - Simplifies for very complex relationships on small screens
  - Interactive exploration on tap/click

#### `FamilyUnit`
- **Purpose**: Display family group (parents and children)
- **Properties**:
  - `parents`: Array of parent objects
  - `children`: Array of child objects
  - `marriageInfo`: Optional marriage details
  - `showExtended`: Boolean to include extended relationships
- **Responsive Behavior**:
  - Grid layout on desktop
  - List view on mobile
  - Maintains parent-child relationship visual cues

#### `RelationshipDiagram`
- **Purpose**: Interactive visualization of person's relationships
- **Properties**:
  - `person`: Central person object
  - `relationships`: Array of relationship objects
  - `depth`: How many degrees of separation to show
  - `types`: Array of relationship types to include
- **Interactive Features**:
  - Zoom and pan
  - Click to expand/focus
  - Filter by relationship type
  - Highlight paths
- **Responsive Behavior**:
  - Full interactive visualization on desktop
  - Simplified, scrollable version on mobile
  - Touch-optimized controls on tablets

### 4. Geographic Components

These components visualize location data and geographic relationships within the family history.

#### `LocationMap`
- **Purpose**: Display single location with context
- **Properties**:
  - `location`: Location data object
  - `zoom`: Initial zoom level
  - `interactive`: Boolean for map interactivity
  - `showSatellite`: Boolean for satellite view option
- **Responsive Behavior**:
  - Maintains aspect ratio across devices
  - Simplified controls on mobile
  - Touch gesture support on mobile/tablet

#### `MigrationMap`
- **Purpose**: Visualize family movement patterns
- **Properties**:
  - `paths`: Array of migration path objects
  - `timeRange`: Optional date range to filter movements
  - `people`: Array of people to include in visualization
  - `showAnimation`: Boolean for animated path display
- **Interactive Features**:
  - Time slider for temporal filtering
  - Person filters
  - Path highlighting
  - Location details on hover/click
- **Responsive Behavior**:
  - Full-featured on desktop
  - Simplified controls and reduced animation on mobile
  - Optimized performance for lower-powered devices

#### `LocationProfile`
- **Purpose**: Display detailed information about a significant location
- **Properties**:
  - `location`: Complete location data object
  - `associatedPeople`: Array of people connected to location
  - `timeRange`: Date range of family presence
  - `showMap`: Boolean to control map visibility
- **Sections**:
  - Location description and history
  - Interactive map
  - Timeline of family presence
  - Associated people
  - Photo gallery
  - Historical context
- **Responsive Behavior**:
  - Side-by-side layout on desktop
  - Stacked sections on mobile
  - Prioritizes map and key information

#### `GeographicDistributionChart`
- **Purpose**: Show family concentration across regions
- **Properties**:
  - `regions`: Array of geographic regions
  - `distribution`: Population data by region
  - `timePoint`: Specific date for distribution snapshot
  - `colorScale`: Custom color range for visualization
- **Visualization Options**:
  - Heat map
  - Choropleth map
  - Bubble chart
- **Responsive Behavior**:
  - Detailed visualization on desktop
  - Simplified version on mobile
  - Alternative list view for accessibility

### 5. Timeline Components

These components visualize chronological data and temporal relationships.

#### `PersonTimeline`
- **Purpose**: Display life events for an individual
- **Properties**:
  - `person`: Person data object
  - `events`: Array of life events
  - `includeHistorical`: Boolean to include historical context
  - `compact`: Boolean for condensed display
- **Event Types**:
  - Birth, death, marriage
  - Residence changes
  - Educational milestones
  - Career events
  - Family events
- **Responsive Behavior**:
  - Horizontal scrolling timeline on desktop
  - Vertical scrolling timeline on mobile
  - Consistent event card design across devices

#### `FamilyTimeline`
- **Purpose**: Show events across multiple family members
- **Properties**:
  - `people`: Array of person objects to include
  - `timeRange`: Start and end dates
  - `eventTypes`: Array of event types to include
  - `groupBy`: Option to group events (person, type, location)
- **Interactive Features**:
  - Zoom in/out of time periods
  - Filter by person or event type
  - Toggle historical context
  - Event details on hover/click
- **Responsive Behavior**:
  - Multi-track timeline on desktop
  - Single-track simplified view on mobile
  - Touch-friendly navigation controls

#### `HistoricalContextTimeline`
- **Purpose**: Align family events with historical context
- **Properties**:
  - `familyEvents`: Array of family event objects
  - `historicalEvents`: Array of historical event objects
  - `timeRange`: Start and end dates to display
  - `categories`: Event categories to include/exclude
- **Visualization Features**:
  - Parallel timelines
  - Color-coding by event type
  - Visual connections between related events
  - Era demarcation
- **Responsive Behavior**:
  - Dual-track visualization on desktop
  - Toggle between family/historical on mobile
  - Optimized for readability at all sizes

#### `TimelineControls`
- **Purpose**: Navigation interface for timeline components
- **Properties**:
  - `timeRange`: Current visible range
  - `totalRange`: Total available time range
  - `zoomLevel`: Current zoom level
  - `position`: Control placement (top, bottom, side)
- **Control Features**:
  - Zoom in/out buttons
  - Time period quick navigation
  - Range slider
  - Toggle controls for data layers
- **Responsive Behavior**:
  - Full controls on desktop
  - Simplified essential controls on mobile
  - Touch-optimized hit areas

### 6. Tree Visualization Components

These components create interactive family tree visualizations with various display options.

#### `FamilyTreeViewer`
- **Purpose**: Main interactive family tree visualization
- **Properties**:
  - `data`: Complete family tree data structure
  - `rootPerson`: Starting person for visualization
  - `generations`: Number of generations to display
  - `viewType`: Display style (vertical, horizontal, fan, etc.)
- **Interactive Features**:
  - Pan and zoom navigation
  - Click to expand/collapse branches
  - Focus on specific individuals
  - Search within visible tree
- **Responsive Behavior**:
  - Full-featured on desktop with keyboard shortcuts
  - Touch-optimized controls on mobile/tablet
  - Simplified view option for small screens

#### `TreeNode`
- **Purpose**: Individual person representation in tree
- **Properties**:
  - `person`: Person data object
  - `nodeSize`: Size variant (small, medium, large)
  - `expanded`: Boolean for expanded state
  - `highlighted`: Boolean for emphasis
  - `relationshipType`: Relationship to parent node
- **Visual Variations**:
  - Standard: Photo, name, dates
  - Compact: Initials or small photo with name
  - Detailed: Additional information layers
- **States**:
  - Default
  - Hover
  - Selected
  - Expanded
- **Responsive Behavior**:
  - Scales appropriately with tree zoom level
  - Maintains minimum touch target size on mobile
  - Prioritizes readability at all sizes

#### `TreeControls`
- **Purpose**: Control panel for tree visualization
- **Properties**:
  - `viewOptions`: Available tree view types
  - `filterOptions`: Options for filtering tree data
  - `currentSettings`: Current view configuration
  - `position`: Control panel placement
- **Control Features**:
  - View type selection
  - Generation depth control
  - Relationship type filters
  - Search within tree
  - Reset/center view
  - Download/share options
- **Responsive Behavior**:
  - Docked panel on desktop
  - Collapsible panel on tablet
  - Bottom sheet or modal on mobile

#### `AncestorView`
- **Purpose**: Specialized vertical ancestry visualization
- **Properties**:
  - `person`: Root person object
  - `generations`: Number of ancestor generations to show
  - `completeLines`: Boolean to show all lines or direct only
  - `showSiblings`: Boolean to include siblings
- **Visualization Features**:
  - Traditional ancestor chart format
  - Color-coding by family line
  - Indication of missing information
  - Connection lines with relationship labels
- **Responsive Behavior**:
  - Horizontal scrolling on desktop for wide trees
  - Vertical scrolling on mobile with collapsible branches
  - Dynamically adjusts node size based on available space

#### `DescendantView`
- **Purpose**: Specialized visualization of a person's descendants
- **Properties**:
  - `person`: Root person object
  - `generations`: Number of descendant generations to show
  - `showSpouses`: Boolean to include marriage partners
  - `compactSiblings`: Boolean to condense sibling groups
- **Visualization Features**:
  - Traditional descendant chart format
  - Sibling order preservation
  - Multiple marriage representation
  - Generation labels
- **Responsive Behavior**:
  - Horizontal layout on desktop
  - Vertical stacking on mobile
  - Collapsible branches for space efficiency

### 7. Media & Gallery Components

These components handle the display of photos, documents, and other media assets.

#### `PhotoGallery`
- **Purpose**: Display collection of family photographs
- **Properties**:
  - `images`: Array of image objects with metadata
  - `initialImage`: Starting image index
  - `layout`: Gallery layout style
  - `showCaptions`: Boolean for caption display
- **Gallery Features**:
  - Thumbnail grid navigation
  - Lightbox full-screen view
  - Caption and date display
  - Download option
  - Sharing functionality
- **Responsive Behavior**:
  - Masonry layout on desktop
  - Grid or list view on mobile
  - Touch swipe navigation
  - Orientation-aware display

#### `MediaViewer`
- **Purpose**: Display individual media items with context
- **Properties**:
  - `item`: Media item object (photo, document, audio)
  - `showMetadata`: Boolean for metadata display
  - `allowDownload`: Boolean for download option
  - `related`: Array of related media items
- **Viewer Features**:
  - Zoom and pan for images
  - Transcription toggle for documents
  - Audio player controls
  - Before/after comparison for restored photos
- **Responsive Behavior**:
  - Large display area on desktop
  - Full-screen option on mobile
  - Touch gesture support
  - Metadata panel adjusts position based on screen size

#### `DocumentViewer`
- **Purpose**: Display and interact with family documents
- **Properties**:
  - `document`: Document object with metadata
  - `showTranscription`: Boolean for transcription display
  - `highlightSearch`: Optional search term to highlight
  - `pageNumber`: Initial page for multi-page documents
- **Viewer Features**:
  - Page navigation for multi-page documents
  - Zoom and pan controls
  - Side-by-side transcription
  - Text search within document
  - Annotation display option
- **Responsive Behavior**:
  - Dual-pane view on desktop (image + transcription)
  - Tabbed interface on mobile
  - Orientation awareness for optimal reading

#### `MediaTimeline`
- **Purpose**: Chronological display of media items
- **Properties**:
  - `items`: Array of media items with dates
  - `timeRange`: Date range to display
  - `types`: Media types to include
  - `groupBy`: Option to group by year, decade, or event
- **Features**:
  - Scrollable timeline interface
  - Visual clustering of items by time period
  - Filtering by media type
  - Lightbox integration
- **Responsive Behavior**:
  - Horizontal scrolling timeline on desktop
  - Vertical scrolling on mobile
  - Appropriately sized previews at all screen sizes

### 8. Story & Narrative Components

These components present written content and narratives about the family history.

#### `StoryCard`
- **Purpose**: Display summary of a family story or narrative
- **Properties**:
  - `story`: Story data object
  - `imagePosition`: Featured image placement
  - `excerptLength`: Number of characters for preview
  - `showMetadata`: Boolean for additional info display
- **Card Elements**:
  - Featured image
  - Title
  - Excerpt or summary
  - Related people tags
  - Time period indicator
- **Responsive Behavior**:
  - Horizontal layout on desktop
  - Vertical stacking on mobile
  - Image sizing adjustments for different screens

#### `NarrativeArticle`
- **Purpose**: Present long-form narrative content
- **Properties**:
  - `content`: Structured content object
  - `tableOfContents`: Boolean for section navigation
  - `footnotes`: Array of reference footnotes
  - `relatedStories`: Array of related narrative links
- **Article Features**:
  - Section navigation
  - Integrated media elements
  - Pull quotes
  - Sidebar information panels
  - Citation display
- **Responsive Behavior**:
  - Multi-column potential on large desktop
  - Single column with side elements on desktop
  - Streamlined single column on mobile
  - Floating ToC on desktop, inline on mobile

#### `QuoteBlock`
- **Purpose**: Highlight significant quotes or excerpts
- **Properties**:
  - `quote`: Quote text
  - `attribution`: Source attribution
  - `context`: Additional contextual information
  - `emphasis`: Style emphasis level
- **Visual Variations**:
  - Standard pull quote
  - Full-width highlight
  - Sidebar emphasis
  - With or without decorative elements
- **Responsive Behavior**:
  - May span multiple columns on desktop
  - Full width with appropriate padding on mobile
  - Font size adjustments for readability

#### `StoryCollection`
- **Purpose**: Group related stories or narrative elements
- **Properties**:
  - `stories`: Array of story objects
  - `theme`: Collection theme or category
  - `layout`: Display layout style
  - `introduction`: Introductory text for collection
- **Collection Features**:
  - Thematic grouping
  - Filtering options
  - Sort controls (chronological, alphabetical)
  - Grid or list display options
- **Responsive Behavior**:
  - Grid layout on desktop
  - List view option on all devices
  - Adjusts items per row based on screen width

### 9. UI Utility Components

These components provide consistent interface elements and utilities throughout the site.

#### `SearchResults`
- **Purpose**: Display search results across different content types
- **Properties**:
  - `results`: Array of search result objects
  - `query`: Original search query
  - `filters`: Active result filters
  - `groupBy`: Result grouping option
- **Result Features**:
  - Categorized results (People, Places, Stories, etc.)
  - Result snippets with highlighted query terms
  - Sorting options
  - Filter controls
- **Responsive Behavior**:
  - Multi-column layout on desktop
  - Full-width single column on mobile
  - Collapsible category sections on mobile

#### `FilterPanel`
- **Purpose**: Interface for filtering data displays
- **Properties**:
  - `filters`: Available filter options
  - `activeFilters`: Currently applied filters
  - `layout`: Panel layout style
  - `position`: Panel placement
- **Filter Types**:
  - Checkbox groups
  - Radio options
  - Range sliders
  - Date pickers
  - Search refinement
- **Responsive Behavior**:
  - Sidebar panel on desktop
  - Collapsible top panel on tablet
  - Bottom sheet or modal on mobile

#### `DataTable`
- **Purpose**: Display structured data in tabular format
- **Properties**:
  - `data`: Array of data objects
  - `columns`: Column configuration
  - `sortable`: Boolean or array of sortable columns
  - `pagination`: Pagination configuration
- **Table Features**:
  - Column sorting
  - Fixed headers
  - Row highlighting
  - Pagination controls
  - Export options
- **Responsive Behavior**:
  - Full table on desktop
  - Horizontal scroll or card view on tablet
  - Stacked card view on mobile

#### `Tooltip`
- **Purpose**: Provide contextual information on hover/focus
- **Properties**:
  - `content`: Tooltip content (text or JSX)
  - `position`: Preferred display position
  - `trigger`: Element that activates tooltip
  - `maxWidth`: Maximum tooltip width
- **Behavior Options**:
  - Hover activation
  - Click/tap activation
  - Focus activation for accessibility
  - Delay timing options
- **Responsive Behavior**:
  - Positioned tooltip on desktop
  - Bottom-anchored on mobile regardless of specified position
  - Touch-friendly activation on mobile devices

## Component Theming System

The component system uses a consistent theming approach to ensure visual coherence across the website.

### Theme Structure

```javascript
const themeObject = {
  colors: {
    primary: {
      main: '#1c3f5f',      // Deep tartan blue
      light: '#2c5a8c',
      dark: '#14293d',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#7c2128',      // Warm burgundy
      light: '#9c353d',
      dark: '#56171c',
      contrast: '#ffffff',
    },
    accent: {
      main: '#d5b048',      // Antique gold
      light: '#e6ca7a',
      dark: '#a88b32',
      contrast: '#000000',
    },
    background: {
      default: '#f7f3e9',   // Warm cream
      paper: '#ffffff',
      alt: '#f1ece0',
      dark: '#2a2a2a',
    },
    text: {
      primary: '#2a2a2a',   // Rich charcoal
      secondary: '#555555',
      disabled: '#888888',
      light: '#ffffff',
    },
    status: {
      error: '#d32f2f',
      warning: '#ed6c02',
      info: '#0288d1',
      success: '#2e7d32',
    }
  },
  typography: {
    fontFamily: {
      heading: "'Playfair Display', serif",
      body: "'Source Sans Pro', sans-serif",
      accent: "'Libre Baskerville', serif",
      mono: "'IBM Plex Mono', monospace",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  spacing: {
    units: 4,  // Base unit in pixels
    // Usage: spacing(2) = 8px, spacing(4) = 16px, etc.
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  zIndex: {
    tooltip: 1500,
    modal: 1400,
    popover: 1300,
    dropdown: 1200,
    header: 1100,
    above: 10,
    default: 1,
    below: -1,
  }
};
```

### Theme Implementation with Tailwind CSS

The theme will be implemented using Tailwind CSS with a custom configuration that leverages the theme object.

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1c3f5f',
          light: '#2c5a8c',
          dark: '#14293d',
        },
        secondary: {
          DEFAULT: '#7c2128',
          light: '#9c353d',
          dark: '#56171c',
        },
        accent: {
          DEFAULT: '#d5b048',
          light: '#e6ca7a',
          dark: '#a88b32',
        },
        background: {
          DEFAULT: '#f7f3e9',
          paper: '#ffffff',
          alt: '#f1ece0',
          dark: '#2a2a2a',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        accent: ['Libre Baskerville', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        // Custom spacing if needed beyond Tailwind defaults
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        profile: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2a2a2a',
            h1: {
              fontFamily: 'Playfair Display, serif',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
            },
            // Additional typography customizations
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

## Component Development Guidelines

### Component Structure

Each component should follow a consistent structure:

1. **PropTypes Definition**
   - Clear typing for all props
   - Default values where appropriate
   - Required props marked accordingly

2. **Component Composition**
   - Functional components with hooks
   - Clear separation of logic and rendering
   - Appropriate use of composition over inheritance

3. **Style Integration**
   - Tailwind CSS for styling
   - CSS Modules for component-specific styles
   - Consistent use of theme variables

4. **Documentation**
   - JSDoc comments for component purpose and props
   - Usage examples
   - Edge case handling notes

### Accessibility Requirements

All components must meet these accessibility requirements:

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Focus states must be clearly visible
   - Logical tab order must be maintained

2. **Screen Reader Support**
   - Appropriate ARIA roles and attributes
   - Alternative text for images
   - Descriptive labels for form elements
   - Announcement of dynamic content changes

3. **Color and Contrast**
   - Minimum contrast ratios adhering to WCAG AA standards
   - Not relying solely on color to convey information
   - Tested with color blindness simulators

4. **Semantic Markup**
   - Using appropriate HTML elements
   - Proper heading hierarchy
   - Meaningful landmarks and regions

### Performance Considerations

Components should be optimized for performance:

1. **Code Splitting**
   - Lazy loading for complex visualizations
   - Dynamic imports for larger components

2. **Rendering Optimization**
   - React.memo for pure components
   - useMemo for expensive calculations
   - useCallback for stable function references
   - Virtual rendering for long lists

3. **Asset Optimization**
   - Image size and format optimization
   - SVG for icons and simple illustrations
   - Font subsetting and optimization

4. **Bundle Size Awareness**
   - Monitoring dependency size
   - Tree-shaking compatible imports
   - Code splitting by route or component

## Component Testing Strategy

### Unit Tests

Each component should have comprehensive unit tests:

1. **Rendering Tests**
   - Test component renders without errors
   - Test with minimum required props
   - Test with all possible prop combinations

2. **Interaction Tests**
   - Verify expected behavior on user interactions
   - Test keyboard navigation
   - Test all interactive states

3. **Integration Tests**
   - Test component composition
   - Test data flow between parent and child components
   - Test context consumption and updates

### Accessibility Testing

Automated and manual accessibility testing:

1. **Automated Testing**
   - jest-axe for accessibility violations
   - react-testing-library for rendering testing

2. **Manual Testing**
   - Screen reader verification
   - Keyboard navigation verification
   - Color contrast checking

### Responsive Testing

Testing across different viewport sizes:

1. **Viewport Testing**
   - Tests at xs, sm, md, lg, xl breakpoints
   - Orientation testing (portrait/landscape)
   - Different aspect ratio testing

2. **Device Testing**
   - Testing on actual devices (not just emulators)
   - Touch interaction testing
   - Device-specific quirk handling

## Implementation Roadmap

### Phase 1: Core Component Development

1. Layout Components
   - PageLayout
   - SectionLayout
   - SplitLayout
   - CardGrid

2. Navigation Components
   - MainNavigation
   - BreadcrumbTrail
   - SideNavigation

3. Basic UI Utilities
   - Tooltip
   - FilterPanel
   - SearchResults

### Phase 2: Person & Relationship Components

1. Person Display Components
   - PersonCard
   - PersonProfile
   - FamilyUnit

2. Relationship Components
   - RelationshipPath
   - RelationshipDiagram

### Phase 3: Visualization Components

1. Tree Components
   - FamilyTreeViewer
   - TreeNode
   - TreeControls

2. Geographic Components
   - LocationMap
   - MigrationMap
   - GeographicDistributionChart

3. Timeline Components
   - PersonTimeline
   - FamilyTimeline
   - HistoricalContextTimeline

### Phase 4: Media & Story Components

1. Media Components
   - PhotoGallery
   - MediaViewer
   - DocumentViewer

2. Story Components
   - StoryCard
   - NarrativeArticle
   - QuoteBlock
   - StoryCollection

### Phase 5: Integration & Refinement

1. Cross-Component Integration
   - Shared data flow
   - State management
   - Global context implementation

2. Performance Optimization
   - Code splitting
   - Lazy loading
   - Bundle optimization

3. Accessibility Improvements
   - Screen reader testing
   - Keyboard navigation improvements
   - Color contrast refinements

## Conclusion

This component system design provides a comprehensive blueprint for developing the Kerr Family Genealogy Website. By following this structured approach and adhering to the guidelines outlined, we can create a cohesive, accessible, and performant user experience that effectively showcases the rich history and connections of the Kerr family.

The modular nature of the component architecture enables both efficient development and future extensibility as new information and features are added to the family history project. Each component is designed with reusability, accessibility, and performance in mind, ensuring a high-quality user experience across all devices and for all users.