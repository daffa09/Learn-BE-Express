import express  from "express";
import { createProducts, getProduct, getProducts } from "../controllers/product";

const router = express.Router();

router.get("/products", getProducts)
router.get("/product/:id", getProduct)
router.post("/products", createProducts)

export default router;