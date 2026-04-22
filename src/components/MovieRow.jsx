import React from 'react'

export  const MovieRow = ({ movie }) => {
  return (
    <>
  <div className="min-w-[150px] md:min-w-[180px] cursor-pointer">
    <div className="rounded-lg overflow-hidden shadow-lg h-[250px]">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title}
        className="w-full h-full object-cover"
      />
    </div>
    <h4 className="mt-2 font-bold text-sm leading-tight">{movie.title || movie.name}</h4>
    <p className="text-gray-500 text-xs">{movie.release_date}</p>
  </div>
</>
  )
}
