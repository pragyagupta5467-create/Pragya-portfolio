import React, { useState, useEffect } from 'react';
import { codingProfilesConfig } from '../data/codingProfiles';
import CodingProfileCard from './CodingProfileCard';
import { fetchAllCodingProfilesStats } from '../services/codingClientService';
import { Code2 } from 'lucide-react';

export default function CodingProfilesSection() {
  const [statsData, setStatsData] = useState({
    leetcode: null,
    gfg: null,
    codechef: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      setIsLoading(true);
      const res = await fetchAllCodingProfilesStats();
      if (isMounted) {
        if (res) {
          setStatsData({
            leetcode: res.leetcode || null,
            gfg: res.gfg || null,
            codechef: res.codechef || null
          });
        }
        setIsLoading(false);
      }
    }
    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="coding-profiles" className="py-20 px-6 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>Problem Solving & Coding Practice</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Coding Profiles
          </h2>
          <p className="text-slate-400 text-sm">
            Active problem-solving presence across LeetCode, GeeksforGeeks, and CodeChef.
          </p>
        </div>

        {/* Profile Grid - Exactly 3 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingProfilesConfig.map((config) => {
            const stats = statsData[config.id];
            return (
              <CodingProfileCard
                key={config.id}
                config={config}
                stats={stats}
                isLoading={isLoading}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
