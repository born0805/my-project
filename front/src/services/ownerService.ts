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

export const ownerService = {
  /**
   * 获取我的店铺
   */
  async getMyShop(ownerId: number): Promise<Shop> {
    const response = await api.get<ApiResponse<Shop>>(`/owner/shop?ownerId=${ownerId}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取店铺信息失败')
  },

  /**
   * 更新我的店铺
   */
  async updateMyShop(shop: Shop, ownerId: number): Promise<Shop> {
    const response = await api.put<ApiResponse<Shop>>(`/owner/shop?ownerId=${ownerId}`, shop)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新店铺失败')
  },

  /**
   * 获取店铺员工列表
   */
  async getShopStaff(shopId: number): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>(`/owner/shop/staff?shopId=${shopId}`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取员工列表失败')
  },

  /**
   * 新增店员
   */
  async addStaff(staff: Omit<User, 'id' | 'createTime' | 'updateTime'>, shopId: number): Promise<User> {
    const response = await api.post<ApiResponse<User>>(`/owner/shop/staff?shopId=${shopId}`, staff)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '添加店员失败')
  },

  /**
   * 更新店员
   */
  async updateStaff(staff: User, shopId: number): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/owner/shop/staff?shopId=${shopId}`, staff)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新店员失败')
  },

  /**
   * 删除店员
   */
  async deleteStaff(staffId: number, shopId: number): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/owner/shop/staff/${staffId}?shopId=${shopId}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除店员失败')
    }
  },
}



