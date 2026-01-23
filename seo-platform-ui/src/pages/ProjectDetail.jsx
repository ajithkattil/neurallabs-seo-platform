import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApi } from '../hooks/useApi'
import { API_CONFIG } from '../api/config'

export function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { request, loading } = useApi()
  
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', agent: '' })

  useEffect(() => {
    loadProject()
  }, [id, request])

  const loadProject = async () => {
    try {
      const data = await request({
        method: 'GET',
        url: API_CONFIG.ENDPOINTS.PROJECT(id),
      })
      setProject(data?.data || data)
      
      // Mock tasks for now
      setTasks([
        {
          id: 1,
          title: 'Content Brief Generation',
          agent: 'ContentBriefAgent',
          status: 'completed',
          output: 'Generated 5 content briefs'
        },
        {
          id: 2,
          title: 'Competitive Analysis',
          agent: 'CompetitiveAnalysisAgent',
          status: 'running',
          output: 'Analyzing 10 competitors...'
        },
        {
          id: 3,
          title: 'SEO Score Calculation',
          agent: 'SEOScoreAgent',
          status: 'pending',
          output: '-'
        }
      ])
    } catch (err) {
      console.error('Failed to load project:', err)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTask.title || !newTask.agent) return

    try {
      await request({
        method: 'POST',
        url: API_CONFIG.ENDPOINTS.TASKS,
        data: { project_id: id, ...newTask },
      })
      setNewTask({ title: '', agent: '' })
      setShowAddTask(false)
      await loadProject()
    } catch (err) {
      console.error('Failed to add task:', err)
    }
  }

  if (loading && !project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-slate-600">Loading project...</p>
        </div>
      </Layout>
    )
  }

  if (!project) {
    return (
      <Layout>
        <div className="card text-center py-12">
          <p className="text-slate-600 mb-4">Project not found</p>
          <button onClick={() => navigate('/projects')} className="btn btn-primary">
            Back to Projects
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/projects')}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-2"
            >
              ← Back to Projects
            </button>
            <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
            <p className="text-slate-600 mt-1">{project.domain}</p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Status</p>
            <p className="text-xl font-semibold text-emerald-600">Active</p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Total Tasks</p>
            <p className="text-xl font-semibold text-slate-900">{tasks.length}</p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Completed</p>
            <p className="text-xl font-semibold text-emerald-600">
              {tasks.filter(t => t.status === 'completed').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600 mb-2">Running</p>
            <p className="text-xl font-semibold text-amber-600">
              {tasks.filter(t => t.status === 'running').length}
            </p>
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Tasks</h2>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="btn btn-primary text-sm"
            >
              + Add Task
            </button>
          </div>

          {showAddTask && (
            <div className="card mb-6">
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="label">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g., Generate content briefs"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Agent</label>
                  <select
                    value={newTask.agent}
                    onChange={(e) => setNewTask({ ...newTask, agent: e.target.value })}
                    className="input"
                  >
                    <option value="">Select agent...</option>
                    <option value="ContentBriefAgent">ContentBriefAgent</option>
                    <option value="CompetitiveAnalysisAgent">CompetitiveAnalysisAgent</option>
                    <option value="SEOScoreAgent">SEOScoreAgent</option>
                    <option value="ActionChecklistAgent">ActionChecklistAgent</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn btn-primary">Add Task</button>
                  <button
                    type="button"
                    onClick={() => setShowAddTask(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{task.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {task.agent}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        task.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : task.status === 'running'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">{task.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectDetail
