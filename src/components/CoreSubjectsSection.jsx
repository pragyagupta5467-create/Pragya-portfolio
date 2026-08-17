import React from 'react';
import { BookOpen, Layers, Cpu, Database, Network, Code2, Layout, Boxes } from 'lucide-react';

export function CoreSubjectsSection() {
  const csFundamentals = [
    { title: 'Data Structures & Algorithms', icon: Code2 },
    { title: 'Object-Oriented Programming (OOP)', icon: Boxes },
    { title: 'Database Management Systems (DBMS)', icon: Database },
    { title: 'Operating Systems (OS)', icon: Cpu },
    { title: 'Computer Networks (CN)', icon: Network },
    { title: 'Software Engineering', icon: BookOpen }
  ];

  const designSubjects = [
    { title: 'System Design', icon: Layers },
    { title: 'Low-Level Design (LLD)', icon: Layout },
    { title: 'High-Level Design (HLD)', icon: Boxes }
  ];

  return (
    <section id="core-subjects" className="py-16 px-6 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Core Computer Science & Design</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Academic Fundamentals & Architectural Knowledge</p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Computer Science Fundamentals (Spans 7 cols) */}
          <div className="md:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Computer Science Fundamentals
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {csFundamentals.map((subject, idx) => {
                const IconComponent = subject.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 hover:border-purple-500/40 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{subject.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Design (Spans 5 cols) */}
          <div className="md:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Software Design
            </h3>
            <div className="space-y-3">
              {designSubjects.map((subject, idx) => {
                const IconComponent = subject.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 hover:border-blue-500/40 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{subject.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoreSubjectsSection;
