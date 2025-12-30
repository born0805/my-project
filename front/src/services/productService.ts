import axios from 'axios'
import { Product } from '../types/product'
import { ApiResponse } from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productService = {
  /**
   * 根据店铺ID获取产品列表
   */
  async getProductsByShopId(shopId: number): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(`/product/shop/${shopId}`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取产品列表失败')
  },

  /**
   * 根据ID获取产品
   */
  async getProductById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/product/${id}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取产品失败')
  },

  /**
   * 创建产品
   */
  async createProduct(product: Omit<Product, 'id' | 'createTime' | 'updateTime'>): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/product', product)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '创建产品失败')
  },

  /**
   * 更新产品
   */
  async updateProduct(product: Product): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>('/product', product)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新产品失败')
  },

  /**
   * 删除产品
   */
  async deleteProduct(id: number): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/product/${id}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除产品失败')
    }
  },
}






