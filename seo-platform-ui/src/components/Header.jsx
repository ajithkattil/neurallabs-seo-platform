import { useAuth } from '../context/AuthContext'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200 h-16 fixed top-0 right-0 left-64 flex items-center justify-between px-8">
      <div className="flex-1" />
      
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">
            {user?.name || 'User'}
          </p>
          <p className="text-xs text-slate-500">
            {user?.email}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  )
}

export default Header
