import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Download, Cloud, Trophy, Code2 } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import ProfileCard from './ProfileCard';
import myProfilePic from '../assets/Hari_V.jpg'; 


// --- SPOTLIGHT GLASS CARD COMPONENT ---
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
}

// --- ANIMATION VARIANTS ---
const fadeUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const scannerVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 2.5, ease: "easeInOut", delay: 0.5 }
  }
};

const laserLineVariants = {
  hidden: { top: "0%", opacity: 0 },
  visible: {
    top: "120%",
    opacity: [0, 1, 1, 0], 
    transition: { duration: 2.5, ease: "easeInOut", delay: 0.5 }
  }
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 md:px-6 pt-32 pb-20 overflow-hidden">
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* --- LEFT COLUMN: SPOTLIGHT TEXT --- */}
        <motion.div 
          className="text-center lg:text-left order-2 lg:order-1"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants} className="mb-8 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                Aspiring Software Engineer
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUpVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-2xl">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hari.</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
              Full Stack Developer & Cloud Enthusiast
            </h2>
          </motion.div>

          {/* Spotlight Intro */}
          <motion.div variants={fadeUpVariants} className="mb-10">
            <SpotlightCard className="rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto lg:mx-0">
               <p className="text-lg md:text-xl text-gray-100 font-light leading-relaxed">
                 I bridge the gap between <span className="text-purple-300 font-medium">complex backend logic</span> and <span className="text-pink-300 font-medium">intuitive user interfaces</span>. 
               </p>
               <p className="mt-4 text-base text-gray-300 leading-relaxed">
                 Currently an undergraduate at <span className="text-white font-medium">KPRIET</span>, I specialize in building scalable web ecosystems using <b>React</b>, <b>Spring Boot</b>, and <b>AWS</b>.
               </p>

               {/* Stats */}
               <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-6">
                  <div className="flex flex-col items-center lg:items-start gap-1 group cursor-default">
                     <Trophy size={18} className="text-yellow-400 mb-1 group-hover:scale-110 transition-transform"/>
                     <span className="text-sm font-bold text-white">2x Winner</span>
                     <span className="text-xs text-gray-500">Hackathons</span>
                  </div>
                  <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col items-center lg:items-start gap-1 group cursor-default">
                     <Code2 size={18} className="text-emerald-400 mb-1 group-hover:scale-110 transition-transform"/>
                     <span className="text-sm font-bold text-white">200+ Solved</span>
                     <span className="text-xs text-gray-500">DSA Problems</span>
                  </div>
                  <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col items-center lg:items-start gap-1 group cursor-default">
                     <Cloud size={18} className="text-blue-400 mb-1 group-hover:scale-110 transition-transform"/>
                     <span className="text-sm font-bold text-white">Cloud Native</span>
                     <span className="text-xs text-gray-500">AWS / DevOps</span>
                  </div>
               </div>
            </SpotlightCard>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <MagneticWrapper strength={0.3}>
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300"
              >
                <span className="relative z-10">Explore My Work</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticWrapper>
            
            <a 
              href="/Hari-resume.pdf"
              download="Hari_Venkatesh_Resume.pdf"
              className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2"
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: SCANNER PROFILE CARD --- */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          
          {/* Mobile View */}
          <div className="block lg:hidden w-[300px] mb-8 lg:mb-0">
             <ProfileCard
              name="Hari Venkatesh" 
              title="Full Stack Developer"
              status="Online"
              avatarUrl={myProfilePic} 
              enableTilt={false} 
              onContactClick={() => window.location.href = 'mailto:hari@example.com'}
            />
          </div>

          {/* Desktop View with Laser Effect */}
          <div className="hidden lg:block relative w-[360px]">
            <motion.div
              initial="hidden"
              animate="visible"
              className="relative rounded-[3rem]"
            >
              <motion.div variants={scannerVariants} className="relative z-10 rounded-[3rem]">
                <ProfileCard
                  name="Hari Venkatesh"
                  title="Full Stack Developer"
                  status="Online"
                  avatarUrl={myProfilePic} 
                  enableTilt={true} 
                  onContactClick={() => window.location.href = 'mailto:hari@example.com'}
                />
              </motion.div>
              <motion.div 
                variants={laserLineVariants}
                className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, #A855F7, #EC4899, transparent)",
                  boxShadow: "0 0 20px 2px rgba(168, 85, 247, 0.6)"
                }}
              />
              <motion.div
                 variants={laserLineVariants}
                 className="absolute left-0 right-0 h-[100px] -mt-[100px] z-20 pointer-events-none bg-gradient-to-b from-transparent to-purple-500/20"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;