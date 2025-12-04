import React from 'react'
import { Link } from 'react-router-dom'

export default function AnimeCard({ anime }: { anime: any }) {
  const sourceBadgeColor = anime.source === 'anilist' ? 'bg-purple-500' : anime.source === 'jikan' ? 'bg-blue-500' : 'bg-gray-500'
  return (
    <div className="bg-white dark:bg-slate-800 rounded shadow p-3">
      <div className="relative">
        <img src={anime.image_url} alt={anime.title} className="w-full h-48 object-cover rounded mb-2" />
        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${sourceBadgeColor}`}>
          {anime.source || 'unknown'}
        </span>
      </div>
      <h3 className="font-semibold">{anime.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-300">Score: {anime.score ?? '—'}</p>
      <div className="mt-2 flex justify-between">
        <Link to={`/anime/${anime.id}`} className="text-blue-600">Details</Link>
      </div>
    </div>
  )
}
