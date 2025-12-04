import React, { useState } from 'react'
import { api } from '../lib/api'
import AnimeCard from '../components/AnimeCard'

export default function Search() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function doSearch(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    try {
      const res = await api.get('/anime/search', { params: { q } })
      setResults(res.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={doSearch} className="mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} className="border p-2 mr-2" placeholder="Search anime..." />
        <button className="px-4 py-2 bg-blue-600 text-white" disabled={!q}>Search</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? <div>Loading...</div> : results.map((r) => <AnimeCard key={r.id} anime={r} />)}
      </div>
    </div>
  )
}
