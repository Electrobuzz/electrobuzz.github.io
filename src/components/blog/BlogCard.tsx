import Link from 'next/link';
import { Clock, Tag } from 'lucide-react';
import { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-[#0d1117] border border-gray-800 rounded-lg p-6 hover:border-[#58a6ff]/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
        <div className="flex items-center gap-2 text-[#58a6ff] text-sm mb-3">
          <Clock size={16} />
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{formatDate(post.date)}</span>
        </div>

        <h3 className="text-xl font-bold text-[#e6edf3] mb-3 group-hover:text-[#58a6ff] transition-colors">
          {post.title}
        </h3>

        <p className="text-[#e6edf3]/80 text-sm mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded-md"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
};

export default BlogCard;
