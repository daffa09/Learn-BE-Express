export interface Order {
  id: number,
  user: string,
  product_id: number,
  quantity: number,
  total_price: number,
  status: string,
}

export const orders: Order[]=[
  {
    id: 1,
    user: "John Doe",
    product_id: 1,
    quantity: 1,
    total_price: 100000,
    status: "pending"
  },
  {
    id: 2,
    user: "Jane Doe",
    product_id: 2,
    quantity: 2,
    total_price: 200000,
    status: "pending"
  }
]