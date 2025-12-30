import axios from 'axios'
import { LoginDTO, UserInfo } from '../types/auth'
import { ApiResponse } from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authService = {
  /**
   * 登录
   */
  async login(loginDTO: LoginDTO): Promise<UserInfo> {
    const response = await api.post<ApiResponse<UserInfo>>('/auth/login', loginDTO)
    if (response.data.code === 200) {
      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data.data))
      return response.data.data!
    }
    throw new Error(response.data.message || '登录失败')
  },

  /**
   * 登出
   */
  logout(): void {
    localStorage.removeItem('userInfo')
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser(): UserInfo | null {
    const userStr = localStorage.getItem('userInfo')
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  },

  /**
   * 获取用户信息
   */
  async getUserInfo(id: number): Promise<UserInfo> {
    const response = await api.get<ApiResponse<UserInfo>>(`/auth/user/${id}`)
    if (response.data.code === 200) {
      return response.data.data!
    }
    throw new Error(response.data.message || '获取用户信息失败')
  },
}



