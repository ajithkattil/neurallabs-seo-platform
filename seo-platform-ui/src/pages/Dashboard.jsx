import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApi } from '../hooks/useApi'
import { API_CONFIG } from '../api/config'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

export function Dashboard() {
  const { user } = useAuth()
  const { request, loading } = useApi()
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    website_url: ''
  })
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [request])

  const loadDashboardData = async () => {
    try {
      const projectsData = await request({
        method: 'GET',
        url: API_CONFIG.ENDPOINTS.PROJECTS,
      })
      setProjects(projectsData?.data || [])

      // Calculate stats
      setStats({
        totalProjects: projectsData?.data?.length || 0,
        activeProjects: projectsData?.data?.filter(p => p.status !== 'archived')?.length || 0,
        totalAnalyses: projectsData?.data?.reduce((sum, p) => sum + (p.analyses_count || 0), 0) || 0,
        lastUpdated: new Date().toLocaleDateString()
      })
    } catch (err) {
      console.error('Failed to load dashboard:', err)
      setStats({
        totalProjects: 0,
        activeProjects: 0,
        totalAnalyses: 0,
        lastUpdated: '-'
      })
    }
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()
    
    if (!newProject.name || !newProject.website_url) {
      alert('Please fill in all fields')
      return
    }

    setIsCreating(true)
    try {
      await request({
        method: 'POST',
        url: API_CONFIG.ENDPOINTS.PROJECTS,
        data: newProject
      })
      
      // Reset form and reload
      setNewProject({ name: '', website_url: '' })
      setShowModal(false)
      await loadDashboardData()
    } catch (err) {
      console.error('Failed to create project:', err)
      alert('Error creating project: ' + (err.message || 'Unknown error'))
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Layout>
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h1 className="dashboard-title">
                Welcome back, {user?.full_name || 'User'}! 👋
              </h1>
              <p className="dashboard-subtitle">
                Manage your SEO projects and track automation progress
              </p>
            </div>
            <div className="header-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                + New Project
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <p className="stat-label">Total Projects</p>
              <p className="stat-value">{loading ? '-' : stats?.totalProjects || 0}</p>
              <p className="stat-detail">All your projects</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <p className="stat-label">Active Projects</p>
              <p className="stat-value">{loading ? '-' : stats?.activeProjects || 0}</p>
              <p className="stat-detail">Currently running</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔍</div>
            <div className="stat-info">
              <p className="stat-label">Total Analyses</p>
              <p className="stat-value">{loading ? '-' : stats?.totalAnalyses || 0}</p>
              <p className="stat-detail">Completed scans</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <p className="stat-label">Last Updated</p>
              <p className="stat-value">Today</p>
              <p className="stat-detail">{stats?.lastUpdated || '-'}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <button 
              className="action-card"
              onClick={() => setShowModal(true)}
            >
              <span className="action-icon">➕</span>
              <span className="action-text">New Project</span>
            </button>
            <Link to="/projects" className="action-card">
              <span className="action-icon">📁</span>
              <span className="action-text">View Projects</span>
            </Link>
            <Link to="/integrations" className="action-card">
              <span className="action-icon">🔗</span>
              <span className="action-text">Integrations</span>
            </Link>
            <Link to="/settings" className="action-card">
              <span className="action-icon">⚙️</span>
              <span className="action-text">Settings</span>
            </Link>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="section-header">
            <h2 className="section-title">Your Projects</h2>
            <Link to="/projects" className="view-all-link">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No Projects Yet</h3>
              <p>Create your first project to start analyzing your website's SEO</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Create First Project
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="project-card"
                >
                  <div className="project-header">
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-status">Active</span>
                  </div>
                  
                  <p className="project-url">{project.website_url}</p>
                  
                  <div className="project-stats">
                    <div className="project-stat">
                      <span className="label">Status</span>
                      <span className="value">Ready</span>
                    </div>
                    <div className="project-stat">
                      <span className="label">Created</span>
                      <span className="value">Today</span>
                    </div>
                  </div>

                  <div className="project-actions">
                    <button className="action-btn">Analyze</button>
                    <button className="action-btn">Details</button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {projects.length > 6 && (
            <div className="projects-footer">
              <Link to="/projects" className="btn btn-secondary">
                View All Projects ({projects.length})
              </Link>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Available Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Technical SEO</h3>
              <p>Identify and fix technical issues</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Content Analysis</h3>
              <p>Optimize your content strategy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Backlink Analysis</h3>
              <p>Discover link opportunities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Keyword Research</h3>
              <p>Find high-opportunity keywords</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics</h3>
              <p>Track your SEO progress</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Competitor Analysis</h3>
              <p>Monitor competitor strategies</p>
            </div>
          </div>
        </section>
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="My Awesome Website"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  required
                  disabled={isCreating}
                />
              </div>

              <div className="form-group">
                <label>Website URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newProject.website_url}
                  onChange={(e) => setNewProject({...newProject, website_url: e.target.value})}
                  required
                  disabled={isCreating}
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
