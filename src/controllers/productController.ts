import { RequestHandler } from "express";
import { products } from "../models/productModel";
import {prisma} from "../prisma/client";
import Joi from "joi";


export const getProducts: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json({code: 200, status: "success", message: "Get product successfuly", data: products});
}

export const createProduct: RequestHandler = async (req, res) => {
  const {name, price, stock} = req.body;

  const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required()
  });

  const { error } = productSchema.validate({ name, price, stock });
  if (error) {
    res.status(400).json({ code:400, status: "error", message: error.details[0].message, data:[] });
    return;
  }

    const newProduct = await prisma.product.create({
    data: { name, price, stock }
  });

  res.status(201).json({ code:201, status: "success", message: "Product created successfully", data: newProduct });
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