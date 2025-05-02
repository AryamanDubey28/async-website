'use client';

import Link from 'next/link';
import { PostData } from '@/lib/posts'; // Assuming PostData is exported from here
import { useState } from 'react'; // Import useState

// Helper component for the date and author line (copied from page.tsx)
const PostMeta = ({ date, author }: { date: string; author: string }) => (
  <div className="text-sm text-gray-500 mb-4 flex items-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span>
      {new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </span>
    <span className="text-gray-600">|</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    <span>{author}</span>
  </div>
);



// Arrow icon for View More/Less button
const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const INITIAL_GRID_COUNT = 6; 



interface BlogListProps {
  allPostsData: PostData[];
}

export default function BlogList({ allPostsData }: BlogListProps) {
  const [isExpanded, setIsExpanded] = useState(false); // Add state for expansion
  const latestPosts = allPostsData.slice(0, 3);
  const otherPosts = allPostsData.slice(3);

  if (allPostsData.length === 0) {
    return <p className="text-gray-400 text-center text-lg">No blog posts yet. Check back soon!</p>;
  }

  // Determine if the toggle button should be shown
  const shouldShowToggle = otherPosts.length > INITIAL_GRID_COUNT;
  const postsToShow = isExpanded ? otherPosts : otherPosts.slice(0, INITIAL_GRID_COUNT);


  return (
    <>
      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <div className="mb-16 md:mb-24">
           <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-10 text-center text-white">Latest Articles</h2>
           <div className="max-w-4xl mx-auto grid gap-10 md:gap-12">
            {latestPosts.map(({ slug, date, title, summary, author }) => (
              <Link href={`/blogs/${slug}`} key={slug} className="block group">
                <div className="relative p-6 md:p-8 rounded-2xl border border-gray-800/80 bg-gray-950/60 backdrop-blur-lg transition-all duration-300 ease-in-out hover:border-indigo-500/50 hover:bg-gray-900/70 hover:shadow-xl hover:scale-[1.02]">
                  <div className="absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-indigo-500/30 transition-opacity duration-300 pointer-events-none animate-pulse-border"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-200 group-hover:from-indigo-200 group-hover:to-purple-100 transition-colors duration-300">
                      {title}
                    </h3>
                    <PostMeta date={date} author={author} />
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other Posts Section */}
      {otherPosts.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-10 text-center text-white">More Articles</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {postsToShow.map(({ slug, date, title, author, summary }) => (
                <Link href={`/blogs/${slug}`} key={slug} className="block group">
                     <div className="relative flex flex-col min-h-[250px] p-5 md:p-6 rounded-xl border border-gray-800/60 bg-gray-950/50 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-purple-600/60 hover:bg-gray-900/60 hover:shadow-lg hover:-translate-y-1">
                       <div className="absolute -inset-px rounded-xl border border-transparent opacity-0 group-hover:opacity-70 group-hover:border-purple-600/30 transition-opacity duration-300 pointer-events-none"></div>
                       <div className="relative z-10 flex flex-col h-full">
                         <h3 className="text-lg md:text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 group-hover:from-blue-300 group-hover:to-indigo-200 transition-colors duration-300">
                           {title}
                         </h3>
                         <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                            {summary}
                         </p>
                         <div className="mt-auto pt-2 border-t border-gray-800/50">
                          <div className="text-xs text-gray-500 flex items-center justify-between space-x-1.5">
                             <div className="flex items-center space-x-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{author}</span>
                             </div>
                             <div className="flex items-center space-x-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>
                                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                             </div>
                          </div>
                         </div>
                       </div>
                     </div>
                </Link>
              ))}
            </div>
          </div>

           {/* Replace Label with Button and add hover styles */}
          {shouldShowToggle && (
            <div className="text-center mt-8">
               <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-indigo-400 hover:text-indigo-200 hover:underline transition-colors duration-200 font-medium inline-flex items-center group"
               >
                 <span>{isExpanded ? 'View Less' : 'View More'}</span>
                 <ChevronDownIcon className={`ml-1.5 ${isExpanded ? 'rotate-180' : ''}`} />
               </button>
             </div>
          )}
        </div>
      )}
    </>
  );
} 