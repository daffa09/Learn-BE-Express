import { RequestHandler } from "express";
import { prisma } from "../connection/client";

export const getOrders: RequestHandler = async (req, res) => {
  const {
    limit,
    offset
  } = req.query;

  const filters: any = {};

  try {
    const grouped = await prisma.order.groupBy({
      by: ['userId'],
      _count: { id: true },
      _sum: { quantity: true },
    });

    const total = await prisma.product.count({where: filters})
  
    res.json({data:grouped, total: total})
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export const getOrderWithUser: RequestHandler = async (req, res) => {
  const ordersWithUser = await prisma.order.findMany({
    include: {
      user: true
    }
  });
  res.json({data: ordersWithUser});
}