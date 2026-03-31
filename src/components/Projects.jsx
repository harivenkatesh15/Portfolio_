import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Terminal, FolderOpen, Folder, ChevronRight, Code2, Zap } from 'lucide-react';

// ─── FONT LOADER ──────────────────────────────────────────────────────────────
const useGoogleFonts = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap';
    document.head.appendChild(link);
  }, []);
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'medvault',
    filename: 'MedVaultApp.java',
    type: 'java',
    title: 'MedVault',
    category: 'Full Stack · Healthcare',
    status: 'DEPLOYED',
    statusColor: '#00ED64',
    accent: '#10b981',
    accentDim: 'rgba(16,185,129,0.08)',
    lines: [
      { n: 1,  t: 'comment', c: '// MedVault — Hospital Management System' },
      { n: 2,  t: 'comment', c: '// Spring Boot · React · MySQL · Role-Based Access' },
      { n: 3,  t: 'blank' },
      { n: 4,  t: 'keyword', c: '@RestController' },
      { n: 5,  t: 'keyword', c: '@RequestMapping', rest: '("/api/patients")' },
      { n: 6,  t: 'def',     c: 'public class ', fn: 'PatientController', args: '' },
      { n: 7,  t: 'blank' },
      { n: 8,  t: 'indent',  c: '  @PreAuthorize("hasRole(\'DOCTOR\')")' },
      { n: 9,  t: 'indent',  c: '  @PostMapping · requestDataAccess(Long patientId)' },
      { n: 10, t: 'indent',  c: '  @GetMapping  · getDashboardMetrics(Role role)' },
      { n: 11, t: 'blank' },
      { n: 12, t: 'string',  c: '// RBAC for 50+ users · 30% faster retrieval' },
    ],
    tech: ['Spring Boot', 'React', 'MySQL', 'Material UI', 'RBAC'],
    highlights: [
      'RBAC securing access for 50+ users across roles',
      'Request-Approve workflow for restricted data sharing',
      '30% faster patient data retrieval via optimized dashboard',
    ],
    description: 'A secure hospital management platform built during Infosys Springboard. Features role-based access control, a Request-Approve workflow for restricted record sharing, and a responsive Material UI dashboard — all shipped 100% compliant.',
    github: '#',
    live: '#',
  },
  {
    id: 'fitscale',
    filename: 'FitScaleGateway.java',
    type: 'java',
    title: 'FitScale',
    category: 'Microservices · AI Fitness',
    status: 'BUILT',
    statusColor: '#60a5fa',
    accent: '#3b82f6',
    accentDim: 'rgba(59,130,246,0.08)',
    lines: [
      { n: 1,  t: 'comment', c: '// FitScale — AI Fitness Microservices Platform' },
      { n: 2,  t: 'comment', c: '// Spring Cloud · Keycloak · RabbitMQ · Gemini API' },
      { n: 3,  t: 'blank' },
      { n: 4,  t: 'keyword', c: '@EnableEurekaClient' },
      { n: 5,  t: 'keyword', c: '@SpringBootApplication' },
      { n: 6,  t: 'def',     c: 'public class ', fn: 'ActivityRecommender', args: '' },
      { n: 7,  t: 'blank' },
      { n: 8,  t: 'indent',  c: '  // OAuth 2.0 via Keycloak' },
      { n: 9,  t: 'indent',  c: '  GeminiClient.recommend(userData) → AIResponse' },
      { n: 10, t: 'indent',  c: '  RabbitMQ.publish("activity.events", payload)' },
      { n: 11, t: 'blank' },
      { n: 12, t: 'string',  c: '// Eureka discovery · API Gateway routing' },
    ],
    tech: ['Spring Cloud', 'RabbitMQ', 'Keycloak', 'OAuth 2.0', 'Gemini API', 'Eureka'],
    highlights: [
      'Microservices discovery via Eureka + API Gateway routing',
      'Keycloak OAuth 2.0 for secure authentication',
      'Gemini API for personalized AI activity recommendations',
    ],
    description: 'A scalable fitness platform built on microservices architecture. Uses Keycloak for OAuth 2.0 auth, RabbitMQ for async event processing, and Google Gemini API to generate personalized AI-driven activity recommendations based on user health data.',
    github: '#',
    live: '#',
  },
  {
    id: 'resume-analyzer',
    filename: 'analyzer.py',
    type: 'python',
    title: 'AI Resume Analyzer',
    category: 'NLP · ATS · Flask',
    status: 'ACTIVE',
    statusColor: '#f59e0b',
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.08)',
    lines: [
      { n: 1,  t: 'comment', c: '# AI Resume Analyzer — ATS Scoring Engine' },
      { n: 2,  t: 'comment', c: '# Python · Flask · NLP · MongoDB' },
      { n: 3,  t: 'blank' },
      { n: 4,  t: 'keyword', c: 'from', rest: ' sklearn.feature_extraction import TfidfVectorizer' },
      { n: 5,  t: 'keyword', c: 'from', rest: ' spacy import load as nlp_load' },
      { n: 6,  t: 'blank' },
      { n: 7,  t: 'def',     c: 'def ', fn: 'analyze_resume', args: 'pdf_path: str' },
      { n: 8,  t: 'indent',  c: '  keywords = extract_ats_keywords(pdf_path)' },
      { n: 9,  t: 'indent',  c: '  score    = compute_ats_score(keywords)' },
      { n: 10, t: 'indent',  c: '  return { "score": score, "gaps": missing }' },
      { n: 11, t: 'blank' },
      { n: 12, t: 'string',  c: '# NLP keyword extraction → ATS feedback' },
    ],
    tech: ['Python', 'Flask', 'spaCy', 'TF-IDF', 'MongoDB'],
    highlights: [
      'NLP-powered keyword extraction against ATS criteria',
      'Actionable gap analysis and score breakdown per section',
      'Flask REST API with MongoDB for result persistence',
    ],
    description: 'A web app that parses uploaded resumes and scores them against ATS (Applicant Tracking System) criteria. Uses NLP for keyword extraction and semantic gap analysis — giving candidates targeted, actionable feedback to improve their resume.',
    github: '#',
    live: '#',
  },
  {
    id: 'spotify-pipeline',
    filename: 'pipeline.tf',
    type: 'terraform',
    title: 'Spotify AWS Pipeline',
    category: 'Data Engineering · AWS',
    status: 'LIVE',
    statusColor: '#1DB954',
    accent: '#a78bfa',
    accentDim: 'rgba(167,139,250,0.08)',
    lines: [
      { n: 1,  t: 'comment', c: '# Spotify Data Pipeline — End-to-End AWS' },
      { n: 2,  t: 'comment', c: '# S3 → Glue ETL → Athena SQL → QuickSight BI' },
      { n: 3,  t: 'blank' },
      { n: 4,  t: 'keyword', c: 'resource', rest: ' "aws_glue_job" "spotify_etl" {' },
      { n: 5,  t: 'indent',  c: '  name     = "spotify-transform-job"' },
      { n: 6,  t: 'indent',  c: '  role_arn = aws_iam_role.glue_exec.arn' },
      { n: 7,  t: 'indent',  c: '  command  { script = "s3://scripts/etl.py" }' },
      { n: 8,  t: 'keyword', c: '}' },
      { n: 9,  t: 'blank' },
      { n: 10, t: 'string',  c: '# Raw JSON → Parquet · SQL analytics · BI dashboards' },
    ],
    tech: ['AWS S3', 'AWS Glue', 'Amazon Athena', 'QuickSight', 'Python'],
    highlights: [
      'Serverless ingestion pipeline storing raw Spotify data in S3',
      'AWS Glue ETL transforms JSON → query-optimized Parquet',
      'Athena SQL analytics + QuickSight interactive dashboards',
    ],
    description: 'End-to-end serverless data pipeline ingesting Spotify streaming data at scale. Raw JSON lands in S3, AWS Glue ETL transforms it into structured Parquet in the Glue Data Catalog, and Amazon Athena + QuickSight power interactive BI dashboards.',
    github: '#',
    live: '#',
  },
];

// ─── SYNTAX COLORS ────────────────────────────────────────────────────────────
const tokenColor = {
  comment: '#6b7280',
  keyword: '#93c5fd',
  def:     '#fdba74',
  fn:      '#fde68a',
  args:    '#d1fae5',
  indent:  '#e2e8f0',
  string:  '#86efac',
  blank:   '',
};

// ─── GLASS HELPER ─────────────────────────────────────────────────────────────
const glass = (opacity = 0.45, blur = 20) => ({
  background: `rgba(10,10,14,${opacity})`,
  backdropFilter: `blur(${blur}px) saturate(1.5)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(1.5)`,
});

// ─── CODE LINE ────────────────────────────────────────────────────────────────
const CodeLine = ({ line, delay }) => {
  const mono = "'JetBrains Mono', monospace";
  return (
    <motion.div
      className="flex items-baseline gap-4 leading-6"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.04, duration: 0.25 }}
    >
      <span className="w-6 shrink-0 text-right text-[10px] select-none" style={{ color: '#374151', fontFamily: mono }}>
        {line.n}
      </span>
      {line.t === 'blank' ? (
        <span className="text-xs">&nbsp;</span>
      ) : line.t === 'def' ? (
        <span className="text-xs" style={{ fontFamily: mono }}>
          <span style={{ color: tokenColor.keyword }}>{line.c}</span>
          <span style={{ color: tokenColor.fn }}>{line.fn}</span>
          {line.args && <span style={{ color: tokenColor.args }}>({line.args})</span>}
          {line.args === '' && <span style={{ color: '#94a3b8' }}> {'{'}</span>}
        </span>
      ) : line.t === 'keyword' ? (
        <span className="text-xs" style={{ fontFamily: mono }}>
          <span style={{ color: tokenColor.keyword }}>{line.c}</span>
          {line.rest && <span style={{ color: tokenColor.indent }}>{line.rest}</span>}
        </span>
      ) : (
        <span className="text-xs" style={{ color: tokenColor[line.t], fontFamily: mono }}>
          {line.c}
        </span>
      )}
    </motion.div>
  );
};

// ─── FILE TAB ─────────────────────────────────────────────────────────────────
const FileTab = ({ project, isOpen, onClick, idx }) => {
  const extColor = {
    python:    '#F59E0B',
    java:      '#F97316',
    terraform: '#818CF8',
    json:      '#FBBF24',
  };
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center gap-2.5 px-4 py-2.5 text-left w-full group outline-none"
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      {isOpen && (
        <motion.div
          layoutId="file-active"
          className="absolute inset-0 rounded-lg"
          style={{ background: project.accentDim, border: `1px solid ${project.accent}33` }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        />
      )}
      <div className="relative z-10 flex items-center gap-2.5 w-full">
        {isOpen
          ? <FolderOpen size={14} style={{ color: project.accent }} />
          : <Folder size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
        }
        <span
          className="text-xs flex-1 truncate transition-colors"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: isOpen ? '#f1f5f9' : 'rgba(255,255,255,0.35)',
          }}
        >
          {project.filename}
        </span>
        <span
          className="text-[9px] font-bold px-1.5 py-0.5 rounded"
          style={{
            background: extColor[project.type] + '22',
            color: extColor[project.type],
            fontFamily: "'JetBrains Mono', monospace",
            border: `1px solid ${extColor[project.type]}33`,
          }}
        >
          .{project.type === 'python' ? 'py' : project.type === 'java' ? 'java' : project.type === 'terraform' ? 'tf' : 'json'}
        </span>
      </div>
    </motion.button>
  );
};

// ─── HIGHLIGHT DOT ────────────────────────────────────────────────────────────
const HighlightRow = ({ text, accent, delay }) => (
  <motion.div
    className="flex items-start gap-2"
    initial={{ opacity: 0, x: -6 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.22 }}
  >
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
    <span className="text-[11px] text-white/50 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {text}
    </span>
  </motion.div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Projects = () => {
  useGoogleFonts();
  const [openId, setOpenId] = useState(projects[0].id);
  const [termLines, setTermLines] = useState([]);
  const termRef = useRef(null);

  const active = projects.find((p) => p.id === openId);

  useEffect(() => {
    const msgs = [
      `$ open ./projects/${active.filename}`,
      `> parsing ${active.type} syntax...`,
      `> dependencies resolved ✓`,
      `> status: ${active.status}`,
    ];
    setTermLines([]);
    msgs.forEach((m, i) => {
      setTimeout(() => {
        setTermLines((prev) => [...prev, m]);
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
      }, i * 180);
    });
  }, [openId]);

  return (
    <section
      id="projects"
      className="py-28 px-6 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${active.accent}0A 0%, transparent 70%)` }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-5 text-[10px] font-bold tracking-[0.14em] uppercase"
              style={{
                ...glass(0.3, 12),
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.3)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <Terminal size={10} />
              ~/hari/projects
            </div>
            <h2
              className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
            >
              SELECTED
              <br />
              <span style={{ color: active.accent, transition: 'color 0.5s ease', textShadow: `0 0 80px ${active.accent}44` }}>
                WORK
              </span>
            </h2>
          </div>
          {/* <p className="text-sm text-white/30 max-w-xs leading-relaxed mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Open a file to inspect the source. Click any project to explore its implementation.
          </p> */}
        </div>

        {/* ── IDE Shell ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            ...glass(0.38, 32),
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: `
              0 40px 120px rgba(0,0,0,0.38),
              0 0 0 1px rgba(255,255,255,0.05),
              0 0 80px ${active.accent}0D,
              inset 0 1px 0 rgba(255,255,255,0.07)
            `,
            transition: 'box-shadow 0.6s ease',
          }}
        >

          {/* Title Bar */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-b"
            style={{ ...glass(0.55, 16), borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span
              className="text-[11px] text-white/20 flex-1 text-center"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              hari-dev — VS Code — {active.filename}
            </span>
            <Code2 size={13} className="text-white/15" />
          </div>

          <div className="flex" style={{ minHeight: '520px' }}>

            {/* ── Sidebar ── */}
            <div
              className="hidden md:flex flex-col w-52 shrink-0 border-r py-4 px-2 gap-1"
              style={{ ...glass(0.5, 16), borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <p
                className="text-[9px] uppercase tracking-widest text-white/20 px-4 mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                EXPLORER
              </p>
              <div className="flex items-center gap-2 px-4 py-1.5 mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                <ChevronRight size={12} />
                <span className="text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>projects/</span>
              </div>
              {projects.map((p, i) => (
                <FileTab
                  key={p.id}
                  project={p}
                  isOpen={openId === p.id}
                  onClick={() => setOpenId(p.id)}
                  idx={i}
                />
              ))}
            </div>

            {/* ── Editor area ── */}
            <div className="flex flex-col flex-1 min-w-0">

              {/* Tab bar */}
              <div
                className="flex gap-0 overflow-x-auto border-b"
                style={{ ...glass(0.5, 16), borderColor: 'rgba(255,255,255,0.05)' }}
              >
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setOpenId(p.id)}
                    className="shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs border-r transition-colors relative"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      borderColor: 'rgba(255,255,255,0.05)',
                      color: openId === p.id ? '#f1f5f9' : 'rgba(255,255,255,0.25)',
                      background: openId === p.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                      borderTop: openId === p.id ? `2px solid ${p.accent}` : '2px solid transparent',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: openId === p.id ? p.accent : 'rgba(255,255,255,0.15)' }}
                    />
                    {p.filename}
                  </button>
                ))}
              </div>

              {/* Code view */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="flex-1 p-6 overflow-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: 'rgba(6,6,10,0.28)' }}
                >
                  <div className="flex flex-col gap-1">
                    {active.lines.map((line, i) => (
                      <CodeLine key={i} line={line} delay={i} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom panel ── */}
          <div
            className="border-t grid grid-cols-1 md:grid-cols-2"
            style={{ ...glass(0.55, 20), borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {/* Terminal */}
            <div className="border-r" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div
                className="flex items-center gap-2 px-4 py-2 border-b text-[10px] uppercase tracking-widest text-white/20"
                style={{ borderColor: 'rgba(255,255,255,0.05)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Terminal size={10} />
                terminal
              </div>
              <div
                ref={termRef}
                className="p-4 h-36 overflow-y-auto flex flex-col gap-1"
                style={{ scrollbarWidth: 'none' }}
              >
                <AnimatePresence>
                  {termLines.map((line, i) => (
                    <motion.p
                      key={i}
                      className="text-[11px]"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: line.startsWith('$') ? active.accent : line.includes('✓') ? '#4ade80' : 'rgba(255,255,255,0.3)',
                      }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                  {/* Key highlights below terminal lines */}
                  {termLines.length === 4 && (
                    <motion.div
                      className="mt-3 flex flex-col gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        // key outcomes
                      </p>
                      {active.highlights.map((h, i) => (
                        <HighlightRow key={i} text={h} accent={active.accent} delay={i * 0.08} />
                      ))}
                    </motion.div>
                  )}
                  <motion.span
                    className="inline-block w-2 h-3 mt-1"
                    style={{ background: active.accent }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Project metadata */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="p-5 flex flex-col justify-between gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3
                      className="text-xl font-black text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                    >
                      {active.title}
                    </h3>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                      style={{
                        color: active.statusColor,
                        borderColor: active.statusColor + '55',
                        background: active.statusColor + '12',
                        fontFamily: "'JetBrains Mono', monospace",
                        animation: 'pulse 2s infinite',
                      }}
                    >
                      ● {active.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/35 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {active.category}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {active.description}
                  </p>
                </div>

                {/* Tech + actions */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {active.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-2 py-0.5 rounded"
                        style={{
                          background: active.accentDim,
                          color: active.accent,
                          border: `1px solid ${active.accent}33`,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={active.github}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold"
                      style={{
                        ...glass(0.3, 10),
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                      whileHover={{ scale: 1.04, color: '#fff' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Github size={12} />
                      src
                    </motion.a>
                    <motion.a
                      href={active.live}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold text-black"
                      style={{
                        background: active.accent,
                        fontFamily: "'JetBrains Mono', monospace",
                        boxShadow: `0 0 16px ${active.accent}55`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink size={12} />
                      live
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-1.5 text-[10px]"
            style={{
              background: active.accent,
              color: '#000',
              fontFamily: "'JetBrains Mono', monospace",
              transition: 'background 0.5s ease',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Zap size={9} /> {active.type.toUpperCase()}</span>
              <span className="opacity-60">{active.filename}</span>
            </div>
            <div className="flex items-center gap-4 opacity-70">
              <span>{active.lines.filter(l => l.t !== 'blank').length} lines</span>
              <span>UTF-8</span>
              <span>LF</span>
            </div>
          </div>
        </div>

        {/* Mobile project selector */}
        <div className="md:hidden mt-6 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {projects.map((p) => (
            <motion.button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                ...glass(0.35, 12),
                border: `1px solid ${openId === p.id ? p.accent + '55' : 'rgba(255,255,255,0.07)'}`,
                color: openId === p.id ? p.accent : 'rgba(255,255,255,0.3)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FolderOpen size={12} />
              {p.filename}
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;