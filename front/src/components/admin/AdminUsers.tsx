import { useEffect, useState } from 'react'
import { User } from '../../types/user'
import { Shop } from '../../types/shop'
import { adminService } from '../../services/adminService'
import { shopService } from '../../services/shopService'
import './AdminUsers.css'

function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [assigningUser, setAssigningUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User>>({})
  const [assignData, setAssignData] = useState({ shopId: '', role: 'STAFF' })

  useEffect(() => {
    loadUsers()
    loadShops()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await adminService.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('加载用户列表失败:', error)
      alert('加载用户列表失败')
    } finally {
      setLoading(false)
    }
  }

  const loadShops = async () => {
    try {
      const data = await shopService.getShopList()
      setShops(data)
    } catch (error) {
      console.error('加载店铺列表失败:', error)
    }
  }

  const handleCreate = () => {
    setEditingUser(null)
    setFormData({ role: 'STAFF' })
    setShowModal(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData(user)
    setShowModal(true)
  }

  const handleAssign = (user: User) => {
    setAssigningUser(user)
    setAssignData({ shopId: user.shopId?.toString() || '', role: user.role || 'STAFF' })
    setShowAssignModal(true)
  }

  const handleSave = async () => {
    try {
      if (editingUser) {
        await adminService.updateUser({ ...editingUser, ...formData } as User)
        alert('用户更新成功')
      } else {
        await adminService.createUser(formData as Omit<User, 'id' | 'createTime' | 'updateTime'>)
        alert('用户创建成功')
      }
      setShowModal(false)
      loadUsers()
    } catch (error: any) {
      alert(error.message || '操作失败')
    }
  }

  const handleAssignSave = async () => {
    if (!assigningUser) return
    
    try {
      await adminService.assignUserToShop({
        userId: assigningUser.id!,
        shopId: assignData.shopId ? Number(assignData.shopId) : undefined,
        role: assignData.role
      })
      alert('用户分配成功')
      setShowAssignModal(false)
      loadUsers()
    } catch (error: any) {
      alert(error.message || '分配失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个用户吗？')) return
    
    try {
      await adminService.deleteUser(id)
      alert('用户删除成功')
      loadUsers()
    } catch (error: any) {
      alert(error.message || '删除失败')
    }
  }

  const getShopName = (shopId?: number) => {
    if (!shopId) return '-'
    const shop = shops.find(s => s.id === shopId)
    return shop ? shop.name : '-'
  }

  const getRoleText = (role?: string) => {
    const roleMap: Record<string, string> = {
      'ADMIN': '管理员',
      'OWNER': '店主',
      'STAFF': '店员'
    }
    return roleMap[role || ''] || role || '-'
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="admin-users">
      <div className="page-header">
        <h2>用户管理</h2>
        <button className="btn-primary" onClick={handleCreate}>
          新增用户
        </button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>昵称</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>所属店铺</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty">暂无用户</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.nickname || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{getRoleText(user.role)}</td>
                  <td>{getShopName(user.shopId)}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(user)}>
                      编辑
                    </button>
                    <button className="btn-assign" onClick={() => handleAssign(user)}>
                      分配
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(user.id!)}>
                      删除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingUser ? '编辑用户' : '新增用户'}</h3>
            <div className="form-group">
              <label>用户名</label>
              <input
                type="text"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={!!editingUser}
              />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input
                type="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={editingUser ? '留空则不修改' : ''}
              />
            </div>
            <div className="form-group">
              <label>昵称</label>
              <input
                type="text"
                value={formData.nickname || ''}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>邮箱</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>角色</label>
              <select
                value={formData.role || 'STAFF'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="ADMIN">管理员</option>
                <option value="OWNER">店主</option>
                <option value="STAFF">店员</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                取消
              </button>
              <button className="btn-primary" onClick={handleSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && assigningUser && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>分配用户到店铺</h3>
            <div className="form-group">
              <label>用户</label>
              <input type="text" value={assigningUser.username} disabled />
            </div>
            <div className="form-group">
              <label>店铺</label>
              <select
                value={assignData.shopId}
                onChange={(e) => setAssignData({ ...assignData, shopId: e.target.value })}
              >
                <option value="">不分配店铺</option>
                {shops.map(shop => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>角色</label>
              <select
                value={assignData.role}
                onChange={(e) => setAssignData({ ...assignData, role: e.target.value })}
              >
                <option value="OWNER">店主</option>
                <option value="STAFF">店员</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowAssignModal(false)}>
                取消
              </button>
              <button className="btn-primary" onClick={handleAssignSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers



