import express  from "express";
import { getProducts } from "../controllers/product";
import { getOrders, getOrderWithUser } from "../controllers/order";
import { transferPoint, userPoint } from "../controllers/transfer-point";
import { updateSupplierStock } from "../controllers/supplier";

const router = express.Router();

router.get("/products", getProducts)
router.get("/orders", getOrders)
router.get("/order/with-user", getOrderWithUser)
router.post("/transfer-points", transferPoint)
router.get("/transfer-points/:id", userPoint)
router.post("/suppliers/stock", updateSupplierStock)


export default router;