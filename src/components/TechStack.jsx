import React from 'react';
import { motion } from 'framer-motion';

// Updated stack
const technologies = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/FF6584" }, 
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/FFFFFF" }, 
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" }, 
  // FIXED: Changed color to white (ffffff) so it's visible on dark backgrounds
  // { name: "Salesforce", icon: "https://cdn.simpleicons.org/salesforce/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

// Duplicate list for infinite scroll
const marqueeItems = [...technologies, ...technologies, ...technologies, ...technologies];

const TechStack = () => {
  return (
    <section id="stack" className="py-10 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- GLASS CONTAINER --- */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 p-6 md:p-12 relative overflow-hidden group">
          
          {/* Decorative Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <span className="text-xs font-medium text-purple-300 tracking-wide uppercase">
  My Toolkit
</span>
            </motion.div>
            
            <motion.h3 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-2xl md:text-5xl font-bold text-white mb-4"
            >
              Technologies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Frameworks</span>
            </motion.h3>

            <motion.p
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
            >
              A curated list of the tools and platforms I use to build scalable, high-performance applications.
            </motion.p>
          </div>

          {/* Marquee Container */}
          <div className="relative flex w-full overflow-hidden">
            
            {/* Side Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-20 bg-gradient-to-r from-[#090909] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-20 bg-gradient-to-l from-[#090909] to-transparent pointer-events-none" />

            {/* The Moving Track */}
            <motion.div
              className="flex items-center gap-6 md:gap-8 px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 40 
              }}
            >
              {marqueeItems.map((tech, index) => (
                <div key={index} className="group/icon flex flex-col items-center justify-center gap-3 md:gap-4 flex-shrink-0">
                  {/* Inner Cards */}
                  <div className="w-20 h-20 md:w-24 md:h-24 relative bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 transition-all duration-500 group-hover/icon:scale-110 group-hover/icon:bg-white/10 group-hover/icon:border-purple-500/30 group-hover/icon:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-8 h-8 md:w-10 md:h-10 opacity-60 group-hover/icon:opacity-100 transition-all duration-300 grayscale group-hover/icon:grayscale-0" 
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-gray-500 group-hover/icon:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;