import axios from 'axios'
import { Shop } from '../types/shop'
import { ApiResponse } from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const shopService = {
  /**
   * 获取所有店铺
   */
  async getShopList(): Promise<Shop[]> {
    const response = await api.get<ApiResponse<Shop[]>>('/shop/list')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取店铺列表失败')
  },

  /**
   * 根据ID获取店铺
   */
  async getShopById(id: number): Promise<Shop> {
    const response = await api.get<ApiResponse<Shop>>(`/shop/${id}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取店铺失败')
  },

  /**
   * 根据店长ID获取店铺
   */
  async getShopByOwnerId(ownerId: number): Promise<Shop> {
    const response = await api.get<ApiResponse<Shop>>(`/shop/owner/${ownerId}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取店铺失败')
  },

  /**
   * 创建店铺
   */
  async createShop(shop: Omit<Shop, 'id' | 'createTime' | 'updateTime'>): Promise<Shop> {
    const response = await api.post<ApiResponse<Shop>>('/shop', shop)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '创建店铺失败')
  },

  /**
   * 更新店铺
   */
  async updateShop(shop: Shop): Promise<Shop> {
    const response = await api.put<ApiResponse<Shop>>('/shop', shop)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新店铺失败')
  },

  /**
   * 删除店铺
   */
  async deleteShop(id: number): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/shop/${id}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除店铺失败')
    }
  },
}






