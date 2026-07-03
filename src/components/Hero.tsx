'use client';

import { Github, Linkedin, Mail, Trophy } from 'lucide-react';

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/electrobuzz', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/raman-verma-88520024b/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ramanverma10010@gmail.com', label: 'Email' },
    // { icon: Trophy, href: 'https://codeforces.com/profile/wolfrahh', label: 'Codeforces' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12 text-left">
        <h2 className="text-2xl md:text-3xl lg:text-3xl text-[#e6edf3]/80 mb-2">
          hi <picture>
            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp" type="image/webp" />
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif" alt="👋" width="40" height="30" className="inline-block" />
          </picture>, I am
        </h2>
        <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-[#e6edf3] mb-4">
          Raman Verma
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-3xl text-[#58a6ff] mb-6 font-medium">
          Final Year Engineering Undergraduate Student  
        </h2>
        <p className="text-lg md:text-1xl lg:text-1xl text-[#e6edf3]/80 mb-8 max-w-none">
          Sometimes I am a Software Engineer, sometimes a Mechanical Engineer, a few times an Aerospace Engineer but I identify myself just as a "Curious Engineer".
        </p>
        
        {/* Social Links */}
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 border border-gray-700 rounded-lg text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all duration-200 hover:scale-105"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
