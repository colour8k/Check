'use client';

import Link from 'next/link';
import Image from 'next/image';

export interface PersonCardProps {
  person: {
    id: string;
    firstName: string;
    lastName: string;
    maidenName?: string;
    birthDate?: string;
    deathDate?: string;
    branch?: 'core' | 'paternal' | 'maternal' | 'california' | 'louisiana';
    generation?: number;
    photo?: string | null;
  };
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  className?: string;
}

// Placeholder image component when no photo is available
const PersonPlaceholder = ({ size, firstName, lastName }: { 
  size: 'small' | 'medium' | 'large', 
  firstName: string,
  lastName: string
}) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  const dimensions = size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-16 h-16' : 'w-24 h-24';
  const textSize = size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-xl';
  
  return (
    <div className={`${dimensions} rounded-full bg-primary/10 flex items-center justify-center`}>
      <span className={`${textSize} text-primary font-medium`}>{initials}</span>
    </div>
  );
};

export const PersonCard = ({ person, size = 'medium', showDetails = true, className = '' }: PersonCardProps) => {
  // Determine sizes based on card size
  const cardClasses = size === 'small' 
    ? 'p-2 border-l-2' 
    : size === 'medium' 
      ? 'p-4 border-l-4' 
      : 'p-6 border-l-4';
  
  // Determine photo size
  const photoSize = size === 'small' ? 10 : size === 'medium' ? 16 : 24;
  
  // Determine branch color
  const branchColor = 
    person.branch === 'paternal' ? 'border-primary bg-primary/5' : 
    person.branch === 'maternal' ? 'border-secondary bg-secondary/5' :
    person.branch === 'california' ? 'border-green-600 bg-green-50' :
    person.branch === 'louisiana' ? 'border-yellow-600 bg-yellow-50' :
    'border-gray-500 bg-gray-50';
  
  return (
    <Link 
      href={`/people/${person.id}`} 
      className={`block rounded-lg shadow-sm hover:shadow-md transition-shadow ${branchColor} ${cardClasses} ${className}`}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {person.photo ? (
            <Image 
              src={person.photo} 
              alt={`${person.firstName} ${person.lastName}`} 
              width={photoSize * 4} 
              height={photoSize * 4}
              className={`w-${photoSize} h-${photoSize} rounded-full object-cover`}
            />
          ) : (
            <PersonPlaceholder 
              size={size} 
              firstName={person.firstName} 
              lastName={person.lastName} 
            />
          )}
        </div>
        
        <div>
          <h3 className={size === 'small' ? 'text-base font-medium' : size === 'medium' ? 'text-lg font-medium' : 'text-xl font-medium'}>
            {person.firstName} {person.lastName}
            {person.maidenName && (
              <span className="text-text-light text-sm ml-1">(née {person.maidenName})</span>
            )}
          </h3>
          
          {showDetails && (
            <div className="text-text-light text-sm mt-1">
              {person.birthDate && <span>{person.birthDate}</span>}
              {person.birthDate && person.deathDate && <span> - </span>}
              {person.deathDate && <span>{person.deathDate}</span>}
              {!person.birthDate && !person.deathDate && <span>Dates unknown</span>}
            </div>
          )}
        </div>
      </div>
      
      {showDetails && person.branch && (
        <div className="mt-2">
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full mr-2 
            ${person.branch === 'paternal' ? 'bg-primary/10 text-primary' : 
            person.branch === 'maternal' ? 'bg-secondary/10 text-secondary' :
            person.branch === 'california' ? 'bg-green-100 text-green-800' :
            person.branch === 'louisiana' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'}`}>
            {person.branch.charAt(0).toUpperCase() + person.branch.slice(1)}
          </span>
          {person.generation && (
            <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
              Generation {person.generation}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};