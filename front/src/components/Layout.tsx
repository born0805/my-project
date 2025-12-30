import { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = authService.getCurrentUser()

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <h1 className="logo">聚米喵</h1>
          <nav className="nav">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              首页
            </Link>
            {currentUser?.role === 'ADMIN' && (
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                管理员
              </Link>
            )}
            {currentUser?.role === 'OWNER' && (
              <Link to="/owner" className={location.pathname === '/owner' ? 'active' : ''}>
                店长
              </Link>
            )}
            <Link 
              to="/users" 
              className={location.pathname === '/users' ? 'active' : ''}
            >
              用户管理
            </Link>
            <Link 
              to="/shops" 
              className={location.pathname.startsWith('/shops') ? 'active' : ''}
            >
              店铺管理
            </Link>
            {currentUser && (
              <button className="btn-logout-header" onClick={handleLogout}>
                退出
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 聚米喵. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

