import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, FileText, BadgeCheck, Trophy } from 'lucide-react';

export default function GfgGalleryModal({ item, isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when modal opens or item changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [item, isOpen]);

  if (!isOpen || !item || !item.image) return null;

  const imagesList = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : [item.image];

  const currentImage = imagesList[activeImageIndex] || item.image;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl text-slate-100 z-10 max-h-[92vh] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                {item.id === 'offer-letter' ? (
                  <FileText className="w-5 h-5" />
                ) : item.id === 'gfg-id' ? (
                  <BadgeCheck className="w-5 h-5" />
                ) : (
                  <Trophy className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{item.title}</h3>
                <p className="text-[11px] font-mono text-emerald-400">GeeksforGeeks Campus Mantri</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real Original Image Lightbox Viewport with object-contain & aspect ratio preserved */}
          <div className="relative mb-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2 sm:p-4 text-center flex-1 flex items-center justify-center min-h-[300px]">
            <img
              src={currentImage}
              alt={item.title}
              className="max-h-[72vh] max-w-full w-auto h-auto object-contain mx-auto rounded-lg shadow-lg"
            />

            {/* Gallery Navigation Controls for multi-image items */}
            {imagesList.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/85 border border-slate-700 text-white hover:bg-slate-800 transition shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/85 border border-slate-700 text-white hover:bg-slate-800 transition shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">
              {imagesList.length > 1
                ? `Image ${activeImageIndex + 1} of ${imagesList.length}`
                : item.title}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
