import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()
  
  const isActive = (path) => location.pathname === path ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700' : 'text-slate-600 hover:bg-slate-50'

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/integrations', label: 'Integrations', icon: '🔗' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">
          <span className="text-blue-600">🚀</span> Neural Labs
        </h1>
        <p className="text-xs text-slate-500 mt-1">AI-Powered SEO</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${isActive(item.path)}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={logout}
          className="w-full px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all duration-200 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
