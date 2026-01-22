import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogContent from '@/components/BlogContent';
import ReadingProgressBar from '@/components/ReadingProgressBar';

// Define the props type for this specific page
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} | Blog`,
      description: post.summary,
    };
  } catch (error) {
    return {
      title: 'Post Not Found | Blog',
    };
  }
}

// The page component - must be named 'page' for App Router
export default async function Page({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);

    return (
      <main className="min-h-screen bg-gray-950 text-white">
        <ReadingProgressBar />
        <Navbar />
        <div className="relative pt-36 pb-24 px-4 overflow-hidden">
          {/* Background elements from blogs/page.tsx */}
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

          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="relative rounded-2xl border border-gray-800/80 bg-gray-950/60 backdrop-blur-lg p-6 md:p-10 lg:p-12 shadow-xl">
              <article className="prose prose-invert prose-lg max-w-none 
                                prose-headings:font-semibold prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-teal-300 prose-headings:to-blue-300 
                                prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-a:transition-colors prose-a:duration-300 prose-a:font-medium 
                                prose-strong:text-teal-100 prose-strong:font-semibold
                                prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-400 prose-blockquote:pl-4 prose-blockquote:italic
                                prose-code:text-pink-400 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                                prose-pre:bg-transparent prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:p-0 prose-pre:m-0
                                prose-ul:list-disc prose-ul:marker:text-teal-400 prose-ol:list-decimal prose-ol:marker:text-teal-400
                                prose-img:rounded-lg prose-img:border prose-img:border-gray-700 prose-img:shadow-md">
                
                <div className="mb-10 pb-6 border-b border-gray-700/50 not-prose">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 !text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-gray-400 text-xl mb-5 leading-relaxed">
                        {post.summary}
                    </p>
                    <div className="text-sm text-gray-500 flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>By {post.author}</span> 
                        <span className="text-gray-600">|</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span> 
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="text-gray-600">|</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readingTime} min read</span>
                    </div>
                </div>

                <BlogContent contentHtml={post.contentHtml || ''} />

                <div className="mt-12 pt-8 border-t border-gray-700/50 text-center not-prose">
                    <Link href="/blogs"
                          className="group relative inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white text-base font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_0_20px] hover:shadow-purple-500/40 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-500/40 overflow-hidden">
                       <span className="relative z-10 tracking-wide">&larr; Back to All Posts</span>
                       <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]"></span>
                    </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    notFound();
  }
} 