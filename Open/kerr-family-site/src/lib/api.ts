/**
 * API utility functions for fetching data
 */

// Type definitions for family data
export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  maidenName?: string;
  nickname?: string;
  birthDate?: string;
  deathDate?: string;
  branch?: 'core' | 'paternal' | 'maternal' | 'california' | 'louisiana' | 'extended';
  generation?: number;
  location?: string;
  bio?: string;
  photo?: string;
  relationships?: Relationship[];
}

export interface Relationship {
  type: 'spouse' | 'partner' | 'child' | 'parent' | 'sibling' | 'raised' | 'raised-by' | 'step-parent' | 'step-child' | 'adopted' | 'adopted-by';
  personId: string;
  years?: string;
}

export interface FamilyData {
  people: Person[];
}

// Fetch all family data
export async function getFamilyData(): Promise<FamilyData> {
  try {
    // In a real app, this would be an API call
    // For simplicity, we're importing the JSON directly
    const data = await import('/public/data/family.json');
    return data as FamilyData;
  } catch (error) {
    console.error('Error fetching family data:', error);
    return { people: [] };
  }
}

// Get a specific person by ID
export async function getPersonById(id: string): Promise<Person | null> {
  try {
    const data = await getFamilyData();
    return data.people.find(person => person.id === id) || null;
  } catch (error) {
    console.error(`Error fetching person with ID ${id}:`, error);
    return null;
  }
}

// Get people by branch
export async function getPeopleByBranch(branch: string): Promise<Person[]> {
  try {
    const data = await getFamilyData();
    return data.people.filter(person => person.branch === branch);
  } catch (error) {
    console.error(`Error fetching people from branch ${branch}:`, error);
    return [];
  }
}

// Get people by generation
export async function getPeopleByGeneration(generation: number): Promise<Person[]> {
  try {
    const data = await getFamilyData();
    return data.people.filter(person => person.generation === generation);
  } catch (error) {
    console.error(`Error fetching people from generation ${generation}:`, error);
    return [];
  }
}

// Get all people
export async function getAllPeople(): Promise<Person[]> {
  try {
    const data = await getFamilyData();
    return data.people;
  } catch (error) {
    console.error('Error fetching all people:', error);
    return [];
  }
}

// Get relationships for a person
export async function getRelationshipsForPerson(personId: string): Promise<{
  person: Person | null;
  relationships: Array<{ relationship: Relationship; person: Person }>;
}> {
  try {
    const person = await getPersonById(personId);
    if (!person || !person.relationships) {
      return { person, relationships: [] };
    }

    const allPeople = await getAllPeople();
    const relationships = person.relationships
      .map(relationship => {
        const relatedPerson = allPeople.find(p => p.id === relationship.personId);
        if (!relatedPerson) return null;
        return { relationship, person: relatedPerson };
      })
      .filter(Boolean) as Array<{ relationship: Relationship; person: Person }>;

    return { person, relationships };
  } catch (error) {
    console.error(`Error fetching relationships for person ${personId}:`, error);
    return { person: null, relationships: [] };
  }
}

// Get extended family relationships
export async function getExtendedFamilyData(): Promise<Person[]> {
  try {
    const data = await getFamilyData();
    return data.people.filter(person => person.branch === 'extended');
  } catch (error) {
    console.error('Error fetching extended family data:', error);
    return [];
  }
}