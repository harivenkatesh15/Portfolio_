import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Globe, Zap, ExternalLink } from 'lucide-react';

const ProfileCard = ({
  name = "Hari V",
  title = "Product Engineer",
  status = "Online",
  avatarUrl, 
  enableTilt = true,
  onContactClick
}) => {
  const cardRef = useRef(null);
  
  // Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct * 15);
    y.set(yPct * 15);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const rotateX = useTransform(mouseY, (value) => value * -1);
  const rotateY = useTransform(mouseX, (value) => value);

  // --- UPDATED STATS ---
  const stats = [
    { label: 'DSA Solved', val: '200+' },
    { label: 'Projects', val: '10+' },
    { label: 'Certs', val: '6+' } // <--- CHANGED HERE
  ];

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // --- CRYSTAL GLASS CONTAINER ---
      className="relative w-full max-w-[360px] mx-auto min-h-[600px] rounded-[3rem] 
        bg-gradient-to-b from-white/10 to-transparent 
        backdrop-blur-md 
        border border-white/20
        shadow-[0_20px_40px_rgba(0,0,0,0.2)]
        group select-none overflow-hidden"
    >
      
      {/* Reflections */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-100" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center p-6 h-full" style={{ transform: "translateZ(30px)" }}>
        
        {/* Top Bar: Status & Globe */}
        <div className="w-full flex justify-between items-center mb-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-white tracking-wider uppercase">{status}</span>
          </div>
          <div className="p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-purple-200">
             <Globe size={16} />
          </div>
        </div>

        {/* Avatar Ring */}
        <div className="relative mb-8">
          {/* Spinning Dashed Ring */}
          <div className="absolute inset-[-15px] border border-dashed border-white/10 rounded-full animate-[spin_12s_linear_infinite]" />
          
          <div className="relative w-56 h-56 rounded-full p-2 bg-white/5 border border-white/20 shadow-2xl backdrop-blur-sm">
            <div className="w-full h-full rounded-full overflow-hidden relative">
               <img 
                 src={avatarUrl} 
                 alt={name} 
                 className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center w-full mb-10">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-md">{name}</h2>
          <div className="inline-block px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-sm text-gray-100 font-medium tracking-wide flex items-center gap-2">
              <Zap size={14} className="text-purple-300 fill-purple-300" />
              {title}
            </p>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-3 gap-2 w-full mt-auto mb-6">
           {stats.map((stat, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
               <span className="text-lg font-bold text-white">{stat.val}</span>
               <span className="text-[9px] text-gray-200 uppercase tracking-wider font-bold">{stat.label}</span>
             </div>
           ))}
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-3 pb-2">
           <a href="https://github.com/harivenkatesh15" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:bg-white/10 transition-all">
             <Github size={20} />
           </a>
           <a href="https://www.linkedin.com/in/hari1505/" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:bg-white/10 transition-all">
             <Linkedin size={20} />
           </a>
           <button onClick={onContactClick} className="flex-1 rounded-2xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg">
             Let's Connect <ExternalLink size={16} />
           </button>
        </div>

      </div>
    </motion.div>
  );
};

export default ProfileCard;