/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Circle,
  Heart,
  XCircle,
  Info,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  Sparkles,
  Search,
  Star,
  Trash2,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { DRUGS, LEGEND, getInteractionEvidence, Drug } from './data/drugData';
import { getInteractionExplanation, getDrugSummary } from './services/geminiService';
import pillHeroImg from './assets/pill-hero.png';

// --- Components ---

interface SearchableSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function SearchableSelect({ label, value, onChange, disabled, placeholder }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredDrugs = useMemo(() => {
    return DRUGS.filter(drug =>
      drug.name.toLowerCase().includes(search.toLowerCase()) ||
      drug.class.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const selectedDrug = useMemo(() => DRUGS.find(d => d.id === value), [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-xs font-semibold uppercase tracking-wider text-black/50 ml-1">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-5 py-4 text-left flex justify-between items-center focus:outline-none focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all disabled:opacity-50"
      >
        <span className={selectedDrug ? 'text-white font-medium' : 'text-white/40 font-medium'}>
          {selectedDrug ? selectedDrug.name : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-40 top-full left-0 right-0 mt-2 bg-[#000000] border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,1)] overflow-hidden backdrop-blur-3xl"
          >
            <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-white/5">
              <Search className="w-4 h-4 text-white/40" />
              <input
                autoFocus
                type="text"
                placeholder="Search drugs or classes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm py-1 text-white placeholder-white/30"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => {
                      onChange(drug.id);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex flex-col ${value === drug.id ? 'bg-white/5 border-l-2 border-white/50' : 'border-l-2 border-transparent'}`}
                  >
                    <span className="font-semibold text-sm text-white">{drug.name}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">{drug.class}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-white/40 text-sm italic font-medium">
                  No drugs found matching "{search}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Logos ---

/** Cyberpunk Night City pill hero with neon glow — CP2077 signature yellow */
function PillHeroLogo({ size = 32 }: { size?: number }) {
  const neon = '#FCE300'; // Cyberpunk 2077 yellow
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SeshGuard pill hero logo"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Soft outer glow */}
        <filter id="neon-outer" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Intense inner core glow */}
        <filter id="neon-core" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" result="coreBlur" />
          <feMerge>
            <feMergeNode in="coreBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow layer — soft outer bloom */}
      <g filter="url(#neon-outer)" stroke={neon} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
        <rect x="30" y="8" width="40" height="56" rx="20" />
        <line x1="30" y1="36" x2="70" y2="36" />
        <path d="M30 42 Q14 38 12 50" />
        <path d="M70 42 Q86 38 88 50" />
        <path d="M36 30 Q20 48 32 80 Q50 72 68 80 Q80 48 64 30" />
        <line x1="42" y1="64" x2="38" y2="88" />
        <line x1="58" y1="64" x2="62" y2="88" />
      </g>

      {/* Sharp core lines — bright white center */}
      <g filter="url(#neon-core)" stroke={neon} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="8" width="40" height="56" rx="20" />
        <line x1="30" y1="36" x2="70" y2="36" />
        <path d="M30 42 Q14 38 12 50" />
        <path d="M70 42 Q86 38 88 50" />
        <path d="M36 30 Q20 48 32 80 Q50 72 68 80 Q80 48 64 30" fill="none" />
        <line x1="42" y1="64" x2="38" y2="88" />
        <line x1="58" y1="64" x2="62" y2="88" />
        <path d="M33 88 L38 88 L42 92 L33 92 Z" fill={neon} stroke="none" />
        <path d="M58 88 L67 88 L67 92 L58 92 Z" fill={neon} stroke="none" />
      </g>
    </svg>
  );
}

/** Battlements / Crenelation — kept as alternative option */
function BattlementsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SeshGuard battlements logo">
      <rect x="2" y="4" width="5" height="9" rx="0.5" fill="white" />
      <rect x="10" y="4" width="5" height="9" rx="0.5" fill="white" />
      <rect x="18" y="4" width="5" height="9" rx="0.5" fill="white" />
      <rect x="26" y="4" width="4" height="9" rx="0.5" fill="white" />
      <rect x="2" y="13" width="28" height="5" rx="0.5" fill="white" />
      <rect x="2" y="18" width="28" height="10" rx="0.5" fill="white" />
      <rect x="12" y="20" width="8" height="8" rx="1" fill="black" />
    </svg>
  );
}

// --- Main App ---

export default function App() {
  const [drug1, setDrug1] = useState<string>('');
  const [drug2, setDrug2] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<{ id: string, d1: string, d2: string, code: string }[]>([]);

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('seshguard_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites");
      }
    }
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem('seshguard_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const interactionEvidence = useMemo(() => {
    if (!drug1 || !drug2) return null;
    return getInteractionEvidence(drug1, drug2);
  }, [drug1, drug2]);

  const interactionCode = interactionEvidence?.code || null;

  const interaction = useMemo(() => {
    if (!interactionCode) return null;
    return LEGEND[interactionCode] || LEGEND.UNK;
  }, [interactionCode]);

  const isFavorited = useMemo(() => {
    if (!drug1 || !drug2) return false;
    const id = [drug1, drug2].sort().join('-');
    return favorites.some(f => f.id === id);
  }, [drug1, drug2, favorites]);

  const toggleFavorite = () => {
    if (!drug1 || !drug2 || !interactionCode) return;
    const id = [drug1, drug2].sort().join('-');

    if (isFavorited) {
      setFavorites(favorites.filter(f => f.id !== id));
    } else {
      setFavorites([...favorites, {
        id,
        d1: drug1,
        d2: drug2,
        code: interactionCode
      }]);
    }
  };

  const handleFindOut = async () => {
    if (!drug1 && !drug2) return;
    setShowResult(true);
    setIsLoadingExplanation(true);
    setIsLoadingSummary(true);
    setError(null);
    setExplanation('');
    setSummary('');

    const d1Obj = DRUGS.find(d => d.id === drug1);
    const d2Obj = DRUGS.find(d => d.id === drug2);
    const d1Name = d1Obj?.name || drug1;
    const d2Name = d2Obj?.name || drug2;

    try {
      // Fetch Interaction Explanation if 2 drugs are selected
      if (drug1 && drug2 && interaction && interactionEvidence) {
        getInteractionExplanation(d1Name, d2Name, interaction.label, interactionEvidence.summary)
          .then(setExplanation)
          .catch(err => console.error("Exp error:", err))
          .finally(() => setIsLoadingExplanation(false));
      } else {
        setIsLoadingExplanation(false);
      }

      // Fetch Detailed Summary (Single or Combined)
      const targetDrug1 = drug1 ? d1Name : d2Name;
      const targetDrug2 = (drug1 && drug2) ? d2Name : undefined;

      const drugSummary = await getDrugSummary(targetDrug1, targetDrug2);
      setSummary(drugSummary);
    } catch (err: any) {
      console.error("Fetch error:", err);
      if (err.message === "API_KEY_MISSING") {
        setError("AI features are currently unavailable (API key missing).");
      } else if (err.message === "QUOTA_EXCEEDED") {
        setError("AI usage limit reached. Please try again later.");
      } else {
        setError("We couldn't generate a custom summary right now. Please rely on authoritative harm reduction resources.");
      }
    }
    setIsLoadingSummary(false);
  };

  const handleReset = () => {
    setDrug1('');
    setDrug2('');
    setShowResult(false);
    setExplanation('');
    setSummary('');
    setError(null);
  };

  const getIcon = (symbol: string) => {
    switch (symbol) {
      case 'UP': return <ArrowUp className="w-8 h-8" />;
      case 'CIRCLE': return <Circle className="w-8 h-8" />;
      case 'DOWN': return <ArrowDown className="w-8 h-8" />;
      case 'WARN': return <AlertTriangle className="w-8 h-8" />;
      case 'HEART': return <Heart className="w-8 h-8" />;
      case 'X': return <XCircle className="w-8 h-8" />;
      case 'INFO': return <Info className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-grid font-sans selection:bg-white/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FCE300]/10 border border-[#FCE300]/25 flex items-center justify-center shadow-[0_0_18px_rgba(252,227,0,0.35)]">
            <img
              src={pillHeroImg}
              alt="SeshGuard pill hero"
              width={30}
              height={30}
              style={{
                filter: 'invert(1) sepia(1) saturate(8) hue-rotate(355deg) drop-shadow(0 0 4px #FCE300) drop-shadow(0 0 10px rgba(252,227,0,0.6))',
                imageRendering: 'crisp-edges'
              }}
            />
          </div>
          <span className="text-xl font-bold tracking-wider uppercase font-display text-white">SeshGuard</span>
        </div>
        <div className="flex items-center gap-2">
          {favorites.length > 0 && (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-neon-dan">
                {favorites.length}
              </span>
            </button>
          )}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-widest font-display text-white uppercase"
          >
            Interaction Terminal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#94A3B8] font-mono text-xs md:text-sm tracking-widest uppercase"
          >
            {'>'} No telemetry recording active
          </motion.p>
        </header>

        <section className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <SearchableSelect
              label="Choose the first drug"
              value={drug1}
              onChange={setDrug1}
              disabled={showResult}
              placeholder="Select substance..."
            />
            <SearchableSelect
              label="Choose the second drug"
              value={drug2}
              onChange={setDrug2}
              disabled={showResult}
              placeholder="Select substance..."
            />
          </div>

          <div className="flex flex-col gap-4">
            {!showResult ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFindOut}
                disabled={!drug1 && !drug2}
                className="w-full bg-white text-black rounded-xl py-5 text-sm uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-20 disabled:cursor-not-allowed transition-all mt-4 font-display"
              >
                Execute Analysis
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="w-full border border-white/20 text-[#94a3b8] hover:text-white hover:border-white/50 bg-white/5 rounded-xl py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all mt-4"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Matrix
              </motion.button>
            )}
          </div>
        </section>

        {/* Results Area */}
        <AnimatePresence>
          {showResult && (drug1 || drug2) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-12 space-y-8"
            >
              {interaction && (
                <div
                  className="rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden bg-black/60 border border-white/5"
                >
                  {/* Glowing neon borders based on interaction code */}
                  <div className="absolute inset-0 opacity-100 pointer-events-none transition-opacity duration-1000" style={{ boxShadow: `inset 0 0 50px -10px ${interaction.color}80, inset 0 0 20px -5px ${interaction.color}` }}></div>

                  {/* Background Symbol Pattern */}
                  <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] scale-[3] pointer-events-none" style={{ color: interaction.color }}>
                    {getIcon(interaction.symbol)}
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className="mb-8 p-5 rounded-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
                      style={{ backgroundColor: `${interaction.color}15`, color: interaction.color }}
                    >
                      {getIcon(interaction.symbol)}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
                      {interaction.label}
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 max-w-md leading-relaxed mb-8">
                      {interactionEvidence?.summary || interaction.description}
                    </p>

                    {interactionEvidence && (
                      <div className="mb-6 w-full max-w-xl rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-left">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Evidence Engine</p>
                        <p className="text-sm text-white/80 leading-relaxed">{interactionEvidence.summary}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/50">
                          <span className="rounded border border-white/15 px-2 py-1">confidence: {interactionEvidence.confidence}</span>
                          <span className="rounded border border-white/15 px-2 py-1">{interactionEvidence.sources}</span>
                        </div>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleFavorite}
                      className={`flex items-center gap-2 mt-4 px-6 py-3 rounded-full border transition-all duration-300 font-display ${isFavorited ? `bg-[${interaction.color}]/10 border-[${interaction.color}]/50 text-[${interaction.color}] shadow-[0_0_15px_${interaction.color}40]` : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}`}
                    >
                      <Star className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">
                        {isFavorited ? 'Saved to Logs' : 'Log Interaction'}
                      </span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* AI Interaction Insight (Only if 2 drugs) */}
              {drug1 && drug2 && interaction && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="clinical-panel rounded-2xl p-8 md:p-10 shadow-neon-gemini relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent" />

                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3 text-[#10B981]">
                      <Sparkles className={`w-5 h-5 ${isLoadingExplanation ? 'animate-pulse' : ''}`} />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] font-display">Synthesis</span>
                    </div>
                    {isLoadingExplanation && (
                      <div className="flex gap-1.5">
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" />
                      </div>
                    )}
                  </div>

                  {isLoadingExplanation ? (
                    <div className="space-y-4 opacity-50">
                      <div className="h-4 bg-white/10 rounded-sm w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-white/10 rounded-sm w-full animate-pulse delay-75"></div>
                    </div>
                  ) : (
                    <div className="markdown-body">
                      <Markdown>{explanation}</Markdown>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Detailed Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="clinical-panel rounded-2xl p-8 md:p-10 shadow-[0_0_30px_-5px_rgba(56,189,248,0.15)] relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent" />

                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 text-[#38BDF8]">
                    <Info className={`w-5 h-5 ${isLoadingSummary ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] font-display">Substance Context</span>
                  </div>
                  {isLoadingSummary && (
                    <div className="flex gap-1.5">
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
                    </div>
                  )}
                </div>

                {isLoadingSummary ? (
                  <div className="space-y-4 opacity-50 relative z-10">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent w-full"
                    />
                    <div className="h-4 bg-white/10 rounded-sm w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-white/10 rounded-sm w-full animate-pulse delay-75"></div>
                    <div className="h-4 bg-white/10 rounded-sm w-5/6 animate-pulse delay-150"></div>
                    <div className="h-4 bg-white/10 rounded-sm w-2/3 animate-pulse delay-200"></div>
                  </div>
                ) : error ? (
                  <div className="flex items-start gap-4 p-6 bg-red-950/30 rounded-xl border border-red-900/50">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-300 font-medium leading-relaxed font-mono text-sm">
                      {error}
                    </p>
                  </div>
                ) : (
                  <div className="markdown-body">
                    <Markdown>{summary}</Markdown>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 pt-12 border-t border-white/5 text-center">
          <a
            href="https://www.newpsychonaut.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-white font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200"
          >
            Terminal Core | New Psychonaut
            <ExternalLink className="w-3 h-3" />
          </a>
        </footer>
      </main>

      {/* Sidebar/Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#09090b] border-l border-white/10 z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.6)] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                <h2 className="text-xl font-bold font-display uppercase tracking-widest text-white">System Logs</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-12">
                {/* Favorites Section */}
                {favorites.length > 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Saved Interactions</h3>
                    </div>
                    <div className="grid gap-3">
                      {favorites.map(fav => {
                        const d1Name = DRUGS.find(d => d.id === fav.d1)?.name || fav.d1;
                        const d2Name = DRUGS.find(d => d.id === fav.d2)?.name || fav.d2;
                        const inter = LEGEND[fav.code];
                        return (
                          <div
                            key={fav.id}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                          >
                            <button
                              onClick={() => {
                                setDrug1(fav.d1);
                                setDrug2(fav.d2);
                                setShowResult(true);
                                setIsMenuOpen(false);
                                handleFindOut(); // Trigger AI insight for the favorite
                              }}
                              className="flex-1 text-left"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm text-white">{d1Name} + {d2Name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: inter?.color, color: inter?.color }} />
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 text-white">{inter?.label}</span>
                              </div>
                            </button>
                            <button
                              onClick={() => setFavorites(favorites.filter(f => f.id !== fav.id))}
                              className="p-2 text-black/20 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                <section className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-red-500">
                    <ShieldAlert className="w-5 h-5" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Warning</h3>
                  </div>
                  <div className="space-y-3 text-[#94a3b8] leading-relaxed text-sm font-mono bg-red-950/20 p-4 rounded-xl border border-red-900/30">
                    <p className="text-red-200">System data aggregated from <span className="text-white font-bold">TripSit.me</span> & other resources.</p>
                    <p>Not intended for clinical medical usage. Information is for educational and harm reduction purposes only.</p>
                  </div>
                </section>

                <section className="space-y-6 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 font-display">External Resources</h3>
                  <div className="grid gap-3">
                    {[
                      { name: 'Crisis Help UK', url: 'https://thatsmental.co.uk/crisis' },
                      { name: 'Drug Science', url: 'https://www.drugscience.org.uk/' },
                      { name: 'PsyCare', url: 'https://www.psycareuk.org/psychedelic-support' },
                      { name: 'Zendo Project', url: 'https://zendoproject.org/' }
                    ].map(link => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white/80 hover:text-white"
                      >
                        <span className="font-medium text-sm tracking-wide">{link.name}</span>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </section>

                <section className="pt-8 text-center pb-8">
                  <p className="font-mono text-xs text-white/20 uppercase tracking-[0.3em]">
                    STS_v2.0 • Online
                  </p>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
