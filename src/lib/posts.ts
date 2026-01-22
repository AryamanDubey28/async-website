import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypePrism from 'rehype-prism-plus';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { notFound } from 'next/navigation';

// Define the directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content/blogs');

// Define the structure of the post data we expect from front matter
export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
  readingTime: number;
  contentHtml?: string;
  [key: string]: any; // Allow other properties
}

export function getSortedPostsData(): PostData[] {
  // Check if the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  // Get file names under /content/blogs
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Filter out non-markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id (slug)
      const fileSlug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Calculate reading time
      const wordCount = matterResult.content.split(/\s+/g).filter(Boolean).length;
      const readingTime = Math.ceil(wordCount / 200);

      // Use the slug from frontmatter if provided, otherwise use the filename
      const slug = matterResult.data.slug || fileSlug;

      // Combine the data with the id
      // Ensure the returned object conforms to PostData
      const postData: PostData = {
        slug, // Use the slug from frontmatter
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || 'No date',
        summary: matterResult.data.summary || '',
        author: matterResult.data.author || 'Unknown Author',
        readingTime,
        ...matterResult.data, // Spread the rest of the data
      };
      return postData;
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  // Check if the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Returns an array of objects with the slug params
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fileSlug = fileName.replace(/\.md$/, '');
      
      // Read the file to get the frontmatter
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      // Use the slug from frontmatter if provided, otherwise use the filename
      const slug = matterResult.data.slug || fileSlug;
      
      return {
        params: {
          slug,
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  // First, try to find the post by its frontmatter slug if it exists
  // Check if the posts directory exists before trying to read from it
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Posts directory not found: ${postsDirectory}`);
    notFound(); // Trigger 404 if directory doesn't exist
  }
  const fileNames = fs.readdirSync(postsDirectory);
  let targetFileName = `${slug}.md`;
  
  // Check if we need to find the file by frontmatter slug
  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // If this file has a matching slug in its frontmatter
    if (matterResult.data.slug === slug) {
      targetFileName = fileName;
      break;
    }
  }
  
  const fullPath = path.join(postsDirectory, targetFileName);
  let fileContents;
  
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err: any) {
    // Check specifically for file not found errors
    if (err.code === 'ENOENT') {
      console.error(`Post file not found: ${fullPath}`);
      // Trigger the 404 page in the calling component
      notFound(); 
    } else {
      // Log other file system errors
      console.error(`Error reading post file: ${fullPath}`, err);
      // Re-throw other errors to be handled potentially differently
      throw new Error(`Failed to read post: ${slug}`);
    }
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Calculate reading time
  const wordCount = matterResult.content.split(/\s+/g).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Use unified with rehype-prism-plus for better code highlighting
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrism, { showLineNumbers: true, ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  // Use the slug from frontmatter if provided
  const postSlug = matterResult.data.slug || slug;

  // Combine the data with the slug and contentHtml
  return {
    slug: postSlug,
    contentHtml,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || 'No date',
    summary: matterResult.data.summary || '',
    author: matterResult.data.author || 'Unknown Author',
    readingTime,
    ...matterResult.data, // Spread the rest of the front matter data
  };
}

// We'll add functions to get individual post data later 