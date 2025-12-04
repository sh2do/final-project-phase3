import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import AnimeDetail from './pages/AnimeDetail'
import Collection from './pages/Collection'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <nav className="p-4 border-b bg-white/70 dark:bg-slate-800/70">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">Anime Tracker</Link>
          <div className="space-x-4">
            <Link to="/search">Search</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/auth/login">Login</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
