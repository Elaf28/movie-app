/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdbApi from '../services/axiosConfig';
import Hero from '../components/Hero';
import MovieSection from '../components/MovieSection';
import TrailersSection from '../components/TrailersSection';
import JoinSection from '../components/JoinSection';
import { Film, Star, ArrowRight, Loader2 } from 'lucide-react';

function Home() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [quickResults, setQuickResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingQuick, setIsLoadingQuick] = useState(false);
  const [inputStyle, setInputStyle] = useState({ width: 0, top: 0, left: 0 });
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // حساب أبعاد الـ Input بارتفاعه وعرضه ومكانه بالملي
  const updateInputPosition = () => {
    const heroInput = document.querySelector('input[type="text"]');
    if (heroInput) {
      const rect = heroInput.getBoundingClientRect();
      setInputStyle({
        width: rect.width,
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  };

  // البحث الفوري (Dropdown) - مع معالجة الـ Blinking والـ Race Condition
  useEffect(() => {
    const controller = new AbortController();

    if (!searchTerm.trim()) {
      setQuickResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoadingQuick(true);
      setShowDropdown(true);
      updateInputPosition();

      try {
        const { data } = await tmdbApi.get('/search/multi', { 
          params: { query: searchTerm, language: 'en-US' },
          signal: controller.signal 
        });
        // فلترة النتائج اللي فيها صور بس وعرض أول 5
        const filtered = (data.results || []).filter(item => item.poster_path).slice(0, 5);
        setQuickResults(filtered);
      } catch (err) {
        if (err.name !== 'CanceledError') console.error(err);
      } finally {
        setIsLoadingQuick(false);
      }
    }, 450);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchTerm]);

  // دالة الذهاب لصفحة السيرش الكاملة
  const handleHeroSearch = () => {
    if (!searchTerm.trim()) return;
    setShowDropdown(false);
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  // إغلاق عند الضغط بالخارج وتحديث المكان عند تغيير حجم الشاشة
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", updateInputPosition);
    window.addEventListener("scroll", updateInputPosition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updateInputPosition);
      window.removeEventListener("scroll", updateInputPosition);
    };
  }, []);

  const trendingEndpoints = useMemo(() => ({ Today: '/trending/all/day', This_Week: '/trending/all/week' }), []);
  const popularEndpoints = useMemo(() => ({ Streaming: '/tv/popular', On_TV: '/tv/top_rated', For_Rent: '/movie/upcoming', In_Theaters: '/movie/now_playing' }), []);
  const freeEndpoints = useMemo(() => ({ Movies: '/discover/movie?sort_by=vote_count.desc', TV: '/discover/tv?sort_by=vote_count.desc' }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--card)] text-[var(--foreground)] transition-colors duration-500">
      
      {/* قسم الهيرو مع دالة البحث */}
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleHeroSearch} />

      {/* Dropdown النتائج الفورية - Glass Style */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          style={{ 
            position: 'absolute', 
            top: `${inputStyle.top + 8}px`, 
            left: `${inputStyle.left}px`, 
            width: `${inputStyle.width}px` 
          }}
          className="bg-[var(--card)]/90 backdrop-blur-2xl rounded-2xl border border-[var(--border)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9999] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="p-2">
            {isLoadingQuick ? (
              <div className="p-8 text-center text-[var(--muted-foreground)] flex items-center justify-center gap-3 italic text-sm">
                <Loader2 className="animate-spin text-[var(--primary)]" size={18} />
                <span>Searching for titles...</span>
              </div>
            ) : quickResults.length > 0 ? (
              <div className="flex flex-col">
                {quickResults.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/search?query=${encodeURIComponent(item.title || item.name)}`);
                    }}
                    className="flex items-center gap-4 p-3 hover:bg-[var(--primary)]/10 rounded-xl cursor-pointer transition-all group/item"
                  >
                    <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} className="w-10 h-14 object-cover rounded-lg shadow-sm" alt="" />
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="font-semibold truncate group-hover/item:text-[var(--primary)] transition-colors">
                        {item.title || item.name}
                      </span>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-[var(--muted-foreground)] font-medium">
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star size={12} fill="currentColor"/> {item.vote_average?.toFixed(1)}
                        </span>
                        <span>{(item.release_date || item.first_air_date)?.split('-')[0]}</span>
                      </div>
                    </div>
                    <ArrowRight className="ml-auto text-[var(--muted-foreground)] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" size={18} />
                  </div>
                ))}
                
                <button 
                  onClick={handleHeroSearch}
                  className="w-full mt-1 p-3 text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] border-t border-[var(--border)] hover:bg-[var(--secondary)] transition-all rounded-b-xl"
                >
                  See all results for "{searchTerm}"
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-[var(--muted-foreground)] text-sm italic">
                No matching results found.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* الأقسام الرئيسية للصفحة */}
      <main className="space-y-4 pt-10">
        <div className="flex flex-col gap-16 pb-20">
          
          <MovieSection title="Trending" endpoints={trendingEndpoints} />
          
          <div className="py-4 bg-[var(--secondary)]/20 backdrop-blur-sm border-y border-[var(--border)] shadow-inner">
              <TrailersSection /> 
          </div>

          <MovieSection title="What's Popular" endpoints={popularEndpoints} />
          
          <MovieSection title="Free To Watch" endpoints={freeEndpoints} />
          
          <JoinSection />
        </div>
      </main>
    </div>
  );
}

export default Home;