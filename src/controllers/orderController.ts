import { RequestHandler } from "express";
import { orders, Order } from "../models/orderModel";
import { products } from "../models/productModel";

type OrderWithProduct = typeof orders[number] & {
  product: typeof products[number] | undefined;
};

export const getOrders: RequestHandler = (req, res) => {
  const ordersWithProduct: OrderWithProduct[] = orders.map(order => ({
    ...order,
    product: products.find(p => p.id === order.product_id)
  }));

  res.json(ordersWithProduct);
}

export const createOrder: RequestHandler = (req, res) => {
  const {user, product_id, quantity, total_price, status} = req.body;

  if (products.find(product => product.id === product_id) === undefined) {
    res.status(400).json({ message: "Product not found" });
    return;
  }

  const newOrder:Order = {
    id: orders.length + 1,
    user: user,
    product_id: product_id,
    quantity: quantity,
    total_price: total_price,
    status: status
  }

  orders.push(newOrder);
  res.status(201).json(newOrder);
}

export const deleteOrder: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex(post => post.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  const deletedOrder = orders.splice(index, 1)[0];
  res.json({ message: "Order deleted", deletedOrder });
}