'use client';

import { ExternalLink, Github } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Projects = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const projects = [
    {
      title: 'Portfolio Risk Analytics Engine',
      description: 'A comprehensive market risk analytics engine for multi-asset portfolios, featuring VaR modeling, backtesting, stress testing, and automated reporting.',
      tech: ['Python', 'Pandas', 'yfinance', 'scipy'],
      bullets: [
        'Implemented five Value-at-Risk models using real market data.',
        'Automated risk attribution, backtesting, stress testing, and reporting',
        'Validated models across historical crises and market stress scenarios.'
      ],
      github: 'https://github.com/Electrobuzz/Portfolio-Risk-Analytics-Engine',
      demo: null
    },
    {
      title: 'Cross-Asset Analytics Platform',
      description: 'A cross-asset analytics platform for options pricing, fixed-income risk, and scenario analysis.',
      tech: ['Python', 'Pandas', 'NumPy', 'scipy'],
      bullets: [
        'Built options pricing models and fixed-income risk metrics',
        'Implemented scenario analysis and stress testing frameworks',
        'Developed automated reporting and visualization pipelines'
      ],
      github: 'https://github.com/Electrobuzz/greeks_dashboard',
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
    },
    {
      title: 'Neural Machine Translation',
      description: 'End-to-end multilingual Neural Machine Translation built from scratch.',
      tech: ['Python', 'PyTorch'],
      bullets: [
        'Built multilingual Transformer translation system entirely from scratch using PyTorch',
        'Engineered custom tokenizer, accelerating training eightfold while improving translation quality',
        'Outperformed recurrent baselines fourfold with custom multilingual Transformer architecture'
      ],
      github: 'https://github.com/Electrobuzz/Neural-Machine-Translator-CS779',
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
