'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const About = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section id="about" className="py-20 bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-6">
        <div 
          ref={ref}
          className={`transition-all duration-700 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#e6edf3] mb-2 text-center">
            "What I cannot create, I do not understand."
          </h2>
          <div className="text-right text-sm italic text-[#58a6ff] mt-1">
            - Richard P. Feynman
          </div>
          
          <div className="space-y-4 text-[#e6edf3]/80 text-lg leading-relaxed">
            <p>
              Hi, I’m Raman Verma. I like building tools that automate the boring parts of life.
              I go by the name “wolfrahh” on the internet. I came up with it around 8th grade. It’s a combination of two words: "wolf" and the hindi word "rahh", loosely meaning “the path of the wolf.” Somehow the name stuck, and I’ve been using it ever since.
            </p>
            <p>
              Professionally, I enjoy writing code and designing systems. I am also interested in parallel programming and more recently in AI agents. I have previously worked with WorldQuant and Accenture. I am about to join PricewaterCoopers as an Associate this summer.
            </p>
            <p>
              I am about to graduate with an undergraduate degree from Indian Institute of Technology, Kanpur, with a major in Mechanical Engineering along with three minors in Computer Science - Algorithms, Systems and Machine Learning. During my time at IITK, I've been involved in various clubs and activities, including the Entrepreneurship Cell, the Academic and Career Council, the Anime Society and the Institute Counselling Service (Now known as Center for Mental Health and Wellbeing). I also had the opportunity to volunteer with the National Service Scheme (NSS), a Government of India initiative focused on community service.
            </p>
            <p>
              Apart from that, I enjoy maths, solving puzzles, playing chess and reading philosophy. I love playing sports particularly Cricket and Badminton. I like learning languages, and am currently learning Japanese.
            </p>
          </div>

          {/* <div className="mt-12 p-6 border border-[#58a6ff]/20 rounded-lg bg-[#58a6ff]/5">
            <p className="text-[#58a6ff] font-medium">
              Currently exploring: distributed systems and low-latency C++ architectures
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
