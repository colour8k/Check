# Kerr Family Genealogy - Data Structure Documentation

This document outlines the data structure for the Kerr Family Genealogy project, showing how family information is organized and how to add new family members to the database.

## Core Data Structure

The family data is stored in JSON format with the following primary structure:

```json
{
  "people": [
    {
      "id": "unique-identifier",
      "firstName": "First",
      "lastName": "Last",
      "middleName": "Optional",
      "maidenName": "Optional",
      "nickname": "Optional",
      "birthDate": "Date string",
      "deathDate": "Date string",
      "branch": "paternal|maternal|core|california|louisiana|extended",
      "generation": 1,
      "location": "Current location",
      "bio": "Short biography",
      "photo": "path/to/photo.jpg",
      "relationships": [
        {
          "type": "relationship-type",
          "personId": "related-person-id",
          "years": "optional date range"
        }
      ]
    }
  ]
}
```

## Key Data Files

1. **family.json** - Primary family data file containing all core family members
2. **extended_family.json** - Additional family members and connections like the Welch-Smith family

## Person Object Properties

| Property      | Type     | Required | Description                                                  |
|---------------|----------|----------|--------------------------------------------------------------|
| id            | string   | Yes      | Unique identifier for the person, typically kebab-case (e.g., "jeff-kerr") |
| firstName     | string   | Yes      | First name                                                   |
| lastName      | string   | Yes      | Last name                                                    |
| middleName    | string   | No       | Middle name                                                  |
| maidenName    | string   | No       | Maiden name for married women who changed their surname      |
| nickname      | string   | No       | Common nickname or preferred name                            |
| birthDate     | string   | No       | Birth date in readable format (e.g., "August 6, 1977")      |
| deathDate     | string   | No       | Death date in readable format (if applicable)                |
| branch        | string   | No       | Family branch categorization (see values below)              |
| generation    | number   | No       | Generation number (1 = oldest generation documented)         |
| location      | string   | No       | Current or last known location                               |
| bio           | string   | No       | Short biographical description                               |
| photo         | string   | No       | Path to profile photo                                        |
| relationships | array    | No       | Array of relationship objects                                |

### Branch Values

- `paternal` - Paternal Kerr line
- `maternal` - Maternal Mowry/Lowe line
- `core` - Direct Kerr family line of focus (e.g., Jeff and Linsey)
- `california` - California branch (Vanessa Kerr Otsuka)
- `louisiana` - Louisiana branch (Jeremy Kerr)
- `extended` - Extended family connections (e.g., Melissa Welch-Smith's family)

## Relationship Object Properties

| Property      | Type     | Required | Description                                               |
|---------------|----------|----------|-----------------------------------------------------------|
| type          | string   | Yes      | Relationship type (see values below)                      |
| personId      | string   | Yes      | ID of the related person                                  |
| years         | string   | No       | Years of relationship (e.g., "2008-2023" for partnerships)|

### Relationship Types

- `spouse` - Married partner
- `partner` - Non-married partner
- `child` - Child of the person
- `parent` - Parent of the person
- `sibling` - Brother or sister
- `raised` - Person they raised (not biological)
- `raised-by` - Person who raised them (not biological)
- `step-parent` - Step-parent relationship
- `step-child` - Step-child relationship
- `adopted` - Person they adopted
- `adopted-by` - Person who adopted them

## Current Family Data

### Core Family Members

- **Jeff Kerr** (id: `jeff-kerr`) - Generation 3, Core branch
- **Linsey Kerr** (id: `linsey-kerr`) - Generation 3, Core branch
- **Don Kerr** (id: `don-kerr`) - Generation 2, Paternal branch
- **Debby Kerr (née Mowry)** (id: `debby-kerr`) - Generation 2, Maternal branch

### Paternal Line

- **Donald Kerr** (id: `donald-kerr`) - Generation 1, Paternal branch
- **Loraine Kerr** (id: `loraine-kerr`) - Generation 1, Paternal branch
- **Steve Kerr** (id: `steve-kerr`) - Generation 2, Paternal branch
- **Sharron Kerr** (id: `sharron-kerr`) - Generation 2, Paternal branch

### Maternal Line

- **Donna Mowry** (id: `donna-mowry`) - Generation 1, Maternal branch
- **George Richard Mowry** (id: `george-richard-mowry`) - Generation 1, Maternal branch
- **Norman "Bud" Lowe** (id: `norman-bud-lowe`) - Generation 1, Maternal branch

### Geographic Branches

- **Vanessa Kerr Otsuka** (id: `vanessa-kerr-otsuka`) - Generation 2, California branch
- **Jeremy Kerr** (id: `jeremy-kerr`) - Generation 3, Louisiana branch

### Extended Family (Newly Added)

- **Melissa (Welch) Smith** (id: `melissa-welch-smith`) - Extended branch, Jeff's partner 2008-2023
- **Dawn Welch** (id: `dawn-welch`) - Extended branch, Melissa's mother
- **Larry Koepher** (id: `larry-koepher`) - Extended branch, Melissa's step-father
- **Robert (Welch) Hennessy** (id: `robert-welch-hennessy`) - Extended branch, Melissa's biological father

## Adding New Family Members

To add a new family member to the database:

1. Create a new person object with a unique `id` (use kebab-case, e.g., "john-smith")
2. Fill in the required fields (`id`, `firstName`, `lastName`)
3. Add as many optional fields as available
4. Add to the `relationships` array to connect to existing family members
5. Add the new person object to the appropriate JSON file:
   - For core Kerr family members: add to `family.json`
   - For extended connections: add to `extended_family.json`

## Example: Adding a New Family Member

```json
// New person to add to extended_family.json
{
  "id": "emily-welch",
  "firstName": "Emily",
  "lastName": "Welch",
  "branch": "extended",
  "bio": "Emily Welch is Melissa's sister.",
  "relationships": [
    { "type": "sibling", "personId": "melissa-welch-smith" },
    { "type": "child", "personId": "dawn-welch" },
    { "type": "child", "personId": "robert-welch-hennessy" }
  ]
}
```

## API Utilities

The website includes utility functions in `src/lib/api.ts` for working with family data:

- `getFamilyData()` - Fetches all family data
- `getPersonById(id)` - Gets a specific person by ID
- `getPeopleByBranch(branch)` - Gets all people in a specific branch
- `getPeopleByGeneration(generation)` - Gets all people in a specific generation
- `getAllPeople()` - Gets all people in the database
- `getRelationshipsForPerson(personId)` - Gets relationships for a specific person
- `getExtendedFamilyData()` - Gets all extended family members

## Data Visualization Mapping

The various visualizations use the following data mappings:

### Family Tree

- **Node:** Each person
- **Link:** Parent-child relationships
- **Group:** Family branch
- **Color:** Gender/branch coding

### Geographic Map

- **Marker:** Significant locations
- **Line:** Migration paths
- **Color:** Family branch
- **Popup:** Person information

### Timeline

- **Point:** Life events (birth, marriage, death, etc.)
- **Track:** Person's lifetime
- **Group:** Generation
- **Color:** Event type

## Conclusion

This data structure provides a flexible framework for representing the Kerr family genealogy and related connections. The relational structure allows for complex family relationships to be modeled accurately, while the branch categorization helps organize family members into meaningful groups.

As new information becomes available, additional fields can be added to the schema to capture more detailed family history.