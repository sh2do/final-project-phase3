import React, { useState } from 'react'
import api from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const setToken = useAuth((s) => s.setToken)

  async function doLogin(e?: React.FormEvent) {
    e?.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      setToken(res.data.access_token)
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={doLogin} className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-2" />
      <button className="px-4 py-2 bg-blue-600 text-white">Login</button>
    </form>
  )
}
