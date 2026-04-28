import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import tmdbApi from '@/services/axiosConfig';
import { Container } from './Container';

const Hero = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [backdrop, setBackdrop] = useState(null);
  const [movieTitle, setMovieTitle] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await tmdbApi.get('/trending/movie/week');
        const movie = res.data.results[Math.floor(Math.random() * 5)];
        setBackdrop(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
        setMovieTitle(movie.title);
      } catch (error) {
        console.error("Error fetching trending movie:", error);
      }
    })();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section 
      className="relative h-[500px] md:h-[620px] w-full overflow-hidden flex items-end"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
      }}
    >
      {backdrop && (
        <img
          src={backdrop}
          alt={movieTitle}
          className="absolute inset-0 w-full h-full object-cover object-top scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />

      {/* <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 pb-16 md:pb-24"> */}
      <Container className="relative z-10 px-6 md:px-12 pb-16 md:pb-24">
        {movieTitle && (
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Trending this week
          </p>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-2 drop-shadow-lg">
          Your Next <br className="hidden md:block" />
          <span className="text-primary">Favorite Film</span> Awaits.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <div className="relative max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search movies, shows, people..."
            className="w-full h-[52px] rounded-full pl-11 pr-36 text-base outline-none text-foreground bg-card/80 backdrop-blur-md border border-white/10 focus:ring-2 focus:ring-primary/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-[42px] px-6 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer text-sm"
          >
            Search
          </button>
        </div>
      </Container>
      {/* </div> */}
    </section>
  );
};

export default Hero;