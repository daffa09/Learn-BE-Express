export interface Product {
  id: number,
  name: string,
  price: number,
  stock: number,
}

export const products: Product[]=[
  {
    id: 1,
    name: "Product 1",
    price: 100000,
    stock: 100
  },
  {
    id: 2,
    name: "Product 2",
    price: 120000,
    stock: 200
  }
]