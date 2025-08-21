import { RequestHandler } from "express";
import {prisma} from "../connection/client";
import { BadRequestError } from "../utils/errors";

export const updateSupplierStock: RequestHandler = async (req, res, next) => {
  const updates = req.body as Array<{
    supplierId: number;
    productId: number;
    newStock: number;
  }>;

  if (!Array.isArray(updates) || updates.length === 0) {
    throw new BadRequestError("updates must be an array objects")
  }

  // validation stok cant be negatif
  if (updates.some((item) => item.newStock < 0)) {
    throw new BadRequestError("Stock cant be negative")
  }

  try {
    const transactions = updates.map((item) =>
      prisma.product.updateMany({
        where: {
          id: item.productId,
          supplierId: item.supplierId,
        },
        data: {
          stock: {
            increment: item.newStock
          }
        },
      })
    );

    await prisma.$transaction(transactions);

    res.status(200).json({
      code: 200,
      status: "success",
      message:"Stock updated successfully",
      data: []
    })
  } catch (error) {
    next(error)
  }

}