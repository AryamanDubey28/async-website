import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/lib/posts';

export default function Blogs() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
              Blog Posts
            </span>
          </h1>
          <div className="max-w-3xl mx-auto grid gap-8">
            {allPostsData.length === 0 ? (
              <p className="text-gray-400 text-center">No blog posts found.</p>
            ) : (
              allPostsData.map(({ slug, date, title, summary }) => (
                <Link href={`/blogs/${slug}`} key={slug} className="block group">
                  <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg hover:bg-gray-700/60 transition-colors duration-300 border border-gray-700 hover:border-teal-500">
                    <h2 className="text-2xl font-semibold mb-2 text-teal-300 group-hover:text-teal-200 transition-colors duration-300">
                      {title}
                    </h2>
                    <p className="text-gray-400 mb-3 text-sm">
                      {new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {summary}
                    </p>
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