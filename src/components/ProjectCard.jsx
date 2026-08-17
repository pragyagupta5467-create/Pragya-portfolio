import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, CheckCircle2, ExternalLink, UserCheck, X, Target, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function ProjectCard({ project, onExplain }) {
  const [galleryIndex, setGalleryIndex] = useState(null); // null if closed, number if open

  const activeGalleryItem = project.gallery && galleryIndex !== null ? project.gallery[galleryIndex] : null;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (!project.gallery) return;
    setGalleryIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (!project.gallery) return;
    setGalleryIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md transition-all hover:border-purple-500/40"
    >
      <div>
        {/* Category & Subtitle Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-purple-300">
            {project.category}
          </span>
          {project.subtitle && (
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
              {project.subtitle}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
          {project.name}
        </h3>
        <p className="text-xs font-medium text-slate-400 mb-3">{project.tagline}</p>

        {/* Role Highlight if present */}
        {project.role && (
          <div className="mb-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
            <span className="font-semibold text-purple-300 block mb-1 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
              My Role: {project.role}
            </span>
            {project.roleContributions && (
              <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px] mt-1 pl-1">
                {project.roleContributions.slice(0, 3).map((contrib, idx) => (
                  <li key={idx}>{contrib}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Goal of the Project if present */}
        {project.goal && (
          <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
            <span className="font-semibold text-purple-400 block mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              Goal of the Project:
            </span>
            <p className="leading-relaxed text-[11px] text-slate-300">{project.goal}</p>
          </div>
        )}

        {/* COMPACT PROJECT GALLERY (3 Equal Clean Cards with Captions) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Project Gallery (Click to view full photo)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {project.gallery.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => setGalleryIndex(idx)}
                  className="group/img relative flex flex-col justify-between p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer overflow-hidden text-left h-28"
                >
                  <div className="h-16 w-full rounded bg-slate-950 flex items-center justify-center overflow-hidden mb-1 p-0.5 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/90 text-purple-300 border border-purple-500/40">
                        View
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-200 group-hover/img:text-purple-300 transition-colors line-clamp-1 block text-center">
                    {item.caption || item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Pill List */}
        <div className="mb-5">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Key Highlights:</span>
          <div className="grid grid-cols-2 gap-1.5">
            {project.features.slice(0, 6).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          onClick={() => onExplain(project)}
          className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
        >
          <Bot className="w-4 h-4 text-purple-200" />
          <span>View Project</span>
        </button>

        {/* Live Demo Button */}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-semibold text-xs transition-all shadow-md"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>
        )}
      </div>

      {/* GALLERY LIGHTBOX MODAL WITH PREV / NEXT / CLOSE CONTROLS */}
      <AnimatePresence>
        {activeGalleryItem && (
          <div
            onClick={() => setGalleryIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[88vh] p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {activeGalleryItem.title}
                  </h4>
                  <span className="text-[11px] font-mono text-purple-400">
                    {project.name} • Photo {galleryIndex + 1} of {project.gallery.length}
                  </span>
                </div>
                <button
                  onClick={() => setGalleryIndex(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Viewport View (object-contain aspect ratio preserved) */}
              <div className="relative flex-1 overflow-hidden flex items-center justify-center p-2 bg-slate-950 rounded-xl border border-slate-800 min-h-[300px]">
                <img
                  src={activeGalleryItem.image}
                  alt={activeGalleryItem.title}
                  className="max-h-[68vh] max-w-full w-auto h-auto object-contain mx-auto rounded-lg shadow-lg"
                />

                {/* Multi-image Prev / Next Controls */}
                {project.gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-purple-600 text-white transition shadow-lg cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-purple-600 text-white transition shadow-lg cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  {activeGalleryItem.caption}
                </span>
                <button
                  onClick={() => setGalleryIndex(null)}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
