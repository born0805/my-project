import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shop } from '../types/shop'
import { shopService } from '../services/shopService'
import './ShopList.css'

function ShopList() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadShops()
  }, [])

  const loadShops = async () => {
    setLoading(true)
    try {
      const data = await shopService.getShopList()
      setShops(data)
    } catch (error) {
      console.error('加载店铺列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="shop-list">
      <div className="page-header">
        <h2>店铺管理</h2>
        <button className="btn-primary" onClick={loadShops}>
          刷新
        </button>
      </div>
      
      <div className="shop-grid">
        {shops.length === 0 ? (
          <div className="empty">暂无店铺</div>
        ) : (
          shops.map(shop => (
            <div key={shop.id} className="shop-card">
              <h3>{shop.name}</h3>
              <p className="shop-description">{shop.description || '暂无描述'}</p>
              <div className="shop-info">
                <div>地址: {shop.address || '-'}</div>
                <div>电话: {shop.phone || '-'}</div>
              </div>
              <div className="shop-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => navigate(`/products/${shop.id}`)}
                >
                  查看产品
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate(`/orders/${shop.id}`)}
                >
                  查看订单
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ShopList






