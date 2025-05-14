'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import Link from 'next/link';

export default function About() {
  return (
    <PageLayout>
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading">About This Project</h1>
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
                  <span className="text-white">About</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading mb-6">The Kerr Family Genealogy Project</h2>
            
            <div className="prose max-w-none">
              <p>
                The Kerr Family Genealogy Project aims to create a comprehensive, interactive website showcasing the 
                family's rich history with particular focus on extended family connections (including California, 
                Louisiana, and overseas branches) and tracing ancestry further back in time. The project combines 
                deep genealogical research with modern web development to create an engaging, informative family 
                history resource.
              </p>
              
              <p>
                This project is driven by a desire to preserve family history for future generations, connecting 
                family members across geographic distances, and discovering the stories that shape our shared 
                identity. By exploring both vertical ancestry (going back in time) and horizontal connections 
                (extended family across locations), we aim to create a complete picture of the Kerr family's 
                place in history.
              </p>
              
              <h3>Project Goals</h3>
              
              <ul>
                <li>
                  <strong>Document Family Connections:</strong> Create a comprehensive record of family 
                  relationships across multiple generations.
                </li>
                <li>
                  <strong>Preserve Family Stories:</strong> Collect and document narratives, anecdotes, and 
                  "cool facts" that bring the family history to life.
                </li>
                <li>
                  <strong>Visualize Geographic Spread:</strong> Map the family's expansion from Michigan to 
                  California, Louisiana, and beyond.
                </li>
                <li>
                  <strong>Explore Ancestral Origins:</strong> Research and document the Scottish origins of 
                  the Kerr name and other ancestral connections.
                </li>
                <li>
                  <strong>Create Interactive Resources:</strong> Develop engaging visualizations and tools 
                  for exploring family history.
                </li>
                <li>
                  <strong>Build a Lasting Resource:</strong> Establish a platform that can be maintained and 
                  expanded as new information is discovered.
                </li>
              </ul>
              
              <h3>Research Methodology</h3>
              
              <p>
                This project follows a structured genealogical research methodology, incorporating:
              </p>
              
              <ul>
                <li>
                  <strong>Extended Kinship Network Analysis:</strong> Documenting both direct ancestral lines 
                  and collateral relatives to build a complete picture.
                </li>
                <li>
                  <strong>Spatiotemporal Correlation Analysis:</strong> Identifying patterns of events occurring 
                  in close temporal and geographic proximity.
                </li>
                <li>
                  <strong>Onomastic Pattern Analysis:</strong> Studying naming conventions and patterns across 
                  generations.
                </li>
                <li>
                  <strong>Social Network Reconstruction:</strong> Exploring the "FAN Club" (Friends, Associates, 
                  and Neighbors) to uncover additional connections.
                </li>
                <li>
                  <strong>Historical Contextualization:</strong> Placing family events within broader historical 
                  contexts.
                </li>
              </ul>
              
              <h3>Website Features</h3>
              
              <p>
                This website offers several interactive features to explore the Kerr family history:
              </p>
              
              <ul>
                <li>
                  <strong>Interactive Family Tree:</strong> Visualize family relationships across multiple 
                  generations and branches.
                </li>
                <li>
                  <strong>Geographic Map:</strong> Explore family migration patterns and significant locations.
                </li>
                <li>
                  <strong>Timeline Visualization:</strong> See family events in chronological context alongside 
                  historical events.
                </li>
                <li>
                  <strong>Detailed Profiles:</strong> Learn about individual family members through comprehensive 
                  biographical information.
                </li>
                <li>
                  <strong>Family Stories:</strong> Read narrative accounts of family history, migrations, and 
                  relationships.
                </li>
                <li>
                  <strong>Place Histories:</strong> Discover the significance of locations like Kerr Creek Road 
                  and the Jefferson Road home.
                </li>
              </ul>
              
              <h3>Acknowledgments</h3>
              
              <p>
                This project was made possible through the contributions of many family members who shared their 
                memories, stories, documents, and photographs. Special thanks to:
              </p>
              
              <ul>
                <li>Jeff Kerr for initiating and coordinating the project</li>
                <li>Don and Debby Kerr for sharing family stories and historical information</li>
                <li>Extended family members who contributed their memories and perspectives</li>
                <li>The Scrapybara team for technical support in developing the website</li>
              </ul>
              
              <h3>Future Plans</h3>
              
              <p>
                The Kerr Family Genealogy Project is an ongoing effort. Future plans include:
              </p>
              
              <ul>
                <li>Continued research into ancestral lines beyond currently documented generations</li>
                <li>Expansion of documentation for extended family branches</li>
                <li>Addition of more family photographs and documents as they're discovered</li>
                <li>Collection of oral histories from living family members</li>
                <li>Regular updates to the website with new discoveries and information</li>
              </ul>
              
              <h3>Contact</h3>
              
              <p>
                Family members with additional information, stories, photographs, or corrections are encouraged 
                to reach out. Your contributions help make this project more complete and accurate.
              </p>
              
              <p>
                For privacy and personal information concerns, please contact the site administrator.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}