import { useEffect, useState } from 'react'
import { Shop } from '../../types/shop'
import { adminService } from '../../services/adminService'
import './AdminShops.css'

function AdminShops() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingShop, setEditingShop] = useState<Shop | null>(null)
  const [formData, setFormData] = useState<Partial<Shop>>({})

  useEffect(() => {
    loadShops()
  }, [])

  const loadShops = async () => {
    setLoading(true)
    try {
      const data = await adminService.getAllShops()
      setShops(data)
    } catch (error) {
      console.error('加载店铺列表失败:', error)
      alert('加载店铺列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingShop(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEdit = (shop: Shop) => {
    setEditingShop(shop)
    setFormData(shop)
    setShowModal(true)
  }

  const handleSave = async () => {
    try {
      if (editingShop) {
        await adminService.updateShop({ ...editingShop, ...formData } as Shop)
        alert('店铺更新成功')
      } else {
        await adminService.createShop(formData as Omit<Shop, 'id' | 'createTime' | 'updateTime'>)
        alert('店铺创建成功')
      }
      setShowModal(false)
      loadShops()
    } catch (error: any) {
      alert(error.message || '操作失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个店铺吗？')) return
    
    try {
      await adminService.deleteShop(id)
      alert('店铺删除成功')
      loadShops()
    } catch (error: any) {
      alert(error.message || '删除失败')
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="admin-shops">
      <div className="page-header">
        <h2>店铺管理</h2>
        <button className="btn-primary" onClick={handleCreate}>
          新增店铺
        </button>
      </div>

      <div className="shops-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>店铺名称</th>
              <th>店长ID</th>
              <th>地址</th>
              <th>电话</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {shops.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">暂无店铺</td>
              </tr>
            ) : (
              shops.map(shop => (
                <tr key={shop.id}>
                  <td>{shop.id}</td>
                  <td>{shop.name}</td>
                  <td>{shop.ownerId}</td>
                  <td>{shop.address || '-'}</td>
                  <td>{shop.phone || '-'}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(shop)}>
                      编辑
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(shop.id!)}>
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
            <h3>{editingShop ? '编辑店铺' : '新增店铺'}</h3>
            <div className="form-group">
              <label>店铺名称</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>店长ID</label>
              <input
                type="number"
                value={formData.ownerId || ''}
                onChange={(e) => setFormData({ ...formData, ownerId: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>地址</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>电话</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>描述</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
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
    </div>
  )
}

export default AdminShops



