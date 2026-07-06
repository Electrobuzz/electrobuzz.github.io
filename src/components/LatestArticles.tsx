import { getPosts } from '@/lib/posts';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

export default async function LatestArticles() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-[#e6edf3]/80">
            Recent thoughts and technical explorations.
          </p>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#e6edf3]/60">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-[#58a6ff] text-[#58a6ff] rounded-lg hover:bg-[#58a6ff] hover:text-[#0d1117] transition-all duration-200 font-medium"
              >
                View all posts
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
