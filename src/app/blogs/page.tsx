import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/posts';
import BlogList from '@/components/BlogList';
import './styles/blogs.css'; // Fixed import path to be relative to the current directory

export default function BlogsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="relative pt-36 pb-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute inset-y-0 left-[40%] w-px bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent"></div>
          <div className="absolute inset-y-0 right-[40%] w-px bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
          <div className="absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-[30%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div>
        
        {/* Floating gradient orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        {/* Custom scan line effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(79,70,229,0.05)_50%,transparent_100%)] animate-scan-slow"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 md:mb-16">
              <div className="relative inline-block mb-3">
                <span className="inline-block relative z-10 text-xs font-semibold tracking-widest text-indigo-300 uppercase after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-indigo-500/50">
                  Our Blog
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300 animate-text-shine-slow">
                  Insights from Async Studios
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                Explore our team's latest thoughts on AI, business transformation, and technology.
              </p>
            </div>

            <BlogList allPostsData={allPostsData} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 