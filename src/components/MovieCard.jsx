/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '@/Store/zustand/useMovieStore';

const MovieCard = (props) => {
  const movie = props.movie || props.item;
  const isHorizontal = props.isHorizontal || false;

  // تم تغيير loadUserData إلى syncWithUser لتطابق ملف الـ Store الجديد
  const { favorites, watchlist, toggleFavorite, toggleWatchlist, syncWithUser } = useMovieStore();
  
  const [isRateOpen, setIsRateOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // مزامنة البيانات عند أول ظهور للكارت لضمان حالة الأزرار (نشط/غير نشط)
  useEffect(() => {
    if (typeof syncWithUser === 'function') {
      syncWithUser();
    }
  }, [syncWithUser]);

  if (!movie) return null;

  // التحقق من وجود الفيلم في القوائم
  const isFavorite = favorites?.some((f) => f.id === movie.id) || false;
  const isInWatchlist = watchlist?.some((w) => w.id === movie.id) || false;
  
  const title = movie.title || movie.name || "No Title";
  const siteAverage = movie.vote_average || 0;
  const siteStars = Math.round(siteAverage / 2);
  const releaseDate = (movie.release_date || movie.first_air_date)?.split('-')[0] || "N/A";

  const posterUrl = movie.poster_path || movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${isHorizontal ? (movie.backdrop_path || movie.poster_path) : (movie.poster_path || movie.backdrop_path)}`
    : "/no-image.png";

  return (
    <div 
      className={`group relative flex flex-col shrink-0 transition-all duration-300 ${isHorizontal ? "w-[300px]" : "w-[160px] md:w-[200px]"}`}
      onMouseLeave={() => setIsRateOpen(false)}
    >
      {/* الحاوية الأساسية مع ألوان Palette Moviebes الجديدة */}
      <div className={`relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-[var(--card)] border border-gray-100 dark:border-[var(--border)] ${isHorizontal ? "h-[170px]" : "h-[240px] md:h-[300px]"}`}>
        
        <img 
          src={posterUrl} 
          className={`w-full h-full object-cover transition-all duration-700 
            ${isRateOpen ? 'brightness-[0.2] scale-105' : 'group-hover:brightness-[0.3] group-hover:scale-110'}`}
          alt={title}
        />

        {/* الطبقة التي تظهر عند الـ Hover */}
        <div className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-300
          ${isRateOpen ? 'opacity-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
          
          <div className="flex flex-col gap-3 items-center">
            {/* زر المفضل (Favorite) */}
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(movie); }} 
              className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${isFavorite ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-red-600'}`}
            >
              <Heart size={20} fill={isFavorite ? "white" : "none"} />
            </button>

            {/* زر قائمة المشاهدة (Watchlist) */}
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWatchlist(movie); }} 
              className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${isInWatchlist ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-black/60 text-white hover:bg-[var(--primary)]'}`}
            >
              <Bookmark size={20} fill={isInWatchlist ? "currentColor" : "none"} />
            </button>

            {/* زر التقييم (Rating) */}
            <div className="relative">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsRateOpen(!isRateOpen); }} 
                className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${userRating > 0 || isRateOpen ? 'bg-yellow-500 text-white' : 'bg-black/60 text-white hover:bg-yellow-500'}`}
              >
                <Star size={20} fill={userRating > 0 ? "white" : "none"} />
              </button>
              
              {isRateOpen && (
                <div 
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white dark:bg-[var(--popover)] p-3 rounded-xl shadow-2xl z-[50] w-[150px] border border-gray-200 dark:border-[var(--border)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-2 border-b dark:border-[var(--border)] pb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider dark:text-[var(--chart-2)]">Rate It</span>
                    <X size={14} className="text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setIsRateOpen(false)} />
                  </div>
                  <div className="flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star key={num} size={18} className={`cursor-pointer transition-transform hover:scale-125 ${userRating >= num ? "text-yellow-500" : "text-gray-300 dark:text-[var(--border)]"}`} fill={userRating >= num ? "currentColor" : "none"} onClick={() => { setUserRating(num); setIsRateOpen(false); }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل الفيلم أسفل الصورة */}
      <div className="mt-3 px-1">
        <Link to={`/movie/${movie.id}`}>
          <h3 className={`font-bold text-[15px] leading-tight line-clamp-1 transition-colors 
            ${isHorizontal 
              ? "text-[var(--chart-2)] drop-shadow-sm hover:text-[var(--primary)]" 
              : "text-[#032541] dark:text-[var(--chart-2)] hover:text-[var(--primary)]"}`}>
            {title}
          </h3>
        </Link>
        
        <p className={`text-[12px] mt-0.5 ${isHorizontal ? "text-[var(--muted-foreground)]" : "text-gray-500 dark:text-[var(--muted-foreground)]"}`}>
          {releaseDate}
        </p>

        <div className="flex flex-col gap-2 mt-2">
          {/* نجوم تقييم الموقع */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className={siteStars >= s ? "text-yellow-500" : "text-gray-300 dark:text-[var(--border)]"} fill={siteStars >= s ? "currentColor" : "none"} />
              ))}
            </div>
            <span className={`text-[11px] font-bold ${isHorizontal ? "text-[var(--muted-foreground)]" : "text-gray-500 dark:text-[var(--muted-foreground)]"}`}>
              ({siteAverage.toFixed(1)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;