import React, { useState } from 'react'
import api from '../../lib/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function doRegister(e?: React.FormEvent) {
    e?.preventDefault()
    try {
      await api.post('/auth/register', { email, password })
      navigate('/auth/login')
    } catch (err) {
      alert('Register failed')
    }
  }

  return (
    <form onSubmit={doRegister} className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-2" />
      <button className="px-4 py-2 bg-green-600 text-white">Register</button>
    </form>
  )
}
