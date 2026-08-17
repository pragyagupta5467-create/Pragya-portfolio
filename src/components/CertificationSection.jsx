import React, { useRef } from 'react';
import { certificationsData } from '../data/certifications';
import CertificationCard from './CertificationCard';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CertificationSection({ onViewCertificate }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // Duplicate array for 60fps infinite marquee looping without a jump
  const marqueeCertificates = [...certificationsData, ...certificationsData];

  return (
    <section id="certifications" className="py-20 px-6 border-t border-slate-900 bg-slate-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Verified Learning & Achievements</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Certificates
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Certifications, achievements and learning experiences that showcase my technical growth.
            </p>
          </div>

          {/* Desktop Navigation Scroll Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 60fps Continuous Infinite Horizontal Marquee Track */}
        <div
          ref={scrollContainerRef}
          className="relative w-full overflow-hidden py-2"
        >
          {/* Subtle Side Fade Gradients for Glassmorphism Polish */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 hidden sm:block" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 hidden sm:block" />

          <div className="animate-marquee-track flex items-stretch gap-6">
            {marqueeCertificates.map((cert, idx) => (
              <div key={`${cert.id}-${idx}`} className="shrink-0 w-[290px] sm:w-[340px]">
                <CertificationCard
                  certificate={cert}
                  onView={onViewCertificate}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
