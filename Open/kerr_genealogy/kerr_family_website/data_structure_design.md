# Kerr Family Website: Data Structure Design

## Overview

This document defines the comprehensive data structure for the Kerr Family Genealogy Website. A well-designed data structure is critical for efficiently representing complex family relationships, geographic connections, temporal events, and narrative content. This design prioritizes:

1. **Flexibility**: Accommodating various relationship types and family structures
2. **Extensibility**: Supporting future data additions and refinements
3. **Performance**: Optimizing for efficient querying and visualization
4. **Usability**: Structuring data to align with UI component requirements
5. **Integrity**: Maintaining data consistency and accuracy across the system

## Core Data Models

### 1. Person Model

The Person model represents individual family members and forms the foundation of the genealogical database.

```typescript
interface Person {
  // Core Identity
  id: string;                     // Unique identifier
  firstName: string;              // First/given name
  middleName?: string;            // Middle name(s) if any
  lastName: string;               // Last/family name
  maidenName?: string;            // Maiden name for married individuals who changed names
  nicknames?: string[];           // Alternative names or nicknames
  
  // Vital Information
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birth?: {
    date?: DateInfo;              // Birth date with certainty level
    place?: PlaceReference;       // Birth location
    notes?: string;               // Additional birth information
    sources?: SourceCitation[];   // Supporting documentation
  };
  death?: {
    date?: DateInfo;              // Death date with certainty level
    place?: PlaceReference;       // Death location
    cause?: string;               // Cause of death if known
    notes?: string;               // Additional death information
    sources?: SourceCitation[];   // Supporting documentation
  };
  burial?: {
    date?: DateInfo;              // Burial date
    place?: PlaceReference;       // Cemetery or burial location
    notes?: string;               // Additional burial information
    sources?: SourceCitation[];   // Supporting documentation
  };
  
  // Descriptive Information
  photo?: MediaReference;         // Primary profile photo
  biography?: string;             // Biographical summary
  occupation?: Occupation[];      // List of occupations throughout life
  education?: Education[];        // Educational background
  religion?: string;              // Religious affiliation
  nationality?: string[];         // Nationalities/citizenship
  
  // Military Service
  militaryService?: MilitaryService[];  // Military service records
  
  // Contact Information (for living individuals)
  isLiving?: boolean;             // Flag for privacy controls
  contactInfo?: {                 // Only displayed if explicit permission
    email?: string;
    phone?: string;
    address?: Address;
  };
  
  // Genealogical Metadata
  relationships?: RelationshipReference[];  // Links to relationships
  events?: EventReference[];      // Links to life events
  residences?: Residence[];       // Places of residence over time
  coolFacts?: string[];           // Interesting facts about the person
  notes?: string;                 // Research notes
  
  // System Metadata
  lastUpdated: string;            // ISO date of last record update
  visibilityLevel?: 'public' | 'family' | 'private';  // Privacy control
  sources?: SourceCitation[];     // Sources for the person record
  media?: MediaReference[];       // Photos, documents, etc.
  externalIds?: {                 // IDs in external systems
    [system: string]: string;     // e.g., { "ancestry": "A123456" }
  };
  tags?: string[];                // Organizational tags
}
```

### 2. Relationship Model

The Relationship model defines connections between individuals, supporting various relationship types.

```typescript
interface Relationship {
  id: string;                     // Unique identifier
  type: RelationshipType;         // Type of relationship
  persons: {                      // People involved in the relationship
    person1: {
      id: string;                 // Reference to first person
      role: string;               // Role in relationship (e.g., "husband", "parent")
    };
    person2: {
      id: string;                 // Reference to second person
      role: string;               // Role in relationship (e.g., "wife", "child")
    };
  };
  
  // For Marriage/Partnership Relationships
  marriage?: {
    date?: DateInfo;              // Marriage date
    place?: PlaceReference;       // Marriage location
    officiant?: string;           // Person who performed ceremony
    witnesses?: string[];         // Witnesses to the marriage
    sources?: SourceCitation[];   // Marriage documentation
  };
  divorce?: {
    date?: DateInfo;              // Divorce date
    place?: PlaceReference;       // Divorce location
    sources?: SourceCitation[];   // Divorce documentation
  };
  
  // For Parent-Child Relationships
  parentChild?: {
    biologicalRelation?: boolean; // True if biological, false if adopted/step
    adoptionDate?: DateInfo;      // Date of adoption if applicable
    notes?: string;               // Additional relationship information
    sources?: SourceCitation[];   // Documentation
  };
  
  // For Sibling Relationships
  sibling?: {
    relationship?: 'full' | 'half' | 'step' | 'adopted';
    notes?: string;
    sources?: SourceCitation[];
  };
  
  // For Other Relationships
  notes?: string;                 // Additional information
  timeframe?: {                   // When relationship was active
    startDate?: DateInfo;
    endDate?: DateInfo;
  };
  
  // System Metadata
  lastUpdated: string;            // ISO date of last record update
  sources?: SourceCitation[];     // Documentation sources
}

type RelationshipType = 
  'marriage' | 'partnership' | 'parent-child' | 
  'sibling' | 'grandparent' | 'cousin' | 
  'aunt-uncle' | 'niece-nephew' | 'step-relation' |
  'adopted' | 'guardian' | 'friend' | 'associate' | 'neighbor';
```

### 3. Place Model

The Place model represents locations relevant to the family history.

```typescript
interface Place {
  id: string;                     // Unique identifier
  name: string;                   // Place name
  alternateNames?: string[];      // Historical or alternate names
  
  // Hierarchical Location
  street?: string;                // Street address if applicable
  city?: string;                  // City/town
  county?: string;                // County/district
  state?: string;                 // State/province
  country: string;                // Country
  postalCode?: string;            // Postal/zip code
  
  // Geospatial Data
  coordinates?: {
    latitude: number;
    longitude: number;
    accuracy?: 'exact' | 'approximate' | 'region';
  };
  
  // Historical Context
  timeframe?: {
    startDate?: DateInfo;         // When this place became relevant
    endDate?: DateInfo;           // When relevance ended (e.g., property sold)
  };
  historicalContext?: string;     // Historical information about the place
  
  // Family Significance
  significance?: string;          // Why this place matters to the family
  familyConnections?: {           // People connected to this place
    personId: string;
    connectionType: 'residence' | 'birth' | 'death' | 'marriage' | 'work' | 'education' | 'other';
    timeframe?: {
      startDate?: DateInfo;
      endDate?: DateInfo;
    };
    notes?: string;
  }[];
  
  // Media and Documentation
  photos?: MediaReference[];      // Images of the place
  documents?: MediaReference[];   // Associated documents
  notes?: string;                 // Research notes
  sources?: SourceCitation[];     // Documentation sources
  
  // System Metadata
  lastUpdated: string;            // ISO date of last record update
}

interface PlaceReference {
  placeId?: string;               // Reference to place record
  
  // Alternatively, simplified inline place
  name?: string;                  // Formatted place name
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
```

### 4. Event Model

The Event model represents significant occurrences in the family history.

```typescript
interface Event {
  id: string;                     // Unique identifier
  type: EventType;                // Type of event
  title: string;                  // Event title
  date?: DateInfo;                // When the event occurred
  place?: PlaceReference;         // Where the event occurred
  
  // People involved
  people: {
    personId: string;
    role: string;                 // Role in the event (e.g., "subject", "witness")
  }[];
  
  // Event Details
  description?: string;           // Event description
  historicalContext?: string;     // Historical background
  impact?: string;                // Significance to family history
  
  // Media and Documentation
  media?: MediaReference[];       // Photos, documents, etc.
  sources?: SourceCitation[];     // Documentation sources
  notes?: string;                 // Research notes
  
  // System Metadata
  lastUpdated: string;            // ISO date of last record update
}

type EventType = 
  // Life Events
  'birth' | 'death' | 'marriage' | 'divorce' | 'engagement' | 'adoption' |
  // Education Events
  'education-start' | 'graduation' | 
  // Career Events
  'job-start' | 'job-end' | 'promotion' | 'retirement' |
  // Residence Events
  'residence-change' | 'property-purchase' | 'property-sale' |
  // Military Events
  'military-enlistment' | 'military-discharge' | 'military-award' |
  // Travel Events
  'migration' | 'immigration' | 'emigration' | 'naturalization' |
  // Religious Events
  'baptism' | 'confirmation' | 'bar-mitzvah' | 'bat-mitzvah' |
  // Medical Events
  'medical' | 'illness' | 'recovery' |
  // Historical Events
  'historical' | 'community' | 'family-gathering' | 'other';
```

### 5. Source Model

The Source model documents the evidence for genealogical claims.

```typescript
interface Source {
  id: string;                     // Unique identifier
  type: SourceType;               // Type of source
  title: string;                  // Source title
  
  // Publication/Origin Information
  author?: string;                // Author or creator
  publicationInfo?: {
    publisher?: string;
    place?: string;
    date?: DateInfo;
    volume?: string;
    issue?: string;
    pages?: string;
  };
  
  // Repository Information
  repository?: {
    name: string;
    location?: string;
    referenceId?: string;         // Reference number in repository
    url?: string;                 // Online repository URL
  };
  
  // Digital Information
  digitalInfo?: {
    url?: string;                 // URL to digital version
    accessDate?: string;          // When the source was accessed
    fileType?: string;            // File format (PDF, JPEG, etc.)
  };
  
  // Content and Analysis
  transcript?: string;            // Transcription of source content
  translation?: string;           // Translation if in another language
  reliability?: 'high' | 'medium' | 'low' | 'questionable';
  analysis?: string;              // Analysis of the source
  
  // Media
  media?: MediaReference[];       // Images of the source
  
  // System Metadata
  lastUpdated: string;            // ISO date of last record update
  notes?: string;                 // Research notes
}

interface SourceCitation {
  sourceId: string;               // Reference to source record
  detail?: string;                // Specific citation details
  confidence?: 'high' | 'medium' | 'low' | 'speculative';
  notes?: string;                 // Citation-specific notes
}

type SourceType = 
  // Official Records
  'birth-certificate' | 'death-certificate' | 'marriage-certificate' | 
  'divorce-record' | 'census' | 'military-record' | 'land-record' |
  'court-record' | 'probate-record' | 'immigration-record' |
  // Published Sources
  'book' | 'article' | 'newspaper' | 'obituary' | 'directory' | 
  'yearbook' | 'periodical' |
  // Church Records
  'church-record' | 'baptism-record' | 'burial-record' |
  // Personal Documents
  'letter' | 'diary' | 'memoir' | 'manuscript' | 'photo' |
  'family-bible' | 'gravestone' |
  // Digital Sources
  'website' | 'database' | 'digital-archive' | 'email' | 
  // Other
  'interview' | 'oral-history' | 'dna-test' | 'other';
```

### 6. Media Model

The Media model manages photos, documents, and other media assets.

```typescript
interface Media {
  id: string;                     // Unique identifier
  type: MediaType;                // Type of media
  title: string;                  // Descriptive title
  
  // File Information
  file: {
    filename: string;
    path: string;                 // Storage path
    mimeType: string;             // File format
    fileSize?: number;            // Size in bytes
    dimensions?: {                // For images and videos
      width: number;
      height: number;
    };
    duration?: number;            // For audio/video (seconds)
  };
  
  // Content Information
  description?: string;           // Detailed description
  date?: DateInfo;                // Date of media creation
  place?: PlaceReference;         // Location depicted/associated
  people?: {                      // People in the media
    personId: string;
    rect?: {                      // For face tagging in photos
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }[];
  
  // Rights and Attribution
  copyright?: string;             // Copyright information
  attribution?: string;           // Creator/photographer
  license?: string;               // Usage license
  
  // Technical Information
  original?: {                    // Information about original item
    medium?: string;              // Physical medium
    condition?: string;           // Condition of original
    owner?: string;               // Current owner of original
    location?: string;            // Storage location of original
  };
  
  // Organization
  tags?: string[];                // Organizational tags
  collections?: string[];         // Collections this media belongs to
  
  // System Metadata
  lastUpdated: string;            // ISO date of last record update
  sources?: SourceCitation[];     // Documentation sources
  notes?: string;                 // Research notes
}

interface MediaReference {
  mediaId: string;                // Reference to media record
  primary?: boolean;              // If this is the primary media item
  caption?: string;               // Context-specific caption
}

type MediaType = 
  // Images
  'photo' | 'portrait' | 'document-scan' | 'artwork' | 
  // Documents
  'letter' | 'certificate' | 'newspaper' | 'book-page' | 
  // Audio/Video
  'audio' | 'video' | 'oral-history' |
  // Other
  'gravestone' | 'artifact' | 'other';
```

### 7. Story Model

The Story model represents narrative content about the family history.

```typescript
interface Story {
  id: string;                     // Unique identifier
  title: string;                  // Story title
  subtitle?: string;              // Optional subtitle
  author?: string;                // Author of the story
  
  // Content
  summary?: string;               // Brief summary
  content: StoryContent[];        // Structured content blocks
  
  // Context
  category: StoryCategory;        // Story category
  topics?: string[];              // Topical tags
  timeframe?: {                   // Time period covered
    startDate?: DateInfo;
    endDate?: DateInfo;
  };
  locations?: PlaceReference[];   // Places mentioned in story
  
  // Related Entities
  people?: string[];              // Person IDs related to story
  events?: string[];              // Event IDs related to story
  
  // Media
  featuredImage?: MediaReference; // Primary story image
  media?: MediaReference[];       // Associated media
  
  // System Metadata
  createdDate: string;            // ISO date of creation
  lastUpdated: string;            // ISO date of last update
  published: boolean;             // Whether story is published
  sources?: SourceCitation[];     // Documentation sources
  relatedStories?: string[];      // IDs of related stories
}

type StoryContent = 
  | { type: 'paragraph', text: string }
  | { type: 'heading', text: string, level: 1 | 2 | 3 | 4 | 5 | 6 }
  | { type: 'quote', text: string, attribution?: string }
  | { type: 'list', items: string[], ordered: boolean }
  | { type: 'image', mediaId: string, caption?: string, alignment?: 'left' | 'center' | 'right' }
  | { type: 'document', mediaId: string, caption?: string }
  | { type: 'person-reference', personId: string, displayType?: 'card' | 'inline' | 'link' }
  | { type: 'place-reference', placeId: string, displayType?: 'card' | 'map' | 'link' }
  | { type: 'event-reference', eventId: string, displayType?: 'card' | 'timeline' | 'link' }
  | { type: 'source-citation', sourceId: string }
  | { type: 'timeline', events: string[], title?: string }
  | { type: 'map', places: string[], title?: string }
  | { type: 'family-tree', rootPersonId: string, generations?: number }
  | { type: 'custom-html', html: string };

type StoryCategory = 
  'biography' | 'family-history' | 'location-history' | 
  'historical-event' | 'migration' | 'military-service' |
  'tradition' | 'anecdote' | 'research-analysis' |
  'photo-essay' | 'interview' | 'memorial' | 'other';
```

### 8. Research Model

The Research model tracks genealogical research progress and findings.

```typescript
interface Research {
  id: string;                     // Unique identifier
  title: string;                  // Research question or topic
  status: 'planned' | 'in-progress' | 'complete' | 'inconclusive';
  
  // Research Details
  description: string;            // Description of research question
  methodology?: string;           // Research approach
  findings?: string;              // Summary of findings
  conclusion?: string;            // Research conclusion
  
  // Related Entities
  subjects?: {                    // Entities being researched
    personIds?: string[];
    placeIds?: string[];
    eventIds?: string[];
    relationshipIds?: string[];
  };
  
  // Evidence and Analysis
  sources?: {
    sourceId: string;
    relevance: string;            // How this source relates to question
    analysis: string;             // Analysis of the source information
  }[];
  
  // Collaboration
  contributors?: string[];        // People who contributed
  
  // Research Management
  created: string;                // ISO date of creation
  lastUpdated: string;            // ISO date of last update
  priority?: 'high' | 'medium' | 'low';
  tags?: string[];                // Organizational tags
  nextSteps?: string[];           // Planned next research steps
  notes?: string;                 // Research notes
}
```

## Supporting Data Types

### DateInfo Type

DateInfo represents dates with varying levels of certainty and precision.

```typescript
interface DateInfo {
  type: 'exact' | 'approximate' | 'range' | 'before' | 'after' | 'calculated' | 'estimated';
  
  // For exact or approximate dates
  date?: string;                  // ISO format (YYYY-MM-DD)
  
  // For date ranges
  startDate?: string;             // ISO format (YYYY-MM-DD)
  endDate?: string;               // ISO format (YYYY-MM-DD)
  
  // For partial dates
  year?: number;                  // Year only
  month?: number;                 // Month only (1-12)
  day?: number;                   // Day only (1-31)
  
  // Date information
  calendar?: 'gregorian' | 'julian' | 'hebrew' | 'islamic' | 'other';
  certainty?: 'high' | 'medium' | 'low';
  note?: string;                  // Explanation of date derivation
}
```

### Occupation Type

Occupation represents employment or professional activities.

```typescript
interface Occupation {
  title: string;                  // Job title
  industry?: string;              // Industry or field
  employer?: string;              // Employer name
  place?: PlaceReference;         // Work location
  description?: string;           // Description of role
  timeframe?: {
    startDate?: DateInfo;
    endDate?: DateInfo;
  };
  sources?: SourceCitation[];     // Documentation sources
}
```

### Education Type

Education represents educational experiences.

```typescript
interface Education {
  institution: string;            // School name
  level: 'primary' | 'secondary' | 'college' | 'university' | 'vocational' | 'other';
  degree?: string;                // Degree earned
  fieldOfStudy?: string;          // Major/concentration
  place?: PlaceReference;         // Institution location
  timeframe?: {
    startDate?: DateInfo;
    endDate?: DateInfo;
  };
  achievements?: string[];        // Notable achievements
  sources?: SourceCitation[];     // Documentation sources
}
```

### MilitaryService Type

MilitaryService represents military service history.

```typescript
interface MilitaryService {
  branch: string;                 // Military branch
  servicePeriod: {
    startDate?: DateInfo;
    endDate?: DateInfo;
  };
  rank?: string;                  // Highest rank achieved
  unit?: string;                  // Unit assignment
  conflicts?: string[];           // Wars/conflicts participated in
  locations?: PlaceReference[];   // Service locations
  awards?: string[];              // Military decorations
  dischargeType?: string;         // Type of discharge
  veteranStatus?: string;         // Veteran status information
  serviceNumber?: string;         // Military ID/service number
  sources?: SourceCitation[];     // Documentation sources
  notes?: string;                 // Additional information
}
```

### Residence Type

Residence represents a place where a person lived.

```typescript
interface Residence {
  place: PlaceReference;          // Residence location
  timeframe: {
    startDate?: DateInfo;
    endDate?: DateInfo;
  };
  type?: 'primary' | 'secondary' | 'temporary' | 'vacation';
  ownership?: 'owned' | 'rented' | 'family-owned' | 'other';
  coResidents?: string[];         // Person IDs of others at residence
  sources?: SourceCitation[];     // Documentation sources
  notes?: string;                 // Additional information
}
```

### Address Type

Address represents a physical address.

```typescript
interface Address {
  street: string;
  street2?: string;
  city: string;
  county?: string;
  state?: string;
  postalCode?: string;
  country: string;
  current: boolean;               // If this is current address
}
```

### RelationshipReference Type

RelationshipReference connects a person to a relationship.

```typescript
interface RelationshipReference {
  relationshipId: string;         // Reference to relationship record
  type: RelationshipType;         // Type of relationship
  personId: string;               // Reference to related person
  role: string;                   // Role in relationship
}
```

### EventReference Type

EventReference connects a person to an event.

```typescript
interface EventReference {
  eventId: string;                // Reference to event record
  role: string;                   // Person's role in event
}
```

## Database Structure and Organization

### Data Storage Approach

The genealogical data will be stored using a combination of:

1. **JSON Data Files**
   - Individual files for each data type
   - Structured for efficient loading and query
   - Enables version control and easy editing

2. **Relationship Indexing**
   - Bidirectional indices for relationship navigation
   - Optimized lookups for common relationship queries
   - Support for extended family exploration

3. **Search Indexing**
   - Full-text search capability across all content
   - Name variant matching
   - Tag-based and attribute-based filtering

### File Structure

```
/data
  /people
    people.json             # All person records
    people-index.json       # Search and relationship indices
  
  /relationships
    relationships.json      # All relationship records
    family-units.json       # Precomputed family groupings
  
  /places
    places.json             # All place records
    geocoding.json          # Geographic lookup data
  
  /events
    events.json             # All event records
    timeline.json           # Chronological event index
  
  /sources
    sources.json            # All source records
    citations.json          # Citation relationships
  
  /media
    media.json              # Media metadata
    /originals              # Original media files
    /thumbnails             # Generated thumbnails
    /optimized              # Web-optimized versions
  
  /stories
    stories.json            # Story content and metadata
  
  /research
    research.json           # Research notes and status
  
  /compiled
    family-tree.json        # Precomputed tree structures
    timeline-data.json      # Formatted timeline data
    location-data.json      # Formatted map data
    relationship-network.json # Network visualization data
```

## Data Relationships and Access Patterns

### Core Entity Relationships

The following diagram illustrates the key relationships between entities:

```
Person ─┬─── RelationshipLine1 ───┬─── Person
        │                          │
        └─── RelationshipLine2 ───┘
            │
            └─── Person (Child)

Person ─┬─── ParticipatedIn ───┬─── Event
        │                       │
Place ──┴─── OccurredAt ────────┘

Person ────── ResidedAt ─────── Place

Event ──┬─── DocumentedBy ───── Source
        │
Media ──┴─── Depicts ────────── Person

Person ────── FeaturedIn ────── Story

Source ─┬─── Supports ───────── Person
        ├─── Supports ───────── Relationship
        ├─── Supports ───────── Event
        └─── Supports ───────── Place
```

### Common Access Patterns

The data structure is optimized for these common access patterns:

1. **Person-centric exploration**
   - Find a person by name or ID
   - Get all relationships for a person
   - Get all events in a person's life
   - Get all places associated with a person
   - Get all stories featuring a person

2. **Family tree navigation**
   - Get ancestors of a person (multiple generations)
   - Get descendants of a person (multiple generations)
   - Get siblings of a person
   - Get extended family (aunts, uncles, cousins)
   - Get family units (parents and children)

3. **Geographic exploration**
   - Find people associated with a location
   - Get all events at a location
   - Get migration paths between locations
   - Get residences by time period

4. **Temporal exploration**
   - Get events by date range
   - Get people living during a time period
   - Get concurrent events
   - Get life milestones in chronological order

5. **Media access**
   - Get photos of a person
   - Get documents related to an event
   - Get media associated with a place
   - Get all media for a family unit

## Data Validation and Integrity

### Validation Rules

1. **Required Fields**
   - Each entity must have an ID, type, and essential fields
   - Relationships must have valid references to existing entities
   - Events must have at least one associated person

2. **Temporal Consistency**
   - Birth date must precede death date
   - Child birth dates must be after parent birth dates (with reasonable minimum age)
   - Marriage dates must be consistent with participants' lifespans

3. **Relationship Consistency**
   - Family relationships must be bidirectional and consistent
   - No circular parent-child relationships
   - Sibling relationships must share at least one parent

4. **Geographic Consistency**
   - Places must have at least a name and country
   - Coordinates must be within valid ranges
   - Places referenced must exist in the places collection

### Data Quality Metrics

1. **Completeness Scores**
   - Percentage of required fields populated
   - Percentage of individuals with complete vital information
   - Percentage of relationships with supporting sources

2. **Source Quality**
   - Average number of sources per person
   - Percentage of facts with primary sources
   - Distribution of source reliability ratings

3. **Consistency Metrics**
   - Number of detected inconsistencies
   - Percentage of relationships with bidirectional validation
   - Percentage of events with complete location information

## Data Migration and Extension

### Data Import Sources

The data structure supports importing from:

1. **GEDCOM Files**
   - Standard genealogical data format
   - Mapping from GEDCOM tags to data model

2. **Spreadsheet Imports**
   - Structured Excel or CSV formats
   - Validation and reconciliation process

3. **API Integrations**
   - Ancestry.com data (with permissions)
   - FamilySearch.org integration
   - Other genealogical services

### Extension Mechanisms

1. **Schema Versioning**
   - Structured versioning for data model changes
   - Migration scripts for schema updates
   - Backward compatibility support

2. **Custom Field Support**
   - Extensible property mechanism for all entities
   - Namespace support for extensions
   - Custom field documentation

3. **Plugin Architecture**
   - Data processor plugin system
   - Custom validators and enrichers
   - External system integrations

## Data Privacy and Security

### Privacy Controls

1. **Person-Level Privacy**
   - `isLiving` flag for enhanced protection
   - `visibilityLevel` field to control access
   - Automatic redaction of sensitive information

2. **Media Privacy**
   - Permission flags for photos and documents
   - Watermarking options for shared media
   - Usage tracking for media assets

3. **Story Privacy**
   - Author control over story visibility
   - Mention approval for living individuals
   - Draft status for works in progress

### Security Measures

1. **Access Control**
   - Role-based access to different data types
   - Owner/contributor/viewer permission model
   - Family member verification process

2. **Data Handling**
   - Encryption for sensitive information
   - Secure media storage
   - Source protection for private records

3. **Audit Trail**
   - Change history for all records
   - Attribution of data modifications
   - Version control for major changes

## Implementation Considerations

### Performance Optimization

1. **Precomputed Views**
   - Family tree structures precomputed for common views
   - Timeline data preprocessed for efficient display
   - Relationship paths indexed for quick navigation

2. **Lazy Loading**
   - Incremental loading of large data structures
   - Progressive detail enhancement
   - Media thumbnail optimization

3. **Caching Strategy**
   - Browser-side caching of common data
   - Versioned cache invalidation
   - Partial updates for changed data only

### Scalability Planning

1. **Data Volume Handling**
   - Support for 10,000+ individuals
   - 50,000+ relationships
   - 10,000+ media items

2. **Query Optimization**
   - Indices for common query patterns
   - Denormalization for performance-critical paths
   - Pagination and windowing for large result sets

3. **Media Management**
   - Tiered storage for different media resolutions
   - Content delivery optimization
   - Progressive loading for large media collections

## Implementation Phases

### Phase 1: Core Entities

1. Implement Person model with basic attributes
2. Implement simple Relationship model
3. Implement basic Place model
4. Create initial data files and loading mechanisms

### Phase 2: Extended Entities

1. Expand Person model with complete attributes
2. Implement full Relationship model with all relationship types
3. Implement Event model
4. Implement Source model
5. Create relationship indexing and navigation

### Phase 3: Media and Content

1. Implement Media model and asset management
2. Implement Story model
3. Create content organization and retrieval system
4. Implement full-text search capabilities

### Phase 4: Advanced Features

1. Implement Research model
2. Create data validation system
3. Implement privacy controls
4. Develop data extension mechanisms
5. Create visualization-specific data structures

## Conclusion

This comprehensive data structure design provides a solid foundation for the Kerr Family Genealogy Website. By implementing this design, we can efficiently represent the complex relationships, geographic connections, temporal events, and narrative content that comprise the family history. The structure balances the needs for flexibility, performance, and usability while maintaining data integrity and supporting future extensions.

The design supports all the interactive features planned for the website, including the family tree explorer, geographic visualizations, timeline interfaces, and narrative content presentation. By following this structured approach, we can create a rich, engaging user experience that effectively showcases the Kerr family history across generations and locations.