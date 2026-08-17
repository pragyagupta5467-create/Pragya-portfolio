import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Clock } from 'lucide-react';

export default function CertificateModal({ certificate, isOpen, onClose }) {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-purple-500/30 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl text-slate-100 z-10 max-h-[90vh] flex flex-col justify-between"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{certificate.title}</h3>
                <p className="text-xs text-slate-400 font-medium">{certificate.issuer}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Full Certificate Image Lightbox */}
          <div className="relative mb-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 p-4 text-center flex-1 flex items-center justify-center min-h-[300px]">
            {certificate.image && !imageError ? (
              <img
                src={certificate.image}
                alt={certificate.title}
                onError={() => setImageError(true)}
                className="max-h-[60vh] w-full object-contain mx-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="p-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Award className="w-12 h-12" />
                </div>
                <div className="max-w-md">
                  <h4 className="text-lg font-bold text-white mb-1">{certificate.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">{certificate.issuer}</p>
                  <p className="text-xs font-mono text-purple-300">
                    Image path: src/assets/certificates/{certificate.filename}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Metadata & Close Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-4 text-slate-300 font-mono">
              {certificate.date && (
                <span className="flex items-center gap-1.5 text-purple-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {certificate.date}
                </span>
              )}
              {certificate.duration && (
                <span className="flex items-center gap-1.5 text-blue-300">
                  <Clock className="w-4 h-4 text-blue-400" />
                  {certificate.duration}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
