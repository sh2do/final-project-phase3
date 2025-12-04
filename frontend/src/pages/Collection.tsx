import React, { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Collection() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    api.get('/anime/collection').then((r) => setItems(r.data)).catch(() => {})
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="p-3 bg-white dark:bg-slate-800 rounded shadow">
            <div>Anime ID: {it.anime_id}</div>
            <div>Episodes watched: {it.episodes_watched}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
