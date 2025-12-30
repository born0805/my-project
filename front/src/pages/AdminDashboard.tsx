import { useState } from 'react'
import { authService } from '../services/authService'
import AdminShops from '../components/admin/AdminShops'
import AdminUsers from '../components/admin/AdminUsers'
import './AdminDashboard.css'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'shops' | 'users'>('shops')
  const currentUser = authService.getCurrentUser()

  const handleLogout = () => {
    authService.logout()
    window.location.href = '/login'
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>管理员控制台</h1>
        <div className="admin-user-info">
          <span>欢迎，{currentUser?.nickname || currentUser?.username}</span>
          <button className="btn-logout" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button
          className={activeTab === 'shops' ? 'active' : ''}
          onClick={() => setActiveTab('shops')}
        >
          店铺管理
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          用户管理
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'shops' && <AdminShops />}
        {activeTab === 'users' && <AdminUsers />}
      </div>
    </div>
  )
}

export default AdminDashboard



