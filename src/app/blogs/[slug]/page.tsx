import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Function to generate static paths based on post slugs
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// Function to generate metadata for the page (e.g., title)
export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    return {
      title: `${post.title} | Blog`,
      description: post.summary,
    };
  } catch (error) {
    // If post not found during metadata generation, we can return default or handle it
    // For now, let's assume notFound() will be called in the page component
    return {
      title: 'Post Not Found | Blog',
    };
  }
}

// The page component
export default async function PostPage({ params }: PostPageProps) {
  let post: PostData;
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    // If getPostData throws (e.g., file not found), trigger a 404 page
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-invert prose-lg mx-auto 
                            prose-headings:text-teal-300 
                            prose-a:text-teal-400 hover:prose-a:text-teal-300 
                            prose-strong:text-white 
                            prose-blockquote:border-l-teal-500 prose-blockquote:text-gray-400 
                            prose-code:text-pink-400 prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded 
                            prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700">
            
            {/* Post Header */}
            <div className="mb-8 border-b border-gray-700 pb-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 !text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                    {post.title}
                </h1>
                <p className="text-gray-400 text-lg">
                    {post.summary}
                </p>
                <div className="text-sm text-gray-500 mt-3">
                    <span>By {post.author}</span> | 
                    <span> 
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
            </div>

            {/* Post Content */}
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />

            {/* Back to Blogs link */}
            <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                <Link href="/blogs"
                      className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 no-underline">
                    &larr; Back to All Posts
                </Link>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
} 