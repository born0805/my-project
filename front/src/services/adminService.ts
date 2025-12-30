import axios from 'axios'
import { Shop } from '../types/shop'
import { User } from '../types/user'
import { ApiResponse } from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface UserAssignDTO {
  userId: number
  shopId?: number
  role?: string
}

export const adminService = {
  /**
   * 获取所有店铺
   */
  async getAllShops(): Promise<Shop[]> {
    const response = await api.get<ApiResponse<Shop[]>>('/admin/shops')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取店铺列表失败')
  },

  /**
   * 创建店铺
   */
  async createShop(shop: Omit<Shop, 'id' | 'createTime' | 'updateTime'>): Promise<Shop> {
    const response = await api.post<ApiResponse<Shop>>('/admin/shops', shop)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '创建店铺失败')
  },

  /**
   * 更新店铺
   */
  async updateShop(shop: Shop): Promise<Shop> {
    const response = await api.put<ApiResponse<Shop>>('/admin/shops', shop)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新店铺失败')
  },

  /**
   * 删除店铺
   */
  async deleteShop(id: number): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/admin/shops/${id}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除店铺失败')
    }
  },

  /**
   * 获取所有用户
   */
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/admin/users')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取用户列表失败')
  },

  /**
   * 创建用户
   */
  async createUser(user: Omit<User, 'id' | 'createTime' | 'updateTime'>): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/admin/users', user)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '创建用户失败')
  },

  /**
   * 更新用户
   */
  async updateUser(user: User): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/admin/users', user)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新用户失败')
  },

  /**
   * 删除用户
   */
  async deleteUser(id: number): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/admin/users/${id}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除用户失败')
    }
  },

  /**
   * 分配用户到店铺
   */
  async assignUserToShop(assignDTO: UserAssignDTO): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/admin/users/assign', assignDTO)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '分配用户失败')
  },
}



