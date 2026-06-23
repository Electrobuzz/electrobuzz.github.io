'use client';

import { ExternalLink, Github } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Projects = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const projects = [
    {
      title: 'High-Frequency Trading System',
      description: 'Built a low-latency trading engine with real-time market data processing and order execution.',
      tech: ['C++', 'Python', 'Redis', 'WebSocket'],
      bullets: [
        'Processed 10,000+ messages/second with sub-millisecond latency',
        'Reduced order execution time by 40% through optimization',
        'Implemented custom memory management for zero-copy operations'
      ],
      github: 'https://github.com/wolfrahh/trading-system',
      demo: null
    },
    {
      title: 'Distributed File System',
      description: 'Created a scalable distributed storage system with data replication and consistency guarantees.',
      tech: ['Go', 'Raft', 'gRPC', 'Docker'],
      bullets: [
        'Achieved 99.9% availability across 5-node cluster',
        'Handled 1TB+ data with automatic sharding',
        'Implemented strong consistency using Raft consensus'
      ],
      github: 'https://github.com/wolfrahh/distributed-fs',
      demo: null
    },
    {
      title: 'Parallel Graph Algorithms',
      description: 'Optimized graph algorithms for multi-core systems using MPI and OpenMP.',
      tech: ['C++', 'MPI', 'OpenMP', 'CUDA'],
      bullets: [
        'Accelerated Dijkstra\'s algorithm by 8x on 16 cores',
        'Processed graphs with 10M+ edges efficiently',
        'Won best performance award in HPC competition'
      ],
      github: 'https://github.com/wolfrahh/parallel-graphs',
      demo: null
    },
    {
      title: 'Mini Relational Database Engine',
      description: 'Developed a simplified relational database engine with SQL-like query capabilities.',
      tech: ['C++', 'SQL'],
      bullets: [
        'Implemented SQL parser, AST generation, and query execution engine',
        'Built B+Tree indexes, LRU buffer pool, WAL, storage manager',
        'Developed CLI and Volcano-style iterator execution framework'
      ],
      github: 'https://github.com/Electrobuzz/CS315',
      demo: null
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-16 text-center">
          Projects
        </h2>

        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-[#0a0d11] border border-[#58a6ff]/20 rounded-lg p-6 hover:border-[#58a6ff]/40 transition-all duration-300 hover:transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <h3 className="text-xl font-bold text-[#e6edf3] mb-3">
                {project.title}
              </h3>
              
              <p className="text-[#e6edf3]/80 mb-4 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-[#58a6ff]/10 text-[#58a6ff] rounded text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 mb-6">
                {project.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="text-[#e6edf3]/70 text-sm flex items-start">
                    <span className="text-[#58a6ff] mr-2">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#58a6ff] hover:text-[#79c0ff] transition-colors duration-200"
                >
                  <Github size={16} />
                  <span className="text-sm">GitHub</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-[#58a6ff] hover:text-[#79c0ff] transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
