import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, User, Sparkles } from 'lucide-react';

/**
 * Single Vertical Connected Timeline Component
 * About Me (Left) -> Education (Right) -> Campus Mantri (Left) -> Student Focus (Right)
 */
export default function ConnectedProfileTree({ gfgOptionsData, onOpenGfgItem, startSequence = true }) {
  // Sequenced reveal animation variants
  const nodeVariantsLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: (delay) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' }
    })
  };

  const nodeVariantsRight = {
    hidden: { opacity: 0, x: 30 },
    visible: (delay) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' }
    })
  };

  return (
    <div className="relative max-w-5xl mx-auto py-16 px-4 sm:px-6">
      {/* Central Stick Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          My Academic Profile
        </h2>
        <p className="text-xs font-mono text-purple-400 mt-1">
          Connected Timeline • IIIT Bhopal MCA Journey
        </p>
      </div>

      {/* TIMELINE CONTAINER WITH CENTRAL VERTICAL STICK */}
      <div className="relative">
        {/* CENTRAL VERTICAL STICK (Desktop: Center x=50%, Mobile: Left x=18px) */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500 via-emerald-500 via-purple-400 to-blue-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] z-10" />

        {/* ============================================================= */}
        {/* NODE 1: ABOUT ME (LEFT SIDE ON DESKTOP - RIGHT BELOW HERO) */}
        {/* ============================================================= */}
        <div id="about" className="relative grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Desktop Central Node Circle */}
          <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-purple-400 shadow-md shadow-purple-400/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-300 animate-ping"></div>
            </div>
          </div>

          {/* Mobile Node Circle */}
          <div className="md:hidden absolute left-2.5 top-6 z-20 w-3.5 h-3.5 rounded-full bg-purple-400 border-2 border-slate-950 shadow-md"></div>

          {/* LEFT COLUMN CARD */}
          <motion.div
            custom={0.2}
            variants={nodeVariantsLeft}
            initial="hidden"
            animate={startSequence ? "visible" : "hidden"}
            className="pl-8 md:pl-0 md:pr-6"
          >
            <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 p-6 sm:p-7 backdrop-blur-md space-y-3.5 text-slate-300 text-sm leading-relaxed shadow-xl relative overflow-hidden group hover:border-purple-500/60 transition-all">
              <div className="flex items-center gap-2.5 text-purple-400 mb-1">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold">
                  01 • About Me
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">About Me</h2>

              <p>
                Hi, I'm <strong className="text-white">Pragya Gupta</strong>, an <strong className="text-purple-300">MCA student at IIIT Bhopal</strong> and active <strong className="text-emerald-300">GeeksforGeeks Campus Mantri 2026</strong>. I am passionate about Software Development, Artificial Intelligence, and building clean, practical applications.
              </p>
              <p>
                My technical journey is centered around <strong className="text-purple-300">Data Structures & Algorithms in Java</strong>, coupled with exploring <strong className="text-purple-300">System Design (HLD & LLD)</strong> to craft clean, maintainable software architectures.
              </p>
              <p>
                My areas of interest span Full-Stack web development, Machine Learning, Deep Learning, Natural Language Processing (NLP), Generative AI, and emerging Agentic AI systems.
              </p>
              <p className="font-medium text-purple-200 border-l-2 border-purple-500 pl-3 py-1">
                As a student preparing for software engineering roles, I am dedicated to problem solving, continuous learning, and building robust software solutions.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN EMPTY SPACER FOR DESKTOP ZIG-ZAG */}
          <div className="hidden md:block" />
        </div>

        {/* ============================================================= */}
        {/* NODE 2: EDUCATION (RIGHT SIDE ON DESKTOP) */}
        {/* ============================================================= */}
        <div id="education" className="relative grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Desktop Central Node Circle */}
          <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-purple-500 shadow-md shadow-purple-500/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            </div>
          </div>

          {/* Mobile Node Circle */}
          <div className="md:hidden absolute left-2.5 top-6 z-20 w-3.5 h-3.5 rounded-full bg-purple-400 border-2 border-slate-950 shadow-md"></div>

          {/* LEFT COLUMN EMPTY SPACER FOR DESKTOP ZIG-ZAG */}
          <div className="hidden md:block" />

          {/* RIGHT COLUMN CARD */}
          <motion.div
            custom={0.6}
            variants={nodeVariantsRight}
            initial="hidden"
            animate={startSequence ? "visible" : "hidden"}
            className="pl-8 md:pl-6"
          >
            <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 p-6 backdrop-blur-md shadow-xl relative overflow-hidden group hover:border-purple-500/60 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5 text-purple-400">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold">
                    02 • Education
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                  2024 — Present
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                MCA — Master of Computer Applications
              </h3>
              <p className="text-sm font-semibold text-purple-200">
                Indian Institute of Information Technology (IIIT), Bhopal
              </p>
            </div>
          </motion.div>
        </div>

        {/* ============================================================= */}
        {/* NODE 3: GEEKSFORGEEKS CAMPUS MANTRI (LEFT SIDE ON DESKTOP) */}
        {/* ============================================================= */}
        <div className="relative grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Desktop Central Node Circle */}
          <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-500 shadow-md shadow-emerald-500/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            </div>
          </div>

          {/* Mobile Node Circle */}
          <div className="md:hidden absolute left-2.5 top-6 z-20 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-md"></div>

          {/* LEFT COLUMN CARD */}
          <motion.div
            custom={1.0}
            variants={nodeVariantsLeft}
            initial="hidden"
            animate={startSequence ? "visible" : "hidden"}
            className="pl-8 md:pl-0 md:pr-6"
          >
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 backdrop-blur-md shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest font-semibold">
                    03 • Campus Role
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  2026 — Present
                </span>
              </div>

              <h4 className="font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-emerald-300 transition-colors">
                GeeksforGeeks Campus Mantri
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Selected as a GeeksforGeeks Campus Mantri, contributing to the student developer community through technical awareness, engagement and campus activities.
              </p>

              {/* 3 Clickable Cards with Real Image Previews */}
              <div className="pt-3 border-t border-slate-800">
                <div className="grid grid-cols-3 gap-2.5">
                  {gfgOptionsData.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onOpenGfgItem(item)}
                      className="group/item relative flex flex-col justify-between p-2 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer text-center h-28 overflow-hidden"
                    >
                      <div className="h-16 w-full rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden mb-1 p-0.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain transition-transform group-hover/item:scale-105"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-200 group-hover/item:text-emerald-300 transition-colors line-clamp-1 block">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN EMPTY SPACER FOR DESKTOP ZIG-ZAG */}
          <div className="hidden md:block" />
        </div>

        {/* ============================================================= */}
        {/* NODE 4: STUDENT FOCUS & HIGHLIGHTS (RIGHT SIDE ON DESKTOP) */}
        {/* ============================================================= */}
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          {/* Desktop Central Node Circle */}
          <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-400 shadow-md shadow-blue-400/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </div>
          </div>

          {/* Mobile Node Circle */}
          <div className="md:hidden absolute left-2.5 top-6 z-20 w-3.5 h-3.5 rounded-full bg-blue-400 border-2 border-slate-950 shadow-md"></div>

          {/* LEFT COLUMN EMPTY SPACER FOR DESKTOP ZIG-ZAG */}
          <div className="hidden md:block" />

          {/* RIGHT COLUMN CARD */}
          <motion.div
            custom={1.4}
            variants={nodeVariantsRight}
            initial="hidden"
            animate={startSequence ? "visible" : "hidden"}
            className="pl-8 md:pl-6"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur-md shadow-xl relative overflow-hidden group hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-2.5 text-blue-400 mb-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-blue-300 uppercase tracking-widest font-semibold">
                  04 • Student Highlights
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">Student Focus & Highlights</h3>

              <div className="space-y-2.5">
                {[
                  { icon: '🎓', text: 'MCA Student @ IIIT Bhopal' },
                  { icon: '💻', text: 'Java & DSA Practice' },
                  { icon: '🏗️', text: 'System Design (HLD & LLD)' },
                  { icon: '🤖', text: 'AI/ML, GenAI & Agentic AI' },
                  { icon: '🏆', text: 'GeeksforGeeks Campus Mantri' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 hover:border-blue-500/40 transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
