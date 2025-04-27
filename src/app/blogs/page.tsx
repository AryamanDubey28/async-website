import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/posts';
import BlogList from '@/components/BlogList';

export default function BlogsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-950 via-purple-950/10 to-teal-950/10"></div>

        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 animate-text-gradient">
                Insights from Async Studios
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our team's latest thoughts on AI, business transformation, and technology.
            </p>
          </div>

          <BlogList allPostsData={allPostsData} />
        </div>
      </div>
      <Footer />
    </main>
  );
} 