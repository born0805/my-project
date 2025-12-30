import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../types/product'
import { OrderItemDTO } from '../types/order'
import { productService } from '../services/productService'
import { orderService } from '../services/orderService'
import './OrderCreate.css'

function OrderCreate() {
  const { shopId } = useParams<{ shopId: string }>()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Record<number, number>>({}) // productId -> quantity
  const [remark, setRemark] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (shopId) {
      loadProducts(Number(shopId))
    }
  }, [shopId])

  const loadProducts = async (id: number) => {
    setLoading(true)
    try {
      const data = await productService.getProductsByShopId(id)
      setProducts(data.filter(p => p.status === 'ACTIVE' && p.stock > 0))
    } catch (error) {
      console.error('加载产品列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId] -= 1
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => {
        const newCart = { ...prev }
        delete newCart[productId]
        return newCart
      })
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }))
    }
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === Number(productId))
      if (product) {
        return total + product.price * quantity
      }
      return total
    }, 0)
  }

  const getCartItems = (): OrderItemDTO[] => {
    return Object.entries(cart).map(([productId, quantity]) => ({
      productId: Number(productId),
      quantity
    }))
  }

  const handleSubmit = async () => {
    if (Object.keys(cart).length === 0) {
      alert('请至少选择一个产品')
      return
    }

    if (!shopId) {
      alert('店铺ID不存在')
      return
    }

    // 这里应该从登录状态获取userId，暂时使用1作为示例
    const userId = 1

    setSubmitting(true)
    try {
      await orderService.createOrder({
        shopId: Number(shopId),
        items: getCartItems(),
        remark
      }, userId)
      
      alert('订单创建成功！')
      navigate(`/orders/${shopId}`)
    } catch (error: any) {
      alert(error.message || '创建订单失败')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="order-create">
      <div className="page-header">
        <h2>创建订单</h2>
        <button className="btn-secondary" onClick={() => navigate(`/orders/${shopId}`)}>
          返回订单列表
        </button>
      </div>

      <div className="order-create-content">
        <div className="products-section">
          <h3>选择产品</h3>
          <div className="products-grid">
            {products.length === 0 ? (
              <div className="empty">暂无可用产品</div>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">¥{product.price.toFixed(2)}</p>
                    <p className="product-stock">库存: {product.stock}</p>
                  </div>
                  <div className="product-actions">
                    {cart[product.id] ? (
                      <div className="quantity-controls">
                        <button onClick={() => removeFromCart(product.id)}>-</button>
                        <input 
                          type="number" 
                          value={cart[product.id]} 
                          onChange={(e) => {
                            const qty = parseInt(e.target.value) || 0
                            const maxQty = Math.min(qty, product.stock)
                            updateQuantity(product.id, maxQty)
                          }}
                          min="0"
                          max={product.stock}
                        />
                        <button onClick={() => addToCart(product.id)}>+</button>
                      </div>
                    ) : (
                      <button 
                        className="btn-add"
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                      >
                        加入购物车
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="cart-section">
          <h3>购物车</h3>
          {Object.keys(cart).length === 0 ? (
            <div className="empty-cart">购物车为空</div>
          ) : (
            <>
              <div className="cart-items">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find(p => p.id === Number(productId))
                  if (!product) return null
                  return (
                    <div key={productId} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{product.name}</span>
                        <span className="cart-item-price">¥{product.price.toFixed(2)} × {quantity}</span>
                      </div>
                      <div className="cart-item-subtotal">
                        ¥{(product.price * quantity).toFixed(2)}
                      </div>
                      <button 
                        className="btn-remove"
                        onClick={() => updateQuantity(Number(productId), 0)}
                      >
                        删除
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="cart-total">
                <div className="total-label">总计：</div>
                <div className="total-amount">¥{getCartTotal().toFixed(2)}</div>
              </div>
              <div className="cart-remark">
                <label>备注：</label>
                <textarea 
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="请输入订单备注（可选）"
                  rows={3}
                />
              </div>
              <button 
                className="btn-submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? '提交中...' : '提交订单'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderCreate






