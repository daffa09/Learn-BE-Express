import express  from "express";
import { getProducts } from "../controllers/product";
import { getOrders } from "../controllers/order";

const router = express.Router();

router.get("/products", getProducts)
router.get("/orders", getOrders)

export default router;