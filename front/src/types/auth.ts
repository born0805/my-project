export interface LoginDTO {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  nickname?: string
  email?: string
  shopId?: number
  role?: 'ADMIN' | 'OWNER' | 'STAFF'
}



