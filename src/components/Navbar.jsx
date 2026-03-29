import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Code2, Home, User, Layers, Award, Sparkles } from 'lucide-react';

const Navbar = ({ onOpenContact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 20) setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Stack", href: "#tech", icon: Layers },
    { name: "Certifications", href: "#certifications", icon: Award },
    { name: "Projects", href: "#projects", icon: Code2 },
  ];

  // Animation Variants (Fixes flickering)
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      filter: "blur(10px)",
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10, 
      filter: "blur(10px)",
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-300 ${
          scrolled ? "pt-2" : "pt-6"
        } px-4 pointer-events-none`}
      >
        {/* --- MAIN NAVBAR --- */}
        <div 
          className={`
            pointer-events-auto relative flex items-center justify-between 
            transition-all duration-300 ease-in-out
            ${scrolled ? "w-[95%] md:w-[60%] py-2" : "w-[95%] md:w-[70%] py-3"}
            px-4 
            bg-[#030014]/80 backdrop-blur-xl 
            border border-white/10 
            shadow-[0_8px_32px_rgba(0,0,0,0.5)] 
            rounded-2xl md:rounded-full
            z-50
          `}
        >
          {/* LOGO */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
               <span className="font-bold text-white text-xs">HV</span>
            </div>
            <span className="font-bold text-white tracking-tight">
              Hari<span className="text-purple-400">.</span>
            </span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`
                  relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeTab === link.name ? "text-white" : "text-gray-400 hover:text-gray-200"}
                `}
              >
                {activeTab === link.name && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-sm backdrop-blur-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">{link.name}</span>
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenContact}
              className="hidden md:flex group relative px-5 py-2 rounded-full bg-white text-black text-xs font-bold items-center gap-2 overflow-hidden hover:scale-105 transition-transform"
            >
              <span className="relative z-10">Let's Connect</span> {/* <--- CHANGED HERE */}
              <ArrowRight size={12} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-all duration-300 ${
                isMobileMenuOpen 
                  ? "bg-white text-black border-white" 
                  : "bg-white/5 text-gray-300 border-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE DROPDOWN --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto md:hidden w-[95%] mt-2 overflow-hidden rounded-3xl bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 shadow-2xl relative z-40 origin-top"
            >
              <div className="p-4 grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={itemVariants}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-200
                      ${activeTab === link.name 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <link.icon size={24} className={activeTab === link.name ? "text-purple-400" : ""} />
                    <span className="text-xs font-medium">{link.name}</span>
                  </motion.a>
                ))}

                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="col-span-2 flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-purple-900/40 active:scale-95 transition-transform"
                >
                  <Sparkles size={16} />
                  Let's Work Together
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;