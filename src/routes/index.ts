import express from "express";
import { getProducts, createProduct, deleteProduct } from "../controllers/productController";
import { authenticate } from "../middlewares/auth";

const router = express.Router()


// product routes
router.get("/products", authenticate, getProducts);
router.post("/product", authenticate, createProduct);
router.delete("/product/:id", authenticate, deleteProduct);

export default router;