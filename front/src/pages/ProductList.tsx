import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../types/product'
import { productService } from '../services/productService'
import './ProductList.css'

function ProductList() {
  const { shopId } = useParams<{ shopId: string }>()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (shopId) {
      loadProducts(Number(shopId))
    }
  }, [shopId])

  const loadProducts = async (id: number) => {
    setLoading(true)
    try {
      const data = await productService.getProductsByShopId(id)
      setProducts(data)
    } catch (error) {
      console.error('加载产品列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="product-list">
      <div className="page-header">
        <h2>产品管理</h2>
        <div>
          <button className="btn-secondary" onClick={() => navigate(`/orders/${shopId}/create`)}>
            创建订单
          </button>
          <button className="btn-primary" onClick={() => shopId && loadProducts(Number(shopId))}>
            刷新
          </button>
        </div>
      </div>
      
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>产品名称</th>
              <th>价格</th>
              <th>库存</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">暂无产品</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>¥{product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`status-badge ${product.status.toLowerCase()}`}>
                      {product.status === 'ACTIVE' ? '上架' : '下架'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList






