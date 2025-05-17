import { MetadataRoute } from 'next';

// You would typically fetch your dynamic routes (e.g., blog posts, products)
// from a database or CMS here.
// For example:
// const posts = await fetch('https://.../posts').then((res) => res.json())

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://your-domain.com', // Replace with your actual domain
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/about', // Example static route
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add more static routes here
  ];

  // Example for dynamic routes (e.g., blog posts)
  // const dynamicPostRoutes = posts.map((post) => ({
  //   url: `https://your-domain.com/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.5,
  // }));

  return [
    ...staticRoutes,
    // ...dynamicPostRoutes,
  ];
} 