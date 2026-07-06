import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  readingTime: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const stats = readingTime(content);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        published: data.published !== false,
        readingTime: stats.text,
        content,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      published: data.published !== false,
      readingTime: stats.text,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
