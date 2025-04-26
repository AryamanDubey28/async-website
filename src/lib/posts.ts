import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content/blogs');

// Define the structure of the post data we expect from front matter
export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
  contentHtml?: string;
  [key: string]: any; // Allow other properties
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/blogs
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Filter out non-markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id (slug)
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      // Ensure the returned object conforms to PostData
      const postData: PostData = {
        slug,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || 'No date',
        summary: matterResult.data.summary || '',
        author: matterResult.data.author || 'Unknown Author',
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
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like: [{ params: { slug: 'ssg-ssr' } }, ...]
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  let fileContents;
  try {
     fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    // Handle file not found specifically maybe?
    // For now, rethrow or throw a custom error
    console.error(`Error reading post file: ${fullPath}`, err);
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || 'No date',
    summary: matterResult.data.summary || '',
    author: matterResult.data.author || 'Unknown Author',
    ...matterResult.data, // Spread the rest of the front matter data
  };
}

// We'll add functions to get individual post data later 