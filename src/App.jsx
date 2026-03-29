import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import About from './components/About';
import Certifications from './components/Certifications'; 
import FloatingLines from './components/FloatingLines'; 
import Community from './components/Community';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  return (
    // overflow-x-hidden here is the second layer of protection against side-scrolling
    <div className="min-h-screen relative selection:bg-purple-500 selection:text-white bg-[#030014] overflow-x-hidden">
      
      {/* --- Dynamic Background Layer --- */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <FloatingLines 
          linesGradient={['#4F46E5', '#8B5CF6', '#EC4899', '#06B6D4']} 
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={6}
          lineDistance={4}
          bendRadius={4}
          bendStrength={0.5} 
          interactive={true}
          parallax={true}
          parallaxStrength={0.1}
          animationSpeed={0.5} 
          mixBlendMode="screen" 
        />
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-10">
        <Navbar onOpenContact={openModal} />
        
        {/* Hero handles its own id="home" */}
        <Hero />
        
        <section id="tech">
          <TechStack />
        </section>

        <section id="about">
          <About />
        </section>
        
        <Certifications />
        <section id="community">
        <Community />
        </section>
        <section id="projects">
          <Projects />
        </section>

        <Footer />
      </div>
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;