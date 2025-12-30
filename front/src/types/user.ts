export interface User {
  id: number
  username: string
  password?: string
  email?: string
  nickname?: string
  shopId?: number
  role?: 'OWNER' | 'STAFF'
  createTime?: string
  updateTime?: string
}

