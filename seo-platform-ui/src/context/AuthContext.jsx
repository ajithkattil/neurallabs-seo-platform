import React, { createContext, useState, useEffect } from 'react'
import client from '../api/client'
import { API_CONFIG } from '../api/config'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const response = await client.get(API_CONFIG.ENDPOINTS.ME)
          setUser(response.data)
          setError(null)
        } catch (err) {
          localStorage.removeItem('auth_token')
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await client.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        password,
      })
      const { token, user } = response.data
      localStorage.setItem('auth_token', token)
      setUser(user)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    }
  }

  const logout = async () => {
    try {
      await client.post(API_CONFIG.ENDPOINTS.LOGOUT)
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('auth_token')
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
