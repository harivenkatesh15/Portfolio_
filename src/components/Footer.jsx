import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Twitter, ArrowUpRight, Radio, Signal } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// ─── FONT LOADER ──────────────────────────────────────────────────────────────
const useGoogleFonts = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap';
    document.head.appendChild(link);
  }, []);
};

// ─── LIVE CLOCK ───────────────────────────────────────────────────────────────
const LiveClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toUTCString().replace('GMT', 'UTC').split(' ').slice(0, 5).join(' ')
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
};

// ─── MARQUEE TICKER ───────────────────────────────────────────────────────────
const items = [
  'AVAILABLE FOR HIRE',
  '◆',
  'DATA ENGINEERING',
  '◆',
  'GEN AI',
  '◆',
  'AWS CERTIFIED',
  '◆',
  'FULL STACK',
  '◆',
  'COIMBATORE · INDIA',
  '◆',
  'OPEN TO RELOCATE',
  '◆',
];

const Ticker = () => {
  const text = items.join('   ');
  return (
    <div
      className="overflow-hidden w-full py-3 border-y"
      style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: 'ticker 28s linear infinite' }}>
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[10px] tracking-[0.22em] pr-12"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── SIGNAL RINGS (animated beacon) ──────────────────────────────────────────
const SignalRings = ({ color = '#ffffff' }) => (
  <div className="relative flex items-center justify-center w-14 h-14">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border"
        style={{ borderColor: color + '60', width: 14 + i * 14, height: 14 + i * 14 }}
        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
      />
    ))}
    <div
      className="relative z-10 w-3.5 h-3.5 rounded-full"
      style={{ background: color, boxShadow: `0 0 14px 4px ${color}88` }}
    />
  </div>
);

// ─── SOCIAL LINK ──────────────────────────────────────────────────────────────
const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-colors"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      fontFamily: "'JetBrains Mono', monospace",
    }}
    whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.07)' }}
    whileTap={{ scale: 0.97 }}
  >
    <Icon size={14} className="text-white/40 group-hover:text-white/80 transition-colors" />
    <span className="text-[11px] text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-widest">
      {label}
    </span>
    <ArrowUpRight size={10} className="text-white/15 group-hover:text-white/40 transition-colors -ml-0.5" />
  </motion.a>
);

// ─── GLITCH TEXT ──────────────────────────────────────────────────────────────
const GlitchText = ({ children, className, style }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const loop = () => {
      const delay = 3000 + Math.random() * 6000;
      setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
        loop();
      }, delay);
    };
    loop();
  }, []);

  return (
    <span
      className={className}
      style={{
        ...style,
        filter: glitch ? 'blur(1.5px) brightness(1.4)' : 'none',
        letterSpacing: glitch ? '0.04em' : style?.letterSpacing,
        transition: glitch ? 'none' : 'filter 0.15s ease',
        textShadow: glitch
          ? `3px 0 #ff0040, -3px 0 #00f0ff`
          : style?.textShadow,
      }}
    >
      {children}
    </span>
  );
};

// ─── SEND BUTTON ──────────────────────────────────────────────────────────────
const SendButton = () => {
  const [state, setState] = useState('idle'); // idle | sending | sent

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('sending');
    setTimeout(() => setState('sent'), 1800);
    setTimeout(() => setState('idle'), 4200);
  };

  const label = state === 'idle' ? 'OPEN CHANNEL' : state === 'sending' ? 'TRANSMITTING…' : 'SIGNAL SENT ✓';
  const accent = state === 'sent' ? '#4ade80' : '#ffffff';

  return (
    <motion.a
      href={state === 'idle' ? 'mailto:harivenkatesh1505@gmail.com' : undefined}
      onClick={handleClick}
      className="relative inline-flex items-center gap-3 cursor-pointer overflow-hidden"
      style={{
        padding: '10px 24px',
        borderRadius: '100px',
        background: state === 'sent' ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${accent}44`,
        boxShadow: `0 0 40px ${accent}22, inset 0 1px 0 ${accent}22`,
        transition: 'all 0.4s ease',
      }}
      whileHover={state === 'idle' ? { scale: 1.03, boxShadow: '0 0 60px rgba(255,255,255,0.18)' } : {}}
      whileTap={state === 'idle' ? { scale: 0.98 } : {}}
    >
      {/* Scanning sweep */}
      {state === 'sending' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <Mail size={16} style={{ color: accent, transition: 'color 0.4s' }} />
      <span
        className="text-sm font-bold tracking-[0.2em]"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: accent, transition: 'color 0.4s' }}
      >
        {label}
      </span>
    </motion.a>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Footer = () => {
  useGoogleFonts();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-25%) } }
      `}</style>

      <footer
        ref={ref}
        className="relative overflow-hidden"
        style={{
          background: 'transparent',
          fontFamily: "'DM Sans', sans-serif",
          minHeight: '22vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Noise texture */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" style={{ zIndex: 0 }}>
          <filter id="fn2">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#fn2)" />
        </svg>

        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
        />

        {/* Bottom border glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
        />

        {/* ── Ticker strip ── */}
        <Ticker />

        {/* ── Single compact bar ── */}
        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-3"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* LEFT — wordmark + status */}
          <div className="flex items-center gap-4 shrink-0">
            <GlitchText
              className="text-2xl leading-none text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: '0.06em',
              }}
            >
              LET'S BUILD
            </GlitchText>

            {/* Live status dot */}
            <div
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ boxShadow: '0 0 5px #4ade80', animation: 'pulse 2s infinite' }}
              />
              <span
                className="text-[9px] text-green-400/70 tracking-widest uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                OPEN
              </span>
            </div>
          </div>

          {/* CENTER — CTA button */}
          <div className="flex items-center gap-3">
            <SendButton />
          </div>

          {/* RIGHT — socials + clock + copyright */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {/* Social row */}
            <div className="flex items-center gap-2">
              {[
                { href: 'https://linkedin.com', icon: Linkedin },
                { href: 'https://github.com', icon: Github },
                { href: 'https://twitter.com', icon: Twitter },
              ].map(({ href, icon: Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.09)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={12} className="text-white/35" />
                </motion.a>
              ))}
            </div>

            {/* Clock + copyright */}
            <div
              className="flex items-center gap-3 text-[9px] text-white/15 tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <LiveClock />
              <span className="opacity-40">·</span>
              <span>© {new Date().getFullYear()} HARI V.</span>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;