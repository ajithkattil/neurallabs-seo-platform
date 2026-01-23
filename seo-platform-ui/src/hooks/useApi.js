import { useState, useCallback } from 'react'
import client from '../api/client'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (config) => {
    setLoading(true)
    setError(null)
    try {
      const response = await client(config)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Request failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { request, loading, error }
}

export default useApi
