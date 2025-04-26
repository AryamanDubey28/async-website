import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/lib/posts';

export default function Blogs() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-950 via-purple-950/10 to-teal-950/10"></div>

        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 animate-text-gradient">
                Latest Insights
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Exploring the frontiers of AI, business transformation, and technology.
            </p>
            <div className="flex justify-center mt-10">
              <div className="w-28 h-1.5 bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/30"></div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid gap-10 md:gap-12">
            {allPostsData.length === 0 ? (
              <p className="text-gray-400 text-center text-lg">No blog posts yet. Check back soon!</p>
            ) : (
              allPostsData.map(({ slug, date, title, summary, author }) => (
                <Link href={`/blogs/${slug}`} key={slug} className="block group">
                  <div className="relative p-6 md:p-8 rounded-2xl border border-gray-800/80 bg-gray-950/60 backdrop-blur-lg transition-all duration-300 ease-in-out hover:border-teal-500/50 hover:bg-gray-900/70 hover:shadow-xl hover:scale-[1.02]">
                    <div className="absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-teal-500/30 transition-opacity duration-300 pointer-events-none animate-pulse-border"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100 group-hover:from-teal-200 group-hover:to-teal-50 transition-colors duration-300">
                        {title}
                      </h2>
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
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {summary}
                      </p>
                       <div className="absolute bottom-4 right-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                         </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 