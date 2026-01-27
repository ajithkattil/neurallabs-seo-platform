import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, signup } = useAuth()
  
  const [isSignup, setIsSignup] = useState(location.search.includes('signup=true'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        if (!fullName.trim()) {
          setError('Full name is required')
          setLoading(false)
          return
        }
        await signup(email, password, fullName)
      } else {
        await login(email, password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('testuser@test.com')
    setPassword('TestPass123456')
    setFullName('')
    setError('')
  }

  return (
    <div className="login-container">
      {/* Gradient Orbs Background */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      <div className="login-wrapper">
        {/* Logo & Branding */}
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">🚀</div>
            <h1 className="logo-text">Neural Labs</h1>
          </div>
          <p className="tagline">AI-Powered SEO Automation</p>
        </div>

        {/* Form Card */}
        <div className="login-card">
          <div className="form-header">
            <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="form-subtitle">
              {isSignup ? 'Start automating your SEO' : 'Sign in to your account'}
            </p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={isSignup}
                  disabled={loading}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              {!isSignup && (
                <a href="#" className="forgot-password">Forgot password?</a>
              )}
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-text">
                  <span className="spinner"></span>
                  {isSignup ? 'Creating account...' : 'Signing in...'}
                </span>
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Toggle Signup/Login */}
          <div className="toggle-auth">
            <p>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => {
                  setIsSignup(!isSignup)
                  setError('')
                  setEmail('')
                  setPassword('')
                  setFullName('')
                }}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="demo-section">
          <h3>Demo Credentials</h3>
          <div className="demo-box">
            <div className="demo-item">
              <span className="demo-label">Email:</span>
              <span className="demo-value">testuser@test.com</span>
            </div>
            <div className="demo-item">
              <span className="demo-label">Password:</span>
              <span className="demo-value">TestPass123456</span>
            </div>
          </div>
          <button 
            type="button"
            className="btn-demo"
            onClick={fillDemoCredentials}
            disabled={loading}
          >
            ➜ Fill Demo Credentials
          </button>
        </div>

        {/* Footer Links */}
        <div className="login-footer">
          <a href="/">← Back to Home</a>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <span className="separator">•</span>
            <a href="#">Terms</a>
            <span className="separator">•</span>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
