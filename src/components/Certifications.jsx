import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Award, Database, Cloud, Shield, Brain,
  Code2, Terminal, Globe, CheckCircle2, ExternalLink,
  Sparkles, Lock, Cpu
} from 'lucide-react';

import salesforceImg from '../assets/certs/salesforce.jpg';
import mongoImg from '../assets/certs/mongo.png';
import postmanImg from '../assets/certs/postman.png';
import githubImg from '../assets/certs/github.png';
import ibmImg from '../assets/certs/ibm.png';
import kaliImg from '../assets/certs/kali.png';
import aws from '../assets/certs/aws.png';

// ─── DATA ────────────────────────────────────────────────────────────────────
const certifications = [
  {
    id: 'AWS',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2026',
    category: 'Cloud',
    icon: Cloud,
    accent: '#FF9900',
    accentSoft: 'rgba(255,153,0,0.12)',
    tag: 'CLF-C02',
    desc: 'Comprehensive validation of AWS Cloud concepts, core services, security architecture, and pricing models.',
    image: aws,
  },
  {
    id: 'mongo',
    title: 'Associate Developer',
    issuer: 'MongoDB',
    date: '2025',
    category: 'Database',
    icon: Database,
    accent: '#00ED64',
    accentSoft: 'rgba(0,237,100,0.10)',
    tag: 'NoSQL',
    desc: 'Schema design mastery, aggregation pipelines, and performance tuning for high-scale document databases.',
    image: mongoImg,
  },
  {
    id: 'postman',
    title: 'API Fundamentals',
    issuer: 'Postman',
    date: '2025',
    category: 'DevOps',
    icon: Globe,
    accent: '#FF6C37',
    accentSoft: 'rgba(255,108,55,0.10)',
    tag: 'REST',
    desc: 'API lifecycle management, automated testing suites, and professional documentation standards.',
    image: postmanImg,
  },
  {
    id: 'github',
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: '2025',
    category: 'DevOps',
    icon: Code2,
    accent: '#E6EDF3',
    accentSoft: 'rgba(230,237,243,0.08)',
    tag: 'Git',
    desc: 'Git workflows, CI/CD with GitHub Actions, and collaborative repository management.',
    image: githubImg,
  },
  {
    id: 'ibm',
    title: 'Machine Learning',
    issuer: 'IBM',
    date: '2025',
    category: 'AI',
    icon: Brain,
    accent: '#BE95FF',
    accentSoft: 'rgba(190,149,255,0.12)',
    tag: 'ML/AI',
    desc: 'Supervised & unsupervised learning, regression models, and neural network fundamentals.',
    image: ibmImg,
  },
  {
    id: 'kali',
    title: 'Linux Fundamentals',
    issuer: 'Kali Linux',
    date: '2024',
    category: 'Security',
    icon: Terminal,
    accent: '#557C8A',
    accentSoft: 'rgba(85,124,138,0.12)',
    tag: 'CLI',
    desc: 'Command-line proficiency, file-system security, and network penetration testing basics.',
    image: kaliImg,
  },
  {
    id: 'salesforce',
    title: 'Agentforce Specialist',
    issuer: 'Salesforce',
    date: '2025',
    category: 'AI & CRM',
    icon: Cpu,
    accent: '#00A1E0',
    accentSoft: 'rgba(0,161,224,0.12)',
    tag: 'Agents',
    desc: 'Expertise in building autonomous AI agents, optimising CRM workflows, and deploying scalable Salesforce solutions.',
    image: salesforceImg,
  }
];

// ─── FONT STYLE (Inter) ───────────────────────────────────────────────────────
const FONT = "'Inter', sans-serif";

// ─── NOISE TEXTURE SVG ────────────────────────────────────────────────────────
const NoiseBg = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ zIndex: 0 }}>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

// ─── SCANNER LINE ─────────────────────────────────────────────────────────────
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px pointer-events-none z-20"
    style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)' }}
    initial={{ top: '0%' }}
    animate={{ top: '100%' }}
    transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
  />
);

// ─── CERT CARD (left list item) ───────────────────────────────────────────────
const CertCard = ({ cert, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="relative w-full text-left group outline-none"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="card-slab"
            className="absolute inset-0 rounded-2xl border"
            style={{
              background: cert.accentSoft,
              borderColor: cert.accent + '55',
              boxShadow: `0 0 24px 0 ${cert.accent}22`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>

      <div
        className={`relative z-10 flex items-center gap-4 px-5 py-4 rounded-2xl border transition-colors duration-200 ${
          isActive ? 'border-transparent' : 'border-white/[0.06] hover:border-white/[0.12]'
        }`}
      >
        {/* Icon */}
        <div
          className="relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: cert.accentSoft, border: `1px solid ${cert.accent}44` }}
        >
          <cert.icon size={18} style={{ color: cert.accent }} />
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ boxShadow: `0 0 12px 2px ${cert.accent}66` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold truncate transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'
            }`}
            style={{ fontFamily: FONT }}
          >
            {cert.title}
          </p>
          <p className="text-xs text-white/35 mt-0.5 truncate" style={{ fontFamily: FONT }}>
            {cert.issuer}
          </p>
        </div>

        {/* Tag */}
        <span
          className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
          style={{
            background: cert.accentSoft,
            color: cert.accent,
            border: `1px solid ${cert.accent}44`,
            fontFamily: FONT,
          }}
        >
          {cert.tag ?? cert.category}
        </span>
      </div>
    </motion.button>
  );
};

// ─── DETAIL PANEL (right) ─────────────────────────────────────────────────────
const DetailPanel = ({ cert }) => {
  return (
    <motion.div
      key={cert.id}
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        borderRadius: '28px',
        background: 'rgba(10,10,14,0.75)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${cert.accent}33`,
        boxShadow: `0 0 60px 0 ${cert.accent}18, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <NoiseBg />

      {/* Ambient glow */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cert.accent}28 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 px-8 pt-8 pb-0">
        <div>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold mb-3 tracking-wider uppercase"
            style={{
              background: cert.accentSoft,
              color: cert.accent,
              border: `1px solid ${cert.accent}44`,
              fontFamily: FONT,
            }}
          >
            <Lock size={9} />
            {cert.category}
          </div>
          <h2
            className="text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: FONT }}
          >
            {cert.title}
          </h2>
          <p
            className="text-sm mt-1 flex items-center gap-2"
            style={{ color: cert.accent + 'CC', fontFamily: FONT }}
          >
            <span className="opacity-60 font-normal text-xs uppercase tracking-widest">Issued by</span>
            <span className="font-semibold">{cert.issuer}</span>
          </p>
        </div>

        <div
          className="shrink-0 p-3.5 rounded-2xl"
          style={{ background: cert.accentSoft, border: `1px solid ${cert.accent}44` }}
        >
          <cert.icon size={28} style={{ color: cert.accent }} />
        </div>
      </div>

      {/* Image viewer */}
      <div
        className="relative z-10 flex-1 min-h-0 mx-8 mt-6 rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${cert.accent}22` }}
      >
        {cert.image ? (
          <>
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: 'brightness(0.88) saturate(1.1)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.1) 55%, transparent 100%)` }}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: cert.accentSoft }}>
            <cert.icon size={80} style={{ color: cert.accent, opacity: 0.6 }} />
            <p className="text-sm" style={{ color: cert.accent, fontFamily: FONT }}>{cert.issuer}</p>
          </div>
        )}

        <ScanLine />

        {/* Verified badge */}
        <div
          className="absolute bottom-4 left-4 z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <CheckCircle2 size={12} className="text-emerald-400" />
          <span
            className="text-[10px] font-semibold text-emerald-300 uppercase tracking-widest"
            style={{ fontFamily: FONT }}
          >
            Credential Verified
          </span>
        </div>

        {/* Date badge */}
        <div
          className="absolute bottom-4 right-4 z-30 px-3 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-widest"
          style={{
            background: cert.accentSoft,
            color: cert.accent,
            border: `1px solid ${cert.accent}44`,
            backdropFilter: 'blur(12px)',
            fontFamily: FONT,
          }}
        >
          {cert.date}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between gap-4 px-8 py-6">
        <p className="text-sm text-white/45 leading-relaxed max-w-[55%]" style={{ fontFamily: FONT }}>
          {cert.desc}
        </p>

        <motion.button
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-black"
          style={{ background: cert.accent, fontFamily: FONT, boxShadow: `0 0 20px 0 ${cert.accent}55` }}
          whileHover={{ scale: 1.04, boxShadow: `0 0 32px 0 ${cert.accent}88` }}
          whileTap={{ scale: 0.97 }}
        >
          Verify
          <ExternalLink size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── MOBILE ACCORDION PANEL ───────────────────────────────────────────────────
const MobilePanel = ({ cert }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="overflow-hidden rounded-b-2xl -mt-1"
    style={{ border: `1px solid ${cert.accent}33`, borderTop: 'none', background: 'rgba(8,8,12,0.85)', backdropFilter: 'blur(16px)' }}
  >
    <div className="p-5">
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden mb-4"
        style={{ border: `1px solid ${cert.accent}22` }}
      >
        {cert.image ? (
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: cert.accentSoft }}>
            <cert.icon size={56} style={{ color: cert.accent }} />
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
        <div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <CheckCircle2 size={11} className="text-emerald-400" />
          <span className="text-[9px] font-semibold text-emerald-300 uppercase tracking-widest" style={{ fontFamily: FONT }}>Verified</span>
        </div>
      </div>

      <p className="text-sm text-white/50 leading-relaxed mb-4" style={{ fontFamily: FONT }}>{cert.desc}</p>

      <div className="flex gap-3">
        <motion.button
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black"
          style={{ background: cert.accent, fontFamily: FONT }}
          whileTap={{ scale: 0.97 }}
        >
          Verify <ExternalLink size={13} />
        </motion.button>
        <div
          className="px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center"
          style={{ background: cert.accentSoft, color: cert.accent, border: `1px solid ${cert.accent}44`, fontFamily: FONT }}
        >
          {cert.date}
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Certifications = () => {
  const [activeCert, setActiveCert] = useState(certifications[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="certifications" className="py-28 relative overflow-hidden">

      {/* Page-level ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: `radial-gradient(circle, ${activeCert.accent}08 0%, transparent 65%)`, transition: 'background 0.7s ease' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-20 md:text-center max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Sparkles size={13} className="text-white/40" />
            <span
              className="text-xs font-medium text-white/40 tracking-widest uppercase"
              style={{ fontFamily: FONT }}
            >
              Verified Credentials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-6"
            style={{ fontFamily: FONT }}
          >
            The{' '}
            <span
              style={{
                color: activeCert.accent,
                transition: 'color 0.6s ease',
                textShadow: `0 0 60px ${activeCert.accent}55`,
              }}
            >
              Vault
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-white/35 text-lg leading-relaxed"
            style={{ fontFamily: FONT }}
          >
            A secured archive of industry-recognised credentials spanning Cloud, AI, DevOps and Security.
          </motion.p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT — scrollable list */}
          <div
            className="lg:col-span-5 flex flex-col gap-2 relative z-10 max-h-[620px] overflow-y-auto pr-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {certifications.map((cert) => (
              <div key={cert.id}>
                <CertCard
                  cert={cert}
                  isActive={activeCert.id === cert.id}
                  onClick={() => setActiveCert(cert)}
                />
                <AnimatePresence>
                  {isMobile && activeCert.id === cert.id && (
                    <MobilePanel cert={cert} />
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Count footer */}
            <div
              className="mt-3 flex items-center justify-between px-5 py-3 rounded-2xl text-[10px] uppercase tracking-widest"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: FONT,
              }}
            >
              <span className="flex items-center gap-1.5"><Shield size={10} /> {certifications.length} credentials</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500/60" /> All active</span>
            </div>
          </div>

          {/* RIGHT — detail panel (desktop only) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28 h-[620px]">
            <AnimatePresence mode="wait">
              <DetailPanel key={activeCert.id} cert={activeCert} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;