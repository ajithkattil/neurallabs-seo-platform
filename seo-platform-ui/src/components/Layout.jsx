import Sidebar from './Sidebar'
import Header from './Header'

export function Layout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        
        <main className="flex-1 overflow-auto mt-16">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
