import axios from 'axios'
import { User } from '../types/user'
import { ApiResponse } from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const userService = {
  /**
   * 获取用户列表
   */
  async getUserList(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/user/list')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '获取用户列表失败')
  },

  /**
   * 根据ID获取用户
   */
  async getUserById(id: number): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/user/${id}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取用户失败')
  },

  /**
   * 新增用户
   */
  async createUser(user: Omit<User, 'id' | 'createTime' | 'updateTime'>): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/user', user)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '创建用户失败')
  },

  /**
   * 更新用户
   */
  async updateUser(user: User): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/user', user)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '更新用户失败')
  },

  /**
   * 删除用户
   */
  async deleteUser(id: number): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/user/${id}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除用户失败')
    }
  },
}






