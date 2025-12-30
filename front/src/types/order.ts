export interface Order {
  id: number
  orderNo: string
  shopId: number
  userId: number
  totalAmount: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
  remark?: string
  createTime?: string
  updateTime?: string
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  price: number
  quantity: number
  subtotal: number
  createTime?: string
}

export interface OrderCreateDTO {
  shopId: number
  items: OrderItemDTO[]
  remark?: string
}

export interface OrderItemDTO {
  productId: number
  quantity: number
}






