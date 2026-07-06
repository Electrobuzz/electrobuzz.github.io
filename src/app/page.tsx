import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import LatestArticles from '@/components/LatestArticles';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <LatestArticles />
      <Footer />
    </div>
  );
}

