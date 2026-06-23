'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = ['hero', 'about', 'experience', 'projects', 'blog'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0d1117]/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Resume Button - Left */}
          <a
            href="https://drive.google.com/file/d/1GAuk8GkvA9bMxFaEbhTSDNUVSLfpyqJm/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#58a6ff] text-[#58a6ff] rounded-lg hover:bg-[#58a6ff] hover:text-[#0d1117] transition-all duration-200 text-sm font-medium"
          >
            Resume
          </a>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Experience', 'Projects', 'Blog'].map((item) => {
              const sectionId = item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    activeSection === sectionId 
                      ? 'text-[#58a6ff]' 
                      : 'text-[#e6edf3] hover:text-[#58a6ff]'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#58a6ff] transform transition-transform duration-200 ${
                    activeSection === sectionId ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Brand Name - Right */}
          <div className="font-bold text-lg text-[#e6edf3]">
            wolfrahh
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-800">
          <div className="flex justify-around">
            {['About', 'Experience', 'Projects', 'Blog'].map((item) => {
              const sectionId = item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className={`text-xs font-medium transition-colors duration-200 ${
                    activeSection === sectionId 
                      ? 'text-[#58a6ff]' 
                      : 'text-[#e6edf3] hover:text-[#58a6ff]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
