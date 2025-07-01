import { RequestHandler } from "express";
import { prisma } from "../connection/client";

export const transferPoint: RequestHandler = async (req, res) => {
  const {
    amount,
    senderId,
    receiveId
  } = req.body;
  try {
    if (amount <= 0) {
      res.status(400).json({message: "Jumlah poin harus lebih dari 0"});
    }
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({where: {id:senderId}}),
      prisma.user.findUnique({where: {id:receiveId}}),
    ])

    if(!sender ) res.status(400).json({message: "Pengirim tidak ditemukan"});
    if(!receiver) res.status(400).json({message: "Penerima tidak ditemukan"});

    if ((sender?.point ?? 0) < amount) {
      res.status(400).json({message: "Poin pengirim tidak cukup untuk melakukan transfer"});
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {id:senderId},
        data: {point: {decrement: amount}}
      })

      await tx.user.update({
        where: {id:receiveId},
        data: {point: {increment: amount}}
      })
    })

    res.status(200).json({message: "Transfer poin berhasil", data: {senderId, receiveId, amount}});

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export const userPoint: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const userPoints = await prisma.user.findUnique({
      where: {id: userId},
      select:{
        id: true,
        point: true
      }
    });
    res.status(200).json({message: "Data ditemukan", data: {userPoints}});
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}