import { RequestHandler } from "express";
import { products, Product } from "../models/productModel";

export const getProducts: RequestHandler = (req, res) => {
  res.json(products);
}
export const createProduct: RequestHandler = (req, res) => {
  const {name, price, stock} = req.body;

  const newProduct:Product = {
    id: products.length + 1,
    name: name,
    price: price,
    stock: stock
  }

  products.push(newProduct);
  res.status(201).json(newProduct);
}

export const deleteProduct: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.json({ message: "Product deleted", deletedProduct });
}