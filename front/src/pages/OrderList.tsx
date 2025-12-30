import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Order, OrderItem } from '../types/order'
import { orderService } from '../services/orderService'
import './OrderList.css'

function OrderList() {
  const { shopId } = useParams<{ shopId: string }>()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [orderItemsMap, setOrderItemsMap] = useState<Record<number, OrderItem[]>>({})
  const [loading, setLoading] = useState(false)
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

  useEffect(() => {
    if (shopId) {
      loadOrders(Number(shopId))
    }
  }, [shopId])

  const loadOrders = async (id: number) => {
    setLoading(true)
    try {
      const data = await orderService.getOrdersByShopId(id)
      setOrders(data)
      
      // 加载所有订单的订单项
      const itemsMap: Record<number, OrderItem[]> = {}
      for (const order of data) {
        const items = await orderService.getOrderItemsByOrderId(order.id)
        itemsMap[order.id] = items
      }
      setOrderItemsMap(itemsMap)
    } catch (error) {
      console.error('加载订单列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': '待处理',
      'PROCESSING': '处理中',
      'COMPLETED': '已完成',
      'CANCELLED': '已取消'
    }
    return statusMap[status] || status
  }

  const getStatusClass = (status: string) => {
    const classMap: Record<string, string> = {
      'PENDING': 'pending',
      'PROCESSING': 'processing',
      'COMPLETED': 'completed',
      'CANCELLED': 'cancelled'
    }
    return classMap[status] || ''
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="order-list">
      <div className="page-header">
        <h2>订单管理</h2>
        <div>
          <button className="btn-secondary" onClick={() => navigate(`/orders/${shopId}/create`)}>
            创建订单
          </button>
          <button className="btn-primary" onClick={() => shopId && loadOrders(Number(shopId))}>
            刷新
          </button>
        </div>
      </div>
      
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>订单号</th>
              <th>总金额</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">暂无订单</td>
              </tr>
            ) : (
              orders.map(order => (
                <>
                  <tr key={order.id}>
                    <td>{order.orderNo}</td>
                    <td>¥{order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td>{order.createTime ? new Date(order.createTime).toLocaleString() : '-'}</td>
                    <td>
                      <button 
                        className="btn-link"
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      >
                        {expandedOrderId === order.id ? '收起' : '查看详情'}
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === order.id && orderItemsMap[order.id] && (
                    <tr>
                      <td colSpan={5}>
                        <div className="order-details">
                          <h4>订单详情</h4>
                          <table className="order-items-table">
                            <thead>
                              <tr>
                                <th>产品名称</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>小计</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orderItemsMap[order.id].map(item => (
                                <tr key={item.id}>
                                  <td>{item.productName}</td>
                                  <td>¥{item.price.toFixed(2)}</td>
                                  <td>{item.quantity}</td>
                                  <td>¥{item.subtotal.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {order.remark && (
                            <div className="order-remark">
                              <strong>备注：</strong>{order.remark}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderList






