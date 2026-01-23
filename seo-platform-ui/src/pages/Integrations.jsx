import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useApi } from '../hooks/useApi'
import { API_CONFIG } from '../api/config'

export function Integrations() {
  const { request, loading } = useApi()
  const [integrations, setIntegrations] = useState([])
  const [connecting, setConnecting] = useState(null)

  useEffect(() => {
    loadIntegrations()
  }, [request])

  const loadIntegrations = async () => {
    try {
      const data = await request({
        method: 'GET',
        url: API_CONFIG.ENDPOINTS.INTEGRATIONS,
      })
      setIntegrations(data?.data || [
        {
          id: 'gsc',
          name: 'Google Search Console',
          description: 'Track queries, clicks, and impressions',
          icon: '🔍',
          status: 'disconnected',
          required: true,
        },
        {
          id: 'ga4',
          name: 'Google Analytics 4',
          description: 'Monitor traffic, conversions, and user behavior',
          icon: '📊',
          status: 'disconnected',
          required: true,
        },
        {
          id: 'semrush',
          name: 'Semrush',
          description: 'Competitive analysis and keyword research',
          icon: '🎯',
          status: 'disconnected',
          required: false,
        },
        {
          id: 'ahrefs',
          name: 'Ahrefs',
          description: 'Backlink analysis and site audits',
          icon: '🔗',
          status: 'disconnected',
          required: false,
        }
      ])
    } catch (err) {
      console.error('Failed to load integrations:', err)
    }
  }

  const handleConnect = async (integrationId) => {
    setConnecting(integrationId)
    try {
      // In real app, this would open OAuth flow
      // For now, simulate connection
      setTimeout(async () => {
        const updated = integrations.map(i =>
          i.id === integrationId ? { ...i, status: 'connected' } : i
        )
        setIntegrations(updated)
        setConnecting(null)
      }, 1000)
    } catch (err) {
      console.error('Failed to connect:', err)
      setConnecting(null)
    }
  }

  const handleDisconnect = async (integrationId) => {
    try {
      const updated = integrations.map(i =>
        i.id === integrationId ? { ...i, status: 'disconnected' } : i
      )
      setIntegrations(updated)
    } catch (err) {
      console.error('Failed to disconnect:', err)
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Integrations</h1>
          <p className="text-slate-600 mt-2">
            Connect your tools to unlock AI-powered SEO automation
          </p>
        </div>

        {/* Required Integrations */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              ⭐ Required (MVP)
            </h2>
            <p className="text-sm text-slate-500">
              You need these to start automating SEO tasks
            </p>
          </div>

          <div className="grid gap-4">
            {integrations
              .filter(i => i.required)
              .map((integration) => (
                <div key={integration.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {integration.status === 'connected' ? (
                        <>
                          <span className="badge badge-success">Connected</span>
                          <button
                            onClick={() => handleDisconnect(integration.id)}
                            className="btn btn-secondary text-sm"
                          >
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="badge">Disconnected</span>
                          <button
                            onClick={() => handleConnect(integration.id)}
                            disabled={connecting === integration.id}
                            className="btn btn-primary text-sm"
                          >
                            {connecting === integration.id ? 'Connecting...' : 'Connect'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Optional Integrations */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              🚀 Optional (Phase 2)
            </h2>
            <p className="text-sm text-slate-500">
              Add these later for more insights and competitive analysis
            </p>
          </div>

          <div className="grid gap-4">
            {integrations
              .filter(i => !i.required)
              .map((integration) => (
                <div key={integration.id} className="card opacity-60">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        Coming in Phase 2
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Need help connecting?</h3>
          <p className="text-sm text-blue-800 mb-3">
            Check out our integration guides to connect your tools in less than 5 minutes.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Integration Guides →
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Integrations
