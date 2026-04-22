import React, { useState } from 'react';
import tmdbApi from '../services/axiosConfig';
import Hero from '../components/Hero';
import Trending from '../components/Tranding';
import TrailersSection from '../components/TrailersSection';
import PopularSection from '../components/PopularSection';
import FreeToWatch from '../components/FreeToWatch';
import JoinSection from '../components/JoinSection';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) {
      setIsSearching(false);
      return;
    }
    try {
      setIsSearching(true);
      const { data } = await tmdbApi.get('/search/multi', {
        params: { query: searchTerm }
      });
      setSearchResults(data.results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={handleSearch} 
      />

      <main>
        {isSearching ? (
          /* عرض نتائج البحث فقط لو المستخدم بيبحث */
          <section className="max-w-7xl mx-auto px-10 py-8">
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            <div className="flex flex-wrap gap-6">
              {searchResults.map(movie => (
                // هنا ممكن تستخدمي نفس الـ Card أو تعملي MovieCard مكون منفصل
                <div key={movie.id} className="w-[150px]">
                   <img className="rounded-xl shadow-md" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                   <h3 className="font-bold mt-2 text-sm">{movie.title || movie.name}</h3>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* عرض الأقسام الرئيسية لو مفيش بحث */
          <>
          
            <Trending />
            <TrailersSection /> 
            <PopularSection />
            <FreeToWatch />
            <JoinSection />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;