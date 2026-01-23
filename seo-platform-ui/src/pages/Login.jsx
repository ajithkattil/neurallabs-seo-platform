import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { login, error } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setLocalError('Email and password are required')
      return
    }

    setLoading(true)
    setLocalError(null)
    
    try {
      const success = await login(email, password)
      if (success) {
        navigate('/dashboard')
      } else {
        setLocalError(error || 'Login failed')
      }
    } catch (err) {
      setLocalError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      
      {/* Login Card */}
      <div className="relative w-full max-w-md px-6 py-12 sm:px-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-emerald-500">◆</span> Digiverse
          </h1>
          <p className="text-slate-400">SEO Copilot for Agencies</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

          {/* Error Alert */}
          {(localError || error) && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
              <p className="text-red-200 text-sm font-medium">{localError || error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label text-white">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@agency.com"
                className="input bg-white/5 border-white/20 text-white placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="label text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input bg-white/5 border-white/20 text-white placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-400 text-center mb-3">Demo Credentials</p>
            <div className="space-y-2 text-xs text-slate-300 bg-white/5 rounded-lg p-3">
              <p><span className="text-emerald-400 font-medium">Email:</span> demo@agency.com</p>
              <p><span className="text-emerald-400 font-medium">Password:</span> demo123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Building the future of agency SEO operations
        </p>
      </div>
    </div>
  )
}

export default Login
