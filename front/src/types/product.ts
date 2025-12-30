export interface Product {
  id: number
  shopId: number
  name: string
  description?: string
  price: number
  stock: number
  imageUrl?: string
  status: 'ACTIVE' | 'INACTIVE'
  createTime?: string
  updateTime?: string
}






