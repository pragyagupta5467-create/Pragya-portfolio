/**
 * Modular Voice Synthesizer service wrapping Browser Web Speech API
 */
class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.utterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentTime = 0;
    this.duration = 30; // default estimated duration in seconds
    this.timerInterval = null;
    this.onStateChangeCallback = null;
  }

  isSupported() {
    return !!this.synth;
  }

  /**
   * Estimates duration in seconds based on text length and 150 WPM speech rate
   */
  estimateDuration(text) {
    if (!text) return 30;
    const words = text.trim().split(/\s+/).length;
    const estimatedSecs = Math.max(15, Math.min(60, Math.round((words / 150) * 60)));
    return estimatedSecs;
  }

  speak(text, options = {}) {
    if (!this.synth) {
      console.warn('Web Speech API is not supported in this browser environment.');
      return;
    }

    // Stop any active utterance first
    this.stop();

    this.duration = this.estimateDuration(text);
    this.currentTime = 0;
    this.isPlaying = true;
    this.isPaused = false;

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = 1.0;
    this.utterance.pitch = 1.0;
    this.utterance.volume = 1.0;

    // Pick best English voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Zira') || v.name.includes('David')) && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) {
      this.utterance.voice = preferredVoice;
    }

    // Word boundary event listener for precise progress calculation
    this.utterance.onboundary = (event) => {
      if (event.name === 'word' && text.length > 0) {
        const ratio = Math.min(1, event.charIndex / text.length);
        this.currentTime = Math.round(ratio * this.duration);
        this.notifyChange();
      }
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentTime = this.duration;
      this.clearInterval();
      this.notifyChange();
      if (options.onEnd) options.onEnd();
    };

    this.utterance.onerror = (err) => {
      console.error('Speech synthesis error:', err);
      this.isPlaying = false;
      this.isPaused = false;
      this.clearInterval();
      this.notifyChange();
      if (options.onError) options.onError(err);
    };

    this.synth.speak(this.utterance);

    // Fallback ticker for UI progress updates
    this.startTicker();
    this.notifyChange();
  }

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.isPlaying = false;
      this.clearInterval();
      this.notifyChange();
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.isPlaying = true;
      this.startTicker();
      this.notifyChange();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentTime = 0;
    this.clearInterval();
    this.notifyChange();
  }

  replay(text, options = {}) {
    this.stop();
    setTimeout(() => {
      this.speak(text, options);
    }, 100);
  }

  startTicker() {
    this.clearInterval();
    this.timerInterval = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        this.currentTime = Math.min(this.duration, this.currentTime + 1);
        this.notifyChange();
        if (this.currentTime >= this.duration) {
          this.clearInterval();
        }
      }
    }, 1000);
  }

  clearInterval() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  subscribe(callback) {
    this.onStateChangeCallback = callback;
  }

  notifyChange() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        currentTime: this.currentTime,
        duration: this.duration,
        formattedTime: this.formatTime(this.currentTime),
        formattedDuration: this.formatTime(this.duration),
      });
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

export const voiceService = new VoiceService();
