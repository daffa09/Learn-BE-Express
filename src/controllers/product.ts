import { prisma } from "../connection/client";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res:Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data products" });
  }
}

export const getProduct = async (req: Request, res:Response) => {
  try {
    const id = parseInt(req.params.id);
    const products = await prisma.product.findUnique({where: {id}});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data products" });
  }
}

export const createProducts = async (req: Request, res:Response) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.create({
      data: { name, price:parseFloat(price) },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to add data products" });
  }
}