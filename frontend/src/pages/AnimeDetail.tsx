import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'

export default function AnimeDetail() {
  const { id } = useParams()
  const [anime, setAnime] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    api.get(`/anime/${id}`).then((r) => setAnime(r.data)).catch(() => {})
  }, [id])

  if (!anime) return <div>Loading...</div>

  return (
    <div className="max-w-3xl">
      <div className="flex gap-4">
        <img src={anime.image_url} alt={anime.title} className="w-48 h-64 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{anime.title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Episodes: {anime.episodes}</p>
          <p className="mt-4">{anime.synopsis}</p>
        </div>
      </div>
    </div>
  )
}
