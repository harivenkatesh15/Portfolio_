import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award, Code2, MapPin, Zap, Cloud } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-10 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- GLASS CONTAINER --- */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 p-6 md:p-12 relative overflow-hidden">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-16 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-xs font-medium text-purple-300 tracking-wide uppercase">About Me</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight">
              Driven by Code. <br className="md:hidden"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Focused on Solutions.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start lg:items-stretch">
            
            {/* --- LEFT COLUMN: The Narrative --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col"
            >
              <div className="h-full p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors duration-500 group relative overflow-hidden">
                
                {/* --- UPDATED HEADING --- */}
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Terminal className="text-purple-400" size={24} />
                  The Developer's Mindset
                </h3>
                
                {/* --- UPDATED CONTENT --- */}
                <div className="space-y-6 text-base md:text-lg text-gray-300 font-light leading-relaxed">
                  <p>
                    I am a pre-final year student at <span className="text-white font-medium">KPR Institute of Engineering and Technology</span> with a passion for building software that matters. For me, coding isn't just about syntax; it's about solving real problems efficiently.
                  </p>
                  <p>
                    I spend my time bridging the gap between theoretical concepts and practical, deployed applications. Whether it's optimizing backend logic in Java or crafting seamless React interfaces, I am focused on engineering systems that are scalable, secure, and ready for the real world.
                  </p>
                </div>

                {/* Stats Row */}
                <div className="mt-8 md:mt-12 pt-8 grid grid-cols-3 gap-4 md:gap-6 border-t border-white/10">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1">DSA Solved</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">10+</div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1">Projects Built</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">2x</div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1">Hackathon Wins</div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* --- RIGHT COLUMN: Technical Focus --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="h-full p-6 md:p-8 rounded-3xl bg-[#050505]/50 border border-white/10 relative overflow-hidden">
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2">
                  <Zap className="text-yellow-400 fill-yellow-400" size={20} />
                  Technical Focus
                </h3>

                <div className="space-y-4">
                  {/* Skill 1 */}
                  <div className="group flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
                    <div className="p-3 rounded-xl bg-[#030014] text-cyan-400 shrink-0">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm md:text-base">Full Stack Development</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Java, Spring Boot, React, MySQL</p>
                    </div>
                  </div>

                  {/* Skill 2 */}
                  <div className="group flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all">
                    <div className="p-3 rounded-xl bg-[#030014] text-pink-400 shrink-0">
                      <Cloud size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm md:text-base">Cloud & DevOps</h4>
                      <p className="text-xs text-gray-400 mt-0.5">AWS, Docker, Kubernetes</p>
                    </div>
                  </div>

                  {/* Skill 3 */}
                  <div className="group flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all">
                    <div className="p-3 rounded-xl bg-[#030014] text-emerald-400 shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm md:text-base">Industry Certifications</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Salesforce, MongoDB, Postman & more</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-400">Coimbatore, India</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold whitespace-nowrap">
                    Open to Opportunities
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;