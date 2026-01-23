import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApi } from '../hooks/useApi'
import { API_CONFIG } from '../api/config'

export function Projects() {
  const { request, loading } = useApi()
  const [projects, setProjects] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', domain: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [request])

  const loadProjects = async () => {
    try {
      const data = await request({
        method: 'GET',
        url: API_CONFIG.ENDPOINTS.PROJECTS,
      })
      setProjects(data?.data || [])
    } catch (err) {
      console.error('Failed to load projects:', err)
    }
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.domain) return

    setSubmitting(true)
    try {
      await request({
        method: 'POST',
        url: API_CONFIG.ENDPOINTS.PROJECTS,
        data: formData,
      })
      setFormData({ name: '', domain: '' })
      setShowCreateForm(false)
      await loadProjects()
    } catch (err) {
      console.error('Failed to create project:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-600 mt-1">Manage your SEO campaigns</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary"
          >
            + New Project
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="label">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Acme Corp SEO"
                  className="input"
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="label">Domain</label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="e.g., acmecorp.com"
                  className="input"
                  disabled={submitting}
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="card hover:border-emerald-500 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{project.domain}</p>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500">Tasks</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {project.tasks_count || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Last Updated</p>
                      <p className="text-lg font-semibold text-slate-900">Today</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-slate-600 mb-4">No projects yet</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary"
              >
                Create Your First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Projects
