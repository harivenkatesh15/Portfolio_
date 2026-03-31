import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Users, Mic, Award, Globe, HeartHandshake,
  Code2, Github, Megaphone, ArrowUpRight, Sparkles, Zap, Trophy
} from 'lucide-react';

// --- YOUR IMAGES ---
import ieeeimage from '../assets/images/IEEE.jpg';
import srm from '../assets/images/srm.jpg';
import paper from '../assets/images/paper.jpg';
import tech from '../assets/images/tech.jpg';
import hackathon from '../assets/images/hackathon.jpg';
import award from '../assets/images/award.png';

// --- STATS ---
const stats = [
  { value: "3+", label: "National Awards" },
  { value: "100+", label: "Students Mentored" },
  { value: "12+", label: "Events Organized" },
  { value: "5+", label: "Talks Delivered" },
];

// --- DATA ---
const moments = [
  {
    id: 1,
    title: "IEEE SSIT Society",
    role: "Active Member",
    desc: "Organizing tech talks, driving community growth, and mentoring juniors in real-world tech impact.",
    category: "Community",
    filter: "community",
    size: "md:col-span-2 md:row-span-2",
    img: ieeeimage,
    icon: Globe,
    color: "text-blue-300",
    accentColor: "#3b82f6",
    bg: "bg-blue-950/40",
  },
  {
  id: 2,
  title: "Open Innovation",
  role: "Paper Presentation",
  desc: "Presented a technical paper at PSG iTech's Open Innovation event.",
  category: "Speaking",
  filter: "speaking",
  size: "md:col-span-1 md:row-span-2",
  img: paper,
  icon: Mic,
  color: "text-violet-300",
  accentColor: "#8b5cf6",
  bg: "bg-violet-950/40",
},
  {
    id: 3,
    title: "SRM Healthathon",
    role: "First Prize Winner 🏆",
    desc: "Built 'SignSpeak' — a real-time sign language translator that won first place.",
    category: "Victory",
    filter: "hackathon",
    size: "md:col-span-1 md:row-span-2",
    img: srm,
    icon: Code2,
    color: "text-orange-300",
    accentColor: "#f97316",
    bg: "bg-orange-950/40",
  },
  {
    id: 5,
    title: "National Hackathon",
    role: "Competitor",
    desc: "24 hours of relentless coding to build AI-driven solutions at a national level.",
    category: "Hackathon",
    filter: "hackathon",
    size: "md:col-span-2 md:row-span-1",
    img: hackathon,
    icon: Award,
    color: "text-amber-300",
    accentColor: "#f59e0b",
    bg: "bg-amber-950/40",
  },
  {
    id: 6,
    title: "Tech Meetup",
    role: "Attendee",
    desc: "Networking with Cloud Computing leaders and industry pioneers.",
    category: "Network",
    filter: "community",
    size: "md:col-span-1 md:row-span-1",
    img: tech,
    icon: Users,
    color: "text-rose-300",
    accentColor: "#f43f5e",
    bg: "bg-rose-950/40",
  },
  {
  id: 7, 
  title: "Best Student Award",
  role: "Academic Excellence",
  desc: "Recognized for overall contributions and impact as a student.",
  category: "Achievement",
  filter: "achievement",
  size: "md:col-span-1 md:row-span-1",
  img: award, 
  icon: Trophy,
  color: "text-yellow-300",
  accentColor: "#f59e0b",
  bg: "bg-yellow-950/40",
},
];

const filters = [
  { label: "All", value: "all" },
  { label: "Community", value: "community" },
  { label: "Hackathon", value: "hackathon" },
  { label: "Speaking", value: "speaking" },
];

// ---- MAGNETIC TILT CARD ----
const BentoCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX);
    mouseY.set(relY);
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.12,
    });
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setGlare(g => ({ ...g, opacity: 0 }));
  }, [mouseX, mouseY]);

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.55, type: "spring", stiffness: 90, damping: 18 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={`
        relative group rounded-[28px] overflow-hidden border border-white/[0.08]
        bg-[#08080f] cursor-pointer
        ${item.size}
        min-h-[250px]
      `}
    >
      {/* IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 grayscale-[30%] group-hover:grayscale-0 opacity-60 group-hover:opacity-85"
          style={{ transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s, filter 0.5s" }}
        />
        {/* Deep gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-[#06060f]/60 to-transparent" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060f]/40 via-transparent to-[#06060f]/20" />
      </div>

      {/* GLARE EFFECT */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-[28px] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
        }}
      />

      {/* ACCENT GLOW on hover */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px]"
        style={{
          background: `radial-gradient(ellipse at bottom left, ${item.accentColor}18 0%, transparent 65%)`,
        }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-20" style={{ transform: "translateZ(20px)" }}>

        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl
            backdrop-blur-md border border-white/10 shadow-lg
            text-[10px] font-black uppercase tracking-[0.12em] text-white
            ${item.bg}
          `}>
            <Icon size={11} className={item.color} />
            {item.category}
          </div>

          <motion.div
            className="p-2 rounded-xl bg-white/8 backdrop-blur-md border border-white/10 text-white"
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ scale: 1.1 }}
            style={{ opacity: 0 }}
            whileInView={{}} // intentional noop
          >
            <ArrowUpRight size={15} />
          </motion.div>

          {/* Arrow animates on hover via group */}
          <div className="absolute top-5 right-5 md:top-6 md:right-6 p-2 rounded-xl bg-white/8 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* Bottom text */}
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">

          {/* Accent line */}
          <div
            className="w-8 h-[2px] mb-3 rounded-full opacity-70 group-hover:w-14 transition-all duration-500"
            style={{ background: item.accentColor }}
          />

          <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 ${item.color}`}>
            {item.role}
          </p>
          <h3 className="text-xl md:text-[1.35rem] font-bold text-white mb-2.5 leading-tight drop-shadow-lg" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>
            {item.title}
          </h3>

          {/* Desc: always visible on mobile, slide-reveal on desktop */}
          <div className="block md:grid md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-350">
            <p className="text-gray-400 text-[13px] md:overflow-hidden md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${item.accentColor}35` }}
      />
    </motion.div>
  );
};

// ---- STAT STRIP ----
const StatStrip = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-3xl overflow-hidden border border-white/[0.07]"
  >
    {stats.map((s, i) => (
      <div
        key={i}
        className="bg-[#07070e] px-6 py-6 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-colors duration-300"
      >
        <span
          className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {s.value}
        </span>
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.label}</span>
      </div>
    ))}
  </motion.div>
);

// ---- FILTER TABS ----
const FilterTabs = ({ active, setActive }) => (
  <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start mb-10 md:mb-12">
    {filters.map(f => (
      <button
        key={f.value}
        onClick={() => setActive(f.value)}
        className={`
          relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300
          ${active === f.value
            ? "text-white"
            : "text-gray-500 hover:text-gray-300"
          }
        `}
      >
        {active === f.value && (
          <motion.div
            layoutId="filter-pill"
            className="absolute inset-0 rounded-xl bg-white/10 border border-white/15"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">{f.label}</span>
      </button>
    ))}
  </div>
);

// ---- MAIN COMPONENT ----
const Community = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? moments
    : moments.filter(m => m.filter === activeFilter);

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');`}</style>

      <section id="community" className="py-24 md:py-36 relative z-10 overflow-hidden">

        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-rose-600/6 blur-[100px] rounded-full pointer-events-none" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          {/* HEADER */}
          <div className="mb-12 md:mb-16 max-w-3xl mx-auto md:text-center">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.09] mb-7 backdrop-blur-md"
            >
              <HeartHandshake size={13} className="text-rose-400" />
              <span className="text-[10px] font-black text-rose-300 tracking-[0.15em] uppercase">Community & Impact</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5 leading-[1.05]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Beyond the{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Console.
                {/* Underline accent */}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q100 0 200 6" stroke="url(#ug)" strokeWidth="2.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f472b6"/>
                      <stop offset="0.5" stopColor="#a78bfa"/>
                      <stop offset="1" stopColor="#60a5fa"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              I don't just build code — I build{" "}
              <span className="text-white font-semibold">connections</span>. From leading{" "}
              <span className="text-blue-300 font-semibold">IEEE SSIT</span> events to competing in national hackathons, I'm actively shaping the tech ecosystem around me.
            </motion.p>
          </div>

          {/* FILTER TABS */}
          <FilterTabs active={activeFilter} setActive={setActiveFilter} />

          {/* GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[260px] gap-4 md:gap-5"
              style={{ perspective: "1200px" }}
            >
              {filtered.map((item, index) => (
                <BentoCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* STATS
          <StatStrip /> */}

        </div>
      </section>
    </>
  );
};

export default Community;