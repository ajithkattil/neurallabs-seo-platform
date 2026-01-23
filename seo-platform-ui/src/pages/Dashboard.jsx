import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApi } from '../hooks/useApi'
import { API_CONFIG } from '../api/config'
import { useAuth } from '../context/AuthContext'

export function Dashboard() {
  const { user } = useAuth()
  const { request, loading } = useApi()
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await request({
          method: 'GET',
          url: API_CONFIG.ENDPOINTS.PROJECTS,
        })
        setProjects(projectsData?.data || [])

        // Mock stats for now
        setStats({
          totalProjects: projectsData?.data?.length || 0,
          activeAgents: 13,
          tasksCompleted: 247,
          automationRate: 92,
        })
      } catch (err) {
        console.error('Failed to load dashboard:', err)
      }
    }

    loadData()
  }, [request])

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name || 'Agency'}! 👋
          </h1>
          <p className="text-slate-600 mt-2">
            Here's your SEO automation overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Total Projects</p>
            <p className="text-3xl font-bold text-slate-900">
              {loading ? '-' : stats?.totalProjects || 0}
            </p>
            <p className="text-xs text-slate-500 mt-2">Active campaigns</p>
          </div>

          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Active Agents</p>
            <p className="text-3xl font-bold text-emerald-600">
              {stats?.activeAgents || 13}
            </p>
            <p className="text-xs text-slate-500 mt-2">Running now</p>
          </div>

          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Tasks Completed</p>
            <p className="text-3xl font-bold text-slate-900">
              {stats?.tasksCompleted || 0}
            </p>
            <p className="text-xs text-slate-500 mt-2">This month</p>
          </div>

          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Automation Rate</p>
            <p className="text-3xl font-bold text-emerald-600">
              {stats?.automationRate || 92}%
            </p>
            <p className="text-xs text-slate-500 mt-2">Tasks automated</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link
              to="/projects"
              className="card text-center hover:shadow-lg hover:border-emerald-500 cursor-pointer"
            >
              <p className="text-3xl mb-2">📁</p>
              <p className="font-semibold text-slate-900">Create Project</p>
              <p className="text-xs text-slate-500 mt-1">Start new campaign</p>
            </Link>

            <Link
              to="/integrations"
              className="card text-center hover:shadow-lg hover:border-emerald-500 cursor-pointer"
            >
              <p className="text-3xl mb-2">🔗</p>
              <p className="font-semibold text-slate-900">Add Integration</p>
              <p className="text-xs text-slate-500 mt-1">Connect GSC/GA4</p>
            </Link>

            <Link
              to="/projects"
              className="card text-center hover:shadow-lg hover:border-emerald-500 cursor-pointer"
            >
              <p className="text-3xl mb-2">📊</p>
              <p className="font-semibold text-slate-900">View Reports</p>
              <p className="text-xs text-slate-500 mt-1">Automation insights</p>
            </Link>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Recent Projects</h2>
            <Link to="/projects" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View all →
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="card flex items-center justify-between hover:border-emerald-500"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">{project.name}</h3>
                    <p className="text-sm text-slate-500">{project.domain}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="badge badge-success">Active</span>
                    <span className="text-sm text-slate-500">{project.tasks_count || 0} tasks</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <p className="text-slate-600 mb-3">No projects yet</p>
              <Link to="/projects" className="btn btn-primary">
                Create Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
