import { getPosts } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';

export const metadata = {
  title: 'Blog | Raman Verma',
  description: 'Technical articles and thoughts on software engineering, systems, and algorithms.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e6edf3] mb-4">
            Blog
          </h1>
          <p className="text-lg text-[#e6edf3]/80">
            Technical articles and thoughts on software engineering, systems, and algorithms.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#e6edf3]/60 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
