import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Volume2,
  Sparkles,
  Layers,
  Wand2,
  Award,
  Code2
} from 'lucide-react';
import {
  generateProjectExplanation,
  generateCertificationExplanation,
  analyzeCodingJourney
} from '../services/aiService';
import { voiceService } from '../services/voiceService';

export default function AIExplainerModal({ data, mode = 'project', isOpen, onClose }) {
  const [explanation, setExplanation] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioMode, setPortfolioMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Voice playback state
  const [voiceState, setVoiceState] = useState({
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 30,
    formattedTime: '00:00',
    formattedDuration: '00:30',
  });

  const textIntervalRef = useRef(null);

  // Subscribe to voiceService updates
  useEffect(() => {
    voiceService.subscribe((state) => {
      setVoiceState(state);
    });

    return () => {
      voiceService.stop();
    };
  }, []);

  // Fetch or re-generate explanation when item, mode, or portfolioMode changes
  useEffect(() => {
    if (isOpen && data) {
      loadExplanation();
    } else {
      voiceService.stop();
      setExplanation('');
      setDisplayedText('');
    }
  }, [isOpen, data, mode, portfolioMode]);

  const loadExplanation = async () => {
    setIsLoading(true);
    voiceService.stop();
    setDisplayedText('');
    
    try {
      let result = '';
      if (mode === 'certification') {
        result = await generateCertificationExplanation(data);
      } else if (mode === 'coding-journey') {
        result = await analyzeCodingJourney(data);
      } else {
        result = await generateProjectExplanation(data, portfolioMode);
      }

      setExplanation(result);
      setIsLoading(false);
      animateTyping(result);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // Typing animation effect
  const animateTyping = (text) => {
    if (textIntervalRef.current) clearInterval(textIntervalRef.current);
    let i = 0;
    setDisplayedText('');
    textIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(textIntervalRef.current);
        // Automatically start speaking once generated
        voiceService.speak(text);
      }
    }, 15);
  };

  const handleToggleVoice = () => {
    if (voiceState.isPlaying) {
      voiceService.pause();
    } else if (voiceState.isPaused) {
      voiceService.resume();
    } else {
      voiceService.speak(explanation || displayedText);
    }
  };

  const handleReplay = () => {
    voiceService.replay(explanation || displayedText);
  };

  const handleCopy = () => {
    if (explanation) {
      navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !data) return null;

  const progressPercent = voiceState.duration > 0 ? (voiceState.currentTime / voiceState.duration) * 100 : 0;

  // Title formatting depending on mode
  const titleName = mode === 'certification' 
    ? data.title 
    : mode === 'coding-journey'
      ? 'Competitive Programming Journey' 
      : data.name;

  const titleCategory = mode === 'certification'
    ? data.category
    : mode === 'coding-journey'
      ? 'Algorithmic Skill Analysis'
      : data.category;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-purple-500/30 bg-slate-900/90 p-6 shadow-2xl shadow-purple-900/40 backdrop-blur-xl text-slate-100 z-10"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                {mode === 'certification' ? <Award className="w-5 h-5 animate-pulse" /> : mode === 'coding-journey' ? <Code2 className="w-5 h-5 animate-pulse" /> : <Bot className="w-5 h-5 animate-pulse" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {mode === 'certification' ? 'AI Certification Explainer' : mode === 'coding-journey' ? 'AI Coding Journey Analysis' : 'AI Project Explainer'}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                    30-Second Overview
                  </span>
                </h3>
                <p className="text-xs text-slate-300 font-medium">Pragya's AI Portfolio Assistant</p>
                <p className="text-[11px] text-slate-400">Explore my projects, skills & technical journey</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mode Toggle Switch (Only for Project Mode) */}
              {mode === 'project' && (
                <button
                  onClick={() => setPortfolioMode(!portfolioMode)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                    portfolioMode
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-md shadow-purple-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                  title="Toggle Portfolio Mode for deep technical architecture breakdown"
                >
                  <Layers className={`w-3.5 h-3.5 ${portfolioMode ? 'text-purple-300' : 'text-slate-400'}`} />
                  <span>Portfolio Mode</span>
                  <div
                    className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                      portfolioMode ? 'bg-purple-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-white transition-transform ${
                        portfolioMode ? 'translate-x-3' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Item Title Banner */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
                {titleName}
              </h2>
              {titleCategory && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                  {titleCategory}
                </span>
              )}
            </div>
          </div>

          {/* Explanation Text Box */}
          <div className="relative min-h-[140px] rounded-xl border border-slate-800 bg-slate-950/60 p-4 mb-5 shadow-inner">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-purple-400">
                <Wand2 className="w-8 h-8 animate-spin" />
                <p className="text-sm font-mono animate-pulse">Generating AI Explanation...</p>
              </div>
            ) : (
              <div className="text-sm text-slate-200 leading-relaxed font-sans">
                <p className="inline">"{displayedText}"</p>
                {displayedText.length < explanation.length && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-purple-400 animate-pulse align-middle" />
                )}
              </div>
            )}
          </div>

          {/* Audio Telemetry & Player Controls */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 mb-5">
            <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Volume2 className={`w-4 h-4 ${voiceState.isPlaying ? 'text-purple-400 animate-bounce' : 'text-slate-500'}`} />
                <span>{voiceState.isPlaying ? 'Voice Active' : voiceState.isPaused ? 'Voice Paused' : 'Voice Ready'}</span>
              </div>
              <div>
                <span>{voiceState.formattedTime}</span> / <span>{voiceState.formattedDuration}</span>
              </div>
            </div>

            {/* Progress Bar & Waveform */}
            <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Audio Wave Visualizer Bars */}
            <div className="flex items-center justify-center gap-1 h-5 mb-2">
              {[40, 70, 30, 90, 50, 80, 40, 100, 60, 30, 80, 50, 90, 40].map((h, idx) => (
                <motion.div
                  key={idx}
                  className={`w-1 rounded-full ${voiceState.isPlaying ? 'bg-purple-400' : 'bg-slate-700'}`}
                  animate={voiceState.isPlaying ? { height: [`${h / 4}%`, `${h}%`, `${h / 4}%`] } : { height: '20%' }}
                  transition={voiceState.isPlaying ? { repeat: Infinity, duration: 0.6, delay: idx * 0.05 } : {}}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Play/Pause & Replay Group */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleVoice}
                disabled={isLoading || !displayedText}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-purple-900/30 transition disabled:opacity-50"
              >
                {voiceState.isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Voice
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> {voiceState.isPaused ? 'Resume Voice' : 'Listen to AI'}
                  </>
                )}
              </button>

              <button
                onClick={handleReplay}
                disabled={isLoading || !displayedText}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition disabled:opacity-50"
                title="Replay Voice"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={isLoading || !explanation}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition disabled:opacity-50"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>

              <button
                onClick={loadExplanation}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-medium transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Regenerate
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
