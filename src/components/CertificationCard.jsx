import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, FileText, Clock } from 'lucide-react';

export default function CertificationCard({ certificate, onView }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md transition-all hover:border-purple-500/40"
    >
      <div>
        {/* Certificate Image Thumbnail with object-contain */}
        <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 p-2 flex items-center justify-center group-hover:border-slate-700 transition-colors">
          {certificate.image && !imageError ? (
            <img
              src={certificate.image}
              alt={certificate.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-1.5">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-300">{certificate.issuer}</span>
              <span className="text-[10px] font-mono text-purple-300 mt-1">
                src/assets/certificates/{certificate.filename}
              </span>
            </div>
          )}
        </div>

        {/* Header Metadata */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-1.5">
            {certificate.title}
          </h3>
          <p className="text-xs text-slate-300 font-medium mb-1">
            {certificate.issuer}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            {certificate.date && (
              <span className="flex items-center gap-1 text-purple-300">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                {certificate.date}
              </span>
            )}
            {certificate.duration && (
              <span className="flex items-center gap-1 text-blue-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {certificate.duration}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* View Certificate Action Button */}
      <div className="pt-3 border-t border-slate-800/80 mt-2">
        <button
          onClick={() => onView(certificate)}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition cursor-pointer hover:border-purple-500/50"
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>View Certificate</span>
        </button>
      </div>
    </motion.div>
  );
}
