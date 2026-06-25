'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Experience = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);

  const experiences = [
    {
      year: 'July, 2026',
      title: 'Incoming Associate',
      organization: 'PwC',
      bullets: [
        
      ]
    },
    {
      year: 'May, 2025',
      title: 'Advanced Application Analyst',
      organization: 'Accenture',
      bullets: [
        'Focused on algorithms, probability, and performance optimization',
        'Developed expertise in low-level systems programming',
        'Built competitive programming skills for technical interviews'
      ]
    },
    {
      year: 'Jan, 2025',
      title: 'Undergraduate Researcher',
      organization: 'Helicopter Lab, IIT Kanpur',
      bullets: [
        'Ran simulations on PARAM cluster with multi-core optimization',
        'Optimized computational performance across multiple cores',
        'Implemented parallel algorithms for scientific computing'
      ]
    },
    {
      year: 'Aug, 2024',
      title: 'Brain Research Consultant',
      organization: 'WorldQuant LLC',
      bullets: [
        'Ran simulations on PARAM cluster with multi-core optimization',
        'Optimized computational performance across multiple cores',
        'Implemented parallel algorithms for scientific computing'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-[#0a0d11]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-16 text-center">
          Experience
        </h2>

        <div 
          ref={ref}
          className={`relative transition-all duration-1000 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#58a6ff]/20" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Year Marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-[#58a6ff] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {exp.year}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8 text-left' : 'pl-8 text-left'}`}>
                  <div className="bg-[#0d1117] border border-[#58a6ff]/20 rounded-lg p-6 hover:border-[#58a6ff]/40 transition-all duration-300">
                    <h3 className="text-xl font-bold text-[#e6edf3] mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-[#58a6ff] mb-4 font-medium">
                      {exp.organization}
                    </p>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-[#e6edf3]/80 text-sm flex items-start">
                          <span className="text-[#58a6ff] mr-2">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
