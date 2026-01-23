import { useState } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export function Settings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    notifications: true,
    reports: true,
    reportFrequency: 'weekly',
    theme: 'light',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save settings
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your preferences</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-800 text-sm font-medium">
              ✓ Settings saved successfully
            </p>
          </div>
        )}

        {/* Account Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Account</h2>

          <div className="space-y-6">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="input"
                disabled
              />
              <p className="text-xs text-slate-500 mt-1">Contact support to change</p>
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="input"
                disabled
              />
              <p className="text-xs text-slate-500 mt-1">Contact support to change</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Email Notifications</p>
                <p className="text-sm text-slate-600 mt-1">
                  Get updates when tasks complete
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  setSettings({ ...settings, notifications: e.target.checked })
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div>
                <p className="font-medium text-slate-900">Weekly Reports</p>
                <p className="text-sm text-slate-600 mt-1">
                  Receive weekly automation insights
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.reports}
                onChange={(e) =>
                  setSettings({ ...settings, reports: e.target.checked })
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            {settings.reports && (
              <div className="pt-4 border-t border-slate-200">
                <label className="label">Report Frequency</label>
                <select
                  value={settings.reportFrequency}
                  onChange={(e) =>
                    setSettings({ ...settings, reportFrequency: e.target.value })
                  }
                  className="input"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Appearance</h2>

          <div>
            <label className="label">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value })
              }
              className="input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="btn btn-primary">
          Save Settings
        </button>

        {/* Danger Zone */}
        <div className="card border-red-200 bg-red-50">
          <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>
          <p className="text-sm text-red-800 mb-4">
            These actions cannot be undone. Please be careful.
          </p>
          <button className="btn bg-red-600 text-white hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
