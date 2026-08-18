import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from './data/projectsData';
import ProjectCard from './components/ProjectCard';
import CertificationSection from './components/CertificationSection';
import CodingProfilesSection from './components/CodingProfilesSection';
import CoreSubjectsSection from './components/CoreSubjectsSection';
import ContactSection from './components/ContactSection';
import ConnectedProfileTree from './components/ConnectedProfileTree';
import AIExplainerModal from './components/AIExplainerModal';
import CertificateModal from './components/CertificateModal';
import GfgGalleryModal from './components/GfgGalleryModal';
import TypingHeading from './components/TypingHeading';
import MeetPragyaAvatar from './components/MeetPragyaAvatar';
import ThemeToggle from './components/ThemeToggle';
import AnimatedDotBackground from './components/AnimatedDotBackground';
import {
  Terminal,
  Cpu,
  Mail,
  User,
  Code2,
  FileText,
  GraduationCap,
  Trophy,
  BadgeCheck,
  Package,
  Menu,
  X
} from 'lucide-react';
import './App.css';

// Direct ES module imports of the 3 actual GFG Campus Mantri images
import offerLetterImg from './assets/gfg-campus-mantri/photo_2026-08-17_12-36-16.jpg';
import welcomeKitImg from './assets/gfg-campus-mantri/photo_2026-08-17_12-36-21 - Copy.jpg';
import gfgOfficialIdImg from './assets/gfg-campus-mantri/photo_2026-08-17_12-38-30.jpg';

const gfgOptionsData = [
  {
    id: "offer-letter",
    title: "Offer Letter",
    icon: FileText,
    filename: "photo_2026-08-17_12-36-16.jpg",
    image: offerLetterImg,
    description: "Official GeeksforGeeks Campus Mantri selection / offer letter document."
  },
  {
    id: "gfg-id",
    title: "GFG Official ID",
    icon: BadgeCheck,
    filename: "photo_2026-08-17_12-38-30.jpg",
    image: gfgOfficialIdImg,
    description: "Official GeeksforGeeks Campus Mantri student ambassador ID card."
  },
  {
    id: "welcome-kit",
    title: "Welcome Kit",
    icon: Package,
    filename: "photo_2026-08-17_12-36-21 - Copy.jpg",
    image: welcomeKitImg,
    images: [welcomeKitImg],
    description: "Official GeeksforGeeks Campus Mantri welcome kit, t-shirt and goodies."
  }
];

function App() {
  // Theme state persistent in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark';
  });

  // Mobile menu drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modal states
  const [modalItem, setModalItem] = useState(null);
  const [modalMode, setModalMode] = useState('project'); // 'project', 'certification', 'coding-journey'
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Certificate preview modal
  const [selectedCertForPreview, setSelectedCertForPreview] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // GFG Gallery preview modal
  const [selectedGfgItem, setSelectedGfgItem] = useState(null);
  const [isGfgModalOpen, setIsGfgModalOpen] = useState(false);

  const handleExplainProject = (project) => {
    setModalItem(project);
    setModalMode('project');
    setIsExplainerOpen(true);
  };

  const handleExplainCertification = (cert) => {
    setModalItem(cert);
    setModalMode('certification');
    setIsExplainerOpen(true);
  };

  const handleAnalyzeCodingJourney = (profiles) => {
    setModalItem(profiles);
    setModalMode('coding-journey');
    setIsExplainerOpen(true);
  };

  const handleViewCertificate = (cert) => {
    setSelectedCertForPreview(cert);
    setIsPreviewModalOpen(true);
  };

  const handleOpenGfgItem = (item) => {
    setSelectedGfgItem(item);
    setIsGfgModalOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-purple-500 selection:text-white transition-colors duration-300 relative overflow-hidden ${
      theme === 'light' ? 'light bg-slate-50 text-slate-900' : 'dark bg-slate-950 text-slate-100'
    }`}>
      {/* Animated Floating Dot Matrix Background */}
      <AnimatedDotBackground theme={theme} />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-6 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-bold text-lg shadow-md shadow-purple-900/30 group-hover:scale-105 transition-transform">
              PG
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Pragya Gupta
              </span>
              <span className="block text-[11px] font-mono text-purple-400">MCA @ IIIT Bhopal</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <li>
              <a href="#hero" className="hover:text-purple-400 transition-colors">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-purple-400 transition-colors">About Me</a>
            </li>
            <li>
              <a href="#education" className="hover:text-purple-400 transition-colors">Education</a>
            </li>
            <li>
              <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            </li>
            <li>
              <a href="#core-subjects" className="hover:text-purple-400 transition-colors">Core Subjects</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            </li>
            <li>
              <a href="#certifications" className="hover:text-purple-400 transition-colors">Certificates</a>
            </li>
            <li>
              <a href="#coding-profiles" className="hover:text-purple-400 transition-colors">Coding Profiles</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </li>
          </ul>

          {/* Right Header Actions: Theme Toggle + Speech Avatar + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <MeetPragyaAvatar />

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 hover:text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile / Tablet Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-slate-800/80 mt-3 pt-3"
            >
              <ul className="flex flex-col gap-1 text-sm font-medium text-slate-300">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'About Me', href: '#about' },
                  { label: 'Education', href: '#education' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Core Subjects', href: '#core-subjects' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Certificates', href: '#certifications' },
                  { label: 'Coding Profiles', href: '#coding-profiles' },
                  { label: 'Contact', href: '#contact' }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2.5 px-4 rounded-xl hover:bg-purple-500/10 hover:text-purple-300 transition-colors min-h-[44px] flex items-center"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 sm:pt-16 pb-12 px-4 sm:px-6 border-b border-slate-900 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Student Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
              <span>MCA Student @ IIIT Bhopal (2024–Present)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GeeksforGeeks Campus Mantri</span>
            </div>
          </div>

          {/* Main Heading Initial Typing Animation */}
          <div className="text-center">
            <TypingHeading text="Hi, Pragya Gupta" onComplete={() => setShowSubtitle(true)} />
          </div>

          {/* Subtitle & Intro - smoothly displayed after typing completion */}
          <div className={`transition-opacity duration-700 ${showSubtitle ? 'opacity-100' : 'opacity-90'}`}>
            <p className="text-sm sm:text-lg md:text-xl font-semibold text-purple-300 dark:text-purple-200 mb-5 max-w-2xl mx-auto font-mono leading-relaxed">
              MCA Student @ IIIT Bhopal | Software Development | AI/ML Enthusiast
            </p>

            <p className="text-sm md:text-base text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Passionate software engineering student strengthening Data Structures & Algorithms in Java, 
              building full-stack web applications, exploring System Design (HLD/LLD), and developing Generative & Agentic AI projects.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#projects"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/30 transition hover:-translate-y-0.5 min-h-[44px]"
              >
                <Code2 className="w-4 h-4" />
                <span>View Projects</span>
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-xs transition hover:-translate-y-0.5 min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE VERTICAL CONNECTED ZIG-ZAG TIMELINE (About Me Left -> Education Right -> Campus Mantri Left -> Student Focus Right) */}
      <section className="border-t border-slate-900 bg-slate-950/60">
        <ConnectedProfileTree
          gfgOptionsData={gfgOptionsData}
          onOpenGfgItem={handleOpenGfgItem}
          startSequence={true}
        />
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Technical Skills</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Programming / Development',
                skills: ['Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
                color: 'border-purple-500/30 text-purple-400'
              },
              {
                title: 'DSA / Software Engineering',
                skills: [
                  'Data Structures & Algorithms',
                  'System Design',
                  'Low-Level Design (LLD)',
                  'High-Level Design (HLD)',
                  'Object-Oriented Programming',
                  'Problem Solving'
                ],
                color: 'border-blue-500/30 text-blue-400'
              },
              {
                title: 'AI / Machine Learning',
                skills: [
                  'Artificial Intelligence',
                  'Machine Learning',
                  'Deep Learning',
                  'Natural Language Processing (NLP)',
                  'Generative AI',
                  'Agentic AI'
                ],
                color: 'border-emerald-500/30 text-emerald-400'
              },
              {
                title: 'ML / Data Science Libraries',
                skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'PyTorch'],
                color: 'border-amber-500/30 text-amber-400'
              }
            ].map((cat, idx) => (
              <div key={idx} className={`rounded-xl border ${cat.color} bg-slate-900/60 p-5 shadow-lg`}>
                <h3 className="text-base font-semibold mb-3 text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Subjects Section */}
      <CoreSubjectsSection />

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm">
              Explore recent full-stack applications, ML systems, and software projects developed during my MCA coursework and self-directed learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExplain={handleExplainProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <CertificationSection
        onViewCertificate={handleViewCertificate}
        onExplainCertificate={handleExplainCertification}
      />

      {/* Coding Profiles Section */}
      <CodingProfilesSection
        onAnalyzeJourney={handleAnalyzeCodingJourney}
      />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-900 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 Pragya Gupta • MCA Student @ IIIT Bhopal</p>
      </footer>

      {/* AI Explainer Modal */}
      <AIExplainerModal
        data={modalItem}
        mode={modalMode}
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />

      {/* Certificate Image/Document Preview Modal */}
      <CertificateModal
        certificate={selectedCertForPreview}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />

      {/* GFG Real Documents / Swag Lightbox Modal */}
      <GfgGalleryModal
        item={selectedGfgItem}
        isOpen={isGfgModalOpen}
        onClose={() => setIsGfgModalOpen(false)}
      />
    </div>
  );
}

export default App;