import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Star, Trophy } from 'lucide-react';

export default function CodingProfileCard({ config, stats }) {
  // Use confirmed displayRating from config or verified live stats rating
  const ratingText = config.displayRating || (stats && stats.success && stats.rating ? `Rating: ${stats.rating}` : null);
  const username = (stats && stats.username) || config.username;
  const profileUrl = (stats && stats.profileUrl) || config.profileUrl;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all hover:border-purple-500/40"
    >
      <div>
        {/* Header Platform & Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {config.platform}
              </h3>
              {username && (
                <p className="text-xs font-mono text-slate-400">@{username}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {config.description}
        </p>

        {/* Confirmed Rating Badge (LeetCode Rating: 1700 / CodeChef Rating: 2★) */}
        {ratingText && (
          <div className="mb-5 p-3 rounded-xl bg-slate-950/70 border border-purple-500/30 text-xs flex items-center gap-2 font-mono text-purple-300 shadow-sm">
            <Star className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">{ratingText}</span>
          </div>
        )}
      </div>

      {/* View Profile Button */}
      <div className="pt-4 border-t border-slate-800/80">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-100 font-semibold text-xs transition hover:border-purple-500/50 min-h-[44px]"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
        </a>
      </div>
    </motion.div>
  );
}
