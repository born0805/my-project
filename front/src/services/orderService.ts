import axios from 'axios'
import { Order, OrderItem, OrderCreateDTO } from '../types/order'
import { ApiResponse } from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const orderService = {
  /**
   * 根据店铺ID获取订单列表
   */
  async getOrdersByShopId(shopId: number): Promise<Order[]> {
    const response = await api.get<ApiResponse<Order[]>>(`/order/shop/${shopId}`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取订单列表失败')
  },

  /**
   * 根据用户ID获取订单列表
   */
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const response = await api.get<ApiResponse<Order[]>>(`/order/user/${userId}`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取订单列表失败')
  },

  /**
   * 根据ID获取订单
   */
  async getOrderById(id: number): Promise<Order> {
    const response = await api.get<ApiResponse<Order>>(`/order/${id}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取订单失败')
  },

  /**
   * 创建订单
   */
  async createOrder(orderDTO: OrderCreateDTO, userId: number): Promise<Order> {
    const response = await api.post<ApiResponse<Order>>(`/order?userId=${userId}`, orderDTO)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '创建订单失败')
  },

  /**
   * 更新订单状态
   */
  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const response = await api.put<ApiResponse<Order>>(`/order/${id}/status?status=${status}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新订单状态失败')
  },

  /**
   * 根据订单ID获取订单项列表
   */
  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    const response = await api.get<ApiResponse<OrderItem[]>>(`/order-item/order/${orderId}`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取订单项列表失败')
  },
}






