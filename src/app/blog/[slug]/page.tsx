import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Clock, Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import 'katex/dist/katex.min.css';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Raman Verma`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#58a6ff] hover:text-[#58a6ff]/80 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-8 pb-8 border-b border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold text-[#e6edf3] mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-[#e6edf3]/80 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded-md"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-[#58a6ff] prose-code:text-[#e6edf3] prose-pre:bg-[#161b22] prose-img:rounded-lg prose-table:text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[
                rehypeKatex,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              ]}
              components={{
                img: ({ src, alt }) => (
                  <span className="block my-8">
                    <Image
                      src={src as string}
                      alt={alt || ''}
                      width={800}
                      height={450}
                      className="rounded-lg w-full h-auto"
                    />
                    {alt && (
                      <span className="block text-center text-sm text-[#e6edf3]/60 mt-2 italic">
                        {alt}
                      </span>
                    )}
                  </span>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}