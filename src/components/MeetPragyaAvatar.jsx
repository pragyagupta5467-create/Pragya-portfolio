import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, MessageCircle, X } from 'lucide-react';
import { voiceService } from '../services/voiceService';

export function MeetPragyaAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typedBadgeText, setTypedBadgeText] = useState("");
  const badgeFullText = "Hi 👋 I'm Pragya";

  const introductionText =
    "Hi, I'm Pragya Gupta. I'm an MCA student at IIIT Bhopal, passionate about software development, DSA, AI, and building practical projects.";

  // Initial subtle typing effect for badge
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= badgeFullText.length) {
        setTypedBadgeText(badgeFullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Listen to voice service state changes
  useEffect(() => {
    voiceService.subscribe(({ isPlaying }) => {
      setIsSpeaking(isPlaying);
    });
  }, []);

  const handleAvatarClick = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      // Speak introduction using Web Speech API
      voiceService.speak(introductionText, {
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
      setIsSpeaking(true);
    } else {
      voiceService.stop();
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
    } else {
      voiceService.speak(introductionText, {
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
      setIsSpeaking(true);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Interactive Avatar Trigger Button */}
      <button
        onClick={handleAvatarClick}
        className="group greeting-bar flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-medium shadow-md transition-all hover:scale-105 cursor-pointer"
        title="Click to meet Pragya and hear audio intro"
      >
        {/* Animated Avatar Icon */}
        <div className="greeting-bar-avatar relative w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm">
          <span>PG</span>
          <span className="greeting-bar-status-dot absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-950 animate-pulse"></span>
        </div>

        {/* Typed Badge Message */}
        <span className="greeting-bar-text font-mono font-semibold">
          {typedBadgeText}
          {typedBadgeText.length < badgeFullText.length && (
            <span className="greeting-bar-sparkle inline-block w-1 h-3 bg-current ml-0.5 animate-pulse" />
          )}
        </span>

        {/* Speaking / Audio Indicator */}
        {isSpeaking ? (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce"></span>
            <span className="w-1 h-4 bg-emerald-300 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </div>
        ) : (
          <Sparkles className="greeting-bar-sparkle w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
        )}
      </button>

      {/* Expanded Interactive Card Popover */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 sm:w-96 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-fadeIn backdrop-blur-xl">
          <div className="flex items-start justify-between mb-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                PG
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Pragya Gupta</h4>
                <p className="text-[10px] font-mono text-purple-400">MCA Student @ IIIT Bhopal</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleSpeech}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs transition cursor-pointer"
                title={isSpeaking ? 'Mute Speech' : 'Play Speech'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  voiceService.stop();
                  setIsSpeaking(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
            "{introductionText}"
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-purple-400" /> Web Speech Audio
            </span>
            <span className="text-purple-300">Student Intro</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetPragyaAvatar;
