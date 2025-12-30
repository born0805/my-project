import { useEffect, useState } from 'react'
import { authService } from '../services/authService'
import { Shop } from '../types/shop'
import { User } from '../types/user'
import { ownerService } from '../services/ownerService'
import './OwnerDashboard.css'

function OwnerDashboard() {
  const currentUser = authService.getCurrentUser()
  const [shop, setShop] = useState<Shop | null>(null)
  const [staff, setStaff] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'shop' | 'staff'>('shop')
  const [showStaffModal, setShowStaffModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<User | null>(null)
  const [staffForm, setStaffForm] = useState<Partial<User>>({})
  const [shopForm, setShopForm] = useState<Partial<Shop>>({})

  useEffect(() => {
    if (currentUser?.id) {
      loadShop()
      loadStaff()
    }
  }, [currentUser])

  const loadShop = async () => {
    if (!currentUser?.id) return
    setLoading(true)
    try {
      const data = await ownerService.getMyShop(currentUser.id)
      setShop(data)
      setShopForm(data)
    } catch (error: any) {
      console.error('加载店铺信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStaff = async () => {
    if (!shop?.id) return
    try {
      const data = await ownerService.getShopStaff(shop.id)
      setStaff(data)
    } catch (error) {
      console.error('加载员工列表失败:', error)
    }
  }

  const handleSaveShop = async () => {
    if (!currentUser?.id || !shop) return
    try {
      await ownerService.updateMyShop(shopForm as Shop, currentUser.id)
      alert('店铺信息更新成功')
      loadShop()
    } catch (error: any) {
      alert(error.message || '更新失败')
    }
  }

  const handleAddStaff = () => {
    setEditingStaff(null)
    setStaffForm({ role: 'STAFF' })
    setShowStaffModal(true)
  }

  const handleEditStaff = (staffMember: User) => {
    setEditingStaff(staffMember)
    setStaffForm(staffMember)
    setShowStaffModal(true)
  }

  const handleSaveStaff = async () => {
    if (!shop?.id) return
    try {
      if (editingStaff) {
        await ownerService.updateStaff(staffForm as User, shop.id)
        alert('店员更新成功')
      } else {
        await ownerService.addStaff(staffForm as Omit<User, 'id' | 'createTime' | 'updateTime'>, shop.id)
        alert('店员添加成功')
      }
      setShowStaffModal(false)
      loadStaff()
    } catch (error: any) {
      alert(error.message || '操作失败')
    }
  }

  const handleDeleteStaff = async (staffId: number) => {
    if (!shop?.id) return
    if (!confirm('确定要删除这个店员吗？')) return
    
    try {
      await ownerService.deleteStaff(staffId, shop.id)
      alert('店员删除成功')
      loadStaff()
    } catch (error: any) {
      alert(error.message || '删除失败')
    }
  }

  const handleLogout = () => {
    authService.logout()
    window.location.href = '/login'
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (!shop) {
    return <div className="no-shop">您还没有店铺，请联系管理员创建店铺</div>
  }

  return (
    <div className="owner-dashboard">
      <div className="owner-header">
        <h1>店长控制台</h1>
        <div className="owner-user-info">
          <span>欢迎，{currentUser?.nickname || currentUser?.username}</span>
          <span className="shop-name">店铺：{shop.name}</span>
          <button className="btn-logout" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </div>

      <div className="owner-tabs">
        <button
          className={activeTab === 'shop' ? 'active' : ''}
          onClick={() => setActiveTab('shop')}
        >
          店铺信息
        </button>
        <button
          className={activeTab === 'staff' ? 'active' : ''}
          onClick={() => setActiveTab('staff')}
        >
          店员管理
        </button>
      </div>

      <div className="owner-content">
        {activeTab === 'shop' && (
          <div className="shop-info-panel">
            <h2>店铺信息</h2>
            <div className="form-group">
              <label>店铺名称</label>
              <input
                type="text"
                value={shopForm.name || ''}
                onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>店铺描述</label>
              <textarea
                value={shopForm.description || ''}
                onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>店铺地址</label>
              <input
                type="text"
                value={shopForm.address || ''}
                onChange={(e) => setShopForm({ ...shopForm, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>联系电话</label>
              <input
                type="text"
                value={shopForm.phone || ''}
                onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
              />
            </div>
            <button className="btn-primary" onClick={handleSaveShop}>
              保存店铺信息
            </button>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="staff-panel">
            <div className="page-header">
              <h2>店员管理</h2>
              <button className="btn-primary" onClick={handleAddStaff}>
                新增店员
              </button>
            </div>

            <div className="staff-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>昵称</th>
                    <th>邮箱</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="empty">暂无店员</td>
                    </tr>
                  ) : (
                    staff.map(staffMember => (
                      <tr key={staffMember.id}>
                        <td>{staffMember.id}</td>
                        <td>{staffMember.username}</td>
                        <td>{staffMember.nickname || '-'}</td>
                        <td>{staffMember.email || '-'}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEditStaff(staffMember)}>
                            编辑
                          </button>
                          <button className="btn-delete" onClick={() => handleDeleteStaff(staffMember.id!)}>
                            删除
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {showStaffModal && (
              <div className="modal-overlay" onClick={() => setShowStaffModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h3>{editingStaff ? '编辑店员' : '新增店员'}</h3>
                  <div className="form-group">
                    <label>用户名</label>
                    <input
                      type="text"
                      value={staffForm.username || ''}
                      onChange={(e) => setStaffForm({ ...staffForm, username: e.target.value })}
                      disabled={!!editingStaff}
                    />
                  </div>
                  <div className="form-group">
                    <label>密码</label>
                    <input
                      type="password"
                      value={staffForm.password || ''}
                      onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                      placeholder={editingStaff ? '留空则不修改' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <label>昵称</label>
                    <input
                      type="text"
                      value={staffForm.nickname || ''}
                      onChange={(e) => setStaffForm({ ...staffForm, nickname: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>邮箱</label>
                    <input
                      type="email"
                      value={staffForm.email || ''}
                      onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    />
                  </div>
                  <div className="modal-actions">
                    <button className="btn-secondary" onClick={() => setShowStaffModal(false)}>
                      取消
                    </button>
                    <button className="btn-primary" onClick={handleSaveStaff}>
                      保存
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnerDashboard



