'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Blog = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const blogPosts = [
    {
      title: 'Cracking the ML PUF',
      date: '2024-12-15',
      description: 'Deep dive into Message Passing Interface and its applications in high-performance computing.',
      link: 'https://drive.google.com/file/d/17d2U8LFxepysgnHyX3XdcV0yx7Ro0Mvz/view?usp=sharing'
    }
    ,
    // {
    //   title: 'Optimizing Dijkstra for Large Graphs',
    //   date: '2024-11-28',
    //   description: 'Advanced techniques for optimizing shortest path algorithms on massive graph datasets.',
    //   link: '#'
    // },
    // {
    //   title: 'Lessons from Running Simulations on PARAM',
    //   date: '2024-10-10',
    //   description: 'Practical insights from running large-scale simulations on India\'s supercomputer.',
    //   link: '#'
    // },
    // {
    //   title: 'Probability Techniques for Quant Interviews',
    //   date: '2024-09-22',
    //   description: 'Essential probability concepts and problem-solving strategies for quantitative finance interviews.',
    //   link: '#'
    // },
    // {
    //   title: 'Low-Latency Systems Design Patterns',
    //   date: '2024-08-15',
    //   description: 'Design patterns and architectural principles for building ultra-low latency applications.',
    //   link: '#'
    // },
    // {
    //   title: 'Memory Management in C++ for HPC',
    //   date: '2024-07-30',
    //   description: 'Advanced memory management techniques for high-performance C++ applications.',
    //   link: '#'
    // }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="py-20 bg-[#0a0d11]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-16 text-center">
          Blog
        </h2>

        <div 
          ref={ref}
          className={`space-y-6 transition-all duration-1000 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className={`bg-[#0d1117] border border-[#58a6ff]/20 rounded-lg p-6 hover:border-[#58a6ff]/40 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#e6edf3] mb-2 hover:text-[#58a6ff] transition-colors duration-200">
                    <a href={post.link}>
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-[#e6edf3]/70 text-sm mb-2">
                    {post.description}
                  </p>
                  <time className="text-[#58a6ff] text-xs font-mono">
                    {formatDate(post.date)}
                  </time>
                </div>
                
                <div className="flex-shrink-0">
                  <a
                    href={post.link}
                    className="inline-flex items-center text-[#58a6ff] hover:text-[#79c0ff] transition-colors duration-200 text-sm font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
