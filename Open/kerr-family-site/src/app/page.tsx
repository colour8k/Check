'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-heading font-bold mb-6">Kerr Family Genealogy</h1>
            <p className="text-xl mb-8 text-white/90">
              Explore the rich history of the Kerr family across generations, from our roots in Scotland 
              to branches across America in Michigan, California, and Louisiana.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/family-tree" className="btn bg-white text-primary hover:bg-gray-100">
                Explore Family Tree
              </Link>
              <Link href="/stories" className="btn bg-secondary hover:bg-secondary-light text-white">
                Read Family Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading text-center mb-12">Explore By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Family Tree Card */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="h-40 bg-primary/10 flex items-center justify-center rounded-t-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-2">Family Tree</h3>
              <p className="text-text-light mb-4">
                Explore the interactive family tree showing connections across multiple generations.
              </p>
              <Link href="/family-tree" className="text-primary font-medium hover:text-primary-light">
                View Family Tree →
              </Link>
            </div>
            
            {/* People Card */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="h-40 bg-primary/10 flex items-center justify-center rounded-t-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-2">People</h3>
              <p className="text-text-light mb-4">
                Discover detailed profiles of Kerr family members across multiple generations.
              </p>
              <Link href="/people" className="text-primary font-medium hover:text-primary-light">
                Explore People →
              </Link>
            </div>
            
            {/* Places Card */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="h-40 bg-primary/10 flex items-center justify-center rounded-t-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-2">Places</h3>
              <p className="text-text-light mb-4">
                Explore significant locations in the family history including Kerr Creek Road and Jefferson Road.
              </p>
              <Link href="/places" className="text-primary font-medium hover:text-primary-light">
                Discover Places →
              </Link>
            </div>
            
            {/* Stories Card */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="h-40 bg-primary/10 flex items-center justify-center rounded-t-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-2">Stories</h3>
              <p className="text-text-light mb-4">
                Read narratives about family history, migration patterns, and memorable moments.
              </p>
              <Link href="/stories" className="text-primary font-medium hover:text-primary-light">
                Read Stories →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Family Branches */}
      <section className="py-16 bg-background-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading text-center mb-4">Family Branches</h2>
          <p className="text-center text-text-light max-w-2xl mx-auto mb-12">
            Explore the different branches of the Kerr family across America, from our Michigan roots to California and Louisiana.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Michigan */}
            <div className="card hover:shadow-lg transition-shadow bg-white">
              <h3 className="text-xl font-heading mb-2">Michigan Roots</h3>
              <p className="text-text-light mb-4">
                Explore the family's deep roots in Michigan, including the Three Rivers/Sturgis area for the paternal line and the Otsego/Plainwell area for the maternal line.
              </p>
              <Link href="/places/michigan" className="text-primary font-medium hover:text-primary-light">
                Explore Michigan Roots →
              </Link>
            </div>
            
            {/* California */}
            <div className="card hover:shadow-lg transition-shadow bg-white">
              <h3 className="text-xl font-heading mb-2">California Branch</h3>
              <p className="text-text-light mb-4">
                Discover the California branch of the family through Vanessa Kerr Otsuka and her family, representing a significant geographic expansion.
              </p>
              <Link href="/places/california" className="text-primary font-medium hover:text-primary-light">
                Explore California Branch →
              </Link>
            </div>
            
            {/* Louisiana */}
            <div className="card hover:shadow-lg transition-shadow bg-white">
              <h3 className="text-xl font-heading mb-2">Louisiana Connection</h3>
              <p className="text-text-light mb-4">
                Learn about the Louisiana connection through Jeremy Kerr, representing the family's expansion to the South.
              </p>
              <Link href="/places/louisiana" className="text-primary font-medium hover:text-primary-light">
                Explore Louisiana Connection →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-primary/10 flex items-center justify-center p-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-32 h-32 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-heading mb-3">Featured Story: From Michigan to the Coasts</h3>
                <p className="text-text-light mb-4">
                  The Kerr family's journey from their Michigan roots to establishing branches in California and Louisiana represents a fascinating geographic expansion that parallels many American families' stories of mobility and adaptation.
                </p>
                <p className="text-text-light mb-6">
                  This comprehensive narrative traces how different branches of the family spread across the country, exploring the motivations for migration, the maintenance of family connections despite distance, and the blending of regional cultures and traditions.
                </p>
                <Link href="/stories/michigan-to-coasts" className="btn btn-primary">
                  Read Full Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading mb-4">Begin Your Exploration</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Start your journey through the Kerr family history and discover the rich tapestry of connections, stories, and places that make up our shared heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/family-tree" className="btn bg-white text-primary hover:bg-gray-100">
              Explore Family Tree
            </Link>
            <Link href="/people" className="btn bg-secondary hover:bg-secondary-light text-white">
              Browse People
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}